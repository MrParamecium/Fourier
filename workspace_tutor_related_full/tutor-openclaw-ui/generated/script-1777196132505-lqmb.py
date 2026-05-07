import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, axes = plt.subplots(1, 3, figsize=(13, 5.5))
fig.patch.set_facecolor('white')
fig.suptitle(r'Cover-Up Steps for $F(x) = \frac{2x^2+9x-11}{(x+1)(x-2)(x+3)}$',
             fontsize=13, fontweight='bold', color='#1a1a2e', y=1.01)

panels = [
    {
        'label': r'$k_1$  (coefficient of $\frac{1}{x+1}$)',
        'covered': r'$(x+1)$',
        'sub': r'$x = -1$',
        'numerator': r'$2(-1)^2 + 9(-1) - 11$',
        'denominator': r'$(-1-2)(-1+3)$',
        'num_val': r'$= 2 - 9 - 11 = -18$',
        'den_val': r'$= (-3)(2) = -6$',
        'result': r'$k_1 = \dfrac{-18}{-6} = \mathbf{3}$',
        'color': '#E53935',
        'bg': '#ffebee',
    },
    {
        'label': r'$k_2$  (coefficient of $\frac{1}{x-2}$)',
        'covered': r'$(x-2)$',
        'sub': r'$x = 2$',
        'numerator': r'$2(2)^2 + 9(2) - 11$',
        'denominator': r'$(2+1)(2+3)$',
        'num_val': r'$= 8 + 18 - 11 = 15$',
        'den_val': r'$= (3)(5) = 15$',
        'result': r'$k_2 = \dfrac{15}{15} = \mathbf{1}$',
        'color': '#1565C0',
        'bg': '#e3f2fd',
    },
    {
        'label': r'$k_3$  (coefficient of $\frac{1}{x+3}$)',
        'covered': r'$(x+3)$',
        'sub': r'$x = -3$',
        'numerator': r'$2(-3)^2 + 9(-3) - 11$',
        'denominator': r'$(-3+1)(-3-2)$',
        'num_val': r'$= 18 - 27 - 11 = -20$',
        'den_val': r'$= (-2)(-5) = 10$',
        'result': r'$k_3 = \dfrac{-20}{10} = \mathbf{-2}$',
        'color': '#2E7D32',
        'bg': '#e8f5e9',
    },
]

for ax, p in zip(axes, panels):
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis('off')
    ax.set_facecolor(p['bg'])

    # Panel border
    rect = mpatches.FancyBboxPatch((0.02, 0.02), 0.96, 0.96,
                                    boxstyle='round,pad=0.02',
                                    linewidth=2.5, edgecolor=p['color'],
                                    facecolor=p['bg'])
    ax.add_patch(rect)

    # Label
    ax.text(0.5, 0.92, p['label'], fontsize=10.5, fontweight='bold',
            ha='center', va='center', color=p['color'])

    # Covered factor badge
    badge = mpatches.FancyBboxPatch((0.15, 0.78), 0.70, 0.10,
                                     boxstyle='round,pad=0.02',
                                     linewidth=1.5, edgecolor=p['color'],
                                     facecolor='#eeeeee')
    ax.add_patch(badge)
    ax.text(0.5, 0.83, 'Cover: ' + p['covered'], fontsize=9.5,
            ha='center', va='center', color='#555555',
            fontstyle='italic')

    # Substitution
    ax.text(0.5, 0.70, 'Substitute: ' + p['sub'], fontsize=10,
            ha='center', va='center', color='#1a1a2e', fontweight='bold')

    # Divider line
    ax.plot([0.1, 0.9], [0.64, 0.64], color=p['color'], lw=1, alpha=0.5)

    # Numerator
    ax.text(0.5, 0.57, 'Numerator:', fontsize=8.5, ha='center', va='center',
            color='#666666')
    ax.text(0.5, 0.49, p['numerator'], fontsize=9, ha='center', va='center',
            color='#1a1a2e')
    ax.text(0.5, 0.41, p['num_val'], fontsize=9, ha='center', va='center',
            color='#1a1a2e')

    # Denominator
    ax.text(0.5, 0.32, 'Denominator:', fontsize=8.5, ha='center', va='center',
            color='#666666')
    ax.text(0.5, 0.24, p['denominator'], fontsize=9, ha='center', va='center',
            color='#1a1a2e')
    ax.text(0.5, 0.16, p['den_val'], fontsize=9, ha='center', va='center',
            color='#1a1a2e')

    # Result
    ax.plot([0.1, 0.9], [0.10, 0.10], color=p['color'], lw=1.5, alpha=0.7)
    ax.text(0.5, 0.05, p['result'], fontsize=11, ha='center', va='center',
            color=p['color'], fontweight='bold')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777196132505-phuzmqg6.png", dpi=150, bbox_inches="tight")