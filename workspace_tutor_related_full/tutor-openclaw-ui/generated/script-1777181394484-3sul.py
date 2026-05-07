import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, axes = plt.subplots(1, 2, figsize=(12, 5), facecolor='white')
fig.subplots_adjust(wspace=0.35)

for ax in axes:
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')
    ax.set_facecolor('white')

# ---- LEFT PANEL: Proper case ----
ax = axes[0]
rect = mpatches.FancyBboxPatch((0.3, 0.5), 9.4, 9.0,
    boxstyle='round,pad=0.2', linewidth=2,
    edgecolor='#2c7bb6', facecolor='#eaf4fb')
ax.add_patch(rect)

ax.text(5, 9.0, 'Proper Case', fontsize=17, fontweight='bold',
        ha='center', va='center', color='#2c7bb6')
ax.text(5, 7.8, r'deg(numerator) < deg(denominator)', fontsize=11,
        ha='center', va='center', color='#555555', style='italic')

ax.plot([0.8, 9.2], [7.1, 7.1], color='#2c7bb6', linewidth=1.2, linestyle='--')

ax.text(5, 6.3, r'$F(x) = \dfrac{P(x)}{Q(x)}$', fontsize=14,
        ha='center', va='center', color='#222222')

ax.text(5, 5.1, 'Expansion:', fontsize=12, ha='center', va='center',
        color='#333333', fontweight='bold')

ax.text(5, 3.9,
        r'$\dfrac{k_1}{x-\lambda_1} + \dfrac{k_2}{x-\lambda_2} + \cdots$',
        fontsize=13, ha='center', va='center', color='#222222')

ax.text(5, 2.4, 'No constant term needed.', fontsize=11,
        ha='center', va='center', color='#2c7bb6', fontstyle='italic')

# ---- RIGHT PANEL: Improper m=n case ----
ax = axes[1]
rect2 = mpatches.FancyBboxPatch((0.3, 0.5), 9.4, 9.0,
    boxstyle='round,pad=0.2', linewidth=2,
    edgecolor='#d7191c', facecolor='#fff0f0')
ax.add_patch(rect2)

ax.text(5, 9.0, 'Improper Case  (m = n)', fontsize=17, fontweight='bold',
        ha='center', va='center', color='#d7191c')
ax.text(5, 7.8, r'deg(numerator) = deg(denominator)', fontsize=11,
        ha='center', va='center', color='#555555', style='italic')

ax.plot([0.8, 9.2], [7.1, 7.1], color='#d7191c', linewidth=1.2, linestyle='--')

ax.text(5, 6.3, r'$F(x) = \dfrac{b_n x^n + \cdots}{x^n + \cdots}$', fontsize=14,
        ha='center', va='center', color='#222222')

ax.text(5, 5.1, 'Expansion:', fontsize=12, ha='center', va='center',
        color='#333333', fontweight='bold')

ax.text(5, 3.75,
        r'$\mathbf{b_n}\; +\; \dfrac{k_1}{x-\lambda_1} + \dfrac{k_2}{x-\lambda_2} + \cdots$',
        fontsize=13, ha='center', va='center', color='#222222')

arrow_box = mpatches.FancyBboxPatch((1.0, 1.0), 8.0, 1.5,
    boxstyle='round,pad=0.15', linewidth=1.5,
    edgecolor='#d7191c', facecolor='#ffe5e5')
ax.add_patch(arrow_box)
ax.text(5, 1.75, 'Only extra step: include constant  b_n',
        fontsize=11.5, ha='center', va='center',
        color='#d7191c', fontweight='bold')

fig.suptitle('Partial Fraction Setup: Proper vs. Improper (m = n)',
             fontsize=15, fontweight='bold', color='#222222', y=1.01)

plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777181394484-l50oucwc.png", dpi=150, bbox_inches="tight")