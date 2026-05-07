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

# Set axis limits
ax.set_xlim(-3.5, 3.5)
ax.set_ylim(-3.5, 6.5)
ax.set_aspect("equal")

# Grid
ax.grid(True, alpha=0.3, linestyle="--", linewidth=0.5)

# Plot the point (-2, 5)
ax.plot(-2, 5, "ro", markersize=8, zorder=3)

# Draw dashed lines to axes
ax.plot([-2, -2], [0, 5], "k--", linewidth=0.8, alpha=0.5)
ax.plot([-2, 0], [5, 5], "k--", linewidth=0.8, alpha=0.5)

# Annotate the point
ax.annotate("z = −2 + 5j", xy=(-2, 5), xytext=(10, 15),
            textcoords="offset points", fontsize=11, fontweight="bold",
            bbox=dict(boxstyle="round,pad=0.3", facecolor="yellow", alpha=0.7))

# Annotate real part
ax.annotate("−2", xy=(-2, 0), xytext=(-8, -15),
            textcoords="offset points", fontsize=10, ha="center")

# Annotate imaginary part
ax.annotate("5", xy=(0, 5), xytext=(-18, 5),
            textcoords="offset points", fontsize=10, va="center")

# Axis labels
ax.set_xlabel("Real", fontsize=11, loc="right")
ax.set_ylabel("Imaginary", fontsize=11, loc="top")

# Tick labels
ax.set_xticks([-3, -2, -1, 0, 1, 2, 3])
ax.set_yticks([0, 1, 2, 3, 4, 5, 6])
ax.tick_params(labelsize=9)

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776950839936-f32857d9.png", dpi=150, bbox_inches="tight")
