import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.4))

# Plot the complex plane axes
ax.axhline(y=0, color='k', linewidth=0.5)
ax.axvline(x=0, color='k', linewidth=0.5)
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

# Plot the point z = 5 + 12j
a, b = 5, 12
r = np.sqrt(a**2 + b**2)
ax.plot(a, b, 'ro', markersize=8, label='z = 5 + 12j')

# Draw the right triangle: origin to (a, 0) to (a, b)
ax.plot([0, a], [0, 0], 'b-', linewidth=1.5, alpha=0.7)
ax.plot([a, a], [0, b], 'b-', linewidth=1.5, alpha=0.7)
ax.plot([0, a], [0, b], 'r-', linewidth=2, label=f'r = {r:.0f}')

# Small square for right angle
square_size = 0.8
ax.plot([a - square_size, a - square_size, a], [0, square_size, square_size], 'k-', linewidth=0.5)

# Annotate the point
ax.annotate('(5, 12)', xy=(a, b), xytext=(8, 8), textcoords='offset points', fontsize=10, ha='left')

# Annotate the sides
ax.annotate('a = 5', xy=(2.5, -0.5), fontsize=9, ha='center')
ax.annotate('b = 12', xy=(a + 0.8, 6), fontsize=9, ha='left')
ax.annotate('r = 13', xy=(2.5, 6.5), fontsize=10, ha='center', color='red', weight='bold')

# Set axis labels
ax.set_xlabel('Real', fontsize=11, loc='right')
ax.set_ylabel('Imaginary', fontsize=11, loc='top')

# Set limits and grid
ax.set_xlim(-2, 14)
ax.set_ylim(-2, 14)
ax.grid(True, alpha=0.3, linestyle='--')
ax.set_aspect('equal')

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776951269100-bfa507e4.png", dpi=150, bbox_inches="tight")
