import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(10, 4))
fig.patch.set_facecolor('white')
ax.set_facecolor('white')

# Define a simple rectangular pulse: 1 for 0 <= t <= 1, else 0
def pulse(t_arr, shift=0):
    return np.where((t_arr - shift >= 0) & (t_arr - shift <= 1), 1.0, 0.0)

t = np.linspace(-4, 6, 2000)

y_orig = pulse(t, shift=0)
y_delay = pulse(t, shift=2)
y_advance = pulse(t, shift=-2)

ax.plot(t, y_orig,   color='#2166ac', linewidth=2.5, label=r'$x(t)$ — original')
ax.plot(t, y_delay,  color='#d6604d', linewidth=2.5, linestyle='--', label=r'$x(t-2)$ — delayed (right by 2)')
ax.plot(t, y_advance,color='#4dac26', linewidth=2.5, linestyle=':', label=r'$x(t+2)$ — advanced (left by 2)')

# Arrows showing direction of shift
ax.annotate('', xy=(2.5, 1.15), xytext=(0.5, 1.15),
            arrowprops=dict(arrowstyle='->', color='#d6604d', lw=2))
ax.text(1.5, 1.22, 'delay / right', ha='center', fontsize=11, color='#d6604d', fontweight='bold')

ax.annotate('', xy=(-1.5, 1.15), xytext=(0.5, 1.15),
            arrowprops=dict(arrowstyle='->', color='#4dac26', lw=2))
ax.text(-0.5, 1.22, 'advance / left', ha='center', fontsize=11, color='#4dac26', fontweight='bold')

ax.set_xlim(-4, 6)
ax.set_ylim(-0.2, 1.4)
ax.set_xlabel(r'$t$', fontsize=13)
ax.set_ylabel('Amplitude', fontsize=12)
ax.set_title('Time Shifting: Minus Inside = Right (Delay), Plus Inside = Left (Advance)', fontsize=13, fontweight='bold')
ax.axhline(0, color='black', linewidth=0.8)
ax.axvline(0, color='black', linewidth=0.8, linestyle=':')
ax.grid(True, linestyle='--', alpha=0.4)
ax.legend(fontsize=11, loc='upper right')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777188499298-qoot5tmf.png", dpi=150, bbox_inches="tight")