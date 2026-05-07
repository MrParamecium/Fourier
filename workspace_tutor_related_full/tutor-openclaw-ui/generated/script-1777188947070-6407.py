import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(7, 7))
ax.set_facecolor('white')
fig.patch.set_facecolor('white')

ax.axhline(0, color='black', linewidth=1.2)
ax.axvline(0, color='black', linewidth=1.2)
ax.grid(True, linestyle='--', linewidth=0.5, alpha=0.5)
ax.set_xlim(-4, 4)
ax.set_ylim(-4, 4)
ax.set_xlabel('Real axis', fontsize=12)
ax.set_ylabel('Imaginary axis', fontsize=12)
ax.set_title('Quadrant-Aware Angle Reading\n(Principal angles shown)', fontsize=13, fontweight='bold')

points = [
    (2,  3,  'QI',   56.3,  'right',  'bottom', '#1a6faf'),
    (-2, 1,  'QII',  153.4, 'left',   'bottom', '#d62728'),
    (-2, -3, 'QIII', -123.7,'left',   'top',    '#2ca02c'),
    (1,  -3, 'QIV',  -71.6, 'right',  'top',    '#ff7f0e'),
]

for (x, y, quad, angle, ha, va, color) in points:
    ax.plot([0, x], [0, y], color=color, linewidth=1.8, zorder=2)
    ax.plot(x, y, 'o', color=color, markersize=9, zorder=3)
    label = f'{quad}: ({x}{y:+d}j)\n\u03b8 = {angle}\u00b0'
    offset_x = 0.18 if ha == 'right' else -0.18
    offset_y = 0.18 if va == 'bottom' else -0.18
    ax.annotate(
        label,
        xy=(x, y),
        xytext=(x + offset_x * 3.5, y + offset_y * 3.5),
        fontsize=9.5,
        color=color,
        ha=ha,
        va=va,
        bbox=dict(boxstyle='round,pad=0.3', fc='white', ec=color, alpha=0.85),
        arrowprops=dict(arrowstyle='->', color=color, lw=1.2)
    )

ax.text(2.5,  2.5,  'Q I',   fontsize=11, color='gray', alpha=0.5, ha='center')
ax.text(-2.5, 2.5,  'Q II',  fontsize=11, color='gray', alpha=0.5, ha='center')
ax.text(-2.5, -2.5, 'Q III', fontsize=11, color='gray', alpha=0.5, ha='center')
ax.text(2.5,  -2.5, 'Q IV',  fontsize=11, color='gray', alpha=0.5, ha='center')

ax.text(3.7, 0.15, 'Re', fontsize=11, fontweight='bold')
ax.text(0.1, 3.7,  'Im', fontsize=11, fontweight='bold')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777188947070-pzqdezq0.png", dpi=150, bbox_inches="tight")