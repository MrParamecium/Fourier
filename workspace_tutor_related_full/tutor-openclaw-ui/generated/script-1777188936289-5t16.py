import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch

fig, ax = plt.subplots(figsize=(13, 4))
ax.set_xlim(0, 13)
ax.set_ylim(0, 4)
ax.axis('off')
fig.patch.set_facecolor('white')

box_positions = [0.3, 3.5, 6.7, 9.9]
box_width = 2.8
box_height = 2.8
box_y = 0.6

colors = ['#E8F4FD', '#FEF9E7', '#E8F8F5', '#FDEDEC']
border_colors = ['#2980B9', '#D4AC0D', '#1ABC9C', '#E74C3C']

titles = [
    'Step 1\nFactor & Set Up Template',
    'Step 2\nHandle Repeated Factors',
    'Step 3\nClear All Denominators',
    'Step 4\nMatch Coefficients & Solve'
]

body_lines = [
    ['Write one term per\ndistinct factor power.'],
    ['For $(x+3)^2$, include:\n$\\dfrac{k_3}{x+3}+\\dfrac{k_4}{(x+3)^2}$\n\n(denominator: $(x+1)(x+2)(x+3)^2$)'],
    ['Multiply both sides by\n$(x+1)(x+2)(x+3)^2$.\nResult: polynomial = polynomial.'],
    ['Equate coefficients of\n$x^3,\\, x^2,\\, x,\\, $ const.\nSolve the 4-equation system.']
]

for i, (xpos, color, border, title, body) in enumerate(zip(box_positions, colors, border_colors, titles, body_lines)):
    rect = mpatches.FancyBboxPatch(
        (xpos, box_y), box_width, box_height,
        boxstyle='round,pad=0.08',
        linewidth=2, edgecolor=border, facecolor=color
    )
    ax.add_patch(rect)

    ax.text(xpos + box_width / 2, box_y + box_height - 0.28, title,
            ha='center', va='top', fontsize=9.5, fontweight='bold', color=border,
            multialignment='center')

    ax.plot([xpos + 0.15, xpos + box_width - 0.15],
            [box_y + box_height - 0.62, box_y + box_height - 0.62],
            color=border, linewidth=1.0, alpha=0.6)

    for j, line in enumerate(body):
        ax.text(xpos + box_width / 2, box_y + box_height - 0.85 - j * 0.55, line,
                ha='center', va='top', fontsize=8.2, color='#2C3E50',
                multialignment='center')

for i in range(3):
    x_start = box_positions[i] + box_width + 0.02
    x_end = box_positions[i + 1] - 0.02
    y_mid = box_y + box_height / 2
    ax.annotate('', xy=(x_end, y_mid), xytext=(x_start, y_mid),
                arrowprops=dict(arrowstyle='->', color='#555555', lw=2.0))

ax.set_title('Method of Clearing Fractions — Four-Step Workflow', fontsize=12, fontweight='bold',
             color='#2C3E50', pad=10)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777188936289-ssq8vsdk.png", dpi=150, bbox_inches="tight")