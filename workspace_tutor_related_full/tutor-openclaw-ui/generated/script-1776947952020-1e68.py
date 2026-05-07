import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(4.6, 3.6))

# Left plot: Correct polar form with magnitude r
ax1.set_xlim(-0.5, 5.5)
ax1.set_ylim(-0.5, 5.5)
ax1.set_aspect('equal')
ax1.spines["bottom"].set_position(("data", 0))
ax1.spines["left"].set_position(("data", 0))
ax1.spines["top"].set_color("none")
ax1.spines["right"].set_color("none")
ax1.set_xlabel("Real", loc="right", fontsize=10)
ax1.set_ylabel("Imag", loc="top", fontsize=10)
ax1.grid(True, alpha=0.3, linewidth=0.5)
ax1.set_title("Correct: z = r(cos θ + j sin θ)", fontsize=10, fontweight='bold')

# Plot point z = 3 + 4j
z_real, z_imag = 3, 4
r = np.sqrt(z_real**2 + z_imag**2)
theta = np.arctan2(z_imag, z_real)

ax1.plot([0, z_real], [0, z_imag], 'b-', linewidth=2.5, label='z')
ax1.plot(z_real, z_imag, 'bo', markersize=8)
ax1.plot([0, r*np.cos(theta)], [0, r*np.sin(theta)], 'g--', linewidth=1.5, alpha=0.7)

# Arc for angle
arc_angles = np.linspace(0, theta, 30)
arc_r = 0.8
ax1.plot(arc_r*np.cos(arc_angles), arc_r*np.sin(arc_angles), 'r-', linewidth=1.5)

# Labels using annotate
ax1.annotate('z = 3+4j', xy=(z_real, z_imag), xytext=(8, 8), 
             textcoords='offset points', fontsize=9, fontweight='bold')
ax1.annotate('r = 5', xy=(1.5, 2), xytext=(10, 5), 
             textcoords='offset points', fontsize=9, color='green', fontweight='bold')
ax1.annotate('θ', xy=(0.6, 0.3), xytext=(5, 5), 
             textcoords='offset points', fontsize=9, color='red', fontweight='bold')

# Right plot: Wrong polar form with real part a
ax2.set_xlim(-0.5, 5.5)
ax2.set_ylim(-0.5, 5.5)
ax2.set_aspect('equal')
ax2.spines["bottom"].set_position(("data", 0))
ax2.spines["left"].set_position(("data", 0))
ax2.spines["top"].set_color("none")
ax2.spines["right"].set_color("none")
ax2.set_xlabel("Real", loc="right", fontsize=10)
ax2.set_ylabel("Imag", loc="top", fontsize=10)
ax2.grid(True, alpha=0.3, linewidth=0.5)
ax2.set_title("Wrong: z = a(cos θ + j sin θ)", fontsize=10, fontweight='bold', color='red')

# Plot correct point
ax2.plot([0, z_real], [0, z_imag], 'b-', linewidth=2.5, alpha=0.5, label='Correct z')
ax2.plot(z_real, z_imag, 'bo', markersize=8, alpha=0.5)

# Plot wrong point using a instead of r
a = z_real  # a = 3
wrong_z_real = a * np.cos(theta)
wrong_z_imag = a * np.sin(theta)
ax2.plot([0, wrong_z_real], [0, wrong_z_imag], 'r-', linewidth=2.5, label='Wrong z')
ax2.plot(wrong_z_real, wrong_z_imag, 'ro', markersize=8)

# Arc for angle
ax2.plot(arc_r*np.cos(arc_angles), arc_r*np.sin(arc_angles), 'r-', linewidth=1.5)

# Labels
ax2.annotate('Correct\nz = 3+4j', xy=(z_real, z_imag), xytext=(8, 8), 
             textcoords='offset points', fontsize=8, color='blue', alpha=0.7)
ax2.annotate('Wrong z\n(using a=3)', xy=(wrong_z_real, wrong_z_imag), xytext=(8, -15), 
             textcoords='offset points', fontsize=8, color='red', fontweight='bold')
ax2.annotate('a = 3', xy=(0.5, 0), xytext=(5, -12), 
             textcoords='offset points', fontsize=9, color='red', fontweight='bold')

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776947952016-024be845.png", dpi=150, bbox_inches="tight")
