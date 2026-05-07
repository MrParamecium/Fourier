import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

import os
os.makedirs('generated', exist_ok=True)

fig, ax = plt.subplots(figsize=(7, 7))
ax.set_facecolor('white')
fig.patch.set_facecolor('white')

# Axes
ax.axhline(0, color='black', linewidth=1.2, zorder=1)
ax.axvline(0, color='black', linewidth=1.2, zorder=1)

# Points
z_real, z_imag = 3, 2
zc_real, zc_imag = 3, -2

# Dotted projections for z
ax.plot([z_real, z_real], [0, z_imag], color='steelblue', linestyle='--', linewidth=1.2, zorder=2)
ax.plot([0, z_real], [z_imag, z_imag], color='steelblue', linestyle='--', linewidth=1.2, zorder=2)

# Dotted projections for z*
ax.plot([zc_real, zc_real], [0, zc_imag], color='tomato', linestyle='--', linewidth=1.2, zorder=2)
ax.plot([0, zc_real], [zc_imag, zc_imag], color='tomato', linestyle='--', linewidth=1.2, zorder=2)

# Reflection arrow between z and z*
ax.annotate('', xy=(zc_real + 0.15, zc_imag + 0.3), xytext=(z_real + 0.15, z_imag - 0.3),
            arrowprops=dict(arrowstyle='<->', color='gray', lw=1.5))
ax.text(3.35, 0, 'reflection\nacross real axis', fontsize=8.5, color='gray', va='center')

# Plot z
ax.scatter([z_real], [z_imag], color='steelblue', s=80, zorder=5)
ax.annotate(r'$z = 3 + 2j$' + '\n' + r'point $(3,\ 2)$',
            xy=(z_real, z_imag), xytext=(z_real + 0.3, z_imag + 0.4),
            fontsize=11, color='steelblue',
            arrowprops=dict(arrowstyle='->', color='steelblue', lw=1.2))

# Plot z*
ax.scatter([zc_real], [zc_imag], color='tomato', s=80, zorder=5)
ax.annotate(r'$z^* = 3 - 2j$' + '\n' + r'point $(3,\ -2)$',
            xy=(zc_real, zc_imag), xytext=(zc_real + 0.3, zc_imag - 0.6),
            fontsize=11, color='tomato',
            arrowprops=dict(arrowstyle='->', color='tomato', lw=1.2))

# Axis tick labels for coordinates
ax.set_xticks([-1, 0, 1, 2, 3, 4, 5])
ax.set_yticks([-4, -3, -2, -1, 0, 1, 2, 3, 4])
ax.tick_params(labelsize=10)

# Axis labels
ax.set_xlabel('Real axis', fontsize=12, labelpad=6)
ax.set_ylabel('Imaginary axis', fontsize=12, labelpad=6)

# Trap annotation box
ax.text(-0.9, 3.5,
        r'$\mathrm{Im}(z) = 2$, not $2j$',
        fontsize=9.5, color='darkgreen',
        bbox=dict(boxstyle='round,pad=0.4', facecolor='#eaffea', edgecolor='darkgreen', linewidth=1))

ax.set_xlim(-1, 5)
ax.set_ylim(-4, 4)
ax.set_aspect('equal')
ax.grid(True, linestyle=':', linewidth=0.7, color='lightgray', zorder=0)
ax.set_title('Complex Plane: $z = 3+2j$ and its conjugate $z^* = 3-2j$', fontsize=12, pad=12)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777185200788-fkucgxw9.png", dpi=150, bbox_inches="tight")