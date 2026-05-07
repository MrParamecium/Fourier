import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch

fig, axes = plt.subplots(1, 2, figsize=(13, 6))
fig.patch.set_facecolor('white')

for ax in axes:
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis('off')

# ---- Left panel ----
ax = axes[0]
ax.set_facecolor('#f7f9fc')
rect = mpatches.FancyBboxPatch((0.04, 0.04), 0.92, 0.92,
    boxstyle='round,pad=0.02', linewidth=2,
    edgecolor='#3a6ea5', facecolor='#eef3fb')
ax.add_patch(rect)

ax.text(0.5, 0.88, 'When  m = n', ha='center', va='center',
    fontsize=16, fontweight='bold', color='#1a3a5c')

ax.text(0.5, 0.72,
    r'$F(x) = \dfrac{b_n x^n + b_{n-1}x^{n-1} + \cdots + b_0}'
    r'{x^n + a_{n-1}x^{n-1} + \cdots + a_0}$',
    ha='center', va='center', fontsize=11.5, color='#1a1a1a')

ax.plot([0.1, 0.9], [0.57, 0.57], color='#3a6ea5', linewidth=1, linestyle='--')

ax.text(0.5, 0.47,
    'Numerator degree  =  Denominator degree',
    ha='center', va='center', fontsize=10.5, color='#444', style='italic')

box_same = mpatches.FancyBboxPatch((0.12, 0.30), 0.76, 0.12,
    boxstyle='round,pad=0.015', linewidth=1.5,
    edgecolor='#3a6ea5', facecolor='#d0e4f7')
ax.add_patch(box_same)
ax.text(0.5, 0.36, 'Same degree top and bottom',
    ha='center', va='center', fontsize=11, fontweight='bold', color='#1a3a5c')

ax.text(0.5, 0.17,
    r'$F(x) \to b_n$ as $x \to \infty$',
    ha='center', va='center', fontsize=11, color='#555')

# ---- Right panel ----
ax2 = axes[1]
ax2.set_facecolor('#f7f9fc')
rect2 = mpatches.FancyBboxPatch((0.04, 0.04), 0.92, 0.92,
    boxstyle='round,pad=0.02', linewidth=2,
    edgecolor='#2e7d32', facecolor='#edf7ee')
ax2.add_patch(rect2)

ax2.text(0.5, 0.88, 'Use This Form', ha='center', va='center',
    fontsize=16, fontweight='bold', color='#1b5e20')

ax2.text(0.5, 0.72,
    r'$F(x) = b_n + \dfrac{k_1}{x-\lambda_1} + \dfrac{k_2}{x-\lambda_2} + \cdots + \dfrac{k_n}{x-\lambda_n}$',
    ha='center', va='center', fontsize=11.5, color='#1a1a1a')

ax2.plot([0.1, 0.9], [0.57, 0.57], color='#2e7d32', linewidth=1, linestyle='--')

ax2.text(0.5, 0.47,
    'Same cover-up method as the proper case',
    ha='center', va='center', fontsize=10.5, color='#444', style='italic')

# Red callout for b_n
callout = mpatches.FancyBboxPatch((0.08, 0.28), 0.84, 0.14,
    boxstyle='round,pad=0.015', linewidth=2,
    edgecolor='#c62828', facecolor='#ffebee')
ax2.add_patch(callout)
ax2.text(0.5, 0.355, 'Extra constant term:  b\u2099  (leading coeff. ratio)',
    ha='center', va='center', fontsize=11, fontweight='bold', color='#b71c1c')

ax2.text(0.5, 0.17,
    r'Find $k_r$ by cover-up exactly as before',
    ha='center', va='center', fontsize=11, color='#2e7d32')

# ---- Arrow between panels ----
fig.text(0.5, 0.52,
    'Same partial-fraction method,\nplus one constant  \u27a1',
    ha='center', va='center', fontsize=11, color='#555',
    bbox=dict(boxstyle='round,pad=0.3', facecolor='#fff9c4', edgecolor='#f9a825', linewidth=1.5))

plt.tight_layout(pad=1.5)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777196340953-9p7tpogx.png", dpi=150, bbox_inches="tight")