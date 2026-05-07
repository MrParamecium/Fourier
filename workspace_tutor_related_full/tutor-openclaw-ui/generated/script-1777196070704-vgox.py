import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
fig.patch.set_facecolor('white')

for ax in [ax1, ax2]:
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')

# Left panel: Proper case m < n
ax1.add_patch(FancyBboxPatch((0.3, 0.5), 9.4, 9.0, boxstyle='round,pad=0.1',
    linewidth=2, edgecolor='#2196F3', facecolor='#E3F2FD'))
ax1.text(5, 9.0, 'Proper Case: m < n', ha='center', va='center',
    fontsize=14, fontweight='bold', color='#1565C0')
ax1.axhline(y=8.3, xmin=0.05, xmax=0.95, color='#1565C0', linewidth=1.2)

ax1.text(5, 7.4, 'Expansion Form:', ha='center', va='center',
    fontsize=11, color='#333333')

ax1.text(5, 6.2,
    r'$F(x) = \frac{k_1}{x-\lambda_1} + \frac{k_2}{x-\lambda_2} + \cdots$',
    ha='center', va='center', fontsize=13, color='#1A237E')

ax1.text(5, 4.8, 'Coefficient formula:', ha='center', va='center',
    fontsize=11, color='#333333')
ax1.text(5, 3.8,
    r'$k_r = \left.(x-\lambda_r)F(x)\right|_{x=\lambda_r}$',
    ha='center', va='center', fontsize=13, color='#1A237E')

ax1.add_patch(FancyBboxPatch((0.8, 1.0), 8.4, 1.8, boxstyle='round,pad=0.1',
    linewidth=1, edgecolor='#90CAF9', facecolor='#BBDEFB'))
ax1.text(5, 2.0, 'No extra term needed.', ha='center', va='center',
    fontsize=11, color='#0D47A1', style='italic')
ax1.text(5, 1.3, 'Standard procedure applies directly.', ha='center', va='center',
    fontsize=10, color='#0D47A1')

# Right panel: m = n case
ax2.add_patch(FancyBboxPatch((0.3, 0.5), 9.4, 9.0, boxstyle='round,pad=0.1',
    linewidth=2, edgecolor='#FF6F00', facecolor='#FFF8E1'))
ax2.text(5, 9.0, 'Special Improper Case: m = n', ha='center', va='center',
    fontsize=14, fontweight='bold', color='#E65100')
ax2.axhline(y=8.3, xmin=0.05, xmax=0.95, color='#E65100', linewidth=1.2)

ax2.text(5, 7.4, 'Expansion Form:', ha='center', va='center',
    fontsize=11, color='#333333')

ax2.text(5, 6.2,
    r'$F(x) = \mathbf{b_n} + \frac{k_1}{x-\lambda_1} + \frac{k_2}{x-\lambda_2} + \cdots$',
    ha='center', va='center', fontsize=13, color='#1A237E')

ax2.add_patch(FancyBboxPatch((0.8, 4.8), 8.4, 1.0, boxstyle='round,pad=0.1',
    linewidth=1.5, edgecolor='#FF6F00', facecolor='#FFE0B2'))
ax2.text(5, 5.3,
    r'Extra constant $b_n$ = ratio of leading coefficients',
    ha='center', va='center', fontsize=10.5, color='#BF360C', fontweight='bold')

ax2.text(5, 3.9, 'Coefficient formula (same as before):', ha='center', va='center',
    fontsize=11, color='#333333')
ax2.text(5, 3.0,
    r'$k_r = \left.(x-\lambda_r)F(x)\right|_{x=\lambda_r}$',
    ha='center', va='center', fontsize=13, color='#1A237E')

ax2.add_patch(FancyBboxPatch((0.8, 1.0), 8.4, 1.8, boxstyle='round,pad=0.1',
    linewidth=1.5, edgecolor='#D32F2F', facecolor='#FFEBEE'))
ax2.text(5, 2.0, 'TRAP: Do not forget the constant term!', ha='center', va='center',
    fontsize=11, color='#B71C1C', fontweight='bold')
ax2.text(5, 1.3, 'Omitting it is the most common exam error.', ha='center', va='center',
    fontsize=10, color='#B71C1C')

plt.suptitle('Partial Fraction Expansion: Proper vs. m = n', fontsize=15,
    fontweight='bold', color='#212121', y=1.01)
plt.tight_layout(pad=1.5)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777196070704-6ftvwsto.png", dpi=150, bbox_inches="tight")