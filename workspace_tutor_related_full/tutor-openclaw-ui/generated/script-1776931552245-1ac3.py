import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.6))

# Data
a, b = 3, 4
r = np.sqrt(a**2 + b**2)
theta = np.arctan2(b, a)

# Draw vectors
ax.annotate("", xy=(a, b), xytext=(0, 0),
            arrowprops=dict(arrowstyle="->", color="steelblue", lw=1.8))
ax.annotate("", xy=(a, -b), xytext=(0, 0),
            arrowprops=dict(arrowstyle="->", color="tomato", lw=1.8))

# Dashed mirror line
ax.plot([a, a], [b, -b], "k--", lw=0.8, alpha=0.5)

# Angle arcs
arc_r = 1.1
theta_arr = np.linspace(0, theta, 60)
ax.plot(arc_r * np.cos(theta_arr), arc_r * np.sin(theta_arr), color="steelblue", lw=1.2)
ax.plot(arc_r * np.cos(-theta_arr), arc_r * np.sin(-theta_arr), color="tomato", lw=1.2)

# Angle labels
ax.annotate(r"$\theta$", xy=(arc_r * np.cos(theta / 2), arc_r * np.sin(theta / 2)),
            xytext=(6, 2), textcoords="offset points", color="steelblue", fontsize=9)
ax.annotate(r"$-\theta$", xy=(arc_r * np.cos(-theta / 2), arc_r * np.sin(-theta / 2)),
            xytext=(6, -8), textcoords="offset points", color="tomato", fontsize=9)

# Points
ax.plot(a, b, "o", color="steelblue", ms=6, zorder=5)
ax.plot(a, -b, "o", color="tomato", ms=6, zorder=5)
ax.plot(0, 0, "ko", ms=4, zorder=5)

# Point labels
ax.annotate(r"$z = 3+4j$", xy=(a, b), xytext=(6, 4),
            textcoords="offset points", color="steelblue", fontsize=9)
ax.annotate(r"$z^* = 3-4j$", xy=(a, -b), xytext=(6, -12),
            textcoords="offset points", color="tomato", fontsize=9)

# r label on z vector
mid = (a / 2, b / 2)
ax.annotate(r"$r=5$", xy=mid, xytext=(-22, 4),
            textcoords="offset points", fontsize=8, color="gray")

# Mirror label
ax.annotate("mirror", xy=(4.8, 0), xytext=(2, 4),
            textcoords="offset points", fontsize=7.5, color="gray",
            style="italic")

# Spines at origin
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

# Ticks
ax.set_xticks([0, 3])
ax.set_yticks([-4, 0, 4])
ax.tick_params(labelsize=8)

# Axis labels
ax.set_xlabel("Real", fontsize=9, labelpad=2)
ax.set_ylabel("Imag", fontsize=9, labelpad=2, rotation=90)

ax.set_xlim(-0.8, 5.8)
ax.set_ylim(-5.5, 5.5)

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776931552243-c2c1f4ff.png", dpi=150, bbox_inches="tight")
