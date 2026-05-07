import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

fig, ax = plt.subplots(figsize=(7, 10))
ax.set_xlim(0, 10)
ax.set_ylim(0, 12)
ax.axis('off')
fig.patch.set_facecolor('white')

steps = [
    ("Step 1", "Factor denominator and\nwrite partial-fraction form"),
    ("Step 2", "Multiply both sides by\nthe common denominator"),
    ("Step 3", "Expand and collect\npowers of x"),
    ("Step 4", "Equate coefficients\nof like powers"),
    ("Step 5", "Solve for constants and\nwrite final answer"),
]

box_width = 7.0
box_height = 1.3
box_x = 1.5
gap = 0.55
total_height = len(steps) * (box_height + gap) - gap
start_y = (12 - total_height) / 2 + total_height

colors = ['#1a6faf', '#1a6faf', '#1a6faf', '#1a6faf', '#1a6faf']

for i, (label, text) in enumerate(steps):
    y = start_y - i * (box_height + gap)
    box = FancyBboxPatch(
        (box_x, y - box_height),
        box_width, box_height,
        boxstyle="round,pad=0.12",
        linewidth=1.5,
        edgecolor='#0d4a7a',
        facecolor=colors[i],
        zorder=2
    )
    ax.add_patch(box)
    ax.text(
        box_x + 0.55, y - box_height / 2,
        label,
        fontsize=11, fontweight='bold',
        color='#ffe066',
        va='center', ha='left',
        zorder=3
    )
    ax.text(
        box_x + 2.3, y - box_height / 2,
        text,
        fontsize=10.5,
        color='white',
        va='center', ha='left',
        zorder=3
    )
    if i < len(steps) - 1:
        arrow_x = box_x + box_width / 2
        arrow_y_start = y - box_height - 0.04
        arrow_y_end = y - box_height - gap + 0.04
        ax.annotate(
            '',
            xy=(arrow_x, arrow_y_end),
            xytext=(arrow_x, arrow_y_start),
            arrowprops=dict(
                arrowstyle='->', color='#0d4a7a',
                lw=2.0
            ),
            zorder=4
        )

ax.set_title(
    'Method of Clearing Fractions — Step-by-Step',
    fontsize=13, fontweight='bold',
    color='#0d4a7a', pad=10
)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777181281495-hiotidrr.png", dpi=150, bbox_inches="tight")