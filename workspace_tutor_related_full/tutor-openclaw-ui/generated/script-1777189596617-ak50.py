import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, ax = plt.subplots(figsize=(7, 7))
ax.set_facecolor('white')
fig.patch.set_facecolor('white')

a = -3
b = 4
# phasor point is (a, -b) = (-3, -4)
px, py = a, -b

# Draw axes
ax.axhline(0, color='black', linewidth=1.2, zorder=1)
ax.axvline(0, color='black', linewidth=1.2, zorder=1)
ax.annotate('', xy=(2.5, 0), xytext=(-5.5, 0),
            arrowprops=dict(arrowstyle='->', color='black', lw=1.2))
ax.annotate('', xy=(0, 2.5), xytext=(0, -5.5),
            arrowprops=dict(arrowstyle='->', color='black', lw=1.2))
ax.text(2.6, 0.1, 'Re', fontsize=13, fontweight='bold')
ax.text(0.1, 2.6, 'Im', fontsize=13, fontweight='bold')

# Horizontal component: origin to (a, 0)
ax.annotate('', xy=(px, 0), xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='steelblue', lw=2.0))
ax.text(px/2 - 0.1, 0.25, r'$a = -3$', fontsize=12, color='steelblue', ha='center')

# Vertical component: (a, 0) to (a, -b)
ax.annotate('', xy=(px, py), xytext=(px, 0),
            arrowprops=dict(arrowstyle='->', color='darkorange', lw=2.0))
ax.text(px - 0.7, py/2, r'$-b = -4$', fontsize=12, color='darkorange', ha='center')

# Resultant phasor: origin to (a, -b)
ax.annotate('', xy=(px, py), xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='crimson', lw=2.5))
mid_x = px/2 + 0.4
mid_y = py/2 - 0.3
ax.text(mid_x, mid_y, r'$C = \sqrt{a^2+b^2} = 5$', fontsize=12, color='crimson', ha='center')

# Mark the point
ax.plot(px, py, 'o', color='crimson', markersize=8, zorder=5)
ax.text(px - 0.15, py - 0.35, r'$a - jb = -3 - j4$', fontsize=11, color='crimson', ha='right')

# Angle arc
angle_rad = np.arctan2(py, px)  # in radians, will be in Q3
theta_deg = np.degrees(angle_rad)
theta_display = theta_deg  # approx -126.9 degrees
arc_angles = np.linspace(0, angle_rad, 200)
arc_r = 1.2
ax.plot(arc_r * np.cos(arc_angles), arc_r * np.sin(arc_angles), color='purple', lw=1.5)
ax.text(1.0 * np.cos(angle_rad/2) - 0.5, 1.0 * np.sin(angle_rad/2) - 0.2,
        r'$\theta \approx -126.9°$', fontsize=11, color='purple')

# Dashed construction lines
ax.plot([px, px], [0, py], linestyle='--', color='gray', lw=1.0, zorder=0)
ax.plot([0, px], [0, 0], linestyle='--', color='gray', lw=1.0, zorder=0)

# Key note box
ax.text(-5.5, 2.5, 'Use $a - jb$, not $a + jb$',
        fontsize=12, color='darkred', fontweight='bold',
        bbox=dict(boxstyle='round,pad=0.4', facecolor='lightyellow', edgecolor='darkred', lw=1.5))

ax.set_xlim(-6, 3)
ax.set_ylim(-6, 3)
ax.set_aspect('equal')
ax.grid(True, linestyle=':', alpha=0.4)
ax.set_title('Phasor Diagram: $a\\cos(\\omega_0 t) + b\\sin(\\omega_0 t)$ with $a=-3,\\, b=4$',
             fontsize=13, pad=12)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777189596617-j7u1i0l1.png", dpi=150, bbox_inches="tight")