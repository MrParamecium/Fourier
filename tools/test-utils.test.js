#!/usr/bin/env node
'use strict';
/**
 * Unit smoke for tools/test-utils.js — runFlow runner.
 *
 * Uses a STUB page object that mimics the subset of Playwright's API the
 * runner touches (.evaluate, .waitForTimeout, .screenshot). No Chromium
 * dependency — runs in ~50ms, deterministic, safe to chain into npm run
 * check.
 *
 * What it proves:
 *   1. Happy path — every step's action runs in order, every assert returns
 *      truthy → passed:true with stepLog.length === steps.length.
 *   2. Halt on throw — assert that throws stops the runner; later steps
 *      do NOT execute (the action would push a sentinel that fails the
 *      test).
 *   3. Halt on falsy assert — assert that polls false until timeout halts.
 *   4. Eventual pass — assert that flips truthy mid-poll passes the step.
 *   5. Step settle modes — 'lesson' calls settleLesson (skipped in stub by
 *      not having MathJax); 'rAF' wraps in requestAnimationFrame; null
 *      skips. We only verify no crash on settle: null.
 *
 * Exits 0 on PASS, 1 on FAIL with the failing assertion printed.
 */
const { runFlow } = require('./test-utils.js');

function fail(label, reason) {
    console.error(`FAIL [${label}] ${reason}`);
    process.exit(1);
}

function makeStubPage() {
    return {
        // Mirrors Playwright's page.evaluate(fn, ...args). The runner uses
        // it for two things: (1) the rAF wrap via settleRaf, (2) caller-
        // supplied assert/action evaluates if any. We execute the function
        // inline. If fn returns a Promise (rAF wrap), the Promise's
        // executor runs synchronously and throws ReferenceError because
        // requestAnimationFrame is not defined in Node — we attach a
        // .catch() so Node doesn't flag the rejection as unhandled at exit.
        evaluate: async (fn, ...args) => {
            let result;
            try { result = fn(...args); } catch (_) { return undefined; }
            if (result && typeof result.then === 'function') {
                // Mark the rejection handled BEFORE returning so Node's
                // unhandledRejection handler doesn't crash the test
                // process at exit. We deliberately don't await — the
                // runner only cares that "some settle completed", and
                // the stub has no animation frame to wait for.
                result.catch(() => {});
                return undefined;
            }
            return result;
        },
        waitForTimeout: async (_ms) => {},
        screenshot: async () => {},
    };
}

