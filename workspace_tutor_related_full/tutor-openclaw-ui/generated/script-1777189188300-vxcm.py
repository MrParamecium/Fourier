import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

fig, ax = plt.subplots(figsize=(14, 5))
ax.set_xlim(0, 14)
ax.set_ylim(0, 5)
ax.axis('off')
fig.patch.set_facecolor('white')

# Box styling
box_color = '#dce8f7'
border_color = '#2a6db5'
text_kw = dict(ha='center', va='center', fontsize=9.5, fontfamily='monospace', wrap=True)
label_kw = dict(ha='center', va='center', fontsize=8.5, color='#333333')

# --- Box 1 ---
box1 = FancyBboxPatch((0.3, 1.2), 3.4, 2.6, boxstyle='round,pad=0.15',
                       linewidth=1.5, edgecolor=border_color, facecolor=box_color)
ax.add_patch(box1)
ax.text(2.0, 3.35, 'F(x)', fontsize=10, ha='center', va='center', fontweight='bold')
ax.text(2.0, 2.75, r'$\frac{5x^2+20x+18}{(x+2)(x+3)^2}$', fontsize=10, ha='center', va='center')
ax.text(2.0, 1.55, 'Original expression', fontsize=8, ha='center', va='center', color='#555555', style='italic')

# --- Arrow 1 ---
ax.annotate('', xy=(5.1, 2.5), xytext=(3.75, 2.5),
            arrowprops=dict(arrowstyle='->', color=border_color, lw=2.0))
ax.text(4.42, 2.85, 'divide by x', fontsize=8.5, ha='center', va='center', color='#2a6db5', fontweight='bold')

# --- Box 2 ---
box2 = FancyBboxPatch((5.1, 0.5), 3.8, 4.0, boxstyle='round,pad=0.15',
                       linewidth=1.5, edgecolor=border_color, facecolor=box_color)
ax.add_patch(box2)
ax.text(7.0, 4.15, 'F(x)/x', fontsize=10, ha='center', va='center', fontweight='bold')
ax.text(7.0, 3.5, r'$\frac{a_1}{x}+\frac{a_2}{x+2}+\frac{a_3}{x+3}+\frac{a_4}{(x+3)^2}$', fontsize=9, ha='center', va='center')
ax.text(7.0, 2.7, r'$a_1=1,\ a_2=1,\ a_3=-2,\ a_4=1$', fontsize=9, ha='center', va='center', color='#1a5c1a')
ax.text(7.0, 1.7, 'Repeated factor $(x+3)^2$\nneeds TWO terms:', fontsize=8, ha='center', va='center', color='#8b0000')
ax.text(7.0, 1.05, r'$\frac{a_3}{x+3}$ and $\frac{a_4}{(x+3)^2}$', fontsize=8.5, ha='center', va='center', color='#8b0000')

# --- Arrow 2 ---
ax.annotate('', xy=(9.2, 2.5), xytext=(8.95, 2.5),
            arrowprops=dict(arrowstyle='->', color=border_color, lw=2.0))
ax.text(9.57, 2.85, 'multiply by x', fontsize=8.5, ha='center', va='center', color='#2a6db5', fontweight='bold')

# --- Box 3 ---
box3 = FancyBboxPatch((9.9, 0.9), 3.8, 3.2, boxstyle='round,pad=0.15',
                       linewidth=1.5, edgecolor=border_color, facecolor=box_color)
ax.add_patch(box3)
ax.text(11.8, 3.75, 'F(x)  [modified form]', fontsize=10, ha='center', va='center', fontweight='bold')
ax.text(11.8, 3.1, r'$1+\frac{x}{x+2}-\frac{2x}{x+3}+\frac{x}{(x+3)^2}$', fontsize=9.5, ha='center', va='center')
ax.text(11.8, 2.2, r'Note: $x \cdot \frac{1}{x} = 1$', fontsize=8.5, ha='center', va='center', color='#8b0000', fontweight='bold')
ax.text(11.8, 1.5, '(constant term — easy to miss!)', fontsize=8, ha='center', va='center', color='#8b0000', style='italic')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777189188300-31tbirkd.png", dpi=150, bbox_inches="tight")