import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 4.4))

# Unit circle
theta_full = np.linspace(0, 2 * np.pi, 300)
ax.plot(np.cos(theta_full), np.sin(theta_full), color="steelblue", lw=1.2, zorder=1)

# Angle theta = pi/3
theta = np.pi / 3
cos_t = np.cos(theta)
sin_t = np.sin(theta)

# Radius vector
ax.annotate("", xy=(cos_t, sin_t), xytext=(0, 0),
            arrowprops=dict(arrowstyle="-|>", color="crimson", lw=1.5))

# Dashed projections
ax.plot([cos_t, cos_t], [0, sin_t], color="gray", lw=0.9, ls="--")
ax.plot([0, cos_t], [sin_t, sin_t], color="gray", lw=0.9, ls="--")

# Special points on unit circle
special = {
    0:        (1,  0,  "$1$",         (6, -12)),
    np.pi/2:  (0,  1,  "$j$",         (6,   5)),
    np.pi:    (-1, 0,  "$-1$",        (-22, -12)),
    3*np.pi/2:(0, -1,  "$-j$",        (6,  -14)),
}
for ang, (rx, ry, lbl, off) in special.items():
    ax.plot(rx, ry, "o", color="steelblue", ms=5, zorder=3)
    ax.annotate(lbl, xy=(rx, ry), xytext=off, textcoords="offset points",
                fontsize=9, color="steelblue")

# Main point e^{j theta}
ax.plot(cos_t, sin_t, "o", color="crimson", ms=6, zorder=4)
ax.annotate(r"$e^{j\theta}$", xy=(cos_t, sin_t),
            xytext=(6, 6), textcoords="offset points",
            fontsize=10, color="crimson")

# cos theta label on x-axis
ax.annotate(r"$\cos\theta$", xy=(cos_t, 0),
            xytext=(0, -14), textcoords="offset points",
            fontsize=8.5, ha="center", color="dimgray")
ax.plot(cos_t, 0, "|", color="dimgray", ms=6)

# sin theta label on y-axis
ax.annotate(r"$\sin\theta$", xy=(0, sin_t),
            xytext=(-30, 0), textcoords="offset points",
            fontsize=8.5, ha="center", color="dimgray")
ax.plot(0, sin_t, "_", color="dimgray", ms=6)

# Angle arc
arc_t = np.linspace(0, theta, 60)
ax.plot(0.18 * np.cos(arc_t), 0.18 * np.sin(arc_t), color="darkorange", lw=1.2)
ax.annotate(r"$\theta$", xy=(0.22, 0.10), fontsize=9, color="darkorange")

# Euler formula text (short, inside but not overlapping)
ax.text(0.02, -0.88, r"$e^{j\theta}=\cos\theta+j\sin\theta$",
        fontsize=8.5, color="navy", ha="left")

# Spines at origin
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

ax.set_xlabel("Real", fontsize=9, labelpad=2)
ax.set_ylabel("Imag", fontsize=9, labelpad=2, rotation=90)

ax.set_xlim(-1.35, 1.45)
ax.set_ylim(-1.15, 1.25)
ax.set_aspect("equal")
ax.tick_params(labelsize=7)
ax.set_xticks([-1, 0, 1])
ax.set_yticks([-1, 0, 1])

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776783984670-81e86184.png", dpi=150, bbox_inches="tight")
