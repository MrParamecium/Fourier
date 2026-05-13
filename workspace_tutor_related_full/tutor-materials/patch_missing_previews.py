#!/usr/bin/env python3
"""
Patch missing section previews for syllabus keys not in new-book-previews.json.
For each missing key, find the closest existing entry or generate from scratch.
"""
import json, os, re, ssl
try:
    import requests as _requests
    USE_REQUESTS = True
except ImportError:
    import urllib.request
    USE_REQUESTS = False

API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
MODEL = "anthropic/claude-haiku-4.5"
PREVIEWS_FILE = "tutor-materials/new-book-previews.json"

MISSING_KEYS = [
  ('B.1-1 A Historical Note', 'B.1', 'Complex Numbers', 'The imaginary unit was not always accepted—mathematicians spent centuries arguing over whether √(-1) could exist.'),
  ('B.2-2 Sinusoids in Terms of Exponentials', 'B.2', 'Sinusoids', "Euler's formula e^(jωt) = cos(ωt) + j·sin(ωt) bridges sinusoids and complex exponentials—a cornerstone of signal analysis."),
  ('B.5-2 Heaviside Cover-Up Method', 'B.5', 'Partial Fraction Expansion', "The Heaviside cover-up method is the fastest shortcut for partial fractions with distinct linear factors."),
  ('B.5-4 A Combination of Heaviside and Clearing Fractions', 'B.5', 'Partial Fraction Expansion', "When repeated factors meet the cover-up method, you need a hybrid approach combining differentiation and algebraic clearing."),
  ('B.5-5 Improper F(x) with m=n', 'B.5', 'Partial Fraction Expansion', "When the numerator degree equals the denominator degree, polynomial long division must precede partial fractions."),
  ('B.8 Appendix: Useful Mathematical Formulas', 'B.8', 'Reference formulas', "A compact reference of trigonometric identities, derivative rules, integral tables, and algebraic formulas used throughout the course."),
  ('1.1-1 Signal Energy', '1.1', 'Size of a Signal', "Signal energy quantifies the total 'area under the square' of a signal—the go-to measure for finite-duration signals."),
  ('1.1-2 Signal Power', '1.1', 'Size of a Signal', "Signal power is the time-averaged energy per unit time—used when a signal runs forever and energy would be infinite."),
  ('1.2 Some Useful Signal Operations', '1.2', 'Signal Operations', "Three fundamental time-domain operations—shifting, scaling, and reversal—let you manipulate signals without changing their fundamental shape."),
  ('1.2-4 Combined Operations', '1.2', 'Signal Operations', "Real exam problems rarely apply just one operation. This section drills the correct order when shifting, scaling, and reversing are combined."),
  ('1.3 Classification of Signals', '1.3', 'Classification of Signals', "Not all signals are created equal: continuous vs. discrete, periodic vs. aperiodic, energy vs. power—each classification changes how you analyze them."),
  ('1.3-1 Continuous-Time and Discrete-Time Signals', '1.3', 'Classification', "The dividing line between analog and digital begins here: continuous-time signals are defined at every instant; discrete-time signals only at integer steps."),
  ('1.3-2 Analog and Digital Signals', '1.3', 'Classification', "Analog signals take any amplitude value; digital signals are quantized to a finite set—the distinction that defines modern electronics."),
  ('1.3-4 Energy and Power Signals', '1.3', 'Classification', "Every signal falls into exactly one camp: finite energy (like a pulse) or finite power (like a sinusoid). Knowing which determines your analysis tools."),
  ('1.3-5 Deterministic and Random Signals', '1.3', 'Classification', "Deterministic signals follow a known mathematical rule; random signals require statistical tools. This section marks where classical and probabilistic signal theory diverge."),
  ('1.4 Some Useful Signal Models', '1.4', 'Signal Models', "Unit step, impulse, and complex exponential—three mathematical idealizations that show up in virtually every system analysis problem on exams."),
  ('1.4-3 The Exponential Function e^st', '1.4', 'Signal Models', "The complex exponential e^(st) is the universal input for LTI systems, encoding sinusoids, growing/decaying oscillations, and DC all in one formula."),
  ('1.5 Even and Odd Functions', '1.5', 'Even and Odd Functions', "Any signal can be split into an even part and an odd part—a decomposition that simplifies Fourier analysis and system symmetry arguments."),
  ('1.5-1 Some Properties of Even and Odd Functions', '1.5', 'Even and Odd Functions', "Products and integrals of even/odd functions follow strict rules—knowing them lets you skip half the work on many Fourier transform problems."),
  ('1.7-1 Linear and Nonlinear Systems', '1.7', 'Classification of Systems', "Superposition is the defining property of linear systems—and the reason why LTI analysis works at all. Nonlinearity breaks everything."),
  ('1.7-3 Instantaneous and Dynamic Systems', '1.7', 'Classification of Systems', "An instantaneous system responds only to the present input; a dynamic system has memory. This distinction determines whether differential equations are needed."),
  ('1.7-6 Analog and Digital Systems', '1.7', 'Classification of Systems', "Analog systems process continuous-time signals with physical components; digital systems use discrete samples and arithmetic—both appear on exams."),
]

SYSTEM = """You are writing concise section preview descriptions for a signals and systems textbook tutor app.
Given a section title, context, and hint text, generate TWO descriptions:
1. English (2-3 sentences, student-friendly, explain what this section is about and why it matters for exams)
2. Chinese/Simplified (same content in Chinese)

CRITICAL style rules:
- NEVER start with "Learn", "Master", "Understand", "Discover", "Explore", or any imperative verb
- Use declarative statements, questions, vivid analogies, or direct content descriptions
- Each section should feel distinct, not templated

Also pick ONE emoji that best represents the content.

Respond with ONLY valid JSON:
{"en": "...", "zh": "...", "emoji": "..."}"""

def call_api(system, user):
    payload = json.dumps({
        "model": MODEL,
        "max_tokens": 400,
        "temperature": 0.3,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user}
        ]
    }).encode()
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    if USE_REQUESTS:
        resp = _requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            data=payload, headers=headers, timeout=30, verify=False
        )
        return resp.json()["choices"][0]["message"]["content"].strip()
    else:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        req = urllib.request.Request(
            "https://openrouter.ai/api/v1/chat/completions",
            data=payload, headers=headers
        )
        with urllib.request.urlopen(req, timeout=30, context=ctx) as r:
            data = json.loads(r.read())
        return data["choices"][0]["message"]["content"].strip()

with open(PREVIEWS_FILE) as f:
    results = json.load(f)

import time
for title, section_code, context, hint in MISSING_KEYS:
    if title in results:
        print(f"  ✓ skip {title}")
        continue

    user_prompt = f"""Section: {title}
Context: {context} (part of section {section_code})
Hint: {hint}

Generate preview JSON."""

    try:
        raw = call_api(SYSTEM, user_prompt)
        raw = re.sub(r'^```json\s*', '', raw)
        raw = re.sub(r'\s*```$', '', raw)
        data = json.loads(raw)
        data['refs'] = 1  # minimal
        results[title] = data
        print(f"  ✅ {title}: {data['en'][:80]}")
        with open(PREVIEWS_FILE, 'w') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"  ❌ {title}: {e}")

    time.sleep(0.3)

print(f"\n✅ Done: {len(results)} total entries in {PREVIEWS_FILE}")
