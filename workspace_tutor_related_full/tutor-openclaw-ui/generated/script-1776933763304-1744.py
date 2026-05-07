import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.4))

# Point z = -3 + 4j
a, b = -3, 4
r = np.sqrt(a**2 + b**2)
theta_correct = np.degrees(np.arctan2(b, a))   # ~126.87°
theta_wrong   = np.degrees(np.arctan(b / a))    # ~-53.13°

# Draw axes through origin
for spine in ["bottom", "left"]:
    ax.spines[spine].set_position(("data", 0))
for spine in ["top", "right"]:
    ax.spines[spine].set_color("none")

ax.set_xlabel("Real", labelpad=2, fontsize=9)
ax.set_ylabel("Imag", labelpad=2, fontsize=9, rotation=90)

# Vector to z
ax.annotate("", xy=(a, b), xytext=(0, 0),
            arrowprops=dict(arrowstyle="-|>", color="steelblue", lw=1.8))

# Plot z
ax.plot(a, b, "o", color="steelblue", ms=6, zorder=5)
ax.annotate(r"$z = -3+4j$", xy=(a, b), xytext=(-38, 6),
            textcoords="offset points", fontsize=8.5, color="steelblue")

# Correct angle arc (0 → 126.87°)
arc_r = 1.5
angles_c = np.linspace(0, np.radians(theta_correct), 60)
ax.plot(arc_r * np.cos(angles_c), arc_r * np.sin(angles_c),
        color="green", lw=1.5)
ax.annotate(r"$\theta\approx126.9°$ ✓", xy=(-1.1, 1.1), xytext=(-52, 8),
            textcoords="offset points", fontsize=7.5, color="green")

# Wrong angle arc (0 → -53.13°), dashed
angles_w = np.linspace(0, np.radians(theta_wrong), 60)
ax.plot(arc_r * np.cos(angles_w), arc_r * np.sin(angles_w),
        color="crimson", lw=1.5, ls="--")
ax.annotate(r"$\theta\approx-53.1°$ ✗", xy=(1.0, -1.0), xytext=(4, -18),
            textcoords="offset points", fontsize=7.5, color="crimson")

# r label along vector
mid_x, mid_y = a / 2, b / 2
ax.annotate(r"$r=5$", xy=(mid_x, mid_y), xytext=(10, 4),
            textcoords="offset points", fontsize=8, color="steelblue")

# Quadrant shading for Q2
from matplotlib.patches import FancyArrowPatch
import matplotlib.patches as mpatches
q2 = mpatches.FancyBboxPatch((-5.2, 0), 5.2, 4.8,
                               boxstyle="square,pad=0", linewidth=0,
                               facecolor="steelblue", alpha=0.07)
ax.add_patch(q2)
ax.text(-4.5, 4.2, "Q2", fontsize=7, color="steelblue", alpha=0.6)

ax.set_xlim(-5.5, 3.5)
ax.set_ylim(-2.5, 5.2)
ax.set_aspect("equal")
ax.tick_params(labelsize=7)

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776933763302-f6cafe15.png", dpi=150, bbox_inches="tight")
