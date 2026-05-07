import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 2, figsize=(4.6, 3.6))

# Left plot: Complex plane with z = 3 + 4j
ax = axes[0]
ax.set_xlim(-1, 5)
ax.set_ylim(-1, 5)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3, linewidth=0.5)
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")
ax.set_xlabel("Real", fontsize=10, loc="right")
ax.set_ylabel("Imaginary", fontsize=10, loc="top")

# Plot z = 3 + 4j
z_real, z_imag = 3, 4
ax.plot(z_real, z_imag, 'ro', markersize=8)
ax.plot([0, z_real], [0, z_imag], 'r-', linewidth=1.5, alpha=0.7)
ax.annotate("z = 3+4j", xy=(z_real, z_imag), xytext=(8, 8),
            textcoords="offset points", fontsize=9, ha="left")
ax.annotate("a=3", xy=(z_real, 0), xytext=(0, -12),
            textcoords="offset points", fontsize=8, ha="center")
ax.annotate("b=4", xy=(0, z_imag), xytext=(-18, 0),
            textcoords="offset points", fontsize=8, ha="right")

# Right plot: Rectangular to polar conversion
ax = axes[1]
ax.set_xlim(-1, 5)
ax.set_ylim(-1, 5)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3, linewidth=0.5)
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")
ax.set_xlabel("Real", fontsize=10, loc="right")
ax.set_ylabel("Imaginary", fontsize=10, loc="top")

# Plot z = 3 + 4j with polar coordinates
z_real, z_imag = 3, 4
r = np.sqrt(z_real**2 + z_imag**2)
theta = np.arctan2(z_imag, z_real)

ax.plot(z_real, z_imag, 'bo', markersize=8)
ax.plot([0, z_real], [0, z_imag], 'b-', linewidth=2, alpha=0.7)

# Draw angle arc
angle_arc = np.linspace(0, theta, 30)
arc_r = 0.8
ax.plot(arc_r * np.cos(angle_arc), arc_r * np.sin(angle_arc), 'g--', linewidth=1, alpha=0.6)

ax.annotate(f"r={r:.1f}", xy=(z_real/2, z_imag/2), xytext=(8, 8),
            textcoords="offset points", fontsize=9, ha="left", color="blue")
ax.annotate(f"θ", xy=(1.2, 0.3), xytext=(0, 0),
            textcoords="offset points", fontsize=9, ha="center", color="green")

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776945190274-afd29455.png", dpi=150, bbox_inches="tight")
