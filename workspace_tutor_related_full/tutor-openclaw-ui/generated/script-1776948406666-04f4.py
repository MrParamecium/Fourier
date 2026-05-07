import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.4))

# Complex number z = 8 + 6j
a, b = 8, 6
r = np.sqrt(a**2 + b**2)
theta = np.arctan2(b, a)

# Plot axes through origin
ax.axhline(y=0, color='k', linewidth=0.5)
ax.axvline(x=0, color='k', linewidth=0.5)
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

# Plot the point z
ax.plot(a, b, 'ro', markersize=8, zorder=3)

# Plot the magnitude vector from origin to z
ax.arrow(0, 0, a*0.95, b*0.95, head_width=0.4, head_length=0.3, 
         fc='blue', ec='blue', linewidth=1.5, zorder=2)

# Plot right triangle (real and imaginary components)
ax.plot([0, a], [0, 0], 'g--', linewidth=1, alpha=0.6, zorder=1)
ax.plot([a, a], [0, b], 'g--', linewidth=1, alpha=0.6, zorder=1)

# Angle arc
angle_arc = np.linspace(0, theta, 30)
arc_r = 2
ax.plot(arc_r * np.cos(angle_arc), arc_r * np.sin(angle_arc), 'purple', linewidth=1, zorder=1)

# Labels for components
ax.annotate('$a=8$', xy=(4, 0), xytext=(0, -12), textcoords='offset points', 
            ha='center', fontsize=10, color='green')
ax.annotate('$b=6$', xy=(a, 3), xytext=(12, 0), textcoords='offset points', 
            ha='left', fontsize=10, color='green')

# Label for magnitude
ax.annotate('$r=10$', xy=(a/2, b/2), xytext=(-20, 8), textcoords='offset points', 
            ha='center', fontsize=11, color='blue', weight='bold')

# Label for angle
ax.annotate('$\\theta$', xy=(2.5, 0.8), xytext=(5, 5), textcoords='offset points', 
            ha='left', fontsize=10, color='purple')

# Label the point
ax.annotate('$z=8+6j$', xy=(a, b), xytext=(8, 8), textcoords='offset points', 
            ha='left', fontsize=10, weight='bold')

# Axis labels
ax.set_xlabel('Real', fontsize=10, loc='right')
ax.set_ylabel('Imaginary', fontsize=10, loc='top')

# Set limits
ax.set_xlim(-1, 10)
ax.set_ylim(-1, 8)
ax.set_aspect('equal')
ax.grid(True, alpha=0.2, linestyle=':', linewidth=0.5)

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776948406664-486463ab.png", dpi=150, bbox_inches="tight")
