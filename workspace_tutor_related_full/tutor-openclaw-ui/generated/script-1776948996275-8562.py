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

# Set limits and ticks
ax.set_xlim(-3, 3)
ax.set_ylim(-3, 6)
ax.set_aspect("equal")
ax.grid(True, alpha=0.3, linestyle="--", linewidth=0.5)
ax.set_xticks([-2, 0, 2])
ax.set_yticks([0, 2, 4])

# Labels at edges
ax.set_xlabel("Real", loc="right", fontsize=11)
ax.set_ylabel("Imaginary", loc="top", fontsize=11)

# Plot the point (-2, 5)
ax.plot(-2, 5, "ro", markersize=8, zorder=3)

# Annotate the point with offset to avoid overlap
ax.annotate("(-2, 5)", xy=(-2, 5), xytext=(10, 10), 
            textcoords="offset points", fontsize=10, 
            bbox=dict(boxstyle="round,pad=0.3", facecolor="yellow", alpha=0.7),
            arrowprops=dict(arrowstyle="->", connectionstyle="arc3,rad=0", lw=1))

# Add dashed lines to show coordinates
ax.plot([-2, -2], [0, 5], "k--", linewidth=0.8, alpha=0.5)
ax.plot([-2, 0], [5, 5], "k--", linewidth=0.8, alpha=0.5)

# Label the complex number form
ax.text(-0.5, -1.2, r"$z = -2 + 5j$", fontsize=11, 
        bbox=dict(boxstyle="round,pad=0.4", facecolor="lightblue", alpha=0.8))

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776948996275-e4406428.png", dpi=150, bbox_inches="tight")
