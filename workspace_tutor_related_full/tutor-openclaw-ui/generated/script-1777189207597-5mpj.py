import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(6, 5))
ax.set_facecolor('white')
fig.patch.set_facecolor('white')

# Components
a = 1.0
neg_b = np.sqrt(3)  # -b = sqrt(3)
C = 2.0
theta_deg = 60.0
theta_rad = np.radians(theta_deg)

# Draw axes
ax.axhline(0, color='black', linewidth=1.0, zorder=1)
ax.axvline(0, color='black', linewidth=1.0, zorder=1)

# Horizontal component: a = 1 along real axis
ax.annotate('', xy=(a, 0), xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='steelblue', lw=2.5))
ax.text(a / 2, -0.18, r'$a = 1$', ha='center', va='top', fontsize=12, color='steelblue')

# Vertical component: -b = sqrt(3) upward from tip of a
ax.annotate('', xy=(a, neg_b), xytext=(a, 0),
            arrowprops=dict(arrowstyle='->', color='darkorange', lw=2.5))
ax.text(a + 0.12, neg_b / 2, r'$-b = \sqrt{3}$', ha='left', va='center', fontsize=12, color='darkorange')

# Resultant phasor C = 2 at 60 degrees
ax.annotate('', xy=(C * np.cos(theta_rad), C * np.sin(theta_rad)), xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='crimson', lw=2.8))
ax.text(0.55, 1.05, r'$C = 2$', ha='left', va='bottom', fontsize=13, color='crimson', fontweight='bold')

# Dashed construction lines
ax.plot([a, a], [0, neg_b], color='gray', linestyle='--', linewidth=1.0, zorder=0)
ax.plot([0, a], [neg_b, neg_b], color='gray', linestyle='--', linewidth=1.0, zorder=0)

# Angle arc
angle_arc = np.linspace(0, theta_rad, 60)
arc_r = 0.45
ax.plot(arc_r * np.cos(angle_arc), arc_r * np.sin(angle_arc), color='crimson', linewidth=1.5)
ax.text(0.52, 0.18, r'$\theta = 60°$', ha='left', va='bottom', fontsize=11, color='crimson')

# Labels
ax.set_xlim(-0.5, 2.5)
ax.set_ylim(-0.5, 2.2)
ax.set_xlabel('Re', fontsize=13)
ax.set_ylabel('Im', fontsize=13)
ax.set_title(r'Phasor diagram: $x(t) = \cos(\omega_0 t) - \sqrt{3}\,\sin(\omega_0 t)$', fontsize=12, pad=12)
ax.set_aspect('equal')
ax.grid(True, linestyle=':', linewidth=0.7, alpha=0.6)

# Origin dot
ax.plot(0, 0, 'ko', markersize=4)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777189207597-4mer6is2.png", dpi=150, bbox_inches="tight")