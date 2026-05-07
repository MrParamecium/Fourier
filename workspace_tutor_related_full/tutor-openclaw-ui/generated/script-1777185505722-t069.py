import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, ax = plt.subplots(figsize=(10, 5))
ax.set_xlim(0, 10)
ax.set_ylim(0, 6)
ax.axis('off')
fig.patch.set_facecolor('white')

# Divider line
ax.axvline(x=5, color='#cccccc', linewidth=2, ymin=0.05, ymax=0.95)

# Left column background
left_bg = mpatches.FancyBboxPatch((0.2, 0.5), 4.4, 5.0,
    boxstyle='round,pad=0.1', linewidth=1.5,
    edgecolor='#2c7bb6', facecolor='#eaf4fb')
ax.add_patch(left_bg)

# Right column background
right_bg = mpatches.FancyBboxPatch((5.4, 0.5), 4.4, 5.0,
    boxstyle='round,pad=0.1', linewidth=1.5,
    edgecolor='#d7191c', facecolor='#fff0f0')
ax.add_patch(right_bg)

# Left column title
ax.text(2.4, 5.1, 'Rectangular Form', fontsize=13, fontweight='bold',
        ha='center', va='center', color='#2c7bb6')
ax.text(2.4, 4.6, r'$a + jb$', fontsize=12, ha='center', va='center', color='#2c7bb6')

# Left column bullets
left_bullets = [
    u'\u2713  Best for Addition',
    u'\u2713  Best for Subtraction',
]
for i, bullet in enumerate(left_bullets):
    ax.text(1.0, 3.7 - i * 0.85, bullet, fontsize=11.5,
            ha='left', va='center', color='#1a1a1a')

# Right column title
ax.text(7.6, 5.1, 'Polar Form', fontsize=13, fontweight='bold',
        ha='center', va='center', color='#d7191c')
ax.text(7.6, 4.6, r'$re^{j\theta}$', fontsize=12, ha='center', va='center', color='#d7191c')

# Right column bullets
right_bullets = [
    u'\u2713  Best for Multiplication',
    u'\u2713  Best for Division',
    u'\u2713  Best for Powers',
    u'\u2713  Best for Roots',
]
for i, bullet in enumerate(right_bullets):
    ax.text(5.6, 3.7 - i * 0.72, bullet, fontsize=11.5,
            ha='left', va='center', color='#1a1a1a')

# Warning box at bottom
warn_bg = mpatches.FancyBboxPatch((0.5, 0.05), 9.0, 0.75,
    boxstyle='round,pad=0.08', linewidth=1.5,
    edgecolor='#e67e00', facecolor='#fff8e1')
ax.add_patch(warn_bg)
ax.text(5.0, 0.43, u'\u26a0  Do NOT add or subtract directly in polar form.',
        fontsize=11, ha='center', va='center', color='#b35900', fontweight='bold')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777185505722-9zmgyjoc.png", dpi=150, bbox_inches="tight")