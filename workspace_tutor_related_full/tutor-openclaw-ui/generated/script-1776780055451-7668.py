import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.6))

# --- data ---
a, b = 3, 4
r = np.sqrt(a**2 + b**2)
theta = np.arctan2(b, a)

# --- spines at origin ---
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")
ax.xaxis.set_ticks_position("bottom")
ax.yaxis.set_ticks_position("left")

# --- mirror dashed line (real axis reflection) ---
ax.plot([a, a], [b, -b], color="gray", lw=0.8, ls="--", zorder=1)

# --- angle arcs ---
arc_r = 1.1
th_pos = np.linspace(0, theta, 60)
th_neg = np.linspace(0, -theta, 60)
ax.plot(arc_r * np.cos(th_pos), arc_r * np.sin(th_pos), color="steelblue", lw=1.2)
ax.plot(arc_r * np.cos(th_neg), arc_r * np.sin(th_neg), color="tomato", lw=1.2)

# --- vectors ---
ax.annotate("", xy=(a, b), xytext=(0, 0),
            arrowprops=dict(arrowstyle="-|>", color="steelblue", lw=1.5))
ax.annotate("", xy=(a, -b), xytext=(0, 0),
            arrowprops=dict(arrowstyle="-|>", color="tomato", lw=1.5))

# --- points ---
ax.plot(a, b, "o", color="steelblue", ms=5, zorder=5)
ax.plot(a, -b, "o", color="tomato", ms=5, zorder=5)

# --- point labels ---
ax.annotate(r"$z = 3+4j$", xy=(a, b), xytext=(6, 4),
            textcoords="offset points", color="steelblue", fontsize=9)
ax.annotate(r"$z^* = 3-4j$", xy=(a, -b), xytext=(6, -10),
            textcoords="offset points", color="tomato", fontsize=9)

# --- r labels ---
ax.annotate(r"$r$", xy=(a/2 - 0.3, b/2 + 0.1), xytext=(0, 0),
            textcoords="offset points", color="steelblue", fontsize=8)
ax.annotate(r"$r$", xy=(a/2 - 0.3, -b/2 - 0.4), xytext=(0, 0),
            textcoords="offset points", color="tomato", fontsize=8)

# --- angle labels ---
ax.annotate(r"$+\theta$", xy=(1.35, 0.45), xytext=(0, 0),
            textcoords="offset points", color="steelblue", fontsize=8)
ax.annotate(r"$-\theta$", xy=(1.35, -0.55), xytext=(0, 0),
            textcoords="offset points", color="tomato", fontsize=8)

# --- product annotation ---
ax.annotate(r"$z \cdot z^* = 3^2+4^2 = 25$", xy=(0.02, 0.04),
            xycoords="axes fraction", fontsize=7.5, color="dimgray",
            bbox=dict(boxstyle="round,pad=0.2", fc="lightyellow", ec="gray", lw=0.6))

# --- ticks ---
ax.set_xticks([0, a])
ax.set_xticklabels(["", "3"], fontsize=8)
ax.set_yticks([-b, 0, b])
ax.set_yticklabels(["-4", "", "4"], fontsize=8)

# --- axis labels ---
ax.set_xlabel("Real", fontsize=8, labelpad=2)
ax.set_ylabel("Imag", fontsize=8, labelpad=2, rotation=90)

# --- limits ---
ax.set_xlim(-0.8, 5.2)
ax.set_ylim(-5.5, 5.5)

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776780055450-f90594d6.png", dpi=150, bbox_inches="tight")
