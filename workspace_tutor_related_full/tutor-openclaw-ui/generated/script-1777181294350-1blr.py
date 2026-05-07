import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, axes = plt.subplots(1, 2, figsize=(11, 5), facecolor='white')
fig.patch.set_facecolor('white')

for ax in axes:
    ax.set_facecolor('white')
    ax.axis('off')

# --- Left panel: Proper case (m < n) ---
ax_left = axes[0]
ax_left.set_xlim(0, 10)
ax_left.set_ylim(0, 10)

# Panel background box
left_box = mpatches.FancyBboxPatch((0.3, 0.5), 9.4, 9.0,
    boxstyle='round,pad=0.2', linewidth=2,
    edgecolor='#2c7bb6', facecolor='#eaf4fb')
ax_left.add_patch(left_box)

ax_left.text(5, 9.0, 'Proper Case  (m < n)', fontsize=14, fontweight='bold',
    ha='center', va='center', color='#2c7bb6')

ax_left.text(5, 7.5, 'Degree of numerator < Degree of denominator',
    fontsize=9, ha='center', va='center', color='#444444', style='italic')

ax_left.text(5, 6.0, r'$F(x) = \dfrac{k_1}{x - \lambda_1} + \dfrac{k_2}{x - \lambda_2} + \cdots$',
    fontsize=13, ha='center', va='center', color='#1a1a1a')

ax_left.text(5, 4.2, 'No extra constant term needed.',
    fontsize=10, ha='center', va='center', color='#555555')

ax_left.text(5, 2.8, 'Example:',
    fontsize=9, ha='center', va='center', color='#777777')
ax_left.text(5, 1.9, r'$\dfrac{2x+1}{x^2 - 4}$',
    fontsize=12, ha='center', va='center', color='#333333')

# --- Right panel: Special improper case (m = n) ---
ax_right = axes[1]
ax_right.set_xlim(0, 10)
ax_right.set_ylim(0, 10)

right_box = mpatches.FancyBboxPatch((0.3, 0.5), 9.4, 9.0,
    boxstyle='round,pad=0.2', linewidth=2,
    edgecolor='#d7191c', facecolor='#fff5f5')
ax_right.add_patch(right_box)

ax_right.text(5, 9.0, 'Special Improper Case  (m = n)', fontsize=14, fontweight='bold',
    ha='center', va='center', color='#d7191c')

ax_right.text(5, 7.5, 'Degree of numerator = Degree of denominator',
    fontsize=9, ha='center', va='center', color='#444444', style='italic')

ax_right.text(5, 6.0,
    r'$F(x) = \underbrace{b_n}_{\text{extra constant}} + \dfrac{k_1}{x-\lambda_1} + \dfrac{k_2}{x-\lambda_2} + \cdots$',
    fontsize=11.5, ha='center', va='center', color='#1a1a1a')

highlight = mpatches.FancyBboxPatch((1.2, 2.3), 7.6, 1.5,
    boxstyle='round,pad=0.15', linewidth=1.5,
    edgecolor='#d7191c', facecolor='#ffe0e0')
ax_right.add_patch(highlight)
ax_right.text(5, 3.1, 'Same degree  ->  add one constant first',
    fontsize=10.5, fontweight='bold', ha='center', va='center', color='#d7191c')

ax_right.text(5, 1.9, r'Example:  $\dfrac{3x^2+9x-20}{x^2+x-6}$',
    fontsize=11, ha='center', va='center', color='#333333')

plt.suptitle('Partial-Fraction Setup: Proper vs. Special Improper (m = n)',
    fontsize=13, fontweight='bold', color='#222222', y=1.01)

plt.tight_layout(pad=1.5)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777181294350-75d0ve7w.png", dpi=150, bbox_inches="tight")