import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch

fig, ax = plt.subplots(figsize=(10, 4))
ax.set_xlim(0, 10)
ax.set_ylim(0, 4)
ax.axis('off')
fig.patch.set_facecolor('white')

# Box styling
box_style = dict(boxstyle='round,pad=0.6', facecolor='#EAF4FB', edgecolor='#2980B9', linewidth=2)
result_style = dict(boxstyle='round,pad=0.6', facecolor='#EAFAF1', edgecolor='#27AE60', linewidth=2)

# Box 1
ax.text(1.5, 2.0,
        'Start with\n$F(x) = \\dfrac{2x^2+9x-11}{(x+1)(x-2)(x+3)}$',
        ha='center', va='center', fontsize=10.5,
        bbox=box_style, wrap=True)

# Arrow 1
ax.annotate('', xy=(3.55, 2.0), xytext=(2.85, 2.0),
            arrowprops=dict(arrowstyle='->', color='#2980B9', lw=2))

# Box 2
ax.text(5.0, 2.0,
        'Cover the target factor\n(e.g. cover $(x+1)$)\nand set $x = -1$',
        ha='center', va='center', fontsize=10.5,
        bbox=box_style)

# Arrow 2
ax.annotate('', xy=(7.05, 2.0), xytext=(6.35, 2.0),
            arrowprops=dict(arrowstyle='->', color='#2980B9', lw=2))

# Box 3
ax.text(8.5, 2.0,
        'Evaluate the rest:\n$k_1 = \\dfrac{2(-1)^2+9(-1)-11}{(-1-2)(-1+3)}$\n$= \\dfrac{-18}{-6} = 3$',
        ha='center', va='center', fontsize=10.5,
        bbox=result_style)

# Footer
ax.text(5.0, 0.45,
        'Repeat for each distinct factor to find all coefficients.',
        ha='center', va='center', fontsize=10,
        color='#555555', style='italic')

# Step labels
for x_pos, label in zip([1.5, 5.0, 8.5], ['Step 1', 'Step 2', 'Step 3']):
    ax.text(x_pos, 3.55, label, ha='center', va='center', fontsize=9,
            color='#2980B9', fontweight='bold')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777147956234-lae1jhkd.png", dpi=150, bbox_inches="tight")