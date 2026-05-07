import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

fig, ax = plt.subplots(figsize=(10, 5))
ax.set_xlim(0, 10)
ax.set_ylim(0, 5)
ax.axis('off')
fig.patch.set_facecolor('white')

# Box positions: (x_center, y_center, width, height)
boxes = [
    (1.1, 2.5, 1.8, 1.6),
    (3.5, 2.5, 1.8, 1.6),
    (5.9, 2.5, 1.8, 1.6),
    (8.3, 2.5, 1.8, 1.6),
]

box_titles = [
    '1. Factor denominator\n& write all terms',
    '2. Multiply both sides\nby full denominator',
    '3. Expand & collect\npowers of x',
    '4. Equate coefficients\n& solve system',
]

box_colors = ['#E8F4FD', '#E8F4FD', '#E8F4FD', '#E8F4FD']
border_colors = ['#2980B9', '#2980B9', '#2980B9', '#2980B9']

for i, (cx, cy, w, h) in enumerate(boxes):
    rect = FancyBboxPatch(
        (cx - w/2, cy - h/2), w, h,
        boxstyle='round,pad=0.05',
        linewidth=2,
        edgecolor=border_colors[i],
        facecolor=box_colors[i],
        zorder=2
    )
    ax.add_patch(rect)
    ax.text(
        cx, cy, box_titles[i],
        ha='center', va='center',
        fontsize=9, fontweight='bold',
        color='#1A252F',
        zorder=3,
        multialignment='center'
    )

# Sub-note under Box 1
ax.text(
    1.1, 1.45,
    '(x+3)\u00b2 \u21d2 terms for\n1/(x+3) and 1/(x+3)\u00b2',
    ha='center', va='top',
    fontsize=7.5, color='#2C3E50',
    style='italic',
    zorder=3,
    multialignment='center'
)

# Red warning note near Box 1
warn_x, warn_y = 1.1, 4.35
warn_rect = FancyBboxPatch(
    (warn_x - 0.88, warn_y - 0.22), 1.76, 0.44,
    boxstyle='round,pad=0.04',
    linewidth=1.5,
    edgecolor='#C0392B',
    facecolor='#FDEDEC',
    zorder=4
)
ax.add_patch(warn_rect)
ax.text(
    warn_x, warn_y,
    'Common trap: missing\na repeated-factor term',
    ha='center', va='center',
    fontsize=7.5, color='#C0392B',
    fontweight='bold',
    zorder=5,
    multialignment='center'
)

# Dashed arrow from warning to Box 1
ax.annotate(
    '',
    xy=(1.1, 3.31),
    xytext=(1.1, 4.13),
    arrowprops=dict(
        arrowstyle='->', color='#C0392B',
        lw=1.5, linestyle='dashed'
    ),
    zorder=5
)

# Arrows between boxes
arrow_y = 2.5
for i in range(3):
    x_start = boxes[i][0] + boxes[i][2]/2 + 0.04
    x_end = boxes[i+1][0] - boxes[i+1][2]/2 - 0.04
    ax.annotate(
        '',
        xy=(x_end, arrow_y),
        xytext=(x_start, arrow_y),
        arrowprops=dict(
            arrowstyle='->', color='#2C3E50',
            lw=2.0
        ),
        zorder=3
    )

ax.set_title(
    'Clearing-Fractions Method: 4-Step Workflow',
    fontsize=12, fontweight='bold', color='#1A252F', pad=10
)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777181397501-bp232nks.png", dpi=150, bbox_inches="tight")