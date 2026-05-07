import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.4))

# Draw axes crossing at origin
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

# Set limits
ax.set_xlim(-5.5, 5.5)
ax.set_ylim(-1, 5.5)
ax.set_aspect("equal")

# Labels for axes
ax.set_xlabel("Real", loc="right", fontsize=11)
ax.set_ylabel("Imaginary", loc="top", fontsize=11)

# Grid
ax.grid(True, alpha=0.3, linestyle="--", linewidth=0.5)
ax.set_xticks([-5, -3, 0, 3, 5])
ax.set_yticks([0, 2, 4])

# Plot the point z = -3 + 4j
z_real, z_imag = -3, 4
ax.plot(z_real, z_imag, "ro", markersize=8, zorder=5)

# Draw radius line from origin to point
ax.plot([0, z_real], [0, z_imag], "b-", linewidth=1.5, alpha=0.7)

# Draw angle arc
angle_rad = np.arctan2(z_imag, z_real)
angle_deg = np.degrees(angle_rad)
arc_angles = np.linspace(0, angle_rad, 40)
arc_r = 1.2
ax.plot(arc_r * np.cos(arc_angles), arc_r * np.sin(arc_angles), "g-", linewidth=1.2, alpha=0.6)

# Annotate the point
ax.annotate("z = −3 + 4j", xy=(z_real, z_imag), xytext=(-35, 15),
            textcoords="offset points", fontsize=10, ha="center",
            bbox=dict(boxstyle="round,pad=0.3", facecolor="yellow", alpha=0.7),
            arrowprops=dict(arrowstyle="->", connectionstyle="arc3,rad=0", lw=0.8))

# Annotate r
mid_r = 0.5
ax.annotate("r = 5", xy=(mid_r * z_real, mid_r * z_imag), xytext=(10, -15),
            textcoords="offset points", fontsize=9, color="blue")

# Annotate angle
ax.annotate(f"θ ≈ 126.87°", xy=(1.5 * np.cos(angle_rad * 0.5), 1.5 * np.sin(angle_rad * 0.5)),
            xytext=(15, 5), textcoords="offset points", fontsize=9, color="green")

# Draw vertical and horizontal dashed lines for reference
ax.plot([z_real, z_real], [0, z_imag], "k--", linewidth=0.7, alpha=0.4)
ax.plot([0, z_real], [z_imag, z_imag], "k--", linewidth=0.7, alpha=0.4)

# Annotate real and imaginary components
ax.annotate("−3", xy=(z_real, 0), xytext=(0, -20),
            textcoords="offset points", fontsize=9, ha="center", color="darkred")
ax.annotate("4", xy=(0, z_imag), xytext=(-25, 0),
            textcoords="offset points", fontsize=9, ha="center", color="darkred")

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776936845886-5b6a2b5c.png", dpi=150, bbox_inches="tight")
