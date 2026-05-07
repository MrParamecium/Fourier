import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch
import numpy as np

fig, ax = plt.subplots(figsize=(14, 4))
ax.set_xlim(0, 14)
ax.set_ylim(0, 4)
ax.axis('off')
fig.patch.set_facecolor('white')

boxes = [
    {'label': 'Natural\nNumbers', 'trigger': 'counting', 'x': 1.0},
    {'label': 'Fractions', 'trigger': 'measurement', 'x': 3.8},
    {'label': 'Irrational\nNumbers', 'trigger': r'$\sqrt{2}$ not a fraction', 'x': 6.6},
    {'label': 'Negative\nNumbers', 'trigger': r'$x + 5 = 0$', 'x': 9.4},
    {'label': 'Complex\nNumbers', 'trigger': r'$x^2 + 1 = 0$', 'x': 12.2},
]

box_width = 1.9
box_height = 1.1
box_y = 1.8

for i, box in enumerate(boxes):
    cx = box['x']
    rect = mpatches.FancyBboxPatch(
        (cx - box_width / 2, box_y - box_height / 2),
        box_width, box_height,
        boxstyle='round,pad=0.08',
        linewidth=1.5,
        edgecolor='#2c5f8a',
        facecolor='#ddeeff'
    )
    ax.add_patch(rect)
    ax.text(cx, box_y + 0.05, box['label'],
            ha='center', va='center',
            fontsize=10, fontweight='bold', color='#1a1a2e')
    ax.text(cx, box_y - 0.72, box['trigger'],
            ha='center', va='center',
            fontsize=8.5, color='#444466', style='italic')

for i in range(len(boxes) - 1):
    x_start = boxes[i]['x'] + box_width / 2 + 0.05
    x_end = boxes[i + 1]['x'] - box_width / 2 - 0.05
    ax.annotate('',
        xy=(x_end, box_y),
        xytext=(x_start, box_y),
        arrowprops=dict(
            arrowstyle='->', color='#2255aa',
            lw=2.0
        )
    )

ax.text(7.0, 3.55, 'Expansion of the Number System — Each Step Driven by Necessity',
        ha='center', va='center', fontsize=11, fontweight='bold', color='#1a1a2e')

ax.text(7.0, 0.35, 'Trigger problem shown below each box',
        ha='center', va='center', fontsize=8, color='#888888', style='italic')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777184308630-68v4pb6x.png", dpi=150, bbox_inches="tight")