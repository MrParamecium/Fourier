with open('tutor-openclaw-ui/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if line.strip() == '#introLanding.intro-landing {':
        pass
    new_lines.append(line)

with open('tutor-openclaw-ui/style.css', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
