import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 2, figsize=(4.6, 3.6))

# Left plot: Complex plane with z = 3 + 4j and z* = 3 - 4j
ax = axes[0]
ax.set_xlim(-1, 5)
ax.set_ylim(-5, 5)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3, linewidth=0.5)
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")
ax.set_xlabel("Real", fontsize=10, loc='right')
ax.set_ylabel("Imaginary", fontsize=10, loc='top')

# Plot z and z*
z_real, z_imag = 3, 4
z_conj_real, z_conj_imag = 3, -4

ax.plot([0, z_real], [0, z_imag], 'b-', linewidth=2, label='z')
ax.plot(z_real, z_imag, 'bo', markersize=8)
ax.annotate('z = 3+4j', xy=(z_real, z_imag), xytext=(8, 8), 
            textcoords='offset points', fontsize=9, color='blue')

ax.plot([0, z_conj_real], [0, z_conj_imag], 'r--', linewidth=2, label='z*')
ax.plot(z_conj_real, z_conj_imag, 'ro', markersize=8)
ax.annotate('z* = 3−4j', xy=(z_conj_real, z_conj_imag), xytext=(8, -12), 
            textcoords='offset points', fontsize=9, color='red')

ax.axhline(y=0, color='k', linewidth=0.5)
ax.axvline(x=0, color='k', linewidth=0.5)
ax.set_title('Rectangular Form & Conjugate', fontsize=10, pad=8)
ax.legend(loc='upper left', fontsize=9)

# Right plot: Polar form with r and θ
ax = axes[1]
ax.set_xlim(-1, 5.5)
ax.set_ylim(-1, 5.5)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3, linewidth=0.5)
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")
ax.set_xlabel("Real", fontsize=10, loc='right')
ax.set_ylabel("Imaginary", fontsize=10, loc='top')

# Plot z in polar form
r = 5
theta = np.arctan2(4, 3)
z_real, z_imag = 3, 4

# Radial line
ax.plot([0, z_real], [0, z_imag], 'g-', linewidth=2.5)
ax.plot(z_real, z_imag, 'go', markersize=8)

# Angle arc
angle_arc = np.linspace(0, theta, 30)
arc_r = 1.2
ax.plot(arc_r * np.cos(angle_arc), arc_r * np.sin(angle_arc), 'purple', linewidth=1.5)

# Labels
ax.annotate('r = 5', xy=(1.5, 2.2), xytext=(5, 5), 
            textcoords='offset points', fontsize=9, color='green')
ax.annotate('θ', xy=(1.3, 0.3), xytext=(5, 0), 
            textcoords='offset points', fontsize=10, color='purple')
ax.annotate('z = r(cosθ + j sinθ)\n= re^(jθ)', xy=(3, 4), xytext=(10, -15), 
            textcoords='offset points', fontsize=8.5, color='darkgreen',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightyellow', alpha=0.7))

ax.axhline(y=0, color='k', linewidth=0.5)
ax.axvline(x=0, color='k', linewidth=0.5)
ax.set_title('Polar Form & Euler', fontsize=10, pad=8)

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776945337751-a5c1fb68.png", dpi=150, bbox_inches="tight")
