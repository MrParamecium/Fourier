# Multi-session (ChatGPT-style conversations)

Tracks the work for [#16](https://github.com/MrParamecium/Fourier/issues/16): replace the
single-active-conversation + localStorage "Recent" archive with real, switchable,
server-persisted sessions.

## Why the old "Recent" panel is not multi-session

The `Recent` panel is the client-only `tutorRecentSessions` localStorage archive. It can
save and restore conversations, but `tutorState` holds exactly **one** live conversation:
selecting a Recent item *overwrites* that single global (after auto-saving the current one).
There is no "New chat" entry point, identity is timestamp-derived, and persistence is
client-only/single-device. So it's "one live slot + a frozen archive", not multi-session.

## Approach (Path A — like the AI_tutor reference, adapted)

Server-persisted sessions with stable ids, scoped by the existing `uid` (no new auth).
A session carries `{ id, uid, origin, title, sectionId, sectionTitle, createdAt, updatedAt,
messages:[{role, content, ts}] }`. The chat endpoint accepts and returns a `session_id`
(create on the first turn, append after); list / get / delete via REST.

## Storage decision (READ THIS before changing the backend)

Sessions are stored **file-based**, one JSON file per session under
`app/users/sessions/<uid>/<sessionId>.json`, mirroring the existing per-uid `memory` store.
All access goes through a **thin interface** in `app/ws-bridge.js`
(`listSessionsForUid`, `readSessionFile`, `persistSessionTurn`, `deleteSessionForUid`, …),
so the storage layer can be swapped for a database later without touching the routes.

**Tradeoff — not durable across redeploys (yet).** The backend host (Render) has an
**ephemeral filesystem**: anything written under `app/users/` at runtime is lost on redeploy
or restart (the existing `memory` store already has this property). Files do **not** blow up
memory — data lives on disk and is read one session at a time — but they are not durable.

For durable, cross-deploy, cross-device persistence, swap the thin interface for a real store
(e.g. a hosted MongoDB, which is exactly what the AI_tutor reference uses), or mount a Render
persistent disk. Deferred on purpose; not in the v1 scope below.

**Concurrency caveat.** `persistSessionTurn` is read-modify-write under an atomic `rename`. The
`rename` only prevents a reader from seeing a half-written file — it does **not** prevent two
concurrent appends to the same `session_id` from clobbering each other (the second write reloads
the pre-first-write snapshot, appends to that, and renames over the first write's result). For
the single-user app this is unlikely to fire in practice; a real fix (per-session in-process mutex
or moving to a DB with an atomic append) is left to Phase 2/3. Don't let lesson-mode or a future
multi-tab UI ship without revisiting this.

## Scope

- **v1: main Q&A only.** Lesson-mode (`origin: "learn"`) sessions come later.
- Sessions scoped by `uid` (single browser/guest identity, same as `memory`).
  Tying `uid` to a Clerk account for true cross-device is a separate effort — not in v1.
- **No migration** of the old localStorage `tutorRecentSessions`; start fresh.

## Phases (one PR each)

1. **Backend** (this) — storage interface + `GET /api/sessions`, `GET /api/sessions/:id`,
   `DELETE /api/sessions/:id`, and `/api/ask` accepting/returning `session_id`.
   Note: until Phase 2 wires the frontend to send `session_id`, every `/api/ask` call
   creates a new session (no append) — expected.
2. **Frontend core** — an `activeSessionId` model, send/adopt `session_id`, a "New chat"
   button, select-to-load from the server, server-driven conversation list.
3. **Polish** — rename / star / delete, date grouping, lesson-mode sessions.
