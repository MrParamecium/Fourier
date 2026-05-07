import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch

fig, axes = plt.subplots(1, 2, figsize=(13, 6))
fig.patch.set_facecolor('white')

for ax in axes:
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis('off')

# --- Left panel: Proper case ---
ax = axes[0]
ax.add_patch(FancyBboxPatch((0.03, 0.05), 0.94, 0.90,
    boxstyle='round,pad=0.02', linewidth=1.5,
    edgecolor='#4a90d9', facecolor='#f0f6ff'))
ax.text(0.5, 0.92, 'Proper Case', ha='center', va='top',
    fontsize=15, fontweight='bold', color='#1a3a5c')
ax.text(0.5, 0.82, r'$\deg(\mathrm{num}) < \deg(\mathrm{den})$',
    ha='center', va='top', fontsize=11, color='#333333')
ax.text(0.5, 0.68, r'$F(x) = \dfrac{k_1}{x-\lambda_1} + \dfrac{k_2}{x-\lambda_2}$',
    ha='center', va='top', fontsize=12, color='#1a1a1a')
ax.text(0.5, 0.50, r'$+ \ \cdots + \dfrac{k_n}{x-\lambda_n}$',
    ha='center', va='top', fontsize=12, color='#1a1a1a')
ax.text(0.5, 0.30, 'No constant term needed.', ha='center', va='top',
    fontsize=11, color='#555555', style='italic')

# --- Right panel: Improper m=n case ---
ax = axes[1]
ax.add_patch(FancyBboxPatch((0.03, 0.05), 0.94, 0.90,
    boxstyle='round,pad=0.02', linewidth=1.5,
    edgecolor='#e07b00', facecolor='#fff8f0'))
ax.text(0.5, 0.92, 'Improper Case  (m = n)', ha='center', va='top',
    fontsize=15, fontweight='bold', color='#7a3a00')
ax.text(0.5, 0.82, r'$\deg(\mathrm{num}) = \deg(\mathrm{den})$',
    ha='center', va='top', fontsize=11, color='#333333')
ax.text(0.5, 0.68, r'$F(x) = \mathbf{b_n} + \dfrac{k_1}{x-\lambda_1} + \dfrac{k_2}{x-\lambda_2}$',
    ha='center', va='top', fontsize=12, color='#1a1a1a')
ax.text(0.5, 0.50, r'$+ \ \cdots + \dfrac{k_n}{x-\lambda_n}$',
    ha='center', va='top', fontsize=12, color='#1a1a1a')

# Highlighted note box
ax.add_patch(FancyBboxPatch((0.08, 0.28), 0.84, 0.12,
    boxstyle='round,pad=0.015', linewidth=1.2,
    edgecolor='#e07b00', facecolor='#ffe0b0'))
ax.text(0.5, 0.345, r'Only new feature: extra constant $b_n$',
    ha='center', va='center', fontsize=11,
    fontweight='bold', color='#7a3a00')

# Example line at bottom
ax.text(0.5, 0.20, 'Example:', ha='center', va='top',
    fontsize=10, color='#444444', fontweight='bold')
ax.text(0.5, 0.13, r'$\dfrac{3x^2+9x-20}{(x-2)(x+3)} = 3 + \dfrac{2}{x-2} + \dfrac{4}{x+3}$',
    ha='center', va='top', fontsize=11, color='#1a1a1a')

plt.suptitle('Partial Fraction Structure: Proper vs. Improper (m = n)',
    fontsize=14, fontweight='bold', color='#1a1a1a', y=1.01)
plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777196036194-l2hc2tss.png", dpi=150, bbox_inches="tight")