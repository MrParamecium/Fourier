import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, ax = plt.subplots(figsize=(13, 5))
ax.set_xlim(0, 14)
ax.set_ylim(0, 4)
ax.axis('off')
fig.patch.set_facecolor('white')

stages = [
    ('Natural\nNumbers', 'Counting\nwhole objects', 1.2),
    ('Fractions', 'Measurement\n& division', 3.4),
    ('Irrational\nNumbers', 'Unit-square\ndiagonal', 5.6),
    ('Negative\nNumbers', 'Equations &\nbookkeeping', 7.8),
    ('Complex\nNumbers', 'Square root\nof negatives', 10.0),
]

colors = ['#4A90D9', '#5BA85A', '#E8A838', '#D95B5B', '#8E5BB5']

for i, (label, trigger, x) in enumerate(stages):
    circle = plt.Circle((x, 2.2), 0.72, color=colors[i], zorder=3)
    ax.add_patch(circle)
    ax.text(x, 2.2, label, ha='center', va='center', fontsize=8.5,
            fontweight='bold', color='white', zorder=4, linespacing=1.4)
    ax.text(x, 0.85, trigger, ha='center', va='center', fontsize=7.8,
            color='#444444', linespacing=1.4,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#F5F5F5',
                      edgecolor='#CCCCCC', linewidth=0.8))
    ax.annotate('', xy=(x, 1.3), xytext=(x, 1.55),
                arrowprops=dict(arrowstyle='->', color='#888888', lw=1.2))

for i in range(len(stages) - 1):
    x_start = stages[i][2] + 0.72
    x_end = stages[i+1][2] - 0.72
    ax.annotate('', xy=(x_end, 2.2), xytext=(x_start, 2.2),
                arrowprops=dict(arrowstyle='->', color='#555555', lw=1.8))

ax.text(7.0, 3.72, 'Historical Expansion of the Number System',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#222222')

ax.text(7.0, 0.18, 'Each expansion was triggered by a problem the previous system could not solve.',
        ha='center', va='center', fontsize=8.5, color='#666666', style='italic')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777189318623-av1y1058.png", dpi=150, bbox_inches="tight")