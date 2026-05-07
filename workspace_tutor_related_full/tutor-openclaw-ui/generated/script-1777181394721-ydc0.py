import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch

fig, ax = plt.subplots(figsize=(9, 3.2))
ax.set_xlim(0, 10)
ax.set_ylim(0, 4)
ax.axis('off')
fig.patch.set_facecolor('white')

# Box definitions: (x_center, y_center, width, height, label_lines)
boxes = [
    (1.1, 2.0, 1.9, 1.1, ["Write partial-", "fraction form"]),
    (3.6, 2.0, 2.0, 1.1, ["Cover-up:", "find k and a\u2080"]),
    (6.1, 2.0, 1.9, 1.1, ["Only a\u2081, a\u2082", "remain"]),
    (8.6, 2.0, 1.9, 1.1, ["Clear fractions", "or shortcut"])
]

box_color = '#EEF4FB'
border_color = '#2A6EBB'

for (cx, cy, w, h, lines) in boxes:
    rect = mpatches.FancyBboxPatch(
        (cx - w/2, cy - h/2), w, h,
        boxstyle="round,pad=0.08",
        linewidth=1.8,
        edgecolor=border_color,
        facecolor=box_color
    )
    ax.add_patch(rect)
    for i, line in enumerate(lines):
        offset = 0.18 if len(lines) == 2 else 0
        y_pos = cy + offset - i * 0.36
        ax.text(cx, y_pos, line, ha='center', va='center',
                fontsize=9.5, fontweight='bold', color='#1a1a2e')

# Arrows between boxes
arrow_style = dict(arrowstyle='->', color='#2A6EBB', lw=2.0,
                   mutation_scale=18)
for x_start, x_end in [(2.06, 2.60), (4.61, 5.15), (7.06, 7.65)]:
    ax.annotate('', xy=(x_end, 2.0), xytext=(x_start, 2.0),
                arrowprops=arrow_style)

# Note under last box
ax.text(8.6, 1.22,
        "Equate only needed coefficients;\nextra equations are a check.",
        ha='center', va='top', fontsize=7.8, color='#444444',
        style='italic')

ax.set_title("Mixed Method: Order of Attack",
             fontsize=12, fontweight='bold', color='#1a1a2e', pad=10)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777181394721-7y8e1ex9.png", dpi=150, bbox_inches="tight")