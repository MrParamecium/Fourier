import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5.5))
fig.patch.set_facecolor('white')

for ax in (ax1, ax2):
    ax.set_facecolor('white')
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 6)
    ax.axis('off')

# ---- LEFT PANEL: Rectangular form for + and - ----
ax1.add_patch(mpatches.FancyBboxPatch((0.2, 0.2), 9.6, 5.6,
    boxstyle='round,pad=0.1', linewidth=2, edgecolor='#1a6faf', facecolor='#eaf3fb'))
ax1.text(5, 5.4, 'Rectangular form is best for  +  and  −',
    ha='center', va='center', fontsize=12, fontweight='bold', color='#1a6faf')

ax1.text(5, 4.5, r'$z_1 = 3 + 4j$', ha='center', fontsize=12, color='#333')
ax1.text(5, 3.8, r'$z_2 = 2 + 3j$', ha='center', fontsize=12, color='#333')

ax1.annotate('', xy=(5, 3.0), xytext=(5, 3.5),
    arrowprops=dict(arrowstyle='->', color='#1a6faf', lw=2))

ax1.add_patch(mpatches.FancyBboxPatch((2.0, 1.8), 6.0, 1.0,
    boxstyle='round,pad=0.1', linewidth=1.5, edgecolor='#1a6faf', facecolor='white'))
ax1.text(5, 2.35, r'$z_1 + z_2 = (3+2) + (4+3)j = 5 + 7j$',
    ha='center', va='center', fontsize=11, color='#1a6faf', fontweight='bold')

ax1.text(5, 1.1, 'Just add real parts and imaginary parts separately.',
    ha='center', fontsize=9.5, color='#555', style='italic')

# ---- RIGHT PANEL: Polar form for x and / ----
ax2.add_patch(mpatches.FancyBboxPatch((0.2, 0.2), 9.6, 5.6,
    boxstyle='round,pad=0.1', linewidth=2, edgecolor='#d62728', facecolor='#fdecea'))
ax2.text(5, 5.4, 'Polar form is best for  ×  and  ÷',
    ha='center', va='center', fontsize=12, fontweight='bold', color='#d62728')

ax2.text(5, 4.55, r'$z_1 = r_1 e^{j\theta_1}$,   $z_2 = r_2 e^{j\theta_2}$',
    ha='center', fontsize=12, color='#333')

ax2.add_patch(mpatches.FancyBboxPatch((0.6, 3.3), 8.8, 0.75,
    boxstyle='round,pad=0.08', linewidth=1, edgecolor='#d62728', facecolor='white'))
ax2.text(5, 3.68,
    r'$z_1 \times z_2 = r_1 r_2\, e^{j(\theta_1+\theta_2)}$   (multiply $r$, add $\theta$)',
    ha='center', va='center', fontsize=10.5, color='#d62728')

ax2.add_patch(mpatches.FancyBboxPatch((0.6, 2.35), 8.8, 0.75,
    boxstyle='round,pad=0.08', linewidth=1, edgecolor='#d62728', facecolor='white'))
ax2.text(5, 2.73,
    r'$z_1 / z_2 = (r_1/r_2)\, e^{j(\theta_1-\theta_2)}$   (divide $r$, subtract $\theta$)',
    ha='center', va='center', fontsize=10.5, color='#d62728')

ax2.add_patch(mpatches.FancyBboxPatch((0.6, 1.35), 8.8, 0.75,
    boxstyle='round,pad=0.08', linewidth=1, edgecolor='#d62728', facecolor='white'))
ax2.text(5, 1.73,
    r'$z^n = r^n e^{jn\theta}$   (raise $r$ to power, multiply $\theta$ by $n$)',
    ha='center', va='center', fontsize=10.5, color='#d62728')

ax2.text(5, 0.65, 'No component-by-component expansion needed.',
    ha='center', fontsize=9.5, color='#555', style='italic')

plt.suptitle('Choose the Right Form for the Right Operation',
    fontsize=13, fontweight='bold', y=1.01)
plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777188947494-j1uuultx.png", dpi=150, bbox_inches="tight")