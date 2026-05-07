import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
fig.patch.set_facecolor('white')

# --- Panel (a): a=1, b=-sqrt(3), phasor = 1 - j(-sqrt(3)) = 1 + j*sqrt(3) ---
ax = axes[0]
ax.set_facecolor('white')
ax.axhline(0, color='black', linewidth=1.2)
ax.axvline(0, color='black', linewidth=1.2)

a1, b1 = 1.0, -np.sqrt(3)
re1 = a1          # real part of phasor a - jb
im1 = -b1         # imaginary part of phasor a - jb = +sqrt(3)
C1 = np.sqrt(a1**2 + b1**2)  # = 2
theta1 = np.degrees(np.arctan2(im1, re1))  # = 60 deg

# Dotted component lines
ax.plot([0, re1], [0, 0], 'b--', linewidth=1.5, label=f'a = {a1} (real)')
ax.plot([re1, re1], [0, im1], 'r--', linewidth=1.5, label=f'-b = {im1:.3f} (imag)')

# Resultant phasor
ax.annotate('', xy=(re1, im1), xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='green', lw=2.5))

# Arc for angle
angle_arc = np.linspace(0, np.radians(theta1), 60)
ax.plot(0.45*np.cos(angle_arc), 0.45*np.sin(angle_arc), 'purple', linewidth=1.5)
ax.text(0.55, 0.22, r'$\theta = 60°$', fontsize=11, color='purple')

# Labels
ax.text(re1 + 0.08, im1 + 0.08, f'C = {C1:.0f}', fontsize=12, color='green', fontweight='bold')
ax.text(0.5, -0.25, f'a = {a1}', fontsize=10, color='blue')
ax.text(1.08, im1/2, f'$-b = \\sqrt{{3}}$', fontsize=10, color='red')

ax.set_xlim(-0.5, 2.8)
ax.set_ylim(-0.8, 2.5)
ax.set_xlabel('Re', fontsize=12)
ax.set_ylabel('Im', fontsize=12)
ax.set_title('(a)  $x(t) = \\cos(\\omega_0 t) - \\sqrt{3}\\sin(\\omega_0 t)$\n'
             '$a=1,\ b=-\\sqrt{3}$  →  $C=2,\ \\theta=60°$', fontsize=11)
ax.grid(True, linestyle=':', alpha=0.5)
ax.legend(fontsize=9, loc='upper left')
ax.set_aspect('equal')

# --- Panel (b): a=-3, b=4, phasor = -3 - j4 ---
ax2 = axes[1]
ax2.set_facecolor('white')
ax2.axhline(0, color='black', linewidth=1.2)
ax2.axvline(0, color='black', linewidth=1.2)

a2, b2 = -3.0, 4.0
re2 = a2          # real part of phasor a - jb = -3
im2 = -b2         # imaginary part = -4
C2 = np.sqrt(a2**2 + b2**2)  # = 5
theta2 = np.degrees(np.arctan2(im2, re2))  # ~ -126.87 deg

# Dotted component lines
ax2.plot([0, re2], [0, 0], 'b--', linewidth=1.5, label=f'a = {a2} (real)')
ax2.plot([re2, re2], [0, im2], 'r--', linewidth=1.5, label=f'-b = {im2:.0f} (imag)')

# Resultant phasor
ax2.annotate('', xy=(re2, im2), xytext=(0, 0),
             arrowprops=dict(arrowstyle='->', color='green', lw=2.5))

# Arc for angle (from 0 going clockwise to ~-126.87 deg)
angle_arc2 = np.linspace(0, np.radians(theta2), 80)
ax2.plot(0.9*np.cos(angle_arc2), 0.9*np.sin(angle_arc2), 'purple', linewidth=1.5)
ax2.text(-2.2, -0.55, r'$\theta \approx -126.9°$', fontsize=10, color='purple')

# Labels
ax2.text(re2 - 0.15, im2 - 0.35, f'C = {C2:.0f}', fontsize=12, color='green', fontweight='bold')
ax2.text(-1.5, 0.18, f'a = {a2}', fontsize=10, color='blue')
ax2.text(re2 - 1.1, im2/2, f'-b = {im2:.0f}', fontsize=10, color='red')

# Trap annotation
ax2.text(-5.5, 1.8, 'TRAP: raw arctan gives\n+53.1° (wrong quadrant!)', fontsize=9,
         color='darkred', bbox=dict(boxstyle='round,pad=0.3', facecolor='#ffe0e0', edgecolor='darkred'))

ax2.set_xlim(-6.5, 2.5)
ax2.set_ylim(-5.5, 3.0)
ax2.set_xlabel('Re', fontsize=12)
ax2.set_ylabel('Im', fontsize=12)
ax2.set_title('(b)  $x(t) = -3\\cos(\\omega_0 t) + 4\\sin(\\omega_0 t)$\n'
              '$a=-3,\ b=4$  →  $C=5,\ \\theta\\approx-126.9°$', fontsize=11)
ax2.grid(True, linestyle=':', alpha=0.5)
ax2.legend(fontsize=9, loc='upper right')
ax2.set_aspect('equal')

plt.suptitle('Phasor Addition: Component Vectors and Resultant', fontsize=13, fontweight='bold', y=1.01)
plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777189345077-u428g881.png", dpi=150, bbox_inches="tight")