import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, ax = plt.subplots(figsize=(14, 4))
ax.set_xlim(-0.5, 4.5)
ax.set_ylim(-1.5, 2.2)
ax.axis('off')
fig.patch.set_facecolor('white')

milestones = [
    ('Natural\nNumbers', 'Counting\nobjects', 0),
    ('Fractions', 'Measuring\nquantities', 1),
    ('Irrational\nNumbers', 'Diagonal of\nunit square', 2),
    ('Negative\nNumbers', 'Solving\n\\( x + 5 = 0 \\)', 3),
    ('Complex\nNumbers', 'Solving\n\\( x^2 + 1 = 0 \\)', 4),
]

colors = ['#4A90D9', '#5BA85A', '#E8A838', '#D95B5B', '#8B5BD9']

ax.annotate('', xy=(4.3, 0.6), xytext=(-0.3, 0.6),
            arrowprops=dict(arrowstyle='->', color='#333333', lw=2.5))

for i, (label, trigger, x) in enumerate(milestones):
    ax.plot(x, 0.6, 'o', markersize=18, color=colors[i], zorder=5)
    ax.text(x, 0.6, str(i + 1), ha='center', va='center',
            fontsize=9, fontweight='bold', color='white', zorder=6)
    ax.text(x, 1.15, label, ha='center', va='bottom',
            fontsize=10, fontweight='bold', color='#222222',
            multialignment='center')
    ax.text(x, -0.05, trigger, ha='center', va='top',
            fontsize=8.5, color='#555555', style='italic',
            multialignment='center')

ax.text(2.0, 2.05, 'Historical Expansion of the Number System',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#111111')

legend_patches = [mpatches.Patch(color=colors[i], label=milestones[i][0].replace('\\n', ' ')) for i in range(5)]

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777189347060-w0djs625.png", dpi=150, bbox_inches="tight")