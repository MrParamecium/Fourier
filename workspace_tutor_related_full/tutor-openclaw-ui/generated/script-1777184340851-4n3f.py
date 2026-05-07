import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, ax = plt.subplots(figsize=(14, 4))
ax.set_xlim(0, 10)
ax.set_ylim(0, 3)
ax.axis('off')
fig.patch.set_facecolor('white')

# Timeline stages
stages = [
    {"x": 1.0, "label": "Natural\nNumbers", "trigger": "Counting", "color": "#4A90D9"},
    {"x": 3.0, "label": "Fractions", "trigger": "Measurement &\ndivision", "color": "#5BA85A"},
    {"x": 5.0, "label": "Irrational\nNumbers", "trigger": r"Diagonal of" + "\nunit square", "color": "#E8A838"},
    {"x": 7.0, "label": "Negative\nNumbers", "trigger": r"Solve $x+5=0$", "color": "#D95B5B"},
    {"x": 9.0, "label": "Complex\nNumbers", "trigger": r"Solve $x^2+1=0$", "color": "#9B59B6"},
]

# Draw arrows between stages
for i in range(len(stages) - 1):
    x_start = stages[i]["x"] + 0.45
    x_end = stages[i + 1]["x"] - 0.45
    ax.annotate(
        "",
        xy=(x_end, 1.85),
        xytext=(x_start, 1.85),
        arrowprops=dict(arrowstyle="->", color="#555555", lw=2.0)
    )

# Draw each stage node
for stage in stages:
    x = stage["x"]
    color = stage["color"]

    # Circle node
    circle = plt.Circle((x, 1.85), 0.38, color=color, zorder=5)
    ax.add_patch(circle)

    # Label above node
    ax.text(x, 2.42, stage["label"], ha='center', va='bottom',
            fontsize=9.5, fontweight='bold', color='#222222',
            multialignment='center')

    # Trigger label below node
    ax.text(x, 1.22, stage["trigger"], ha='center', va='top',
            fontsize=8.2, color='#444444', style='italic',
            multialignment='center')

# Title
ax.text(5.0, 2.88, "Expansion of the Number System",
        ha='center', va='center', fontsize=13, fontweight='bold', color='#111111')

# Bottom label
ax.text(5.0, 0.18, "Each extension was forced by a problem the previous system could not solve.",
        ha='center', va='center', fontsize=9, color='#666666', style='italic')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777184340851-mq585mqe.png", dpi=150, bbox_inches="tight")