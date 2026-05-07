import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 4.0))

# Unit circle
theta_full = np.linspace(0, 2 * np.pi, 300)
ax.plot(np.cos(theta_full), np.sin(theta_full), color="lightsteelblue", lw=1.2, zorder=1)

# Angle for demonstration
theta = np.pi / 3  # 60 degrees
cos_t = np.cos(theta)
sin_t = np.sin(theta)

# Radius vector
ax.annotate("", xy=(cos_t, sin_t), xytext=(0, 0),
            arrowprops=dict(arrowstyle="-|>", color="royalblue", lw=1.5))

# Dashed projections
ax.plot([cos_t, cos_t], [0, sin_t], color="gray", lw=0.9, ls="--", zorder=2)
ax.plot([0, cos_t], [sin_t, sin_t], color="gray", lw=0.9, ls="--", zorder=2)

# Point on circle
ax.plot(cos_t, sin_t, "o", color="royalblue", ms=5, zorder=5)

# Arc for theta
arc_t = np.linspace(0, theta, 60)
ax.plot(0.22 * np.cos(arc_t), 0.22 * np.sin(arc_t), color="darkorange", lw=1.2)

# Four special points
specials = [
    (1, 0,   r"$e^{j0}=1$",      (6, -12)),
    (0, 1,   r"$e^{j\pi/2}=j$",  (6,   5)),
    (-1, 0,  r"$e^{j\pi}=-1$",   (-52, -12)),
    (0, -1,  r"$e^{j3\pi/2}=-j$",( 6, -14)),
]
for x, y, lbl, off in specials:
    ax.plot(x, y, "s", color="tomato", ms=4, zorder=5)
    ax.annotate(lbl, xy=(x, y), xytext=off, textcoords="offset points",
                fontsize=7, color="tomato")

# Main point label
ax.annotate(r"$e^{j\theta}=\cos\theta+j\sin\theta$",
            xy=(cos_t, sin_t), xytext=(8, 6), textcoords="offset points",
            fontsize=8, color="royalblue")

# cos theta label on real axis
ax.annotate(r"$\cos\theta$", xy=(cos_t / 2, 0), xytext=(0, -14),
            textcoords="offset points", fontsize=7.5, ha="center", color="gray")

# sin theta label on imag axis
ax.annotate(r"$j\sin\theta$", xy=(0, sin_t / 2), xytext=(-30, 0),
            textcoords="offset points", fontsize=7.5, ha="center", color="gray")

# theta label
ax.annotate(r"$\theta$", xy=(0.26, 0.13), fontsize=8, color="darkorange")

# r=1 label along radius
ax.annotate(r"$r=1$", xy=(cos_t / 2, sin_t / 2), xytext=(-18, 6),
            textcoords="offset points", fontsize=7.5, color="royalblue")

# Spines at origin
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

ax.set_xlim(-1.45, 1.55)
ax.set_ylim(-1.35, 1.45)
ax.set_xlabel("Real", fontsize=8, labelpad=2)
ax.set_ylabel("Imag", fontsize=8, labelpad=2)
ax.tick_params(labelsize=7)
ax.set_xticks([-1, 0, 1])
ax.set_yticks([-1, 0, 1])
ax.set_aspect("equal")

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776844555530-4e4279a1.png", dpi=150, bbox_inches="tight")
