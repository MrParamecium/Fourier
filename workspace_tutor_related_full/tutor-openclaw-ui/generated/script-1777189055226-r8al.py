import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch

fig, axes = plt.subplots(1, 2, figsize=(13, 7))
fig.patch.set_facecolor('white')

for ax in axes:
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis('off')
    ax.set_facecolor('white')

# --- Left panel ---
axes[0].text(0.5, 0.97, 'Standard setup for F(x)/x', fontsize=13, fontweight='bold',
             ha='center', va='top', color='#1a1a2e')

axes[0].text(0.5, 0.86,
    r'$\dfrac{F(x)}{x} = \dfrac{5x^2+20x+18}{x(x+2)(x+3)^2}$',
    fontsize=11, ha='center', va='top', color='#1a1a2e')

axes[0].plot([0.1, 0.9], [0.74, 0.74], color='#888888', linewidth=0.8, linestyle='--')

axes[0].text(0.5, 0.70,
    r'$= \dfrac{a_1}{x} + \dfrac{a_2}{x+2} + \dfrac{a_3}{x+3} + \dfrac{a_4}{(x+3)^2}$',
    fontsize=11, ha='center', va='top', color='#1a1a2e')

axes[0].text(0.5, 0.52,
    r'Solving: $a_1=1,\ a_2=1,\ a_3=-2,\ a_4=1$',
    fontsize=10.5, ha='center', va='top', color='#2e4057',
    bbox=dict(boxstyle='round,pad=0.4', facecolor='#eaf4fb', edgecolor='#aad4ee', linewidth=1))

axes[0].text(0.5, 0.38,
    r'$\dfrac{F(x)}{x} = \dfrac{1}{x}+\dfrac{1}{x+2}-\dfrac{2}{x+3}+\dfrac{1}{(x+3)^2}$',
    fontsize=11, ha='center', va='top', color='#1a1a2e')

# Repeated factor note
axes[0].add_patch(mpatches.FancyBboxPatch((0.05, 0.04), 0.90, 0.14,
    boxstyle='round,pad=0.02', facecolor='#fff3cd', edgecolor='#e6a817', linewidth=1.5))
axes[0].text(0.5, 0.14,
    'Repeated factor $(x+3)^2$ needs\nboth $1/(x+3)$ AND $1/(x+3)^2$ terms.',
    fontsize=9.5, ha='center', va='top', color='#7d4e00', style='italic')

# --- Right panel ---
axes[1].text(0.5, 0.97, 'Modified form for F(x)', fontsize=13, fontweight='bold',
             ha='center', va='top', color='#1a1a2e')

axes[1].text(0.5, 0.86,
    r'Multiply both sides by $x$:',
    fontsize=10.5, ha='center', va='top', color='#555555', style='italic')

axes[1].text(0.5, 0.74,
    r'$F(x) = 1 + \dfrac{x}{x+2} - \dfrac{2x}{x+3} + \dfrac{x}{(x+3)^2}$',
    fontsize=12, ha='center', va='top', color='#1a1a2e',
    bbox=dict(boxstyle='round,pad=0.5', facecolor='#eafaf1', edgecolor='#27ae60', linewidth=2))

axes[1].text(0.5, 0.54,
    r'$x \cdot \dfrac{1}{x} = 1$ (constant term)',
    fontsize=10, ha='center', va='top', color='#27ae60')

axes[1].text(0.5, 0.44,
    r'$x \cdot \dfrac{k}{x+\lambda} = \dfrac{kx}{x+\lambda}$ (x-weighted term)',
    fontsize=10, ha='center', va='top', color='#27ae60')

axes[1].add_patch(mpatches.FancyBboxPatch((0.05, 0.04), 0.90, 0.14,
    boxstyle='round,pad=0.02', facecolor='#fdecea', edgecolor='#e74c3c', linewidth=1.5))
axes[1].text(0.5, 0.14,
    'Do NOT leave the answer as F(x)/x.\nAlways multiply back by x at the end.',
    fontsize=9.5, ha='center', va='top', color='#922b21', style='italic')

# --- Arrow between panels ---
fig.text(0.5, 0.58, r'$\times\, x$', fontsize=15, ha='center', va='center',
         color='white',
         bbox=dict(boxstyle='round,pad=0.4', facecolor='#2c3e50', edgecolor='#2c3e50'))
fig.text(0.5, 0.50, u'\u27a1', fontsize=28, ha='center', va='center', color='#2c3e50')

fig.suptitle('Modified Partial Fractions: The Divide-Then-Multiply Pipeline',
             fontsize=14, fontweight='bold', color='#1a1a2e', y=1.01)

plt.tight_layout(pad=1.5)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777189055226-nc9du4lq.png", dpi=150, bbox_inches="tight")