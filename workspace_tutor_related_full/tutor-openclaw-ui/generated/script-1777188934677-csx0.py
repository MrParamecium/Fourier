import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, ax = plt.subplots(figsize=(13, 4))
ax.set_xlim(0, 13)
ax.set_ylim(0, 4)
ax.axis('off')
fig.patch.set_facecolor('white')

number_sets = [
    ('Natural\nNumbers', 'Counting\nobjects', 'e.g. 1, 2, 3', 1.1),
    ('Fractions', 'Measuring\ncontinuous\nquantities', 'e.g. 3/4, 1/2', 3.1),
    ('Irrational\nNumbers', 'Diagonal of\nunit square', r'e.g. $\sqrt{2}$', 5.1),
    ('Negative\nNumbers', 'Solving\nx + 5 = 0', 'e.g. -5, -1', 7.1),
    ('Complex\nNumbers', r'Solving $x^2+1=0$', 'e.g. j, 3+2j', 9.1),
]

colors = ['#d0e8f1', '#b8ddb0', '#f5e6a3', '#f5c6a3', '#e0c8f0']
arrow_color = '#888888'

for i, (label, trigger, example, x) in enumerate(number_sets):
    color = colors[i]
    rect = mpatches.FancyBboxPatch((x - 0.85, 0.6), 1.7, 2.6,
                                    boxstyle='round,pad=0.08',
                                    linewidth=1.2, edgecolor='#555555',
                                    facecolor=color)
    ax.add_patch(rect)
    ax.text(x, 2.85, label, ha='center', va='center', fontsize=9.5,
            fontweight='bold', color='#222222')
    ax.text(x, 1.85, trigger, ha='center', va='center', fontsize=7.8,
            color='#444444', style='italic')
    ax.text(x, 0.95, example, ha='center', va='center', fontsize=7.5,
            color='#666666')
    if i < len(number_sets) - 1:
        ax.annotate('', xy=(x + 1.05, 1.9), xytext=(x + 0.87, 1.9),
                    arrowprops=dict(arrowstyle='->', color=arrow_color, lw=1.5))

ax.text(6.5, 3.75, 'Expansion of the Number System', ha='center', va='center',
        fontsize=12, fontweight='bold', color='#222222')
ax.text(6.5, 0.18, 'Each extension was driven by a problem the previous system could not solve.',
        ha='center', va='center', fontsize=8, color='#555555', style='italic')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777188934677-qm3wiz08.png", dpi=150, bbox_inches="tight")