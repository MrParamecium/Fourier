import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

fig, ax = plt.subplots(figsize=(9, 6))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')
fig.patch.set_facecolor('white')

# Main flow boxes
steps = [
    ("1. Factor Denominator", "Write denominator as product\nof irreducible factors"),
    ("2. Write All PF Terms", "One term per factor;\ntwo terms per repeated factor"),
    ("3. Clear Fractions", "Multiply both sides by\nthe full denominator"),
    ("4. Collect Like Powers", "Expand RHS; group\ncoefficients of each power of x"),
    ("5. Equate & Solve", "Match coefficients of x\u207f\nto build and solve linear system"),
]

box_x = 1.0
box_w = 5.2
box_h = 1.1
gap = 0.38
total_h = len(steps) * box_h + (len(steps) - 1) * gap
start_y = (10 - total_h) / 2 + total_h

colors_main = ['#dce8f5', '#dce8f5', '#dce8f5', '#dce8f5', '#d5ecd4']
border_colors = ['#3a7abf', '#3a7abf', '#3a7abf', '#3a7abf', '#3a9e4e']

box_tops = []
for i, (title, sub) in enumerate(steps):
    y_top = start_y - i * (box_h + gap)
    box_tops.append(y_top)
    rect = FancyBboxPatch((box_x, y_top - box_h), box_w, box_h,
                          boxstyle="round,pad=0.07",
                          linewidth=1.6,
                          edgecolor=border_colors[i],
                          facecolor=colors_main[i])
    ax.add_patch(rect)
    ax.text(box_x + box_w / 2, y_top - box_h * 0.32, title,
            ha='center', va='center', fontsize=10.5, fontweight='bold', color='#1a1a2e')
    ax.text(box_x + box_w / 2, y_top - box_h * 0.72, sub,
            ha='center', va='center', fontsize=8.5, color='#333355', style='italic')

# Arrows between boxes
for i in range(len(steps) - 1):
    y_start = box_tops[i] - box_h
    y_end = box_tops[i + 1]
    ax.annotate('', xy=(box_x + box_w / 2, y_end),
                xytext=(box_x + box_w / 2, y_start),
                arrowprops=dict(arrowstyle='->', color='#555577', lw=1.8))

# Side note box
note_x = 6.8
note_y_top = 7.8
note_w = 2.9
note_h = 2.6
note_rect = FancyBboxPatch((note_x, note_y_top - note_h), note_w, note_h,
                            boxstyle="round,pad=0.1",
                            linewidth=1.8,
                            edgecolor='#c0392b',
                            facecolor='#fdf0ee')
ax.add_patch(note_rect)
ax.text(note_x + note_w / 2, note_y_top - 0.28,
        'REPEATED FACTOR RULE',
        ha='center', va='center', fontsize=8.5, fontweight='bold', color='#c0392b')
ax.text(note_x + note_w / 2, note_y_top - 0.82,
        r'$(x+a)^2$ requires:',
        ha='center', va='center', fontsize=9, color='#1a1a2e')
ax.text(note_x + note_w / 2, note_y_top - 1.32,
        r'$\frac{A}{x+a}$  +  $\frac{B}{(x+a)^2}$',
        ha='center', va='center', fontsize=10.5, color='#c0392b', fontweight='bold')
ax.text(note_x + note_w / 2, note_y_top - 1.88,
        'Never just one term!',
        ha='center', va='center', fontsize=8.5, color='#555555', style='italic')
ax.text(note_x + note_w / 2, note_y_top - 2.32,
        'Missing a term ruins\nall later algebra.',
        ha='center', va='center', fontsize=8, color='#888888')

# Connector arrow from step 2 to side note
ax.annotate('', xy=(note_x, note_y_top - note_h / 2),
            xytext=(box_x + box_w, box_tops[1] - box_h / 2),
            arrowprops=dict(arrowstyle='->', color='#c0392b', lw=1.4,
                            connectionstyle='arc3,rad=-0.2'))

ax.set_title('Clearing Fractions — Exam Procedure Map', fontsize=13, fontweight='bold',
             color='#1a1a2e', pad=10)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777195528690-inf8c7d1.png", dpi=150, bbox_inches="tight")