import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 2, figsize=(10, 4), facecolor='white')

# --- Left subplot: original x(t), triangular pulse with vertices (0,0),(2,1),(4,0) ---
ax1 = axes[0]
t_orig = np.array([0, 2, 4])
x_orig = np.array([0, 1, 0])

t_line1 = np.linspace(-1, 6, 500)
x_line1 = np.zeros_like(t_line1)
mask1 = (t_line1 >= 0) & (t_line1 <= 2)
mask2 = (t_line1 > 2) & (t_line1 <= 4)
x_line1[mask1] = t_line1[mask1] / 2
x_line1[mask2] = (4 - t_line1[mask2]) / 2

ax1.plot(t_line1, x_line1, color='steelblue', linewidth=2.5, label=r'$x(t)$')
ax1.fill_between(t_line1, x_line1, alpha=0.15, color='steelblue')
ax1.axhline(0, color='black', linewidth=0.8)
ax1.axvline(0, color='black', linewidth=0.8)
ax1.set_xlim(-1, 7)
ax1.set_ylim(-0.2, 1.4)
ax1.set_xticks([0, 2, 4])
ax1.set_yticks([0, 0.5, 1])
ax1.set_xlabel('t', fontsize=13)
ax1.set_title(r'Original: $x(t)$', fontsize=14, fontweight='bold')
ax1.grid(True, linestyle='--', alpha=0.4)
ax1.annotate('peak at t=2', xy=(2, 1), xytext=(3.2, 1.15),
             arrowprops=dict(arrowstyle='->', color='steelblue'),
             fontsize=10, color='steelblue')
ax1.text(0, -0.15, '0', ha='center', fontsize=10)
ax1.text(2, -0.15, '2', ha='center', fontsize=10)
ax1.text(4, -0.15, '4', ha='center', fontsize=10)

# --- Right subplot: x(2t-6), triangular pulse with support [3,5], peak at t=4 ---
ax2 = axes[1]
t_line2 = np.linspace(1, 7, 500)
x_line2 = np.zeros_like(t_line2)
mask3 = (t_line2 >= 3) & (t_line2 <= 4)
mask4 = (t_line2 > 4) & (t_line2 <= 5)
x_line2[mask3] = (t_line2[mask3] - 3)
x_line2[mask4] = (5 - t_line2[mask4])

ax2.plot(t_line2, x_line2, color='tomato', linewidth=2.5, label=r'$x(2t-6)$')
ax2.fill_between(t_line2, x_line2, alpha=0.15, color='tomato')
ax2.axhline(0, color='black', linewidth=0.8)
ax2.axvline(0, color='black', linewidth=0.8)
ax2.set_xlim(1, 7)
ax2.set_ylim(-0.2, 1.4)
ax2.set_xticks([0, 2, 3, 4, 5])
ax2.set_yticks([0, 0.5, 1])
ax2.set_xlabel('t', fontsize=13)
ax2.set_title(r'Transformed: $x(2t-6) = x[2(t-3)]$', fontsize=14, fontweight='bold')
ax2.grid(True, linestyle='--', alpha=0.4)
ax2.annotate('peak at t=4', xy=(4, 1), xytext=(4.8, 1.15),
             arrowprops=dict(arrowstyle='->', color='tomato'),
             fontsize=10, color='tomato')
ax2.text(3, -0.15, '3', ha='center', fontsize=10)
ax2.text(4, -0.15, '4', ha='center', fontsize=10)
ax2.text(5, -0.15, '5', ha='center', fontsize=10)

# Annotation box explaining the factoring
ax2.text(1.3, 1.25,
         r'Factor: $x(2t-6)=x[2(t-3)]$' + '\nCompress by 2, then delay by 3',
         fontsize=9.5, color='darkred',
         bbox=dict(boxstyle='round,pad=0.4', facecolor='lightyellow', edgecolor='tomato', alpha=0.85))

plt.suptitle('Combined Operation: Compression + Shift', fontsize=15, fontweight='bold', y=1.02)
plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777188544186-49o563j0.png", dpi=150, bbox_inches="tight")