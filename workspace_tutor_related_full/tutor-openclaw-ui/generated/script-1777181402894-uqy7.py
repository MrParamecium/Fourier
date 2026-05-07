import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, axes = plt.subplots(1, 2, figsize=(11, 5))
fig.patch.set_facecolor('white')

for ax in axes:
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis('off')
    ax.set_facecolor('white')

# ---- Left panel: Proper case (m < n) ----
ax = axes[0]
rect = mpatches.FancyBboxPatch((0.04, 0.08), 0.92, 0.84,
    boxstyle='round,pad=0.02', linewidth=2,
    edgecolor='#2c5f8a', facecolor='#eaf3fb')
ax.add_patch(rect)

ax.text(0.5, 0.91, 'Proper Case  (m < n)', ha='center', va='center',
    fontsize=13, fontweight='bold', color='#2c5f8a')

ax.text(0.5, 0.72,
    r'$F(x) = \dfrac{k_1}{x-\lambda_1} + \dfrac{k_2}{x-\lambda_2} + \cdots$',
    ha='center', va='center', fontsize=12, color='#1a1a1a')

ax.plot([0.08, 0.92], [0.58, 0.58], color='#aaaaaa', linewidth=1)

ax.text(0.5, 0.46, 'Coefficients via cover-up:', ha='center', va='center',
    fontsize=11, color='#333333')
ax.text(0.5, 0.34,
    r'$k_r = (x - \lambda_r)\,F(x)\big|_{x=\lambda_r}$',
    ha='center', va='center', fontsize=12, color='#1a1a1a')

ax.text(0.5, 0.17, 'No extra terms needed.', ha='center', va='center',
    fontsize=10, style='italic', color='#555555')

# ---- Right panel: Improper case (m = n) ----
ax = axes[1]
rect2 = mpatches.FancyBboxPatch((0.04, 0.08), 0.92, 0.84,
    boxstyle='round,pad=0.02', linewidth=2,
    edgecolor='#8a3a2c', facecolor='#fdf0ee')
ax.add_patch(rect2)

ax.text(0.5, 0.91, 'Improper Case  (m = n)', ha='center', va='center',
    fontsize=13, fontweight='bold', color='#8a3a2c')

ax.text(0.5, 0.72,
    r'$F(x) = \underbrace{b_n}_{\text{extra}} + \dfrac{k_1}{x-\lambda_1} + \dfrac{k_2}{x-\lambda_2} + \cdots$',
    ha='center', va='center', fontsize=12, color='#1a1a1a')

ax.plot([0.08, 0.92], [0.58, 0.58], color='#aaaaaa', linewidth=1)

ax.text(0.5, 0.46, 'Same cover-up formula for k_r:', ha='center', va='center',
    fontsize=11, color='#333333')
ax.text(0.5, 0.34,
    r'$k_r = (x - \lambda_r)\,F(x)\big|_{x=\lambda_r}$',
    ha='center', va='center', fontsize=12, color='#1a1a1a')

ax.text(0.5, 0.19, 'Only difference: extra constant  b_n', ha='center', va='center',
    fontsize=11, fontweight='bold', color='#8a3a2c',
    bbox=dict(boxstyle='round,pad=0.3', facecolor='#fce8e4', edgecolor='#8a3a2c', linewidth=1.5))

plt.suptitle('Proper vs. Improper (m = n) Partial-Fraction Structure',
    fontsize=14, fontweight='bold', color='#111111', y=1.01)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777181402894-xlqrus2u.png", dpi=150, bbox_inches="tight")