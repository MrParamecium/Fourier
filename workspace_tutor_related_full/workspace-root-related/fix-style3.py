with open('tutor-openclaw-ui/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make sure `.learn-chat-col` doesn't have a stray max-width:420px;
css = css.replace("max-width: 420px; /* or fixed limit */", "max-width: none;")    
# Harrison said "右边还有一大片空白". The main container holds left (textbook) and right (chat). 
# If the main window is very wide, the app-width might be capped.
# Let's check `max-width` on `.main` or `.app` wrapper to expand rightwards if possible.
css = css.replace("max-width: 1400px;", "max-width: none;") 
css = css.replace('.app:not(.landing)', '.app:not(.landing) { max-width: 1800px; margin: 0 auto; }')

# We'll just let `.learn-chat-col { flex: 1; min-width: 320px; }` take up all the slack.

with open('tutor-openclaw-ui/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
