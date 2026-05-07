import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 2, figsize=(4.6, 3.6))

# Left plot: Rectangular form z = a + jb
ax = axes[0]
a, b = 3, 4
z_real = a
z_imag = b

# Draw axes through origin
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

# Plot point z
ax.plot(a, b, 'ro', markersize=8, label='z')

# Draw dashed lines to axes
ax.plot([a, a], [0, b], 'k--', linewidth=0.8, alpha=0.5)
ax.plot([0, a], [b, b], 'k--', linewidth=0.8, alpha=0.5)

# Draw radius line
ax.plot([0, a], [0, b], 'b-', linewidth=1.5, alpha=0.7)

# Annotate point
ax.annotate('z = 3 + 4j', xy=(a, b), xytext=(8, 8), 
            textcoords='offset points', fontsize=10, fontweight='bold')

# Annotate coordinates
ax.annotate('a = 3', xy=(a, 0), xytext=(0, -12), 
            textcoords='offset points', fontsize=9, ha='center')
ax.annotate('b = 4', xy=(0, b), xytext=(-18, 0), 
            textcoords='offset points', fontsize=9, ha='right')

# Annotate conjugate
ax.plot(a, -b, 'go', markersize=8, alpha=0.6)
ax.annotate("z* = 3 - 4j", xy=(a, -b), xytext=(8, -12), 
            textcoords='offset points', fontsize=9, color='green')

ax.set_xlim(-1, 5)
ax.set_ylim(-5, 5)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3, linewidth=0.5)
ax.set_xlabel('Real', fontsize=10, loc='right')
ax.set_ylabel('Imaginary', fontsize=10, loc='top')
ax.set_title('Rectangular Form', fontsize=11, fontweight='bold', pad=8)

# Right plot: Polar form z = r(cos θ + j sin θ)
ax = axes[1]

# Draw axes through origin
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

# Polar coordinates
r = 5
theta = np.arctan2(4, 3)  # angle for z = 3 + 4j
a_polar = r * np.cos(theta)
b_polar = r * np.sin(theta)

# Plot point
ax.plot(a_polar, b_polar, 'ro', markersize=8)

# Draw radius line
ax.plot([0, a_polar], [0, b_polar], 'b-', linewidth=1.5, alpha=0.7)

# Draw angle arc
angle_arc = np.linspace(0, theta, 30)
arc_r = 1.2
ax.plot(arc_r * np.cos(angle_arc), arc_r * np.sin(angle_arc), 'purple', linewidth=1.2)

# Annotate
ax.annotate('z = r(cos θ + j sin θ)', xy=(a_polar, b_polar), xytext=(8, 8), 
            textcoords='offset points', fontsize=10, fontweight='bold')
ax.annotate('r = 5', xy=(a_polar/2, b_polar/2), xytext=(-25, 5), 
            textcoords='offset points', fontsize=9, color='blue')
ax.annotate('θ', xy=(1.5, 0.5), xytext=(0, 0), 
            textcoords='offset points', fontsize=10, color='purple', fontweight='bold')

ax.set_xlim(-1, 5.5)
ax.set_ylim(-1, 5.5)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3, linewidth=0.5)
ax.set_xlabel('Real', fontsize=10, loc='right')
ax.set_ylabel('Imaginary', fontsize=10, loc='top')
ax.set_title('Polar Form', fontsize=11, fontweight='bold', pad=8)

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776945201818-27e884e8.png", dpi=150, bbox_inches="tight")
