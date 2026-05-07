import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, ax = plt.subplots(figsize=(13, 4))
ax.set_xlim(-0.5, 10.5)
ax.set_ylim(-1.2, 2.8)
ax.axis('off')
fig.patch.set_facecolor('white')

# Timeline backbone
ax.annotate('', xy=(10.2, 1.0), xytext=(-0.2, 1.0),
            arrowprops=dict(arrowstyle='->', color='#333333', lw=2.0))

# Node positions
nodes = [
    (1.0,  'Natural\nNumbers',   'Counting\nobjects',         '#4C72B0'),
    (3.0,  'Fractions',          'Measurement\n& division',   '#55A868'),
    (5.0,  'Irrational\nNumbers','Diagonal of\nunit square',  '#C44E52'),
    (7.0,  'Negative\nNumbers',  'Solving\n\u03b1 + 5 = 0',   '#8172B2'),
    (9.0,  'Complex\nNumbers',   'Solving\n\u03b1\u00b2 + 1 = 0', '#CCB974'),
]

for x, label, trigger, color in nodes:
    # Circle node on the line
    circle = plt.Circle((x, 1.0), 0.22, color=color, zorder=5)
    ax.add_patch(circle)

    # Label above
    ax.text(x, 1.72, label, ha='center', va='bottom', fontsize=10,
            fontweight='bold', color=color,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='white',
                      edgecolor=color, linewidth=1.2))

    # Trigger phrase below
    ax.text(x, 0.28, trigger, ha='center', va='top', fontsize=8.5,
            color='#444444', style='italic',
            bbox=dict(boxstyle='round,pad=0.25', facecolor='#f9f9f9',
                      edgecolor='#cccccc', linewidth=0.8))

    # Vertical connector from node to label
    ax.plot([x, x], [1.22, 1.68], color=color, lw=1.0, zorder=4)
    # Vertical connector from node to trigger
    ax.plot([x, x], [0.78, 0.32], color=color, lw=1.0, zorder=4)

# Title
ax.text(5.0, 2.65, 'Expansion of the Number System',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#222222')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777184107495-628q57f8.png", dpi=150, bbox_inches="tight")