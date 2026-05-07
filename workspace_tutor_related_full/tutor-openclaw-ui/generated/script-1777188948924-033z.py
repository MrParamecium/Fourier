import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch

fig, axes = plt.subplots(1, 2, figsize=(12, 6))
fig.patch.set_facecolor('white')

# --- Left panel: Rectangular form ---
ax1 = axes[0]
ax1.set_facecolor('#f0f4ff')
ax1.set_xlim(0, 1)
ax1.set_ylim(0, 1)
ax1.axis('off')

# Title box
rect1 = FancyBboxPatch((0.05, 0.78), 0.90, 0.16,
    boxstyle='round,pad=0.02', linewidth=2,
    edgecolor='#2255aa', facecolor='#2255aa')
ax1.add_patch(rect1)
ax1.text(0.50, 0.86, 'Rectangular Form', ha='center', va='center',
    fontsize=15, fontweight='bold', color='white')
ax1.text(0.50, 0.79, r'$z = a + jb$', ha='center', va='center',
    fontsize=13, color='white')

# Best for label
ax1.text(0.50, 0.68, 'Best for:', ha='center', va='center',
    fontsize=13, fontweight='bold', color='#2255aa')

# Operations
ops_rect = ['Addition', 'Subtraction']
for i, op in enumerate(ops_rect):
    ax1.text(0.50, 0.58 - i*0.09, f'\u2713  {op}', ha='center', va='center',
        fontsize=12, color='#1a7a1a')

# Divider
ax1.axhline(y=0.36, xmin=0.05, xmax=0.95, color='#aaaaaa', linewidth=1)

# Example
ax1.text(0.50, 0.30, 'Example:', ha='center', va='center',
    fontsize=11, fontweight='bold', color='#555555')
ax1.text(0.50, 0.21, r'$(3+j4)+(2+j3)$', ha='center', va='center',
    fontsize=11, color='#333333')
ax1.text(0.50, 0.13, r'$= 5 + j7$', ha='center', va='center',
    fontsize=12, fontweight='bold', color='#2255aa')
ax1.text(0.50, 0.05, 'Add real parts, add imaginary parts', ha='center', va='center',
    fontsize=9, color='#777777', style='italic')

# --- Right panel: Polar form ---
ax2 = axes[1]
ax2.set_facecolor('#fff4f0')
ax2.set_xlim(0, 1)
ax2.set_ylim(0, 1)
ax2.axis('off')

# Title box
rect2 = FancyBboxPatch((0.05, 0.78), 0.90, 0.16,
    boxstyle='round,pad=0.02', linewidth=2,
    edgecolor='#aa3300', facecolor='#aa3300')
ax2.add_patch(rect2)
ax2.text(0.50, 0.86, 'Polar Form', ha='center', va='center',
    fontsize=15, fontweight='bold', color='white')
ax2.text(0.50, 0.79, r'$z = re^{j\theta}$', ha='center', va='center',
    fontsize=13, color='white')

# Best for label
ax2.text(0.50, 0.68, 'Best for:', ha='center', va='center',
    fontsize=13, fontweight='bold', color='#aa3300')

# Operations
ops_polar = ['Multiplication', 'Division', 'Powers', 'Roots']
for i, op in enumerate(ops_polar):
    ax2.text(0.50, 0.59 - i*0.075, f'\u2713  {op}', ha='center', va='center',
        fontsize=12, color='#1a7a1a')

# Divider
ax2.axhline(y=0.30, xmin=0.05, xmax=0.95, color='#aaaaaa', linewidth=1)

# Example
ax2.text(0.50, 0.24, 'Example (division):', ha='center', va='center',
    fontsize=11, fontweight='bold', color='#555555')
ax2.text(0.50, 0.16, r'$\dfrac{5e^{j53.1^\circ}}{\sqrt{13}\,e^{j56.3^\circ}}$',
    ha='center', va='center', fontsize=11, color='#333333')
ax2.text(0.50, 0.07, r'$= \dfrac{5}{\sqrt{13}}\,e^{-j3.2^\circ}$',
    ha='center', va='center', fontsize=12, fontweight='bold', color='#aa3300')

# Overall title
fig.suptitle('Choosing the Right Form for Complex Arithmetic',
    fontsize=16, fontweight='bold', color='#222222', y=1.01)

plt.tight_layout(pad=1.5)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777188948924-oof9wy5u.png", dpi=150, bbox_inches="tight")