import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.4))

# Example (a): a=1, b=-sqrt(3), so a-jb = 1+j*sqrt(3), C=2, theta=60 deg
a, b = 1.0, -np.sqrt(3)
C = np.sqrt(a**2 + b**2)
theta_rad = np.arctan2(-b, a)
theta_deg = np.degrees(theta_rad)

# Draw axes through origin
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")
ax.xaxis.set_ticks_position("bottom")
ax.yaxis.set_ticks_position("left")

# Phasor for a*cos: (a, 0) = (1, 0)
ax.annotate("", xy=(a, 0), xytext=(0, 0),
            arrowprops=dict(arrowstyle="-|>", color="steelblue", lw=1.8))

# Phasor for -b*sin (vertical component): (0, -b) = (0, sqrt(3))
ax.annotate("", xy=(0, -b), xytext=(0, 0),
            arrowprops=dict(arrowstyle="-|>", color="tomato", lw=1.8))

# Resultant phasor C at angle theta
rx, ry = C * np.cos(theta_rad), C * np.sin(theta_rad)
ax.annotate("", xy=(rx, ry), xytext=(0, 0),
            arrowprops=dict(arrowstyle="-|>", color="seagreen", lw=2.2))

# Dashed construction lines
ax.plot([a, rx], [0, ry], "k--", lw=0.8, alpha=0.5)
ax.plot([0, a], [ry, ry], "k--", lw=0.8, alpha=0.5)

# Arc for theta
arc_t = np.linspace(0, theta_rad, 60)
arc_r = 0.45
ax.plot(arc_r * np.cos(arc_t), arc_r * np.sin(arc_t), color="seagreen", lw=1.2)

# Labels via annotate
ax.annotate(r"$a{=}1$", xy=(a, 0), xytext=(4, -14),
            textcoords="offset points", fontsize=9, color="steelblue")
ax.annotate(r"$-b{=}\sqrt{3}$", xy=(0, -b), xytext=(6, 2),
            textcoords="offset points", fontsize=9, color="tomato")
ax.annotate(r"$C{=}2$", xy=(rx/2, ry/2), xytext=(-22, 4),
            textcoords="offset points", fontsize=9, color="seagreen")
ax.annotate(r"$\theta{=}60°$", xy=(arc_r*np.cos(theta_rad/2), arc_r*np.sin(theta_rad/2)),
            xytext=(6, 4), textcoords="offset points", fontsize=8.5, color="seagreen")

# Point at a-jb in complex plane
ax.plot(a, -b, "o", color="darkorange", ms=5, zorder=5)
ax.annotate(r"$a{-}jb$", xy=(a, -b), xytext=(5, -14),
            textcoords="offset points", fontsize=8.5, color="darkorange")

ax.set_xlim(-0.3, 2.5)
ax.set_ylim(-0.5, 2.2)
ax.set_xlabel("Real", fontsize=9, labelpad=2)
ax.set_ylabel("Imag", fontsize=9, labelpad=2)
ax.set_xticks([1, 2])
ax.set_yticks([1, np.sqrt(3)])
ax.set_yticklabels(["1", r"$\sqrt{3}$"], fontsize=8)
ax.set_xticklabels(["1", "2"], fontsize=8)

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776849038200-36130c29.png", dpi=150, bbox_inches="tight")
