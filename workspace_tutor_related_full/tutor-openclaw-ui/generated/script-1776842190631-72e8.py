import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 4.0))

# Unit circle
theta_vals = np.linspace(0, 2 * np.pi, 300)
ax.plot(np.cos(theta_vals), np.sin(theta_vals), 'b-', lw=1.2, alpha=0.5)

# Chosen angle
theta = np.pi / 3  # 60 degrees

cos_t = np.cos(theta)
sin_t = np.sin(theta)

# Point on unit circle
ax.plot(cos_t, sin_t, 'ro', ms=6, zorder=5)

# Radius vector
ax.annotate("", xy=(cos_t, sin_t), xytext=(0, 0),
            arrowprops=dict(arrowstyle="-|>", color='red', lw=1.5))

# Dashed lines to axes
ax.plot([cos_t, cos_t], [0, sin_t], 'k--', lw=0.8)
ax.plot([0, cos_t], [sin_t, sin_t], 'k--', lw=0.8)

# Arc for theta
arc_t = np.linspace(0, theta, 60)
ax.plot(0.18 * np.cos(arc_t), 0.18 * np.sin(arc_t), 'k-', lw=1.0)

# Four special points
specials = [
    (1, 0,   r'$1$',       (6, -14)),
    (0, 1,   r'$j$',       (6,   5)),
    (-1, 0,  r'$-1$',      (-22, -14)),
    (0, -1,  r'$-j$',      (6,  -14)),
]
for sx, sy, lbl, off in specials:
    ax.plot(sx, sy, 'bs', ms=5, zorder=5)
    ax.annotate(lbl, xy=(sx, sy), xytext=off,
                textcoords='offset points', fontsize=8.5, color='navy')

# Label the main point
ax.annotate(r'$e^{j\theta}=\cos\theta+j\sin\theta$',
            xy=(cos_t, sin_t), xytext=(8, 6),
            textcoords='offset points', fontsize=8, color='red')

# cos theta label on real axis
ax.annotate(r'$\cos\theta$', xy=(cos_t / 2, 0), xytext=(0, -14),
            textcoords='offset points', fontsize=8, ha='center')

# sin theta label on imag axis
ax.annotate(r'$\sin\theta$', xy=(0, sin_t / 2), xytext=(-28, 0),
            textcoords='offset points', fontsize=8, va='center')

# theta label
ax.annotate(r'$\theta$', xy=(0.22, 0.10), fontsize=8)

# r=1 label along radius
ax.annotate(r'$r=1$', xy=(cos_t / 2, sin_t / 2), xytext=(-18, 6),
            textcoords='offset points', fontsize=8, color='red')

# Spines at origin
ax.spines['bottom'].set_position(('data', 0))
ax.spines['left'].set_position(('data', 0))
ax.spines['top'].set_color('none')
ax.spines['right'].set_color('none')

ax.set_xlabel('Real', fontsize=9, labelpad=2)
ax.set_ylabel('Imag', fontsize=9, labelpad=2, rotation=90)

ax.set_xlim(-1.45, 1.55)
ax.set_ylim(-1.35, 1.45)
ax.set_aspect('equal')
ax.tick_params(labelsize=7)
ax.set_xticks([-1, 0, 1])
ax.set_yticks([-1, 0, 1])

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776842190629-d24195e0.png", dpi=150, bbox_inches="tight")
