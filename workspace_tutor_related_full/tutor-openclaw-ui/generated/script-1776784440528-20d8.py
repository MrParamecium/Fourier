import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4.4, 3.6))

# --- spine setup: cross at origin ---
ax.spines["bottom"].set_position(("data", 0))
ax.spines["left"].set_position(("data", 0))
ax.spines["top"].set_color("none")
ax.spines["right"].set_color("none")

ax.set_xlim(-0.8, 5.2)
ax.set_ylim(-5.2, 5.2)
ax.set_xlabel("Real", fontsize=9, labelpad=2)
ax.set_ylabel("Imag", fontsize=9, labelpad=2)
ax.tick_params(labelsize=7)

# ticks
ax.set_xticks([0, 3])
ax.set_yticks([-4, 0, 4])

# --- points ---
z  = (3,  4)
zc = (3, -4)

# radial lines from origin
ax.plot([0, z[0]],  [0, z[1]],  'b-',  lw=1.4, zorder=2)
ax.plot([0, zc[0]], [0, zc[1]], 'r-',  lw=1.4, zorder=2)

# dashed vertical mirror line between z and z*
ax.plot([3, 3], [-4, 4], 'k--', lw=0.9, alpha=0.6)

# right-triangle legs (shared)
ax.plot([0, 3], [4, 4],  'b:',  lw=0.8, alpha=0.7)
ax.plot([3, 3], [0, 4],  'b:',  lw=0.8, alpha=0.7)
ax.plot([0, 3], [-4, -4],'r:',  lw=0.8, alpha=0.7)
ax.plot([3, 3], [0, -4], 'r:',  lw=0.8, alpha=0.7)

# dots
ax.plot(*z,  'bo', ms=6, zorder=3)
ax.plot(*zc, 'ro', ms=6, zorder=3)
ax.plot(0, 0, 'ko', ms=4, zorder=3)

# --- angle arcs ---
theta = np.degrees(np.arctan2(4, 3))
arc_t = np.linspace(0, np.radians(theta), 40)
r_arc = 1.1
ax.plot(r_arc*np.cos(arc_t),  r_arc*np.sin(arc_t),  'b-', lw=1.0)
ax.plot(r_arc*np.cos(arc_t), -r_arc*np.sin(arc_t),  'r-', lw=1.0)

# angle labels
ax.annotate(r'$\theta$',  xy=(r_arc+0.05, 0.55), fontsize=8, color='blue')
ax.annotate(r'$-\theta$', xy=(r_arc+0.05, -0.75), fontsize=8, color='red')

# r=5 labels along radial lines
mid_z  = (1.4, 2.3)
mid_zc = (1.4, -2.3)
ax.annotate(r'$r=5$', xy=mid_z,  fontsize=7.5, color='blue',
            xytext=(0, 0), textcoords='offset points', ha='center')
ax.annotate(r'$r=5$', xy=mid_zc, fontsize=7.5, color='red',
            xytext=(0, 0), textcoords='offset points', ha='center')

# --- point labels ---
ax.annotate(r'$z = 3+4j$', xy=z,
            xytext=(8, 4), textcoords='offset points',
            fontsize=8, color='blue', va='bottom')
ax.annotate(r'$z^* = 3-4j$', xy=zc,
            xytext=(8, -6), textcoords='offset points',
            fontsize=8, color='red', va='top')

# origin label
ax.annotate('O', xy=(0, 0),
            xytext=(-10, -10), textcoords='offset points',
            fontsize=8)

# mirror label
ax.annotate('mirror', xy=(3, 0.15),
            xytext=(6, 4), textcoords='offset points',
            fontsize=7, color='gray', style='italic')

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776784440526-5c07109c.png", dpi=150, bbox_inches="tight")
