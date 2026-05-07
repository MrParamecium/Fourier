import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch
import os

fig, axes = plt.subplots(1, 3, figsize=(15, 6))
fig.patch.set_facecolor('white')

panel_data = [
    {
        'factor': '(x+1)',
        'root': 'x = -1',
        'coeff_label': 'k\u2081',
        'coeff_val': '3',
        'numerator': '2(-1)\u00b2+9(-1)-11',
        'denom': '(-1-2)(-1+3)',
        'denom_eval': '(-3)(2)',
        'num_eval': '2-9-11 = -18',
        'result': '-18 / -6 = 3',
        'color': '#1565c0',
        'bg': '#e3f2fd'
    },
    {
        'factor': '(x-2)',
        'root': 'x = 2',
        'coeff_label': 'k\u2082',
        'coeff_val': '1',
        'numerator': '2(2)\u00b2+9(2)-11',
        'denom': '(2+1)(2+3)',
        'denom_eval': '(3)(5)',
        'num_eval': '8+18-11 = 15',
        'result': '15 / 15 = 1',
        'color': '#2e7d32',
        'bg': '#e8f5e9'
    },
    {
        'factor': '(x+3)',
        'root': 'x = -3',
        'coeff_label': 'k\u2083',
        'coeff_val': '-2',
        'numerator': '2(-3)\u00b2+9(-3)-11',
        'denom': '(-3+1)(-3-2)',
        'denom_eval': '(-2)(-5)',
        'num_eval': '18-27-11 = -20',
        'result': '-20 / 10 = -2',
        'color': '#6a1b9a',
        'bg': '#f3e5f5'
    }
]

for i, (ax, pd) in enumerate(zip(axes, panel_data)):
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')
    ax.set_facecolor('white')

    # Panel background
    rect = FancyBboxPatch((0.2, 0.2), 9.6, 9.4,
                          boxstyle='round,pad=0.15',
                          facecolor=pd['bg'],
                          edgecolor=pd['color'],
                          linewidth=2.5)
    ax.add_patch(rect)

    # Panel title
    ax.text(5, 9.2, f"Panel {i+1}: Find {pd['coeff_label']}",
            fontsize=12, fontweight='bold', ha='center', va='center',
            color=pd['color'])

    # Step 1: Cover the factor
    ax.text(5, 8.3, 'Step 1: Cover the factor', fontsize=9.5,
            ha='center', va='center', color='#333333', style='italic')

    # Covered factor box
    cover_rect = FancyBboxPatch((2.5, 7.3), 5, 0.85,
                                boxstyle='round,pad=0.1',
                                facecolor=pd['color'],
                                edgecolor=pd['color'],
                                linewidth=1.5,
                                alpha=0.85)
    ax.add_patch(cover_rect)
    ax.text(5, 7.72, f'COVER  {pd["factor"]}', fontsize=11,
            fontweight='bold', ha='center', va='center', color='white')

    # Arrow down
    ax.annotate('', xy=(5, 6.7), xytext=(5, 7.3),
                arrowprops=dict(arrowstyle='->', color=pd['color'], lw=2))

    # Step 2: Substitute root
    ax.text(5, 6.4, f'Step 2: Substitute  {pd["root"]}', fontsize=9.5,
            ha='center', va='center', color='#333333', style='italic')

    # Numerator evaluation
    ax.text(5, 5.7, pd['numerator'], fontsize=9, ha='center', va='center',
            color='#333333')
    ax.plot([1.5, 8.5], [5.35, 5.35], color='#888888', lw=1)
    ax.text(5, 4.95, pd['denom'], fontsize=9, ha='center', va='center',
            color='#333333')

    # Evaluation results
    ax.text(5, 4.2, f'= {pd["num_eval"]}', fontsize=8.5, ha='center',
            va='center', color='#555555')
    ax.plot([1.5, 8.5], [3.85, 3.85], color='#888888', lw=1)
    ax.text(5, 3.45, pd['denom_eval'], fontsize=8.5, ha='center',
            va='center', color='#555555')

    # Arrow to result
    ax.annotate('', xy=(5, 2.6), xytext=(5, 3.1),
                arrowprops=dict(arrowstyle='->', color=pd['color'], lw=2))

    # Result box
    res_rect = FancyBboxPatch((1.5, 1.8), 7, 0.85,
                              boxstyle='round,pad=0.1',
                              facecolor='white',
                              edgecolor=pd['color'],
                              linewidth=2)
    ax.add_patch(res_rect)
    ax.text(5, 2.22, f'{pd["coeff_label"]} = {pd["result"]}',
            fontsize=11, fontweight='bold', ha='center', va='center',
            color=pd['color'])

# Bottom result strip
fig.text(0.5, 0.01,
         r'Final result:  $F(x) = \dfrac{3}{x+1} + \dfrac{1}{x-2} + \dfrac{-2}{x+3}$',
         fontsize=13, ha='center', va='bottom',
         color='#1a1a2e', fontweight='bold',
         bbox=dict(boxstyle='round,pad=0.4', facecolor='#f5f5f5',
                   edgecolor='#aaaaaa', linewidth=1.5))

plt.suptitle(r'Worked Example: $F(x) = \dfrac{2x^2+9x-11}{(x+1)(x-2)(x+3)}$',
             fontsize=13, fontweight='bold', color='#1a1a2e', y=1.01)

plt.tight_layout(rect=[0, 0.08, 1, 1])
os.makedirs('generated', exist_ok=True)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777195678925-8fwdcgty.png", dpi=150, bbox_inches="tight")
plt.close()