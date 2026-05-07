import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
fig.patch.set_facecolor('white')

for ax in axes:
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis('off')
    ax.set_facecolor('white')

# Left panel — Proper case
axes[0].add_patch(mpatches.FancyBboxPatch((0.05, 0.05), 0.9, 0.9,
    boxstyle='round,pad=0.02', linewidth=1.5, edgecolor='#333333', facecolor='#f7f7f7'))
axes[0].text(0.5, 0.88, 'Proper Case', ha='center', va='center',
    fontsize=13, fontweight='bold', color='#222222')
axes[0].text(0.5, 0.78, 'degree(numerator) < degree(denominator)',
    ha='center', va='center', fontsize=9, color='#555555', style='italic')
axes[0].plot([0.1, 0.9], [0.72, 0.72], color='#aaaaaa', linewidth=0.8)
axes[0].text(0.5, 0.60, r'$F(x) = \dfrac{k_1}{x-\lambda_1} + \dfrac{k_2}{x-\lambda_2} + \cdots + \dfrac{k_n}{x-\lambda_n}$',
    ha='center', va='center', fontsize=11, color='#111111')
axes[0].text(0.5, 0.35, 'No extra term needed.\nCoefficients found by\ncover-up substitution.',
    ha='center', va='center', fontsize=10, color='#444444',
    bbox=dict(boxstyle='round,pad=0.4', facecolor='#e8f4e8', edgecolor='#66aa66', linewidth=1.2))

# Right panel — Special improper case m = n
axes[1].add_patch(mpatches.FancyBboxPatch((0.05, 0.05), 0.9, 0.9,
    boxstyle='round,pad=0.02', linewidth=1.5, edgecolor='#333333', facecolor='#f7f7f7'))
axes[1].text(0.5, 0.88, 'Special Improper Case', ha='center', va='center',
    fontsize=13, fontweight='bold', color='#222222')
axes[1].text(0.5, 0.78, 'degree(numerator) = degree(denominator)',
    ha='center', va='center', fontsize=9, color='#555555', style='italic')
axes[1].plot([0.1, 0.9], [0.72, 0.72], color='#aaaaaa', linewidth=0.8)
axes[1].text(0.5, 0.60, r'$F(x) = b_n + \dfrac{k_1}{x-\lambda_1} + \dfrac{k_2}{x-\lambda_2} + \cdots + \dfrac{k_n}{x-\lambda_n}$',
    ha='center', va='center', fontsize=11, color='#111111')
axes[1].add_patch(mpatches.FancyBboxPatch((0.08, 0.12), 0.84, 0.28,
    boxstyle='round,pad=0.03', linewidth=1.5, edgecolor='#cc3333', facecolor='#fff0f0'))
axes[1].text(0.5, 0.32, 'Do not forget the extra constant', ha='center', va='center',
    fontsize=10, color='#cc3333', fontweight='bold')
axes[1].text(0.5, 0.20, r'$b_n$ = leading coefficient of numerator', ha='center', va='center',
    fontsize=10, color='#cc3333')

fig.suptitle('Partial Fraction Setup: Proper vs. m = n Improper', fontsize=14, fontweight='bold', y=1.01, color='#111111')
plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777196220184-arod786t.png", dpi=150, bbox_inches="tight")