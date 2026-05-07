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

box_color = '#D6EAF8'
border_color = '#2980B9'
warn_color = '#F9EBEA'
warn_border = '#C0392B'

boxes = [
    (0.3, 1.2, 3.8, 2.6),
    (5.1, 1.2, 3.8, 2.6),
    (9.9, 1.2, 3.8, 2.6),
]

for (x0, y0, w, h) in boxes:
    fancy = FancyBboxPatch((x0, y0), w, h,
                           boxstyle='round,pad=0.1',
                           linewidth=2,
                           edgecolor=border_color,
                           facecolor=box_color)
    ax.add_patch(fancy)

arrow_props = dict(arrowstyle='->', color='#2C3E50', lw=2.5)
ax.annotate('', xy=(5.1, 2.5), xytext=(4.1, 2.5),
            arrowprops=arrow_props)
ax.annotate('', xy=(9.9, 2.5), xytext=(8.9, 2.5),
            arrowprops=arrow_props)

ax.text(2.2, 4.05, 'Step 1', fontsize=11, fontweight='bold',
        ha='center', color='#1A5276')
ax.text(7.0, 4.05, 'Step 2', fontsize=11, fontweight='bold',
        ha='center', color='#1A5276')
ax.text(11.8, 4.05, 'Step 3', fontsize=11, fontweight='bold',
        ha='center', color='#1A5276')

ax.text(2.2, 3.55, 'Start with F(x)', fontsize=10, fontweight='bold',
        ha='center', color='#1B2631')
ax.text(2.2, 3.05,
        r'$F(x)=\dfrac{5x^2+20x+18}{(x+2)(x+3)^2}$',
        fontsize=8.5, ha='center', color='#1B2631')

ax.text(7.0, 3.55, 'Divide by x, expand normally', fontsize=10,
        fontweight='bold', ha='center', color='#1B2631')
ax.text(7.0, 3.0,
        r'$\dfrac{F(x)}{x}=\dfrac{a_1}{x}+\dfrac{a_2}{x+2}+\dfrac{a_3}{x+3}+\dfrac{a_4}{(x+3)^2}$',
        fontsize=8, ha='center', color='#1B2631')

ax.text(11.8, 3.55, 'Multiply by x to get F(x)', fontsize=10,
        fontweight='bold', ha='center', color='#1B2631')
ax.text(11.8, 3.0,
        r'$F(x)=1+\dfrac{x}{x+2}-\dfrac{2x}{x+3}+\dfrac{x}{(x+3)^2}$',
        fontsize=8, ha='center', color='#1B2631')

warn1 = FancyBboxPatch((5.1, 0.05), 3.8, 0.95,
                        boxstyle='round,pad=0.05',
                        linewidth=1.5,
                        edgecolor=warn_border,
                        facecolor=warn_color)
ax.add_patch(warn1)
ax.text(7.0, 0.55, 'Do ordinary partial fractions here.',
        fontsize=8.5, ha='center', color='#922B21', style='italic')

warn2 = FancyBboxPatch((9.9, 0.05), 3.8, 0.95,
                        boxstyle='round,pad=0.05',
                        linewidth=1.5,
                        edgecolor=warn_border,
                        facecolor=warn_color)
ax.add_patch(warn2)
ax.text(11.8, 0.55, 'Do not forget to multiply every term by x.',
        fontsize=8.5, ha='center', color='#922B21', style='italic')

ax.text(7.0, 4.75, 'Modified Partial Fractions — Three-Step Method',
        fontsize=13, fontweight='bold', ha='center', color='#1A5276')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777188924399-kdlcrm7c.png", dpi=150, bbox_inches="tight")