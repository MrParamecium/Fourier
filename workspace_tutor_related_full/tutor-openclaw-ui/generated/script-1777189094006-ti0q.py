import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, ax = plt.subplots(figsize=(14, 5))
ax.set_xlim(-0.5, 4.5)
ax.set_ylim(-1.8, 2.2)
ax.axis('off')
fig.patch.set_facecolor('white')

stages = [
    ('Natural\nNumbers', 'Counting\nobjects', '#4A90D9'),
    ('Fractions', 'Measuring\ncontinuous\nquantities', '#5BA85A'),
    ('Irrational\nNumbers', 'Diagonal of\nunit square\n(\u221a2)', '#E8A838'),
    ('Negative\nNumbers', 'Solving\nx + 5 = 0', '#D95B5B'),
    ('Complex\nNumbers', 'Solving\nx\u00b2 + 1 = 0', '#8B5BD9'),
]

for i, (label, trigger, color) in enumerate(stages):
    circle = plt.Circle((i, 0.5), 0.38, color=color, zorder=3)
    ax.add_patch(circle)
    ax.text(i, 0.5, str(i + 1), ha='center', va='center',
            fontsize=16, fontweight='bold', color='white', zorder=4)
    ax.text(i, 1.15, label, ha='center', va='bottom',
            fontsize=10, fontweight='bold', color='#222222',
            multialignment='center')
    bbox_props = dict(boxstyle='round,pad=0.3', facecolor='#F5F5F5',
                      edgecolor=color, linewidth=1.5)
    ax.text(i, -0.35, trigger, ha='center', va='top',
            fontsize=8.5, color='#444444', multialignment='center',
            bbox=bbox_props)

for i in range(len(stages) - 1):
    ax.annotate('', xy=(i + 0.62, 0.5), xytext=(i + 0.38, 0.5),
                arrowprops=dict(arrowstyle='->', color='#888888',
                                lw=2.0))

ax.text(2, 2.05, 'Expansion of the Number System',
        ha='center', va='top', fontsize=13, fontweight='bold', color='#111111')

ax.plot([-0.5, 4.5], [0.5, 0.5], color='#CCCCCC', lw=1.0, zorder=1, linestyle='--')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777189094006-ioijact9.png", dpi=150, bbox_inches="tight")