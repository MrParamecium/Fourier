import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(6, 5))
fig.patch.set_facecolor('white')
ax.set_facecolor('white')

# Axes
ax.axhline(0, color='black', linewidth=1.2)
ax.axvline(0, color='black', linewidth=1.2)

# Point
real_val = 3
imag_val = -2
ax.plot(real_val, imag_val, 'o', color='#1a73e8', markersize=9, zorder=5)

# Dotted projection lines
ax.plot([real_val, real_val], [0, imag_val], linestyle=':', color='#555555', linewidth=1.2)
ax.plot([0, real_val], [imag_val, imag_val], linestyle=':', color='#555555', linewidth=1.2)

# Dashed line from origin to point (magnitude r)
ax.plot([0, real_val], [0, imag_val], linestyle='--', color='#e8710a', linewidth=1.5, label=r'$r = |z|$')

# Magnitude label
mid_x = real_val / 2 + 0.15
mid_y = imag_val / 2 - 0.25
r_val = np.sqrt(real_val**2 + imag_val**2)
ax.text(mid_x, mid_y, r'$r = \sqrt{13}$', fontsize=10, color='#e8710a')

# Angle arc
theta = np.arctan2(imag_val, real_val)
theta_deg = np.degrees(theta)
arc_angles = np.linspace(0, theta, 60)
arc_r = 0.7
ax.plot(arc_r * np.cos(arc_angles), arc_r * np.sin(arc_angles), color='#555555', linewidth=1.0)
ax.text(0.75, -0.35, r'$\theta$', fontsize=11, color='#555555')

# Axis tick labels
ax.set_xticks([0, 3])
ax.set_xticklabels(['0', '3'], fontsize=11)
ax.set_yticks([-2, 0])
ax.set_yticklabels(['-2', '0'], fontsize=11)

# Projection tick labels on axes
ax.text(3, 0.12, '3', fontsize=10, ha='center', color='#1a73e8')
ax.text(-0.18, -2, '-2', fontsize=10, ha='right', va='center', color='#1a73e8')

# Point label
ax.text(real_val + 0.12, imag_val - 0.25, r'$z = 3 - 2j$', fontsize=11, color='#1a73e8')

# Axis labels
ax.set_xlabel('Real', fontsize=12, labelpad=4)
ax.set_ylabel('Imaginary', fontsize=12, labelpad=4)

# Grid
ax.grid(True, linestyle='--', linewidth=0.5, alpha=0.4)

# Limits
ax.set_xlim(-1, 5)
ax.set_ylim(-4, 3)

ax.set_title(r'Complex plane: $z = 3 - 2j$', fontsize=13, pad=10)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777184963181-ihzm2c80.png", dpi=150, bbox_inches="tight")