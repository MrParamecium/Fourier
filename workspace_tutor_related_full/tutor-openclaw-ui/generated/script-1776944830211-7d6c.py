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

# Set limits and ticks
ax.set_xlim(-1, 5)
ax.set_ylim(-1, 5)
ax.set_aspect("equal")
ax.grid(True, alpha=0.3, linewidth=0.5)
ax.set_xticks(range(0, 6))
ax.set_yticks(range(0, 6))

# Labels at edges
ax.set_xlabel("Real", loc="right", fontsize=11)
ax.set_ylabel("Imaginary", loc="top", fontsize=11)

# Plot complex number z = 3 + 4j
z_real, z_imag = 3, 4
ax.plot(z_real, z_imag, "ro", markersize=8, label="z = 3 + 4j")

# Draw line from origin to z
ax.arrow(0, 0, z_real*0.95, z_imag*0.95, head_width=0.15, head_length=0.15, 
         fc="red", ec="red", alpha=0.6, linewidth=1.5)

# Annotate the point z
ax.annotate("z = 3 + 4j", xy=(z_real, z_imag), xytext=(15, 15), 
            textcoords="offset points", fontsize=10, 
            bbox=dict(boxstyle="round,pad=0.3", facecolor="yellow", alpha=0.7),
            arrowprops=dict(arrowstyle="->", connectionstyle="arc3,rad=0", lw=0.8))

# Plot conjugate z* = 3 - 4j
z_conj_real, z_conj_imag = 3, -4
ax.plot(z_conj_real, z_conj_imag, "bs", markersize=8, label="z* = 3 - 4j")

# Annotate conjugate
ax.annotate("z* = 3 - 4j", xy=(z_conj_real, z_conj_imag), xytext=(15, -25), 
            textcoords="offset points", fontsize=10,
            bbox=dict(boxstyle="round,pad=0.3", facecolor="lightblue", alpha=0.7),
            arrowprops=dict(arrowstyle="->", connectionstyle="arc3,rad=0", lw=0.8))

# Add dashed line showing reflection symmetry
ax.plot([z_real, z_conj_real], [z_imag, z_conj_imag], "k--", alpha=0.4, linewidth=1)

# Annotate real and imaginary parts with small markers
ax.plot([z_real, z_real], [0, z_imag], "g--", alpha=0.5, linewidth=1)
ax.plot([0, z_real], [z_imag, z_imag], "g--", alpha=0.5, linewidth=1)

ax.annotate("a = 3", xy=(z_real, 0), xytext=(0, -20), 
            textcoords="offset points", fontsize=9, ha="center", color="green")
ax.annotate("b = 4", xy=(0, z_imag), xytext=(-25, 0), 
            textcoords="offset points", fontsize=9, va="center", color="green")

ax.legend(loc="upper left", fontsize=9, framealpha=0.9)

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776944830208-d799f73b.png", dpi=150, bbox_inches="tight")
