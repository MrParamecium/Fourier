import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.4))

# Plot the complex number z = 8 + 6j
a, b = 8, 6
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
ax.arrow(0, 0, a*0.95, b*0.95, head_width=0.4, head_length=0.3, 
         fc='blue', ec='blue', linewidth=1.5, zorder=2)

# Draw right triangle (real and imaginary components)
ax.plot([0, a], [0, 0], 'k--', linewidth=1, alpha=0.5, zorder=1)
ax.plot([a, a], [0, b], 'k--', linewidth=1, alpha=0.5, zorder=1)

# Angle arc
angle_arc = np.linspace(0, theta, 30)
arc_r = 2
ax.plot(arc_r * np.cos(angle_arc), arc_r * np.sin(angle_arc), 'g-', linewidth=1.2, zorder=2)

# Labels for components
ax.annotate('$a=8$', xy=(4, 0), xytext=(0, -12), textcoords='offset points', 
            ha='center', fontsize=10, color='black')
ax.annotate('$b=6$', xy=(a, 3), xytext=(12, 0), textcoords='offset points', 
            ha='left', fontsize=10, color='black')

# Label the point
ax.annotate('$z=8+6j$', xy=(a, b), xytext=(8, 8), textcoords='offset points', 
            ha='left', fontsize=10, color='red', fontweight='bold')

# Label the magnitude
mid_x, mid_y = a/2 - 0.5, b/2 + 0.5
ax.annotate('$r=10$', xy=(mid_x, mid_y), xytext=(-15, 5), textcoords='offset points', 
            ha='center', fontsize=10, color='blue', fontweight='bold')

# Label the angle
ax.annotate('$\\theta$', xy=(2.2, 0.8), xytext=(0, 0), textcoords='offset points', 
            ha='center', fontsize=9, color='green')

# Set axis limits and labels
ax.set_xlim(-1, 10)
ax.set_ylim(-1, 8)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3, linestyle=':', linewidth=0.5)
ax.set_xlabel('Real', fontsize=10, loc='right')
ax.set_ylabel('Imaginary', fontsize=10, loc='top')

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776948408723-647c4aa7.png", dpi=150, bbox_inches="tight")
