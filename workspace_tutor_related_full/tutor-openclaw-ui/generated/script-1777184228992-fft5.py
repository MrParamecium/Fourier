import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(7, 7))
ax.set_facecolor('white')
fig.patch.set_facecolor('white')

# Axis limits
ax.set_xlim(-1, 5)
ax.set_ylim(-3, 5)

# Draw axes
ax.axhline(0, color='black', linewidth=1.2)
ax.axvline(0, color='black', linewidth=1.2)

# Arrow heads on axes
ax.annotate('', xy=(5, 0), xytext=(4.7, 0),
            arrowprops=dict(arrowstyle='->', color='black', lw=1.5))
ax.annotate('', xy=(0, 5), xytext=(0, 4.7),
            arrowprops=dict(arrowstyle='->', color='black', lw=1.5))

# Axis labels
ax.text(4.85, -0.35, 'Real axis', fontsize=12, ha='right', color='black')
ax.text(0.15, 4.85, 'Imaginary axis', fontsize=12, va='top', color='black')

# Main point z = a + jb at (3, 2)
a, b = 3, 2
ax.plot(a, b, 'o', color='royalblue', markersize=10, zorder=5)
ax.text(a + 0.15, b + 0.2, r'$z = a + jb$', fontsize=13, color='royalblue', fontweight='bold')

# Dashed projections
ax.plot([a, a], [0, b], '--', color='royalblue', linewidth=1.2, alpha=0.7)
ax.plot([0, a], [b, b], '--', color='royalblue', linewidth=1.2, alpha=0.7)

# Labels for a and b on axes
ax.text(a, -0.35, r'$a$', fontsize=13, ha='center', color='royalblue')
ax.text(-0.35, b, r'$b$', fontsize=13, va='center', color='royalblue')

# Tick marks at a and b
ax.plot([a, a], [-0.08, 0.08], color='black', linewidth=1.2)
ax.plot([-0.08, 0.08], [b, b], color='black', linewidth=1.2)

# Conjugate z* = a - jb at (3, -2), faint
bstar = -b
ax.plot(a, bstar, 'o', color='gray', markersize=8, zorder=4, alpha=0.5)
ax.text(a + 0.15, bstar - 0.35, r'$z^* = a - jb$', fontsize=11, color='gray', alpha=0.7)
ax.plot([a, a], [0, bstar], '--', color='gray', linewidth=1.0, alpha=0.4)
ax.plot([0, a], [bstar, bstar], '--', color='gray', linewidth=1.0, alpha=0.4)
ax.text(-0.35, bstar, r'$-b$', fontsize=11, va='center', color='gray', alpha=0.7)

# Origin label
ax.text(-0.3, -0.35, 'O', fontsize=12, ha='center', color='black')

# Grid
ax.grid(True, linestyle=':', linewidth=0.6, alpha=0.5, color='lightgray')

# Remove default spines
for spine in ax.spines.values():
    spine.set_visible(False)

ax.set_xticks([])
ax.set_yticks([])

ax.set_title('The Complex Plane: $z = a + jb$', fontsize=14, pad=14, color='black')

import os
os.makedirs('generated', exist_ok=True)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777184228992-ssrkxiew.png", dpi=150, bbox_inches="tight")