import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, ax = plt.subplots(figsize=(10, 5))
ax.set_xlim(0, 10)
ax.set_ylim(0, 5)
ax.axis('off')
fig.patch.set_facecolor('white')

# Title
ax.text(5, 4.6, 'Partial Fraction Setup: Proper vs. Special Improper (m = n)',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#222222')

# Divider line
ax.plot([0.3, 9.7], [3.85, 3.85], color='#cccccc', linewidth=1.2)

# --- Proper case box ---
proper_box = mpatches.FancyBboxPatch((0.2, 2.5), 9.6, 1.2,
    boxstyle='round,pad=0.08', linewidth=1.5,
    edgecolor='#4a90d9', facecolor='#eaf3fb')
ax.add_patch(proper_box)

ax.text(0.55, 3.55, 'PROPER CASE  (m < n)', fontsize=10, fontweight='bold',
        color='#4a90d9', va='center')
ax.text(5.0, 3.05,
        r'$F(x)\;=\;\dfrac{k_1}{x-\lambda_1}\;+\;\dfrac{k_2}{x-\lambda_2}\;+\;\cdots\;+\;\dfrac{k_n}{x-\lambda_n}$',
        ha='center', va='center', fontsize=12, color='#222222')

# --- Special improper case box ---
improper_box = mpatches.FancyBboxPatch((0.2, 0.85), 9.6, 1.45,
    boxstyle='round,pad=0.08', linewidth=1.5,
    edgecolor='#e07b39', facecolor='#fff4ec')
ax.add_patch(improper_box)

ax.text(0.55, 2.12, 'SPECIAL IMPROPER CASE  (m = n)', fontsize=10, fontweight='bold',
        color='#e07b39', va='center')
ax.text(5.0, 1.52,
        r'$F(x)\;=\;\underbrace{b_n}_{\text{extra constant}}\;+\;\dfrac{k_1}{x-\lambda_1}\;+\;\dfrac{k_2}{x-\lambda_2}\;+\;\cdots\;+\;\dfrac{k_n}{x-\lambda_n}$',
        ha='center', va='center', fontsize=12, color='#222222')

# Arrow + label pointing to bn region
ax.annotate('extra constant term\nwhen degrees are equal',
            xy=(1.72, 1.52), xytext=(1.72, 0.35),
            ha='center', fontsize=9, color='#c0392b',
            arrowprops=dict(arrowstyle='->', color='#c0392b', lw=1.5),
            va='center')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777195922398-xhqu95on.png", dpi=150, bbox_inches="tight")