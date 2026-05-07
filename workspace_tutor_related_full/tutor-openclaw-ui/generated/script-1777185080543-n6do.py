import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, ax = plt.subplots(figsize=(7, 7))
ax.set_facecolor('white')
fig.patch.set_facecolor('white')

# Axes
ax.axhline(0, color='black', linewidth=1.2)
ax.axvline(0, color='black', linewidth=1.2)
ax.set_xlim(-1, 5)
ax.set_ylim(-4, 4)
ax.set_xlabel('Real axis', fontsize=13)
ax.set_ylabel('Imaginary axis', fontsize=13)
ax.set_title('Complex Plane: z = 3 + 2j and its conjugate z* = 3 − 2j', fontsize=13, pad=14)
ax.grid(True, linestyle='--', linewidth=0.5, alpha=0.5)
ax.set_xticks(range(-1, 6))
ax.set_yticks(range(-4, 5))

# Points
z_real, z_imag = 3, 2
zc_real, zc_imag = 3, -2

# Dashed projection lines for z
ax.plot([z_real, z_real], [0, z_imag], color='steelblue', linestyle='--', linewidth=1.2)
ax.plot([0, z_real], [z_imag, z_imag], color='steelblue', linestyle='--', linewidth=1.2)

# Dashed projection lines for z*
ax.plot([zc_real, zc_real], [0, zc_imag], color='tomato', linestyle='--', linewidth=1.2)
ax.plot([0, zc_real], [zc_imag, zc_imag], color='tomato', linestyle='--', linewidth=1.2)

# Radius line from origin to z
r = np.sqrt(z_real**2 + z_imag**2)
ax.annotate('', xy=(z_real, z_imag), xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='steelblue', lw=2))

# Label r along the radius line
mid_x = z_real / 2 - 0.3
mid_y = z_imag / 2 + 0.2
ax.text(mid_x, mid_y, r'$r = \sqrt{a^2+b^2}$', fontsize=11, color='steelblue')

# Angle arc
theta = np.arctan2(z_imag, z_real)
angle_arc = mpatches.Arc((0, 0), 1.0, 1.0, angle=0,
                          theta1=0, theta2=np.degrees(theta),
                          color='steelblue', linewidth=1.5)
ax.add_patch(angle_arc)
ax.text(0.6, 0.18, r'$\theta$', fontsize=13, color='steelblue')

# Plot z
ax.plot(z_real, z_imag, 'o', color='steelblue', markersize=9, zorder=5)
ax.text(z_real + 0.12, z_imag + 0.18, r'$z = 3 + 2j$', fontsize=12, color='steelblue', fontweight='bold')

# Label a and b for z
ax.text(z_real / 2, -0.35, r'$a = 3$', fontsize=11, color='steelblue', ha='center')
ax.text(z_real + 0.15, z_imag / 2, r'$b = 2$', fontsize=11, color='steelblue', va='center')

# Plot z*
ax.plot(zc_real, zc_imag, 'o', color='tomato', markersize=9, zorder=5)
ax.text(zc_real + 0.12, zc_imag - 0.35, r'$z^* = 3 - 2j$', fontsize=12, color='tomato', fontweight='bold')

# Label b for z* (negative)
ax.text(zc_real + 0.15, zc_imag / 2, r'$-b = -2$', fontsize=11, color='tomato', va='center')

# Reflection arrow annotation
ax.annotate('', xy=(zc_real + 0.05, zc_imag), xytext=(z_real + 0.05, z_imag),
            arrowprops=dict(arrowstyle='<->', color='gray', lw=1.5, linestyle='dotted'))
ax.text(z_real + 0.55, 0, 'reflection\nacross\nreal axis', fontsize=9, color='gray', va='center')

# Origin label
ax.text(-0.25, -0.3, 'O', fontsize=12)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777185080543-3hzwmunm.png", dpi=150, bbox_inches="tight")