import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch

fig, ax = plt.subplots(figsize=(10, 5))
ax.set_xlim(0, 10)
ax.set_ylim(0, 5)
ax.axis('off')
fig.patch.set_facecolor('white')

# Title
ax.text(5, 4.6, 'Repeated Factor: Denominator Structure → Partial Fraction Template',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#1a1a2e')

# --- Top row: denominator factor boxes ---
# Box 1: (x+1)^3 highlighted
bbox1 = FancyBboxPatch((0.4, 3.0), 2.8, 0.9, boxstyle='round,pad=0.1',
                        linewidth=2.5, edgecolor='#e63946', facecolor='#fff0f0')
ax.add_patch(bbox1)
ax.text(1.8, 3.45, r'$(x+1)^3$', ha='center', va='center', fontsize=15, color='#e63946', fontweight='bold')
ax.text(1.8, 3.05, 'REPEATED (order 3)', ha='center', va='center', fontsize=8, color='#e63946', style='italic')

# Box 2: (x+2) simple
bbox2 = FancyBboxPatch((3.6, 3.0), 2.2, 0.9, boxstyle='round,pad=0.1',
                        linewidth=2, edgecolor='#457b9d', facecolor='#f0f4ff')
ax.add_patch(bbox2)
ax.text(4.7, 3.45, r'$(x+2)$', ha='center', va='center', fontsize=15, color='#457b9d', fontweight='bold')
ax.text(4.7, 3.05, 'simple (order 1)', ha='center', va='center', fontsize=8, color='#457b9d', style='italic')

# Arrow down
ax.annotate('', xy=(5, 2.55), xytext=(5, 2.95),
            arrowprops=dict(arrowstyle='->', color='#333333', lw=2))
ax.text(5.15, 2.75, 'expand into template', ha='left', va='center', fontsize=9, color='#555555')

# --- Bottom row: template ---
template_bg = FancyBboxPatch((0.3, 1.1), 9.4, 1.2, boxstyle='round,pad=0.1',
                              linewidth=2, edgecolor='#2d6a4f', facecolor='#f0fff4')
ax.add_patch(template_bg)

ax.text(0.7, 1.7,
        r'$\dfrac{a_0}{(x+1)^3}$  $+$  $\dfrac{a_1}{(x+1)^2}$  $+$  $\dfrac{a_2}{x+1}$  $+$  $\dfrac{k}{x+2}$',
        ha='left', va='center', fontsize=14, color='#1b4332')

# Bracket labels under template terms
for xpos, label, col in [(1.05, 'power 3', '#e63946'), (2.85, 'power 2', '#e63946'),
                          (4.55, 'power 1', '#e63946'), (6.5, 'simple', '#457b9d')]:
    ax.text(xpos, 1.18, label, ha='center', va='center', fontsize=8,
            color=col, style='italic')

# Red side note
ax.text(9.75, 1.7, 'Do not skip\npowers!', ha='center', va='center', fontsize=10,
        color='white', fontweight='bold',
        bbox=dict(boxstyle='round,pad=0.4', facecolor='#e63946', edgecolor='#c1121f', linewidth=1.5))

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777195949188-s6vioujj.png", dpi=150, bbox_inches="tight")