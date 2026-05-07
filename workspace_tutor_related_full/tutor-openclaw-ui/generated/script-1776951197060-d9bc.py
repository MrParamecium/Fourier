import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.4))

# Plot axes crossing at origin
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

# Set limits and aspect
ax.set_xlim(-1, 5.5)
ax.set_ylim(-1, 5.5)
ax.set_aspect("equal")

# Labels
ax.set_xlabel("Real", loc="right", fontsize=11)
ax.set_ylabel("Imaginary", loc="top", fontsize=11)

# Plot point z = 3 + 4j
ax.plot(3, 4, "ro", markersize=8, zorder=3)

# Plot radius line from origin to z
ax.plot([0, 3], [0, 4], "b-", linewidth=2, zorder=2)

# Plot right triangle (dashed lines for a and b)
ax.plot([0, 3], [0, 0], "k--", linewidth=1, alpha=0.5, zorder=1)
ax.plot([3, 3], [0, 4], "k--", linewidth=1, alpha=0.5, zorder=1)

# Annotate point z
ax.annotate("z = 3 + 4j", xy=(3, 4), xytext=(8, 8), 
            textcoords="offset points", fontsize=10, 
            bbox=dict(boxstyle="round,pad=0.3", facecolor="yellow", alpha=0.7),
            arrowprops=dict(arrowstyle="->", connectionstyle="arc3,rad=0", lw=1))

# Annotate magnitude r
ax.annotate("r = 5", xy=(1.5, 2), xytext=(-25, 5), 
            textcoords="offset points", fontsize=10, color="blue", weight="bold")

# Annotate real part a
ax.annotate("a = 3", xy=(1.5, -0.3), xytext=(0, -18), 
            textcoords="offset points", fontsize=9, ha="center")

# Annotate imaginary part b
ax.annotate("b = 4", xy=(3.3, 2), xytext=(12, 0), 
            textcoords="offset points", fontsize=9)

# Grid
ax.grid(True, alpha=0.3, linestyle=":", linewidth=0.5)
ax.set_xticks(range(0, 6))
ax.set_yticks(range(0, 6))

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776951197059-d63023e2.png", dpi=150, bbox_inches="tight")
