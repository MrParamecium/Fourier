import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch

fig, ax = plt.subplots(figsize=(12, 5))
ax.set_xlim(0, 12)
ax.set_ylim(0, 5)
ax.axis('off')
fig.patch.set_facecolor('white')

# Title
ax.text(6, 4.6, 'Modified Partial Fractions: divide first, multiply back last',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#1a1a1a')

# Box specs: (x_center, y_center, width, height, label_lines)
boxes = [
    {
        'x': 1.5, 'y': 2.2, 'w': 2.6, 'h': 1.8,
        'step': 'Step 1',
        'lines': [
            r'$F(x)$',
            r'$=\dfrac{5x^2+20x+18}{(x+2)(x+3)^2}$'
        ]
    },
    {
        'x': 6.0, 'y': 2.2, 'w': 4.2, 'h': 1.8,
        'step': 'Step 2',
        'lines': [
            r'$\dfrac{F(x)}{x} = \dfrac{5x^2+20x+18}{x(x+2)(x+3)^2}$',
            r'$= \dfrac{a_1}{x}+\dfrac{a_2}{x+2}+\dfrac{a_3}{x+3}+\dfrac{a_4}{(x+3)^2}$'
        ]
    },
    {
        'x': 10.4, 'y': 2.2, 'w': 2.8, 'h': 1.8,
        'step': 'Step 3',
        'lines': [
            r'$F(x) = 1$',
            r'$+\dfrac{x}{x+2}-\dfrac{2x}{x+3}$',
            r'$+\dfrac{x}{(x+3)^2}$'
        ]
    }
]

for b in boxes:
    rect = mpatches.FancyBboxPatch(
        (b['x'] - b['w']/2, b['y'] - b['h']/2),
        b['w'], b['h'],
        boxstyle='round,pad=0.08',
        linewidth=1.8,
        edgecolor='#2c5f8a',
        facecolor='#eef4fb'
    )
    ax.add_patch(rect)
    # Step label
    ax.text(b['x'], b['y'] + b['h']/2 - 0.22, b['step'],
            ha='center', va='center', fontsize=9.5, fontweight='bold', color='#2c5f8a')
    # Content lines
    n = len(b['lines'])
    offsets = [0.18 * (i - (n-1)/2) for i in range(n)]
    for i, line in enumerate(b['lines']):
        ax.text(b['x'], b['y'] - 0.12 - offsets[i], line,
                ha='center', va='center', fontsize=8.5, color='#1a1a1a')

# Arrows between boxes
arrow_props = dict(arrowstyle='->', color='#2c5f8a', lw=2.2)
ax.annotate('', xy=(6.0 - 4.2/2 - 0.05, 2.2), xytext=(1.5 + 2.6/2 + 0.05, 2.2),
            arrowprops=dict(arrowstyle='->', color='#2c5f8a', lw=2.2))
ax.annotate('', xy=(10.4 - 2.8/2 - 0.05, 2.2), xytext=(6.0 + 4.2/2 + 0.05, 2.2),
            arrowprops=dict(arrowstyle='->', color='#2c5f8a', lw=2.2))

# Arrow labels
ax.text(3.85, 2.55, r'$\div\, x$', ha='center', va='center', fontsize=10, color='#c0392b', fontweight='bold')
ax.text(8.35, 2.55, r'$\times\, x$', ha='center', va='center', fontsize=10, color='#27ae60', fontweight='bold')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777196038294-rix7jdqf.png", dpi=150, bbox_inches="tight")