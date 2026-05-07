import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.4))

# Plot the complex number z = 5 + 12j
a, b = 5, 12
r = np.sqrt(a**2 + b**2)
theta = np.arctan2(b, a)

# Draw axes through origin
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

# Plot the point
ax.plot(a, b, 'ro', markersize=8, zorder=3)

# Draw vector from origin to point
ax.arrow(0, 0, a*0.95, b*0.95, head_width=0.5, head_length=0.4, 
         fc='blue', ec='blue', linewidth=1.5, zorder=2)

# Draw right triangle (real and imaginary components)
ax.plot([0, a], [0, 0], 'k--', linewidth=1, alpha=0.5, zorder=1)
ax.plot([a, a], [0, b], 'k--', linewidth=1, alpha=0.5, zorder=1)

# Angle arc
angle_arc = np.linspace(0, theta, 30)
arc_r = 2.5
ax.plot(arc_r * np.cos(angle_arc), arc_r * np.sin(angle_arc), 'g-', linewidth=1.2, zorder=1)

# Labels for components
ax.annotate('$a=5$', xy=(2.5, 0), xytext=(0, -12), textcoords='offset points', 
            ha='center', fontsize=10, color='black')
ax.annotate('$b=12$', xy=(a, b/2), xytext=(12, 0), textcoords='offset points', 
            ha='left', fontsize=10, color='black')

# Label for magnitude
mid_x, mid_y = a/2 - 1, b/2 + 1
ax.annotate('$r=13$', xy=(mid_x, mid_y), xytext=(0, 0), textcoords='offset points', 
            ha='center', fontsize=11, color='blue', weight='bold')

# Label for angle
ax.annotate('$\\theta$', xy=(3.5, 1), xytext=(0, 0), textcoords='offset points', 
            ha='center', fontsize=10, color='green')

# Label the point
ax.annotate('$z=5+12j$', xy=(a, b), xytext=(8, 8), textcoords='offset points', 
            ha='left', fontsize=10, color='red', weight='bold')

# Axis labels
ax.set_xlabel('Real', fontsize=10, loc='right')
ax.set_ylabel('Imaginary', fontsize=10, loc='top')

# Set limits
ax.set_xlim(-2, 16)
ax.set_ylim(-2, 16)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3, linestyle=':', linewidth=0.5)
ax.set_xticks(range(0, 16, 5))
ax.set_yticks(range(0, 16, 5))

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776951434760-ae53fc58.png", dpi=150, bbox_inches="tight")
