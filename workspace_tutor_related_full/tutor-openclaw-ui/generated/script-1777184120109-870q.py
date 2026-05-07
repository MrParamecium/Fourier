import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, ax = plt.subplots(figsize=(13, 4))
ax.set_xlim(0, 10)
ax.set_ylim(0, 2.8)
ax.axis('off')
fig.patch.set_facecolor('white')

# Timeline data
stages = [
    {"x": 1.0, "label": "Natural\nNumbers", "trigger": "Counting objects", "color": "#4A90D9"},
    {"x": 3.0, "label": "Fractions", "trigger": "Measuring land\n& weight", "color": "#5BA85A"},
    {"x": 5.0, "label": "Irrational\nNumbers", "trigger": "Diagonal of\nunit square", "color": "#E8A838"},
    {"x": 7.0, "label": "Negative\nNumbers", "trigger": "Solving\nx + 5 = 0", "color": "#D95B5B"},
    {"x": 9.0, "label": "Complex\nNumbers", "trigger": "Solving\nx\u00b2 + 1 = 0", "color": "#9B59B6"},
]

# Draw horizontal arrow baseline
ax.annotate("", xy=(9.7, 1.4), xytext=(0.3, 1.4),
            arrowprops=dict(arrowstyle="->", color="#333333", lw=2.0))

# Draw each stage
for s in stages:
    x = s["x"]
    color = s["color"]

    # Circle node
    circle = plt.Circle((x, 1.4), 0.22, color=color, zorder=5)
    ax.add_patch(circle)

    # Label above
    ax.text(x, 2.05, s["label"], ha='center', va='bottom',
            fontsize=9.5, fontweight='bold', color=color,
            multialignment='center')

    # Vertical connector above
    ax.plot([x, x], [1.62, 1.95], color=color, lw=1.2, zorder=4)

    # Trigger phrase below
    ax.text(x, 0.75, s["trigger"], ha='center', va='top',
            fontsize=8.2, color='#444444', style='italic',
            multialignment='center')

    # Vertical connector below
    ax.plot([x, x], [1.18, 0.88], color=color, lw=1.2, zorder=4, linestyle='dashed')

# Connecting arrows between nodes
for i in range(len(stages) - 1):
    x1 = stages[i]["x"] + 0.23
    x2 = stages[i+1]["x"] - 0.23
    ax.annotate("", xy=(x2, 1.4), xytext=(x1, 1.4),
                arrowprops=dict(arrowstyle="->", color="#888888", lw=1.4))

# Title
ax.text(5.0, 2.72, "Expansion of the Number System",
        ha='center', va='top', fontsize=13, fontweight='bold', color='#222222')

# Bottom label
ax.text(5.0, 0.08, "Each expansion was forced by a problem the previous numbers could not solve.",
        ha='center', va='bottom', fontsize=8.5, color='#666666', style='italic')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777184120109-m70nmhez.png", dpi=150, bbox_inches="tight")