(async () => {
    // ---- 1. Happy path ----------------------------------------------------
    {
        const page = makeStubPage();
        const actions = [];
        const r = await runFlow(page, [
            { name: 'a', action: async () => actions.push('a'), assert: async () => true, settle: null },
            { name: 'b', action: async () => actions.push('b'), assert: async () => true, settle: null },
        ]);
        if (!r.passed) fail('happy', `expected pass, got ${JSON.stringify(r)}`);
        if (r.failedAt !== null) fail('happy', `expected failedAt=null, got ${r.failedAt}`);
        if (r.stepLog.length !== 2) fail('happy', `expected 2 stepLog entries, got ${r.stepLog.length}`);
        if (!r.stepLog.every(s => s.ok)) fail('happy', `every step should be ok`);
        if (actions.join(',') !== 'a,b') fail('happy', `actions ran in wrong order: ${actions}`);
    }

    // ---- 2. Halt on throw in assert ---------------------------------------
    {
        const page = makeStubPage();
        let stepThreeRan = false;
        const r = await runFlow(page, [
            { name: 'ok', action: async () => {}, assert: async () => true, settle: null },
            { name: 'boom', action: async () => {}, assert: async () => { throw new Error('boom-msg'); }, settle: null },
            { name: 'never', action: async () => { stepThreeRan = true; }, assert: async () => true, settle: null },
        ]);
        if (r.passed) fail('throw-halt', `expected fail`);
        if (r.failedAt !== 1) fail('throw-halt', `expected failedAt=1, got ${r.failedAt}`);
        if (!r.error || !/boom-msg/.test(r.error.message)) {
            fail('throw-halt', `expected error.message to contain 'boom-msg', got ${r.error?.message}`);
        }
        if (stepThreeRan) fail('throw-halt', `step 3 should not have run after step 2 failed`);
        if (r.stepLog.length !== 2) fail('throw-halt', `expected 2 stepLog entries (steps 0+1), got ${r.stepLog.length}`);
    }

    // ---- 3. Halt on falsy assert (timeout) --------------------------------
    {
        const page = makeStubPage();
        const t0 = Date.now();
        const r = await runFlow(page, [
            { name: 'falsy', action: async () => {}, assert: async () => false, settle: null, timeoutMs: 60 },
        ]);
        const elapsed = Date.now() - t0;
        if (r.passed) fail('falsy-assert', `expected fail on falsy assert`);
        if (r.failedAt !== 0) fail('falsy-assert', `expected failedAt=0`);
        if (elapsed > 1000) fail('falsy-assert', `should bail after timeoutMs=60, took ${elapsed}ms`);
    }

    // ---- 4. Eventual pass -------------------------------------------------
    {
        const page = makeStubPage();
        let polls = 0;
        const r = await runFlow(page, [
            { name: 'eventual', action: async () => {}, assert: async () => ++polls >= 3, settle: null, timeoutMs: 5000 },
        ]);
        if (!r.passed) fail('eventual', `expected pass after polls; got ${JSON.stringify(r)}`);
        if (polls < 3) fail('eventual', `expected polls>=3, got ${polls}`);
    }

    // ---- 5. Action that throws halts the runner ---------------------------
    {
        const page = makeStubPage();
        let stepTwoRan = false;
        const r = await runFlow(page, [
            { name: 'throws', action: async () => { throw new Error('action-fail'); }, assert: async () => true, settle: null },
            { name: 'never', action: async () => { stepTwoRan = true; }, assert: async () => true, settle: null },
        ]);
        if (r.passed) fail('action-throw', `expected fail`);
        if (r.failedAt !== 0) fail('action-throw', `expected failedAt=0, got ${r.failedAt}`);
        if (!r.error || !/action-fail/.test(r.error.message)) {
            fail('action-throw', `expected error.message to contain 'action-fail', got ${r.error?.message}`);
        }
        if (stepTwoRan) fail('action-throw', `step 2 should not have run after step 1 action threw`);
    }

    // ---- 6. Empty steps array returns trivially-passed --------------------
    {
        const page = makeStubPage();
        const r = await runFlow(page, []);
        if (!r.passed) fail('empty', `empty step list should pass trivially`);
        if (r.stepLog.length !== 0) fail('empty', `empty step list should produce empty stepLog`);
    }

    // ---- 7. Default-settle ('rAF') invokes page.evaluate exactly once -----
    // Exercises the rAF branch through the stub (the previous 6 cases all
    // explicitly passed settle:null, leaving the runner's default-settle
    // path uncovered). The stub records every evaluate() call so we can
    // assert the rAF wrap fires per step.
    {
        const page = makeStubPage();
        page.evaluateCalls = 0;
        const baseEvaluate = page.evaluate;
        page.evaluate = async (...args) => { page.evaluateCalls++; return baseEvaluate(...args); };
        const r = await runFlow(page, [
            // No `settle` field → default to 'rAF' per the runner contract.
            { name: 'raf-default', action: async () => {}, assert: async () => true },
        ]);
        if (!r.passed) fail('raf-default', `expected pass, got ${JSON.stringify(r)}`);
        if (page.evaluateCalls !== 1) {
            fail('raf-default', `expected exactly 1 evaluate() call (the rAF wrap), got ${page.evaluateCalls}`);
        }
    }

    console.log('PASS — runFlow unit smoke clean (7/7 cases)');
})();
