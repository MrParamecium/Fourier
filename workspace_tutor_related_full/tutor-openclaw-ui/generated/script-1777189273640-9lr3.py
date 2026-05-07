import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, ax = plt.subplots(figsize=(13, 4.5))
ax.set_xlim(0, 12)
ax.set_ylim(-1.2, 2.8)
ax.axis('off')
fig.patch.set_facecolor('white')

# Timeline backbone
ax.annotate('', xy=(11.2, 1.0), xytext=(0.5, 1.0),
            arrowprops=dict(arrowstyle='->', color='#333333', lw=2.0))

milestones = [
    (1.5,  'Fractions',          'Measuring continuous\nquantities (e.g. half a length)'),
    (4.0,  'Irrational Numbers', 'Diagonal of unit square\ncannot be written as a ratio'),
    (6.8,  'Negative Numbers',   'Solving equations like\n\\(x + 5 = 0\\)'),
    (9.8,  'Complex Numbers',    'Solving equations like\n\\(x^2 = -1\\); simplifying\nreal-number problems'),
]

colors = ['#4C72B0', '#55A868', '#C44E52', '#8172B2']

for i, (x, label, reason) in enumerate(milestones):
    # Dot on timeline
    ax.plot(x, 1.0, 'o', color=colors[i], markersize=14, zorder=5)
    ax.plot(x, 1.0, 'o', color='white', markersize=7, zorder=6)

    # Milestone label above
    ax.text(x, 1.55, label, ha='center', va='bottom', fontsize=10.5,
            fontweight='bold', color=colors[i])

    # Reason box below
    ax.text(x, 0.45, reason, ha='center', va='top', fontsize=8.5,
            color='#333333', style='italic',
            bbox=dict(boxstyle='round,pad=0.35', facecolor='#F7F7F7',
                      edgecolor=colors[i], linewidth=1.2))

    # Vertical connector
    ax.plot([x, x], [1.0, 1.52], color=colors[i], lw=1.2, ls='--', zorder=3)
    ax.plot([x, x], [0.48, 1.0], color=colors[i], lw=1.2, ls='--', zorder=3)

# Expansion arrows between dots
for i in range(len(milestones) - 1):
    x1 = milestones[i][0] + 0.22
    x2 = milestones[i+1][0] - 0.22
    ax.annotate('', xy=(x2, 1.0), xytext=(x1, 1.0),
                arrowprops=dict(arrowstyle='->', color='#888888', lw=1.4))

# Title
ax.text(5.85, 2.65, 'The Number System Keeps Expanding',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#222222')
ax.text(5.85, 2.3, 'Each step was driven by a problem the previous system could not solve.',
        ha='center', va='center', fontsize=9.5, color='#555555', style='italic')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777189273640-xl2qcv7t.png", dpi=150, bbox_inches="tight")