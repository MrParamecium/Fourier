import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, ax = plt.subplots(figsize=(6, 6))
fig.patch.set_facecolor('white')
ax.set_facecolor('white')

# Axes
ax.axhline(0, color='black', linewidth=1.2)
ax.axvline(0, color='black', linewidth=1.2)

# Point
px, py = -2, -3
ax.plot(px, py, 'o', color='#c0392b', markersize=10, zorder=5)
ax.annotate('$z = -2 - 3j$', xy=(px, py), xytext=(px - 0.3, py - 0.45),
            fontsize=12, color='#c0392b', ha='right')

# Dashed projections
ax.plot([px, px], [0, py], '--', color='#7f8c8d', linewidth=1.2)
ax.plot([0, px], [py, py], '--', color='#7f8c8d', linewidth=1.2)

# Tick labels for projections
ax.annotate('-2', xy=(px, 0), xytext=(px - 0.05, 0.18), fontsize=11, ha='center', color='#2c3e50')
ax.annotate('-3', xy=(0, py), xytext=(0.22, py), fontsize=11, va='center', color='#2c3e50')

# Radius line
ax.plot([0, px], [0, py], '-', color='#2980b9', linewidth=2.0, zorder=4)
mid_x, mid_y = px / 2 - 0.35, py / 2 + 0.25
ax.annotate(r'$r = \sqrt{13}$', xy=(mid_x, mid_y), fontsize=11, color='#2980b9', ha='center')

# Angle arc
angle_deg = np.degrees(np.arctan2(py, px))  # -123.69
theta_vals = np.linspace(0, np.radians(angle_deg), 200)
arc_r = 0.8
ax.plot(arc_r * np.cos(theta_vals), arc_r * np.sin(theta_vals), color='#e67e22', linewidth=2.0)
ax.annotate(r'$\theta = -123.7^\circ$', xy=(-1.05, -0.55), fontsize=11, color='#e67e22', ha='center')

# Reference angle arc (dashed, first quadrant equivalent)
ref_angle = np.radians(56.3)
theta_ref = np.linspace(0, ref_angle, 100)
ax.plot(1.15 * np.cos(-theta_ref), 1.15 * np.sin(-theta_ref), '--', color='#95a5a6', linewidth=1.4)
ax.annotate(r'raw $\tan^{-1}$: $56.3^\circ$ (wrong quadrant)', xy=(0.55, -0.85), fontsize=9.5,
            color='#95a5a6', ha='left')

# Quadrant labels
for qx, qy, label in [(1.5, 1.5, 'Q I'), (-2.5, 1.5, 'Q II'), (-2.5, -1.5, 'Q III'), (1.5, -1.5, 'Q IV')]:
    ax.text(qx, qy, label, fontsize=10, color='#bdc3c7', ha='center', va='center')

# Axes labels
ax.set_xlabel('Real', fontsize=13)
ax.set_ylabel('Imaginary', fontsize=13)
ax.set_xlim(-4, 2)
ax.set_ylim(-4, 2)
ax.set_xticks(range(-4, 3))
ax.set_yticks(range(-4, 3))
ax.grid(True, linestyle=':', linewidth=0.7, color='#ecf0f1')
ax.set_title('Quadrant correction for $z = -2 - 3j$', fontsize=13, pad=12)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777188947873-9ltkwmh7.png", dpi=150, bbox_inches="tight")