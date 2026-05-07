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
ax.arrow(0, 0, a*0.95, b*0.95, head_width=0.4, head_length=0.3, 
         fc='blue', ec='blue', linewidth=1.5, zorder=2)

# Draw right triangle (real and imaginary components)
ax.plot([0, a], [0, 0], 'k--', linewidth=1, alpha=0.5, zorder=1)
ax.plot([a, a], [0, b], 'k--', linewidth=1, alpha=0.5, zorder=1)

# Annotate the point
ax.annotate('z = 5 + 12j', xy=(a, b), xytext=(8, 8), 
            textcoords='offset points', fontsize=10, fontweight='bold')

# Annotate the magnitude r
mid_x, mid_y = a*0.5, b*0.5
ax.annotate('r = 13', xy=(mid_x, mid_y), xytext=(-25, 5), 
            textcoords='offset points', fontsize=10, color='blue', fontweight='bold')

# Annotate real and imaginary parts
ax.annotate('a = 5', xy=(a/2, 0), xytext=(0, -12), 
            textcoords='offset points', fontsize=9, ha='center')
ax.annotate('b = 12', xy=(a, b/2), xytext=(12, 0), 
            textcoords='offset points', fontsize=9, va='center')

# Set axis labels at edges
ax.set_xlabel('Real', fontsize=10, loc='right')
ax.set_ylabel('Imaginary', fontsize=10, loc='top')

# Set axis limits
ax.set_xlim(-2, 16)
ax.set_ylim(-2, 16)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3, linestyle=':', linewidth=0.5)

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776951408626-c9fea169.png", dpi=150, bbox_inches="tight")
