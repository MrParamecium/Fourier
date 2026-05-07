import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, ax = plt.subplots(figsize=(7, 6))
fig.patch.set_facecolor('white')
ax.set_facecolor('white')

# Axis limits
ax.set_xlim(-1, 5)
ax.set_ylim(-4, 4)

# Draw axes
ax.axhline(0, color='black', linewidth=1.2)
ax.axvline(0, color='black', linewidth=1.2)

# Axis labels
ax.set_xlabel('Real axis', fontsize=12)
ax.set_ylabel('Imaginary axis', fontsize=12)
ax.set_title('Preview: The Complex Plane', fontsize=13, fontweight='bold')

# Points
a, b = 3, 2

# Dashed projection lines for z
ax.plot([a, a], [0, b], 'b--', linewidth=1.0, alpha=0.7)
ax.plot([0, a], [b, b], 'b--', linewidth=1.0, alpha=0.7)

# Dashed projection lines for z*
ax.plot([a, a], [0, -b], 'r--', linewidth=1.0, alpha=0.7)
ax.plot([0, a], [-b, -b], 'r--', linewidth=1.0, alpha=0.7)

# Arrow from origin to z
ax.annotate('', xy=(a, b), xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='blue', lw=2.0))

# Arrow from origin to z*
ax.annotate('', xy=(a, -b), xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='red', lw=1.5, linestyle='dashed'))

# Plot points
ax.plot(a, b, 'bo', markersize=8)
ax.plot(a, -b, 'ro', markersize=8)

# Labels for points
ax.text(a + 0.15, b + 0.15, r'$z = a + jb$', fontsize=11, color='blue', fontweight='bold')
ax.text(a + 0.15, -b - 0.35, r'$z^* = a - jb$', fontsize=11, color='red', fontweight='bold')

# Label r
mid_x, mid_y = a / 2 - 0.35, b / 2 + 0.15
ax.text(mid_x, mid_y, r'$r$', fontsize=12, color='blue')

# Angle arc theta
theta_vals = np.linspace(0, np.arctan2(b, a), 60)
arc_r = 0.9
ax.plot(arc_r * np.cos(theta_vals), arc_r * np.sin(theta_vals), color='blue', linewidth=1.5)
ax.text(1.05, 0.28, r'$\theta$', fontsize=12, color='blue')

# Axis tick labels
ax.set_xticks([0, a])
ax.set_xticklabels(['0', 'a'], fontsize=11)
ax.set_yticks([-b, 0, b])
ax.set_yticklabels(['-b', '0', 'b'], fontsize=11)

# Reflection label
ax.annotate('Conjugate\n(reflection across\nreal axis)', xy=(a, -b), xytext=(3.6, -3.2),
            fontsize=9, color='red',
            arrowprops=dict(arrowstyle='->', color='red', lw=1.0))

ax.grid(True, linestyle=':', alpha=0.4)
plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777189290337-yvqd0ddg.png", dpi=150, bbox_inches="tight")