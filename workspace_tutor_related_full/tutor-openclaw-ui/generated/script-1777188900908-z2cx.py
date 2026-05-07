import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, ax = plt.subplots(figsize=(12, 4))
ax.set_xlim(0, 10)
ax.set_ylim(0, 3)
ax.axis('off')
fig.patch.set_facecolor('white')

milestones = [
    (1.5, 'Fractions', 'Needed for\nmeasurement\n& division'),
    (3.8, 'Irrational\nNumbers', 'Diagonal of\nunit square\n(e.g. \u221a2)'),
    (6.2, 'Negative\nNumbers', 'Equations like\n\u03b1 + 5 = 0\n(bookkeeping)'),
    (8.5, 'Complex\nNumbers', 'Equations like\n\u03b1\u00b2 + 1 = 0\n(\u221a\u22121 needed)')
]

colors = ['#4A90D9', '#5BAD6F', '#E8A838', '#C0392B']

for i, (x, title, subtitle) in enumerate(milestones):
    circle = plt.Circle((x, 1.7), 0.38, color=colors[i], zorder=3)
    ax.add_patch(circle)
    ax.text(x, 1.7, str(i+1), ha='center', va='center', fontsize=14,
            fontweight='bold', color='white', zorder=4)
    ax.text(x, 1.05, title, ha='center', va='top', fontsize=10,
            fontweight='bold', color='#222222')
    ax.text(x, 0.55, subtitle, ha='center', va='top', fontsize=8,
            color='#555555', linespacing=1.4)

for i in range(len(milestones) - 1):
    x_start = milestones[i][0] + 0.4
    x_end = milestones[i+1][0] - 0.4
    ax.annotate('', xy=(x_end, 1.7), xytext=(x_start, 1.7),
                arrowprops=dict(arrowstyle='->', color='#888888', lw=2))

ax.text(5.0, 2.75, 'The Number System Expands — Each Step Solves a New Problem',
        ha='center', va='center', fontsize=12, fontweight='bold', color='#222222')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777188900908-lz8f0hp9.png", dpi=150, bbox_inches="tight")