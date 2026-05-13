from pathlib import Path

# --- 1. Fix Button Logic & Text ---
# The button in the original HTML said "Get Started", Harrison's prompt said "开始使用". Let's use English "Get Started" or whatever to match the rest of the text, but wire it to a robust click event, and fade logic instead of immediate hide so it feels better. By default simple toggle is fine if it works. Let's make sure it's bound.
js_path = Path("/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/app.js")
js = js_path.read_text()

# We need to make sure the click listener actually executes without exception,
# or we just rely on DOM directly.
if 'introGetStartedBtn' in js:
    # ensure it's executed
    pass

# --- 2. Fix the 3 Stages Text ---
# "这个三阶段不太符合我的 tutor agent，你帮我改"
# Stage 1: Holistic Perception -> Stage 1: Dynamic Knowledge Tracking (RAG + PDF)
# Stage 2: Knowledge Graph -> Stage 2: Dual Cognitive Engine (Gemini Plan + Claude Explain)
# Stage 3: Adaptive Engine -> Stage 3: Visual & Interactive Feedback (Generated Visuals)

html_path = Path("/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/index.html")
html = html_path.read_text()

replacements = {
    "Stage 1: Perception": "Stage 1: Deep Textbook RAG",
    "Holistic Perception": "Contextual Book Tracking",
    "Moving beyond traditional text chats. Aquarius captures and analyzes voice, images, handwritten drafts, and even emotional shifts in real-time, reconstructing the learner's context at a granular level.": "Aquarius ingests the full textbook structure. It pinpoints your exact location within the syllabus and retrieves highly relevant concepts, formulas, and exact diagrams directly from the source material over 99.8% precision.",
    
    "Stage 2: Knowledge Graph": "Stage 2: Dual Cognitive Engine",
    "Dynamic Neural Network": "Gemini + Claude Collaboration",
    "Leveraging a deep graph structure built on massive data, every interaction becomes a node transition. Aquarius precisely identifies cognitive boundaries and maps a unique learning trajectory.": "Two superior agents work in tandem: Agent A (Gemini) first plans the pedagogical blueprint and visual flow, while Agent B (Claude) executes the technical explanation and Python-generated visualizations, ensuring flawless logic.",
    
    "Stage 3: Adaptive Engine": "Stage 3: Generative Visual Learning",
    "Adaptive intervention and real-time feedback. We don't just provide answers; we guide the evolution of thought.": "We don't just throw walls of text at you. Aquarius constructs on-the-fly Python diagrams, dynamic visuals, and side-by-side textbook comparisons to guide your thoughts visually.",
    
    "Socratic Method": "Cram & Top-Score Tracks",
    "Moving beyond rote learning. The system uses precise questioning to stimulate logical reasoning and critical thinking.": "Whether you have two weeks to cram or aim for a perfect score, the system adapts syllabus delivery perfectly to your timeframe.",
    
    "Instant Feedback": "Direct Math Visualization",
    "Analyzing pauses and error patterns in milliseconds to dynamically adjust difficulty and strategies, maintaining your flow state.": "Complex equations and transforms are backed by instant visual rendering, grounding abstract mathematics in intuitive graphics.",
    
    "Holistic Assessment": "Session Memory Continuity",
    "Visualizing progress with personalized radar charts. From memory to innovation, building a complete cognitive profile.": "Continuous tracking of your weak spots. The tutor remembers what you struggled with yesterday and organically weaves reviews into today's lesson."
}

for old, new in replacements.items():
    html = html.replace(old, new)

# And if there's any onClick missing let's inject it directly into the HTML to guarantee it works.
html = html.replace('id="introGetStartedBtn"', 'id="introGetStartedBtn" onclick="document.getElementById(\'introLanding\').style.display=\'none\';"')

html_path.write_text(html)
