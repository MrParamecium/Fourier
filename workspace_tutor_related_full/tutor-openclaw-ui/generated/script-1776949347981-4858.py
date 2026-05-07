import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.4))

# Draw axes through origin
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

# Set axis labels
ax.set_xlabel("Real", loc="right", fontsize=11)
ax.set_ylabel("Imaginary", loc="top", fontsize=11)

# Set limits and grid
ax.set_xlim(-3.5, 1.5)
ax.set_ylim(-1.5, 6.5)
ax.grid(True, alpha=0.3, linestyle="--", linewidth=0.5)
ax.set_aspect("equal")

# Plot the point (-2, 5)
ax.plot(-2, 5, "ro", markersize=8, zorder=3)

# Draw dashed lines to axes
ax.plot([-2, -2], [0, 5], "k--", linewidth=0.8, alpha=0.5, zorder=1)
ax.plot([-2, 0], [5, 5], "k--", linewidth=0.8, alpha=0.5, zorder=1)

# Annotate the point
ax.annotate("$(-2, 5)$", xy=(-2, 5), xytext=(8, 8), 
            textcoords="offset points", fontsize=10, 
            bbox=dict(boxstyle="round,pad=0.3", facecolor="yellow", alpha=0.7),
            zorder=4)

# Annotate real and imaginary parts on axes
ax.annotate("$-2$", xy=(-2, 0), xytext=(-2, -12), 
            textcoords="offset points", fontsize=9, ha="center", zorder=2)
ax.annotate("$5$", xy=(0, 5), xytext=(-18, 5), 
            textcoords="offset points", fontsize=9, ha="center", zorder=2)

# Add text box with the complex number (positioned outside plot area)
textstr = "$z = -2 + j5$\n$\\operatorname{Re}(z) = -2$\n$\\operatorname{Im}(z) = 5$"
ax.text(-3.2, 1.5, textstr, fontsize=10, 
        bbox=dict(boxstyle="round,pad=0.4", facecolor="lightblue", alpha=0.8),
        verticalalignment="top", zorder=2)

ax.set_xticks([-3, -2, -1, 0, 1])
ax.set_yticks([0, 1, 2, 3, 4, 5, 6])

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776949347978-cc4f5bbe.png", dpi=150, bbox_inches="tight")
