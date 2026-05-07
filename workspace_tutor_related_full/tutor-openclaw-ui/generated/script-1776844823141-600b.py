import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(2, 1, figsize=(4.6, 3.6))

t = np.linspace(0, 2, 500)
C = 1.0
f0 = 1.0
w0 = 2 * np.pi * f0
T0 = 1.0 / f0
theta_deg = 30
theta_rad = np.deg2rad(theta_deg)

cos_wave = C * np.cos(w0 * t)
shifted_wave = C * np.cos(w0 * t + theta_rad)
sin_wave = C * np.sin(w0 * t)

# --- Top panel: cos vs shifted cos ---
ax1 = axes[0]
ax1.plot(t, cos_wave, 'b-', lw=1.4, label=r'$\cos(\omega_0 t)$')
ax1.plot(t, shifted_wave, 'r--', lw=1.4, label=r'$\cos(\omega_0 t+30°)$')
ax1.axhline(0, color='k', lw=0.6)
ax1.axvline(0, color='k', lw=0.6)

# Period arrow
ax1.annotate('', xy=(T0, -0.75), xytext=(0, -0.75),
             arrowprops=dict(arrowstyle='<->', color='gray', lw=1.0))
ax1.annotate(r'$T_0$', xy=(T0/2, -0.75), xytext=(0, -6),
             textcoords='offset points', ha='center', fontsize=7, color='gray')

# Amplitude label
ax1.annotate(r'$C$', xy=(0, C), xytext=(4, 2),
             textcoords='offset points', fontsize=7, color='b')

ax1.set_xlim(-0.05, 2.05)
ax1.set_ylim(-1.3, 1.45)
ax1.set_ylabel('Amplitude', fontsize=7, labelpad=2)
ax1.set_xlabel('t (s)', fontsize=7, labelpad=2)
ax1.tick_params(labelsize=6)
ax1.legend(fontsize=6, loc='upper right', framealpha=0.7, handlelength=1.5)

# Spine at origin
ax1.spines['bottom'].set_position(('data', 0))
ax1.spines['left'].set_position(('data', 0))
ax1.spines['top'].set_color('none')
ax1.spines['right'].set_color('none')

# --- Bottom panel: cos vs sin ---
ax2 = axes[1]
ax2.plot(t, cos_wave, 'b-', lw=1.4, label=r'$\cos(\omega_0 t)$')
ax2.plot(t, sin_wave, 'g-.', lw=1.4, label=r'$\sin(\omega_0 t)$')
ax2.axhline(0, color='k', lw=0.6)
ax2.axvline(0, color='k', lw=0.6)

# 90-deg lag arrow
quarter = T0 / 4
ax2.annotate('', xy=(quarter, -0.78), xytext=(0, -0.78),
             arrowprops=dict(arrowstyle='<->', color='purple', lw=1.0))
ax2.annotate(r'$90°$ lag', xy=(quarter/2, -0.78), xytext=(0, -7),
             textcoords='offset points', ha='center', fontsize=6.5, color='purple')

ax2.set_xlim(-0.05, 2.05)
ax2.set_ylim(-1.3, 1.45)
ax2.set_ylabel('Amplitude', fontsize=7, labelpad=2)
ax2.set_xlabel('t (s)', fontsize=7, labelpad=2)
ax2.tick_params(labelsize=6)
ax2.legend(fontsize=6, loc='upper right', framealpha=0.7, handlelength=1.5)

ax2.spines['bottom'].set_position(('data', 0))
ax2.spines['left'].set_position(('data', 0))
ax2.spines['top'].set_color('none')
ax2.spines['right'].set_color('none')

plt.tight_layout(pad=0.25)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776844823141-50723f4a.png", dpi=150, bbox_inches="tight")
