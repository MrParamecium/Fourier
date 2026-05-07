import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.6))

# --- data ---
a, b = 3, 4
r = np.hypot(a, b)          # 5
theta = np.arctan2(b, a)    # ~53.1°

# --- spines at origin ---
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

# --- vectors from origin ---
ax.annotate("", xy=(a, b), xytext=(0, 0),
            arrowprops=dict(arrowstyle="-|>", color="steelblue", lw=1.5))
ax.annotate("", xy=(a, -b), xytext=(0, 0),
            arrowprops=dict(arrowstyle="-|>", color="firebrick", lw=1.5))

# --- dashed mirror line ---
ax.plot([a, a], [-b, b], color="gray", linestyle="--", lw=1.0, zorder=1)

# --- points ---
ax.plot(a, b, "o", color="steelblue", ms=5, zorder=3)
ax.plot(a, -b, "o", color="firebrick", ms=5, zorder=3)

# --- angle arcs ---
arc_r = 1.1
th_upper = np.linspace(0, theta, 60)
th_lower = np.linspace(-theta, 0, 60)
ax.plot(arc_r * np.cos(th_upper), arc_r * np.sin(th_upper),
        color="steelblue", lw=1.2)
ax.plot(arc_r * np.cos(th_lower), arc_r * np.sin(th_lower),
        color="firebrick", lw=1.2)

# --- angle labels ---
ax.annotate(r"$+\theta$", xy=(arc_r * np.cos(theta / 2), arc_r * np.sin(theta / 2)),
            xytext=(6, 2), textcoords="offset points",
            fontsize=8, color="steelblue")
ax.annotate(r"$-\theta$", xy=(arc_r * np.cos(-theta / 2), arc_r * np.sin(-theta / 2)),
            xytext=(6, -8), textcoords="offset points",
            fontsize=8, color="firebrick")

# --- r labels ---
ax.annotate(r"$r=5$", xy=(a / 2, b / 2),
            xytext=(-22, 4), textcoords="offset points",
            fontsize=8, color="steelblue")
ax.annotate(r"$r=5$", xy=(a / 2, -b / 2),
            xytext=(-22, -10), textcoords="offset points",
            fontsize=8, color="firebrick")

# --- point labels ---
ax.annotate(r"$z = 3+4j$", xy=(a, b),
            xytext=(6, 4), textcoords="offset points",
            fontsize=8.5, color="steelblue", fontweight="bold")
ax.annotate(r"$z^* = 3-4j$", xy=(a, -b),
            xytext=(6, -12), textcoords="offset points",
            fontsize=8.5, color="firebrick", fontweight="bold")

# --- axis labels ---
ax.set_xlabel("Real", fontsize=9, labelpad=2)
ax.set_ylabel("Imag", fontsize=9, labelpad=2, rotation=90)

# --- ticks & limits ---
ax.set_xticks([0, 3])
ax.set_yticks([-4, 0, 4])
ax.set_xlim(-0.8, 5.2)
ax.set_ylim(-5.2, 5.2)
ax.tick_params(labelsize=8)

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776784813876-c5925f3d.png", dpi=150, bbox_inches="tight")
