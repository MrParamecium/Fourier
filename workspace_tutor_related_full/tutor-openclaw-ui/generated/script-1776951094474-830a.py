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

# Set limits and grid
ax.set_xlim(-3, 2)
ax.set_ylim(-1, 6)
ax.grid(True, alpha=0.3, linestyle="--", linewidth=0.5)
ax.set_aspect("equal")

# Labels for axes
ax.set_xlabel("Real", fontsize=11, loc="right")
ax.set_ylabel("Imaginary", fontsize=11, loc="top")

# Plot the point (-2, 5)
ax.plot(-2, 5, "ro", markersize=8, zorder=3)

# Draw dashed lines to axes
ax.plot([-2, -2], [0, 5], "k--", linewidth=0.8, alpha=0.5, zorder=1)
ax.plot([-2, 0], [5, 5], "k--", linewidth=0.8, alpha=0.5, zorder=1)

# Annotate the point
ax.annotate("(-2, 5)", xy=(-2, 5), xytext=(8, 8), textcoords="offset points",
            fontsize=10, ha="left", va="bottom",
            bbox=dict(boxstyle="round,pad=0.3", facecolor="yellow", alpha=0.7))

# Annotate real part
ax.annotate("Re z = -2", xy=(-2, 0), xytext=(-2, -0.6), textcoords="data",
            fontsize=9, ha="center", va="top", color="darkblue")

# Annotate imaginary part
ax.annotate("Im z = 5", xy=(0, 5), xytext=(-0.8, 5), textcoords="data",
            fontsize=9, ha="right", va="center", color="darkred")

# Add rectangular form label
ax.text(-1, 2.5, r"$z = -2 + j5$", fontsize=11, 
        bbox=dict(boxstyle="round,pad=0.4", facecolor="lightblue", alpha=0.8),
        ha="center", va="center")

ax.set_xticks([-2, -1, 0, 1])
ax.set_yticks([0, 1, 2, 3, 4, 5])

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776951094473-c3ea3029.png", dpi=150, bbox_inches="tight")
