import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.4))

a, b = 3, 4
r = np.sqrt(a**2 + b**2)
theta = np.arctan2(b, a)

# --- spines at origin ---
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

# --- mirror line (real axis) label via dashed hint ---
ax.axhline(0, color="gray", lw=0.5, zorder=0)

# --- arc for theta ---
theta_arc = np.linspace(0, theta, 60)
ax.plot(0.7 * np.cos(theta_arc), 0.7 * np.sin(theta_arc), color="steelblue", lw=1)
ax.annotate(r"$\theta$", xy=(0.75, 0.28), fontsize=8, color="steelblue")

# --- arc for -theta ---
theta_arc2 = np.linspace(-theta, 0, 60)
ax.plot(0.7 * np.cos(theta_arc2), 0.7 * np.sin(theta_arc2), color="tomato", lw=1)
ax.annotate(r"$-\theta$", xy=(0.75, -0.45), fontsize=8, color="tomato")

# --- radial lines ---
ax.plot([0, a], [0, b], color="steelblue", lw=1.4, zorder=2)
ax.plot([0, a], [0, -b], color="tomato", lw=1.4, zorder=2)

# --- dashed vertical mirror guide ---
ax.plot([a, a], [-b, b], color="gray", lw=0.8, ls="--", zorder=1)

# --- points ---
ax.plot(a, b, "o", color="steelblue", ms=6, zorder=3)
ax.plot(a, -b, "o", color="tomato", ms=6, zorder=3)
ax.plot(0, 0, "k.", ms=4, zorder=3)

# --- r labels ---
ax.annotate(r"$r=5$", xy=(a/2, b/2), xytext=(-18, 6),
            textcoords="offset points", fontsize=8, color="steelblue")
ax.annotate(r"$r=5$", xy=(a/2, -b/2), xytext=(-18, -14),
            textcoords="offset points", fontsize=8, color="tomato")

# --- point labels ---
ax.annotate(r"$z=3+4j$", xy=(a, b), xytext=(6, 4),
            textcoords="offset points", fontsize=9, color="steelblue")
ax.annotate(r"$z^*=3-4j$", xy=(a, -b), xytext=(6, -12),
            textcoords="offset points", fontsize=9, color="tomato")

# --- mirror label ---
ax.annotate("mirror", xy=(0.5, 0), xytext=(4, 5),
            textcoords="offset points", fontsize=7, color="gray")

# --- tick marks for a, b, -b ---
for val, lbl in [(a, "3"), (b, "4"), (-b, "-4")]:
    pass  # keep clean

ax.set_xticks([0, 3])
ax.set_xticklabels(["", "3"], fontsize=8)
ax.set_yticks([4, -4])
ax.set_yticklabels(["4", "-4"], fontsize=8)

ax.set_xlim(-0.8, 5.2)
ax.set_ylim(-5.5, 5.5)

ax.set_xlabel("Real", fontsize=9, labelpad=2)
ax.set_ylabel("Imag", fontsize=9, labelpad=2, rotation=90)

ax.yaxis.set_label_coords(-0.08, 0.85)
ax.xaxis.set_label_coords(0.95, 0.42)

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776780720477-32a9ef10.png", dpi=150, bbox_inches="tight")
