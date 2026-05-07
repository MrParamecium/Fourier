import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.4))

# Complex number z = 3 + 4j
a, b = 3, 4
r = np.sqrt(a**2 + b**2)
theta = np.arctan2(b, a)

# Plot axes through origin
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

# Plot the complex number point
ax.plot(a, b, 'ro', markersize=8, zorder=3)

# Plot the magnitude vector from origin to point
ax.arrow(0, 0, a*0.95, b*0.95, head_width=0.25, head_length=0.2, 
         fc='blue', ec='blue', linewidth=2, zorder=2)

# Plot projections (dashed lines)
ax.plot([a, a], [0, b], 'k--', linewidth=1, alpha=0.5, zorder=1)
ax.plot([0, a], [b, b], 'k--', linewidth=1, alpha=0.5, zorder=1)

# Plot angle arc
angle_arc = np.linspace(0, theta, 50)
arc_r = 1.2
ax.plot(arc_r * np.cos(angle_arc), arc_r * np.sin(angle_arc), 'g-', linewidth=1.5, zorder=2)

# Annotations
ax.annotate('z = 3 + 4j', xy=(a, b), xytext=(15, 15), 
            textcoords='offset points', fontsize=11, fontweight='bold')
ax.annotate('r = 5', xy=(a/2, b/2), xytext=(10, -20), 
            textcoords='offset points', fontsize=10, color='blue', fontweight='bold')
ax.annotate('θ', xy=(0.8, 0.3), xytext=(5, 5), 
            textcoords='offset points', fontsize=10, color='green')
ax.annotate('a = 3', xy=(a/2, -0.3), xytext=(0, -15), 
            textcoords='offset points', fontsize=9, ha='center')
ax.annotate('b = 4', xy=(-0.5, b/2), xytext=(-25, 0), 
            textcoords='offset points', fontsize=9, ha='right')

# Set axis labels
ax.set_xlabel('Real', fontsize=11, loc='right')
ax.set_ylabel('Imaginary', fontsize=11, loc='top')

# Set limits and grid
ax.set_xlim(-1, 5.5)
ax.set_ylim(-1, 5.5)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3, linestyle=':', linewidth=0.8)
ax.set_xticks(range(0, 6))
ax.set_yticks(range(0, 6))

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776948412808-4eac4b9d.png", dpi=150, bbox_inches="tight")
