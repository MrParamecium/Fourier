import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch

fig, ax = plt.subplots(figsize=(9, 5))
ax.set_xlim(0, 10)
ax.set_ylim(0, 6)
ax.axis('off')
fig.patch.set_facecolor('white')

# Title
ax.text(5, 5.6, 'Heaviside Cover-Up Pattern', ha='center', va='center',
        fontsize=15, fontweight='bold', color='#1a1a2e')

# Row labels
row_labels = ['Denominator\nFactors', 'Substitute\n(Root)', 'Coefficient']
row_y = [4.2, 2.6, 1.0]
for label, y in zip(row_labels, row_y):
    ax.text(0.7, y, label, ha='center', va='center', fontsize=9,
            color='#555555', style='italic')

# Column data
cols = [
    {'factor': '(x + 1)', 'root': 'x = -1', 'coeff': 'k\u2081', 'x': 3.0, 'color': '#2196F3'},
    {'factor': '(x - 2)', 'root': 'x = 2',  'coeff': 'k\u2082', 'x': 5.5, 'color': '#4CAF50'},
    {'factor': '(x + 3)', 'root': 'x = -3', 'coeff': 'k\u2083', 'x': 8.0, 'color': '#FF5722'},
]

for col in cols:
    cx = col['x']
    c = col['color']

    # Row 1: factor box
    box1 = mpatches.FancyBboxPatch((cx - 0.85, 3.75), 1.7, 0.9,
                                    boxstyle='round,pad=0.1',
                                    linewidth=1.5, edgecolor=c,
                                    facecolor='#f0f8ff')
    ax.add_patch(box1)
    ax.text(cx, 4.2, col['factor'], ha='center', va='center',
            fontsize=12, fontweight='bold', color=c)

    # Row 2: root box
    box2 = mpatches.FancyBboxPatch((cx - 0.85, 2.15), 1.7, 0.9,
                                    boxstyle='round,pad=0.1',
                                    linewidth=1.5, edgecolor=c,
                                    facecolor='#fff8e1')
    ax.add_patch(box2)
    ax.text(cx, 2.6, col['root'], ha='center', va='center',
            fontsize=11, color='#333333')

    # Row 3: coefficient box
    box3 = mpatches.FancyBboxPatch((cx - 0.85, 0.55), 1.7, 0.9,
                                    boxstyle='round,pad=0.1',
                                    linewidth=1.5, edgecolor=c,
                                    facecolor='#f3e5f5')
    ax.add_patch(box3)
    ax.text(cx, 1.0, col['coeff'], ha='center', va='center',
            fontsize=13, fontweight='bold', color=c)

    # Arrow: factor -> root
    ax.annotate('', xy=(cx, 2.15), xytext=(cx, 3.75),
                arrowprops=dict(arrowstyle='->', color=c, lw=1.8))

    # Arrow: root -> coefficient
    ax.annotate('', xy=(cx, 0.55), xytext=(cx, 2.15),
                arrowprops=dict(arrowstyle='->', color=c, lw=1.8))

# Footer note
ax.text(5, 0.1, 'Cover the factor  →  substitute its root  →  get the coefficient',
        ha='center', va='center', fontsize=9.5, color='#444444',
        style='italic',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='#eeeeee', edgecolor='#aaaaaa', lw=1))

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777147965001-2j53b4np.png", dpi=150, bbox_inches="tight")