import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np

fig, ax = plt.subplots(figsize=(7, 6))
ax.set_facecolor('white')
fig.patch.set_facecolor('white')

# Axis limits
ax.set_xlim(-1, 5)
ax.set_ylim(-3.5, 3.5)

# Draw axes
ax.axhline(0, color='black', linewidth=1.2, zorder=2)
ax.axvline(0, color='black', linewidth=1.2, zorder=2)

# Axis arrows
ax.annotate('', xy=(5, 0), xytext=(4.7, 0),
            arrowprops=dict(arrowstyle='->', color='black', lw=1.2))
ax.annotate('', xy=(0, 3.5), xytext=(0, 3.2),
            arrowprops=dict(arrowstyle='->', color='black', lw=1.2))

# Axis labels
ax.text(4.85, -0.28, 'Real axis', fontsize=10, ha='right', color='black')
ax.text(0.12, 3.35, 'Imaginary axis', fontsize=10, ha='left', color='black')
ax.text(-0.15, -0.22, '0', fontsize=10, ha='right', color='black')

# Point z = 3 + 2j
a, b = 3, 2
ax.plot(a, b, 'o', color='royalblue', markersize=9, zorder=5)
ax.text(a + 0.12, b + 0.15, r'$z = a + jb$' + '\n' + r'$(3 + 2j)$',
        fontsize=10, color='royalblue', va='bottom')

# Point z* = 3 - 2j
ax.plot(a, -b, 's', color='tomato', markersize=8, zorder=5, alpha=0.75)
ax.text(a + 0.12, -b - 0.25, r'$z^* = a - jb$' + '\n' + r'$(3 - 2j)$',
        fontsize=10, color='tomato', va='top')

# Dashed projections for z
ax.plot([a, a], [0, b], '--', color='royalblue', linewidth=1.0, alpha=0.7)
ax.plot([0, a], [b, b], '--', color='royalblue', linewidth=1.0, alpha=0.7)

# Dashed projections for z*
ax.plot([a, a], [0, -b], '--', color='tomato', linewidth=1.0, alpha=0.5)
ax.plot([0, a], [-b, -b], '--', color='tomato', linewidth=1.0, alpha=0.5)

# Axis tick labels for a and b
ax.text(a, -0.22, r'$a$', fontsize=10, ha='center', color='black')
ax.text(-0.18, b, r'$b$', fontsize=10, ha='right', va='center', color='black')
ax.text(-0.18, -b, r'$-b$', fontsize=10, ha='right', va='center', color='black')

# Magnitude line r from origin to z
ax.plot([0, a], [0, b], '-', color='darkgreen', linewidth=1.8, zorder=4)
mid_r = (a / 2 - 0.35, b / 2 + 0.1)
ax.text(mid_r[0], mid_r[1], r'$r = |z|$', fontsize=10, color='darkgreen', rotation=33)

# Angle arc theta
theta_val = np.arctan2(b, a)
theta_deg = np.degrees(theta_val)
arc = patches.Arc((0, 0), 1.1, 1.1, angle=0,
                   theta1=0, theta2=theta_deg,
                   color='darkorange', linewidth=1.5)
ax.add_patch(arc)
ax.text(0.72, 0.22, r'$\theta$', fontsize=11, color='darkorange')

# Reflection label
ax.annotate('', xy=(a, -b), xytext=(a, b),
            arrowprops=dict(arrowstyle='<->', color='gray',
                            lw=1.0, linestyle='dashed'))
ax.text(a + 0.55, 0, 'conjugate\nreflection', fontsize=8.5,
        color='gray', va='center', ha='left')

# Grid
ax.set_xticks(range(-1, 6))
ax.set_yticks(range(-3, 4))
ax.grid(True, linestyle=':', linewidth=0.5, alpha=0.5, color='gray')
ax.tick_params(labelsize=9)

ax.set_title('The Complex Plane (Gauss Geometric View)', fontsize=12, pad=10)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777184359737-8whgqp58.png", dpi=150, bbox_inches="tight")