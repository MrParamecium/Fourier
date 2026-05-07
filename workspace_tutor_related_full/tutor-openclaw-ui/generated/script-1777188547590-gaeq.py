import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
fig.patch.set_facecolor('white')

# ── Left panel: narrowing unit-area pulses ──────────────────────────────────
ax1 = axes[0]
ax1.set_facecolor('white')

t_full = np.linspace(-2, 2, 4000)

pulse_params = [
    {'width': 1.2, 'color': '#4C72B0', 'label': r'$\varepsilon = 1.2$, height $= 1/\varepsilon \approx 0.83$'},
    {'width': 0.6, 'color': '#DD8452', 'label': r'$\varepsilon = 0.6$, height $= 1/\varepsilon \approx 1.67$'},
    {'width': 0.2, 'color': '#55A868', 'label': r'$\varepsilon = 0.2$, height $= 1/\varepsilon = 5.0$'},
]

for p in pulse_params:
    w = p['width']
    h = 1.0 / w
    y = np.where(np.abs(t_full) <= w / 2, h, 0.0)
    ax1.plot(t_full, y, color=p['color'], linewidth=2, label=p['label'])

ax1.annotate('', xy=(0, 3.3), xytext=(0, 0),
             arrowprops=dict(arrowstyle='->', color='black', lw=1.5))
ax1.text(0.08, 3.2, r'$\delta(t)$ (limit)', fontsize=10, color='black')

ax1.axhline(0, color='black', linewidth=0.8)
ax1.axvline(0, color='black', linewidth=0.5, linestyle='--', alpha=0.4)
ax1.set_xlim(-2, 2)
ax1.set_ylim(-0.3, 3.8)
ax1.set_xlabel('t', fontsize=12)
ax1.set_ylabel('Amplitude', fontsize=12)
ax1.set_title('Narrowing Pulses — Area Always = 1', fontsize=13, fontweight='bold')
ax1.legend(fontsize=9, loc='upper right')
ax1.text(-1.85, 3.5, 'Each shaded pulse has area = 1', fontsize=9,
         style='italic', color='gray')
ax1.grid(True, linestyle='--', alpha=0.4)

# ── Right panel: shifted impulse sampling a smooth function ─────────────────
ax2 = axes[1]
ax2.set_facecolor('white')

t2 = np.linspace(-0.5, 4, 1000)
phi = 0.5 + 0.8 * np.exp(-0.4 * t2) * np.cos(1.2 * t2) + 0.3 * t2 * np.exp(-0.5 * t2)

ax2.plot(t2, phi, color='#4C72B0', linewidth=2.2, label=r'$\phi(t)$')

T = 2.0
phi_T = 0.5 + 0.8 * np.exp(-0.4 * T) * np.cos(1.2 * T) + 0.3 * T * np.exp(-0.5 * T)

arrow_height = phi_T + 1.2
ax2.annotate('', xy=(T, phi_T + 0.05), xytext=(T, arrow_height),
             arrowprops=dict(arrowstyle='->', color='#C44E52', lw=2.5))
ax2.text(T + 0.08, arrow_height - 0.05,
         r'$\delta(t - T)$' + '\n' + r'(impulse at $T$)',
         fontsize=10, color='#C44E52', va='top')

ax2.plot(T, phi_T, 'o', color='#C44E52', markersize=9, zorder=5,
         label=r'Sampled value $\phi(T)$')
ax2.plot([T, T], [0, phi_T], color='#C44E52', linewidth=1.5,
         linestyle='--', alpha=0.7)
ax2.plot([-0.5, T], [phi_T, phi_T], color='#C44E52', linewidth=1.5,
         linestyle='--', alpha=0.7)

ax2.text(-0.45, phi_T + 0.05, r'$\phi(T)$', fontsize=11, color='#C44E52')
ax2.text(T + 0.06, -0.22, r'$T$', fontsize=12, color='#C44E52')

ax2.axhline(0, color='black', linewidth=0.8)
ax2.set_xlim(-0.5, 4)
ax2.set_ylim(-0.35, 3.0)
ax2.set_xlabel('t', fontsize=12)
ax2.set_ylabel(r'$\phi(t)$', fontsize=12)
ax2.set_title(r'Shifted Impulse Samples $\phi(t)$ at $t = T$', fontsize=13, fontweight='bold')
ax2.legend(fontsize=10, loc='upper right')
ax2.grid(True, linestyle='--', alpha=0.4)

plt.tight_layout(pad=2.0)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777188547590-zgh4fzuv.png", dpi=150, bbox_inches="tight")