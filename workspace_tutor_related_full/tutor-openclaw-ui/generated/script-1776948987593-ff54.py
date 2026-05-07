import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.2, 3.2))

# Draw axes through origin
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

# Set limits and ticks
ax.set_xlim(-3, 2)
ax.set_ylim(-1, 6)
ax.set_aspect("equal")
ax.grid(True, alpha=0.3, linestyle="--", linewidth=0.5)
ax.set_xticks([-3, -2, -1, 0, 1])
ax.set_yticks([0, 1, 2, 3, 4, 5])

# Plot the point (-2, 5)
ax.plot(-2, 5, "ro", markersize=8, zorder=3)

# Annotate the point with offset to avoid overlap
ax.annotate(
    r"$z = -2 + j5$",
    xy=(-2, 5),
    xytext=(12, 12),
    textcoords="offset points",
    fontsize=11,
    ha="left",
    bbox=dict(boxstyle="round,pad=0.3", facecolor="yellow", alpha=0.7),
    arrowprops=dict(arrowstyle="->", connectionstyle="arc3,rad=0", lw=1)
)

# Draw dashed lines to axes for clarity
ax.plot([-2, -2], [0, 5], "k--", linewidth=0.8, alpha=0.5)
ax.plot([-2, 0], [5, 5], "k--", linewidth=0.8, alpha=0.5)

# Label axes
ax.set_xlabel("Real", fontsize=11, loc="right")
ax.set_ylabel("Imaginary", fontsize=11, loc="top")

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776948987593-f9b263fb.png", dpi=150, bbox_inches="tight")
