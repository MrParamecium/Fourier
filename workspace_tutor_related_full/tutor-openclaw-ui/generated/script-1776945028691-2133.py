import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 2, figsize=(4.6, 3.6))

# Left plot: Rectangular form z = a + jb
ax = axes[0]
a, b = 3, 4
z_real = a
z_imag = b

ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

ax.plot([0, a], [0, 0], 'b-', linewidth=1.5, label='Re(z)')
ax.plot([a, a], [0, b], 'r-', linewidth=1.5, label='Im(z)')
ax.plot([0, a], [0, b], 'k--', linewidth=1.5, alpha=0.6)
ax.plot(a, b, 'ko', markersize=7)

ax.annotate('z = 3+4j', xy=(a, b), xytext=(8, 8), textcoords='offset points',
            fontsize=10, fontweight='bold')
ax.annotate('a', xy=(a/2, -0.3), xytext=(0, 0), textcoords='offset points',
            fontsize=9, ha='center')
ax.annotate('b', xy=(a+0.3, b/2), xytext=(0, 0), textcoords='offset points',
            fontsize=9, ha='left')

ax.set_xlim(-0.5, 5)
ax.set_ylim(-0.5, 5)
ax.set_aspect('equal')
ax.set_xlabel('Real', fontsize=10, loc='right')
ax.set_ylabel('Imaginary', fontsize=10, loc='top')
ax.set_title('Rectangular Form', fontsize=10, fontweight='bold')
ax.grid(True, alpha=0.2, linewidth=0.5)
ax.set_xticks([0, 1, 2, 3, 4, 5])
ax.set_yticks([0, 1, 2, 3, 4, 5])

# Right plot: Polar form z = r(cos θ + j sin θ)
ax = axes[1]
r = 5
theta = np.arctan2(b, a)
theta_deg = np.degrees(theta)

ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

theta_arc = np.linspace(0, theta, 50)
arc_r = 1.2
ax.plot(arc_r * np.cos(theta_arc), arc_r * np.sin(theta_arc), 'g-', linewidth=1.5)
ax.plot([0, a], [0, b], 'k-', linewidth=2)
ax.plot(a, b, 'ko', markersize=7)

ax.annotate('z = 5e^(j53.1°)', xy=(a, b), xytext=(8, 8), textcoords='offset points',
            fontsize=10, fontweight='bold')
ax.annotate('r=5', xy=(a/2-0.3, b/2-0.3), xytext=(0, 0), textcoords='offset points',
            fontsize=9, color='black')
ax.annotate('θ', xy=(1.5, 0.5), xytext=(0, 0), textcoords='offset points',
            fontsize=9, color='green')

ax.set_xlim(-0.5, 5)
ax.set_ylim(-0.5, 5)
ax.set_aspect('equal')
ax.set_xlabel('Real', fontsize=10, loc='right')
ax.set_ylabel('Imaginary', fontsize=10, loc='top')
ax.set_title('Polar Form', fontsize=10, fontweight='bold')
ax.grid(True, alpha=0.2, linewidth=0.5)
ax.set_xticks([0, 1, 2, 3, 4, 5])
ax.set_yticks([0, 1, 2, 3, 4, 5])

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776945028689-940d70bd.png", dpi=150, bbox_inches="tight")
