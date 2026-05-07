import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

fig, ax = plt.subplots(figsize=(9, 5.5))
ax.set_xlim(0, 10)
ax.set_ylim(0, 6)
ax.axis('off')
fig.patch.set_facecolor('white')

# Title
ax.text(5, 5.6, 'Heaviside Cover-Up Method — Step Flow',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#1a1a1a')

# Box styling
box_color = '#d6eaf8'
border_color = '#2980b9'
text_color = '#1a1a1a'

boxes = [
    (0.4, 2.8, 2.8, 1.6,
     'STEP 1\nWrite F(x) as a sum of\nconstants over each\ndistinct linear factor'),
    (3.6, 2.8, 2.8, 1.6,
     'STEP 2\nChoose one factor (x - a)\nand cover it\n(mentally remove it)'),
    (6.8, 2.8, 2.8, 1.6,
     'STEP 3\nSubstitute x = a into\nthe remaining expression.\nThat value is the coefficient.')
]

for (x, y, w, h, label) in boxes:
    fancy = FancyBboxPatch((x, y), w, h,
                           boxstyle='round,pad=0.08',
                           facecolor=box_color,
                           edgecolor=border_color,
                           linewidth=1.8)
    ax.add_patch(fancy)
    ax.text(x + w / 2, y + h / 2, label,
            ha='center', va='center', fontsize=9.5,
            color=text_color, multialignment='center')

# Arrows between boxes
arrow_props = dict(arrowstyle='->', color=border_color, lw=2)
ax.annotate('', xy=(3.6, 3.6), xytext=(3.2, 3.6),
            arrowprops=dict(arrowstyle='->', color=border_color, lw=2))
ax.annotate('', xy=(6.8, 3.6), xytext=(6.4, 3.6),
            arrowprops=dict(arrowstyle='->', color=border_color, lw=2))

# Repeat label
ax.annotate('', xy=(0.4, 3.6), xytext=(0.4, 2.0),
            arrowprops=dict(arrowstyle='->', color='#7f8c8d', lw=1.5,
                            connectionstyle='arc3,rad=0.0'))
ax.annotate('', xy=(9.6, 3.6), xytext=(9.6, 2.0),
            arrowprops=dict(arrowstyle='->', color='#7f8c8d', lw=1.5))
ax.annotate('', xy=(9.6, 2.0), xytext=(0.4, 2.0),
            arrowprops=dict(arrowstyle='->', color='#7f8c8d', lw=1.5))
ax.text(5, 1.82, 'Repeat for each factor', ha='center', va='center',
        fontsize=8.5, color='#7f8c8d', style='italic')

# Warning box
warn_fancy = FancyBboxPatch((1.5, 0.15), 7.0, 1.3,
                             boxstyle='round,pad=0.08',
                             facecolor='#fef9e7',
                             edgecolor='#e67e22',
                             linewidth=1.8)
ax.add_patch(warn_fancy)
ax.text(5, 0.80,
        'WARNING: Works directly for distinct linear factors only.\n'
        'Repeated factors and irreducible quadratics need extra steps.',
        ha='center', va='center', fontsize=9, color='#7d3c00',
        multialignment='center')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777181424568-8d9nku2b.png", dpi=150, bbox_inches="tight")