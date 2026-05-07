import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(6, 6))
ax.set_facecolor('white')
fig.patch.set_facecolor('white')

# Axes
ax.axhline(0, color='black', linewidth=1.2)
ax.axvline(0, color='black', linewidth=1.2)

# Dashed projection lines
ax.plot([-2, -2], [0, -3], color='steelblue', linestyle='--', linewidth=1.2, alpha=0.7)
ax.plot([-2, 0], [-3, -3], color='steelblue', linestyle='--', linewidth=1.2, alpha=0.7)

# Radial arrow from origin to point
ax.annotate('', xy=(-2, -3), xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='crimson', lw=2.0))

# Point
ax.plot(-2, -3, 'o', color='crimson', markersize=8, zorder=5)
ax.text(-2 - 0.15, -3 - 0.25, r'$z = -2 - 3j$', fontsize=12, color='crimson',
        ha='right', va='top')

# Angle arc and label
theta_principal = np.radians(-123.7)
theta_arc = np.linspace(0, theta_principal, 200)
r_arc = 0.8
ax.plot(r_arc * np.cos(theta_arc), r_arc * np.sin(theta_arc),
        color='darkorange', linewidth=1.8)
ax.text(0.55, -0.55, r'$\theta \approx -123.7°$', fontsize=10, color='darkorange',
        ha='left', va='top')

# Magnitude label along radial
mid_x, mid_y = -1.0, -1.5
ax.text(mid_x - 0.25, mid_y, r'$r = \sqrt{13}$', fontsize=10, color='crimson',
        ha='right', va='center', rotation=56)

# Axis labels
ax.set_xlabel('Real', fontsize=12)
ax.set_ylabel('Imaginary', fontsize=12)
ax.set_xlim(-4, 2)
ax.set_ylim(-4, 2)
ax.set_xticks(range(-4, 3))
ax.set_yticks(range(-4, 3))
ax.grid(True, linestyle=':', linewidth=0.7, alpha=0.6)
ax.set_title(r'$z = -2 - 3j$ in the Third Quadrant', fontsize=13, pad=12)

# Quadrant labels
ax.text(1.5, 1.5, 'Q I', fontsize=9, color='gray', ha='center', va='center')
ax.text(-2.5, 1.5, 'Q II', fontsize=9, color='gray', ha='center', va='center')
ax.text(-2.5, -3.5, 'Q III', fontsize=9, color='firebrick', ha='center', va='center', fontweight='bold')
ax.text(1.5, -3.5, 'Q IV', fontsize=9, color='gray', ha='center', va='center')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777188928594-5mijyx56.png", dpi=150, bbox_inches="tight")