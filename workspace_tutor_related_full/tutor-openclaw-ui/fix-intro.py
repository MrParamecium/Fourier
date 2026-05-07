with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Make always show
js = js.replace("""function shouldShowIntroLanding() {
  try {
    if (localStorage.getItem(INTRO_LANDING_SEEN_KEY) === '1') return false;
  } catch (e) {}
  return true;
}""", """function shouldShowIntroLanding() {
  return true;
}""")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
