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
ax.set_xlim(-3.5, 2.5)
ax.set_ylim(-1.5, 6.5)
ax.grid(True, alpha=0.3, linestyle="--", linewidth=0.5)
ax.set_aspect("equal")

# Labels for axes
ax.set_xlabel("Real", fontsize=11, loc="right")
ax.set_ylabel("Imaginary", fontsize=11, loc="top")

# Plot the point (-2, 5)
ax.plot(-2, 5, "ro", markersize=8, zorder=3)

# Annotate the point with offset to avoid overlap
ax.annotate("$z = -2 + j5$", xy=(-2, 5), xytext=(15, 15),
            textcoords="offset points", fontsize=10, 
            bbox=dict(boxstyle="round,pad=0.3", facecolor="yellow", alpha=0.7),
            arrowprops=dict(arrowstyle="->", connectionstyle="arc3,rad=0", lw=1))

# Draw dashed lines to show coordinates
ax.plot([-2, -2], [0, 5], "k--", linewidth=0.8, alpha=0.5)
ax.plot([-2, 0], [5, 5], "k--", linewidth=0.8, alpha=0.5)

# Label the real and imaginary parts
ax.annotate("$-2$", xy=(-2, 0), xytext=(-5, -15),
            textcoords="offset points", fontsize=9, ha="center")
ax.annotate("$5$", xy=(0, 5), xytext=(-20, 5),
            textcoords="offset points", fontsize=9, ha="right")

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776949140516-db187cd0.png", dpi=150, bbox_inches="tight")
