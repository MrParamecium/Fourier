import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch

fig, axes = plt.subplots(1, 2, figsize=(12, 6))
fig.patch.set_facecolor('white')

for ax in axes:
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')

# --- Left box: Proper case m < n ---
left_box = FancyBboxPatch((0.3, 0.5), 9.4, 9.0,
    boxstyle='round,pad=0.2', linewidth=2,
    edgecolor='#2c3e50', facecolor='#eaf4fb')
axes[0].add_patch(left_box)

axes[0].text(5, 9.0, 'Proper Case: m < n', fontsize=14, fontweight='bold',
    ha='center', va='center', color='#2c3e50')

axes[0].text(5, 7.8, 'F(x) =', fontsize=12, ha='center', va='center', color='#2c3e50')

axes[0].text(5, 6.8,
    r'$\frac{k_1}{x - \lambda_1}$' + '  +  ' + r'$\frac{k_2}{x - \lambda_2}$' + '  +  ...',
    fontsize=13, ha='center', va='center', color='#154360')

axes[0].plot([1.5, 8.5], [6.0, 6.0], color='#aab7b8', linewidth=1, linestyle='--')

axes[0].text(5, 5.2, 'Find each coefficient by:', fontsize=11,
    ha='center', va='center', color='#2c3e50')
axes[0].text(5, 4.3,
    r'$k_r = \left.(x - \lambda_r)\,F(x)\right|_{x=\lambda_r}$',
    fontsize=12, ha='center', va='center', color='#154360')

axes[0].text(5, 3.0, '(Cover-up method)', fontsize=10,
    ha='center', va='center', color='#5d6d7e', style='italic')

axes[0].text(5, 1.8, 'No extra terms needed.', fontsize=10,
    ha='center', va='center', color='#1e8449', fontweight='bold')

# --- Right box: Special improper case m = n ---
right_box = FancyBboxPatch((0.3, 0.5), 9.4, 9.0,
    boxstyle='round,pad=0.2', linewidth=2,
    edgecolor='#c0392b', facecolor='#fdfefe')
axes[1].add_patch(right_box)

axes[1].text(5, 9.0, 'Special Improper Case: m = n', fontsize=14, fontweight='bold',
    ha='center', va='center', color='#c0392b')

axes[1].text(5, 7.8, 'F(x) =', fontsize=12, ha='center', va='center', color='#2c3e50')

# Highlight bn in blue box
bn_box = FancyBboxPatch((1.2, 6.3), 1.8, 1.0,
    boxstyle='round,pad=0.1', linewidth=2,
    edgecolor='#1a5276', facecolor='#d6eaf8')
axes[1].add_patch(bn_box)
axes[1].text(2.1, 6.82, r'$b_n$', fontsize=15, ha='center', va='center',
    color='#1a5276', fontweight='bold')

axes[1].text(4.0, 6.82, '+', fontsize=14, ha='center', va='center', color='#2c3e50')
axes[1].text(6.5, 6.82,
    r'$\frac{k_1}{x-\lambda_1}$' + ' + ' + r'$\frac{k_2}{x-\lambda_2}$' + ' + ...',
    fontsize=12, ha='center', va='center', color='#154360')

axes[1].plot([1.5, 8.5], [6.0, 6.0], color='#aab7b8', linewidth=1, linestyle='--')

axes[1].text(5, 5.2, 'Step 1: Write constant = leading coeff.',
    fontsize=10, ha='center', va='center', color='#2c3e50')
axes[1].text(5, 4.4, 'Step 2: Apply cover-up for remaining k\'s.',
    fontsize=10, ha='center', va='center', color='#2c3e50')

axes[1].plot([1.5, 8.5], [3.7, 3.7], color='#aab7b8', linewidth=1, linestyle='--')

warn_box = FancyBboxPatch((0.8, 1.2), 8.4, 2.2,
    boxstyle='round,pad=0.15', linewidth=2,
    edgecolor='#c0392b', facecolor='#fdedec')
axes[1].add_patch(warn_box)
axes[1].text(5, 2.85, 'WARNING', fontsize=11, ha='center', va='center',
    color='#c0392b', fontweight='bold')
axes[1].text(5, 2.1, r'Do NOT forget the extra constant $b_n$!',
    fontsize=10, ha='center', va='center', color='#922b21')
axes[1].text(5, 1.5, 'Skipping it is the #1 exam mistake.',
    fontsize=9, ha='center', va='center', color='#922b21', style='italic')

plt.suptitle('Partial Fraction Decomposition: Proper vs. Special Improper (m = n)',
    fontsize=13, fontweight='bold', color='#2c3e50', y=1.01)
plt.tight_layout(pad=1.5)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777196195146-637q9j24.png", dpi=150, bbox_inches="tight")