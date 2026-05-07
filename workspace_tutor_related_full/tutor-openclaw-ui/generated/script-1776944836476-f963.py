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
ax.set_xlim(-1, 6)
ax.set_ylim(-3, 6)
ax.set_aspect("equal")
ax.grid(True, alpha=0.3, linewidth=0.5)
ax.set_xticks(range(0, 7, 1))
ax.set_yticks(range(-3, 7, 1))

# Labels at edges
ax.set_xlabel("Real", loc="right", fontsize=11, fontweight="bold")
ax.set_ylabel("Imaginary", loc="top", fontsize=11, fontweight="bold")

# Plot z = 3 + 4j
z_real, z_imag = 3, 4
ax.plot(z_real, z_imag, "ro", markersize=8, label="z = 3 + 4j")

# Plot z* = 3 - 4j (conjugate)
z_conj_real, z_conj_imag = 3, -4
ax.plot(z_conj_real, z_conj_imag, "bs", markersize=8, label="z* = 3 − 4j")

# Draw vertical dashed line from z to z*
ax.plot([z_real, z_conj_real], [z_imag, z_conj_imag], "g--", linewidth=1.5, alpha=0.6)

# Draw radius line for z
ax.plot([0, z_real], [0, z_imag], "r-", linewidth=2, alpha=0.7)

# Annotate z
ax.annotate("z", xy=(z_real, z_imag), xytext=(8, 8), textcoords="offset points",
            fontsize=11, fontweight="bold", color="red")

# Annotate z*
ax.annotate("z*", xy=(z_conj_real, z_conj_imag), xytext=(8, -12), textcoords="offset points",
            fontsize=11, fontweight="bold", color="blue")

# Annotate a (real part)
ax.annotate("a = 3", xy=(z_real, 0), xytext=(0, -18), textcoords="offset points",
            fontsize=10, ha="center", color="darkred")

# Annotate b (imaginary part)
ax.annotate("b = 4", xy=(0, z_imag), xytext=(-25, 0), textcoords="offset points",
            fontsize=10, ha="right", color="darkred")

# Annotate r (magnitude)
ax.annotate("r = 5", xy=(1.5, 2), xytext=(-15, 5), textcoords="offset points",
            fontsize=10, color="darkred", fontweight="bold")

ax.legend(loc="upper left", fontsize=10, framealpha=0.95)

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776944836476-58d0496f.png", dpi=150, bbox_inches="tight")
