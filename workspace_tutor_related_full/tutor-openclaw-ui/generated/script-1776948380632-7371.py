import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.4))

# Plot complex plane axes
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

# Plot the point z = 5 + 12j
a, b = 5, 12
r = np.sqrt(a**2 + b**2)
ax.plot(a, b, 'ro', markersize=8, zorder=3)

# Draw radius line from origin to point
ax.plot([0, a], [0, b], 'b-', linewidth=1.5, zorder=2)

# Draw right triangle (optional, for clarity)
ax.plot([0, a], [0, 0], 'g--', linewidth=1, alpha=0.6, zorder=1)
ax.plot([a, a], [0, b], 'g--', linewidth=1, alpha=0.6, zorder=1)

# Annotate the point
ax.annotate('z = 5 + 12j', xy=(a, b), xytext=(8, 8), 
            textcoords='offset points', fontsize=10, ha='left')

# Annotate the magnitude r
mid_x, mid_y = a/2, b/2
ax.annotate(f'r = {r:.0f}', xy=(mid_x, mid_y), xytext=(-25, 5), 
            textcoords='offset points', fontsize=10, color='blue', ha='right')

# Annotate real and imaginary parts
ax.annotate('a = 5', xy=(a/2, 0), xytext=(0, -15), 
            textcoords='offset points', fontsize=9, ha='center', color='green')
ax.annotate('b = 12', xy=(a, b/2), xytext=(15, 0), 
            textcoords='offset points', fontsize=9, ha='left', color='green')

# Set axis labels
ax.set_xlabel('Real', fontsize=10, loc='right')
ax.set_ylabel('Imaginary', fontsize=10, loc='top')

# Set limits
ax.set_xlim(-2, 16)
ax.set_ylim(-2, 16)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3, linestyle=':', linewidth=0.5)

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776948380630-c7271f67.png", dpi=150, bbox_inches="tight")
