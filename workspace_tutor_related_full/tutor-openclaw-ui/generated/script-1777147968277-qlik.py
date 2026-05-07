import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch

fig, ax = plt.subplots(figsize=(10, 7))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')
fig.patch.set_facecolor('white')

# Title box at top
title_box = dict(boxstyle='round,pad=0.6', facecolor='#2c3e50', edgecolor='#2c3e50')
ax.text(5, 9.0, r'$F(x) = \dfrac{P(x)}{(x-\lambda_1)(x-\lambda_2)(x-\lambda_3)}$',
        ha='center', va='center', fontsize=13, color='white',
        bbox=title_box, fontfamily='DejaVu Sans')

# Arrow from title down
ax.annotate('', xy=(5, 7.7), xytext=(5, 8.35),
            arrowprops=dict(arrowstyle='->', color='#2c3e50', lw=2))

ax.text(5, 7.45, 'For each coefficient, cover its factor and substitute its root:',
        ha='center', va='center', fontsize=10.5, color='#555555', style='italic')

# Three method boxes
box_style = dict(boxstyle='round,pad=0.55', facecolor='#eaf4fb', edgecolor='#2980b9', linewidth=1.8)
positions = [1.2, 4.5, 7.8]
labels = [
    r'For $k_1$:' + '\nCover $(x-\lambda_1)$' + '\nSet $x = \lambda_1$',
    r'For $k_2$:' + '\nCover $(x-\lambda_2)$' + '\nSet $x = \lambda_2$',
    r'For $k_3$:' + '\nCover $(x-\lambda_3)$' + '\nSet $x = \lambda_3$'
]

for xpos, label in zip(positions, labels):
    ax.text(xpos + 0.85, 6.0, label,
            ha='center', va='center', fontsize=10.5,
            bbox=box_style, linespacing=1.6)
    # Arrow from label text area down to result
    ax.annotate('', xy=(xpos + 0.85, 4.75), xytext=(xpos + 0.85, 5.25),
                arrowprops=dict(arrowstyle='->', color='#2980b9', lw=1.8))
    result_box = dict(boxstyle='round,pad=0.4', facecolor='#d5f5e3', edgecolor='#27ae60', linewidth=1.6)
    ax.text(xpos + 0.85, 4.35, r'$k_r$ found!', ha='center', va='center',
            fontsize=10.5, color='#1e8449', bbox=result_box)

# Arrows from title to each box
for xpos in positions:
    ax.annotate('', xy=(xpos + 0.85, 6.7), xytext=(5, 7.3),
                arrowprops=dict(arrowstyle='->', color='#7f8c8d', lw=1.4,
                                connectionstyle='arc3,rad=0.0'))

# Bottom note
note_box = dict(boxstyle='round,pad=0.5', facecolor='#fef9e7', edgecolor='#f39c12', linewidth=1.6)
ax.text(5, 2.9,
        'Works directly for distinct factors only.\nRepeated or quadratic factors require additional steps.',
        ha='center', va='center', fontsize=10, color='#7d6608',
        bbox=note_box, linespacing=1.5)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777147968277-r72msoae.png", dpi=150, bbox_inches="tight")