import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, axes = plt.subplots(1, 2, figsize=(11, 4.5))
fig.patch.set_facecolor('white')

for ax in axes:
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis('off')

# --- Left box: Proper case ---
left_ax = axes[0]
box_left = mpatches.FancyBboxPatch((0.05, 0.08), 0.90, 0.84,
    boxstyle='round,pad=0.02', linewidth=2,
    edgecolor='#2c5f8a', facecolor='#eaf3fb')
left_ax.add_patch(box_left)

left_ax.text(0.50, 0.90, 'Proper Case', ha='center', va='center',
    fontsize=14, fontweight='bold', color='#2c5f8a')
left_ax.text(0.50, 0.80, r'$m < n$', ha='center', va='center',
    fontsize=13, color='#2c5f8a')

left_ax.axhline(y=0.73, xmin=0.08, xmax=0.92, color='#2c5f8a', linewidth=1)

left_ax.text(0.50, 0.60, r'$F(x) = \dfrac{k_1}{x-\lambda_1} + \dfrac{k_2}{x-\lambda_2} + \cdots$',
    ha='center', va='center', fontsize=12, color='#1a1a1a')

left_ax.text(0.50, 0.30, 'Standard partial fractions only.\nNo extra constant term.',
    ha='center', va='center', fontsize=10.5, color='#444444',
    style='italic', linespacing=1.6)

# --- Right box: Special m=n case ---
right_ax = axes[1]
box_right = mpatches.FancyBboxPatch((0.05, 0.08), 0.90, 0.84,
    boxstyle='round,pad=0.02', linewidth=2,
    edgecolor='#8a3a2c', facecolor='#fdf0ee')
right_ax.add_patch(box_right)

right_ax.text(0.50, 0.90, 'Special Improper Case', ha='center', va='center',
    fontsize=14, fontweight='bold', color='#8a3a2c')
right_ax.text(0.50, 0.80, r'$m = n$', ha='center', va='center',
    fontsize=13, color='#8a3a2c')

right_ax.axhline(y=0.73, xmin=0.08, xmax=0.92, color='#8a3a2c', linewidth=1)

right_ax.text(0.50, 0.60,
    r'$F(x) = \underbrace{b_n}_{\text{extra}} + \dfrac{k_1}{x-\lambda_1} + \dfrac{k_2}{x-\lambda_2} + \cdots$',
    ha='center', va='center', fontsize=12, color='#1a1a1a')

right_ax.text(0.50, 0.30,
    'Only one new feature: extra constant \u2018b\u2099\u2019\n(the leading coefficient of the numerator).',
    ha='center', va='center', fontsize=10.5, color='#8a3a2c',
    style='italic', linespacing=1.6)

plt.suptitle('Partial Fraction Structure: Proper vs. Special Improper (m = n)',
    fontsize=13, fontweight='bold', color='#222222', y=1.02)

plt.tight_layout(pad=1.5)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777181954966-cryr9ndn.png", dpi=150, bbox_inches="tight")