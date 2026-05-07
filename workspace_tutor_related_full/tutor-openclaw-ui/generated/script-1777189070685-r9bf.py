import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch

fig, ax = plt.subplots(figsize=(10, 6))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')
fig.patch.set_facecolor('white')

# Title
ax.text(5, 9.4, 'Denominator Factors → Partial-Fraction Terms', fontsize=14, fontweight='bold',
        ha='center', va='center', color='#1a1a1a')

# Column headers
ax.text(2.2, 8.5, 'Denominator Factor', fontsize=11, fontweight='bold',
        ha='center', va='center', color='#333333')
ax.text(7.8, 8.5, 'Partial-Fraction Term(s)', fontsize=11, fontweight='bold',
        ha='center', va='center', color='#333333')

# Divider line under headers
ax.plot([0.3, 9.7], [8.1, 8.1], color='#cccccc', linewidth=1.2)

# Row data
rows = [
    {'factor': '(x + 1)', 'terms': [r'$\dfrac{k_1}{x+1}$'], 'y': 7.0, 'repeated': False},
    {'factor': '(x + 2)', 'terms': [r'$\dfrac{k_2}{x+2}$'], 'y': 5.6, 'repeated': False},
    {'factor': r'$(x + 3)^2$', 'terms': [r'$\dfrac{k_3}{x+3}$', r'$\dfrac{k_4}{(x+3)^2}$'], 'y': 4.0, 'repeated': True},
]

for row in rows:
    y = row['y']
    color = '#d0e8ff' if row['repeated'] else '#f5f5f5'
    edge = '#2266cc' if row['repeated'] else '#aaaaaa'
    lw = 2.0 if row['repeated'] else 1.0

    # Left box
    left_box = mpatches.FancyBboxPatch((0.4, y - 0.55), 3.2, 1.1,
        boxstyle='round,pad=0.08', facecolor=color, edgecolor=edge, linewidth=lw)
    ax.add_patch(left_box)
    ax.text(2.0, y, row['factor'], fontsize=13, ha='center', va='center', color='#1a1a1a')

    # Arrow
    ax.annotate('', xy=(5.5, y), xytext=(3.7, y),
        arrowprops=dict(arrowstyle='->', color='#2266cc', lw=2.0))

    # Right box(es)
    if len(row['terms']) == 1:
        right_box = mpatches.FancyBboxPatch((5.6, y - 0.55), 3.9, 1.1,
            boxstyle='round,pad=0.08', facecolor=color, edgecolor=edge, linewidth=lw)
        ax.add_patch(right_box)
        ax.text(7.55, y, row['terms'][0], fontsize=13, ha='center', va='center', color='#1a1a1a')
    else:
        # Two terms stacked side by side
        right_box = mpatches.FancyBboxPatch((5.6, y - 0.85), 3.9, 1.7,
            boxstyle='round,pad=0.08', facecolor=color, edgecolor=edge, linewidth=lw)
        ax.add_patch(right_box)
        ax.text(7.55, y + 0.38, row['terms'][0], fontsize=12, ha='center', va='center', color='#1a1a1a')
        ax.text(7.55, y - 0.38, row['terms'][1], fontsize=12, ha='center', va='center', color='#cc2200')
        ax.text(7.55, y, '+', fontsize=11, ha='center', va='center', color='#555555')

    # Repeated label
    if row['repeated']:
        ax.text(9.6, y, 'REPEATED\nFACTOR', fontsize=8, ha='center', va='center',
                color='#cc2200', fontweight='bold',
                bbox=dict(boxstyle='round,pad=0.3', facecolor='#fff0ee', edgecolor='#cc2200', linewidth=1.2))

# Bottom note
note_box = mpatches.FancyBboxPatch((0.3, 0.3), 9.4, 1.2,
    boxstyle='round,pad=0.1', facecolor='#fffbe6', edgecolor='#e6a800', linewidth=2.0)
ax.add_patch(note_box)
ax.text(5.0, 0.95, 'KEY RULE:', fontsize=11, fontweight='bold', ha='center', va='center', color='#7a5000')
ax.text(5.0, 0.55,
    r'A repeated factor $(x+a)^2$ requires BOTH $\dfrac{1}{x+a}$ AND $\dfrac{1}{(x+a)^2}$ terms.',
    fontsize=11, ha='center', va='center', color='#1a1a1a')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777189070685-a1l7su7e.png", dpi=150, bbox_inches="tight")