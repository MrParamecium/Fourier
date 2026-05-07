import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 3, figsize=(14, 4), facecolor='white')
fig.suptitle('Combined Transformation: x(2t-6) = x[2(t-3)]', fontsize=13, fontweight='bold', y=1.02)

# Define base signal x(t): trapezoid on [0, 4]
def x_base(t):
    y = np.zeros_like(t, dtype=float)
    # ramp up from 0 to 1 over [0,1]
    mask1 = (t >= 0) & (t < 1)
    y[mask1] = t[mask1]
    # flat at 1 over [1,3]
    mask2 = (t >= 1) & (t <= 3)
    y[mask2] = 1.0
    # ramp down from 1 to 0 over [3,4]
    mask3 = (t > 3) & (t <= 4)
    y[mask3] = 4.0 - t[mask3]
    return y

t_fine = np.linspace(-1, 8, 2000)

# Panel 1: x(t)
ax1 = axes[0]
y1 = x_base(t_fine)
ax1.plot(t_fine, y1, 'b-', linewidth=2.5)
ax1.axvline(0, color='gray', linewidth=0.8, linestyle='--')
ax1.axhline(0, color='black', linewidth=0.8)
ax1.fill_between(t_fine, 0, y1, alpha=0.15, color='blue')
ax1.set_xlim(-1, 8)
ax1.set_ylim(-0.5, 2.5)
ax1.set_title('Original: x(t)', fontsize=12, fontweight='bold')
ax1.set_xlabel('t', fontsize=11)
ax1.set_ylabel('Amplitude', fontsize=11)
ax1.annotate('Support: [0, 4]', xy=(2, 1.05), fontsize=9, ha='center', color='blue')
ax1.annotate('t=0', xy=(0, -0.3), fontsize=9, ha='center', color='gray')
ax1.set_facecolor('white')
ax1.grid(True, alpha=0.3)
for spine in ['top','right']:
    ax1.spines[spine].set_visible(False)

# Panel 2: x(2t-6) = x[2(t-3)]
# x(2t-6): replace t with 2t-6 in x_base
# x_base is nonzero when 0 <= 2t-6 <= 4, i.e., 3 <= t <= 5
ax2 = axes[1]
y2 = x_base(2*t_fine - 6)
ax2.plot(t_fine, y2, 'r-', linewidth=2.5)
ax2.axvline(0, color='gray', linewidth=0.8, linestyle='--')
ax2.axvline(3, color='orange', linewidth=1.2, linestyle=':', label='t=3 (shift anchor)')
ax2.axhline(0, color='black', linewidth=0.8)
ax2.fill_between(t_fine, 0, y2, alpha=0.15, color='red')
ax2.set_xlim(-1, 8)
ax2.set_ylim(-0.5, 2.5)
ax2.set_title('x(2t-6) = x[2(t-3)]\nCompress by 2, then shift right by 3', fontsize=11, fontweight='bold')
ax2.set_xlabel('t', fontsize=11)
ax2.annotate('Support: [3, 5]', xy=(4, 1.05), fontsize=9, ha='center', color='red')
ax2.annotate('t=3\n(shift=b/a=6/2)', xy=(3, -0.35), fontsize=8.5, ha='center', color='orange')
ax2.annotate('t=0', xy=(0, -0.35), fontsize=9, ha='center', color='gray')
ax2.set_facecolor('white')
ax2.grid(True, alpha=0.3)
for spine in ['top','right']:
    ax2.spines[spine].set_visible(False)

# Panel 3: Annotation diagram showing two equivalent paths
ax3 = axes[2]
ax3.set_xlim(0, 10)
ax3.set_ylim(0, 10)
ax3.set_facecolor('white')
ax3.axis('off')
ax3.set_title('Two Equivalent Operation Sequences', fontsize=11, fontweight='bold')

# Box: x(t)
ax3.text(5, 9.0, 'x(t)', fontsize=12, ha='center', va='center',
         bbox=dict(boxstyle='round,pad=0.4', facecolor='lightblue', edgecolor='blue', linewidth=1.5))

# Path A: shift by 6, then compress by 2
ax3.annotate('', xy=(2.2, 6.2), xytext=(3.8, 8.4),
             arrowprops=dict(arrowstyle='->', color='green', lw=1.8))
ax3.text(1.0, 7.3, 'Path A:\nShift right by 6\n→ x(t-6)', fontsize=8.5, ha='center', color='green',
         bbox=dict(boxstyle='round,pad=0.3', facecolor='honeydew', edgecolor='green', linewidth=1))
ax3.annotate('', xy=(4.0, 3.8), xytext=(2.5, 5.8),
             arrowprops=dict(arrowstyle='->', color='green', lw=1.8))
ax3.text(2.2, 4.8, 'Then compress\nby 2', fontsize=8.5, ha='center', color='green')

# Path B: compress by 2, then shift by 3
ax3.annotate('', xy=(7.8, 6.2), xytext=(6.2, 8.4),
             arrowprops=dict(arrowstyle='->', color='purple', lw=1.8))
ax3.text(9.0, 7.3, 'Path B:\nCompress by 2\n→ x(2t)', fontsize=8.5, ha='center', color='purple',
         bbox=dict(boxstyle='round,pad=0.3', facecolor='lavender', edgecolor='purple', linewidth=1))
ax3.annotate('', xy=(6.0, 3.8), xytext=(7.5, 5.8),
             arrowprops=dict(arrowstyle='->', color='purple', lw=1.8))
ax3.text(7.8, 4.8, 'Then shift\nright by 3', fontsize=8.5, ha='center', color='purple')

# Final result box
ax3.text(5, 2.8, 'x(2t-6) = x[2(t-3)]\nSame final signal!', fontsize=10, ha='center', va='center',
         bbox=dict(boxstyle='round,pad=0.5', facecolor='lightyellow', edgecolor='darkorange', linewidth=2))

# Key trap note
ax3.text(5, 1.0, 'TRAP: Shift amount is b/a = 6/2 = 3, NOT 6!', fontsize=9, ha='center', va='center',
         color='red', fontweight='bold',
         bbox=dict(boxstyle='round,pad=0.3', facecolor='mistyrose', edgecolor='red', linewidth=1.5))

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777193026219-5ttwxqsh.png", dpi=150, bbox_inches="tight")