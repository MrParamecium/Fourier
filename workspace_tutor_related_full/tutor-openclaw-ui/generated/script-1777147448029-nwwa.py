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

# Row labels
ax.text(0.15, 3.7, 'Denominator\nfactors:', fontsize=11, fontweight='bold',
        va='center', ha='left', color='#222222')
ax.text(0.15, 1.3, 'Partial-fraction\nterms:', fontsize=11, fontweight='bold',
        va='center', ha='left', color='#222222')

# Denominator factor boxes
repeated_box_x = 3.2
unrep1_box_x = 7.2
unrep2_box_x = 9.4

def draw_box(ax, cx, cy, text, color='#1a5276', fontsize=13):
    bbox_props = dict(boxstyle='round,pad=0.4', facecolor='#d6eaf8', edgecolor=color, linewidth=2)
    ax.text(cx, cy, text, fontsize=fontsize, ha='center', va='center',
            bbox=bbox_props, color=color, fontweight='bold')

draw_box(ax, repeated_box_x, 3.7, r'$(x-\lambda)^3$', color='#1a5276', fontsize=13)
draw_box(ax, unrep1_box_x, 3.7, r'$(x-\alpha_1)$', color='#7d6608', fontsize=13)
draw_box(ax, unrep2_box_x, 3.7, r'$(x-\alpha_2)$', color='#7d6608', fontsize=13)

# Partial-fraction term boxes
term_positions = [1.8, 3.2, 4.6]
term_labels = [
    r'$\dfrac{a_0}{(x-\lambda)^3}$',
    r'$\dfrac{a_1}{(x-\lambda)^2}$',
    r'$\dfrac{a_2}{(x-\lambda)}$'
]

for tx, tlabel in zip(term_positions, term_labels):
    bbox_props = dict(boxstyle='round,pad=0.4', facecolor='#d6eaf8', edgecolor='#1a5276', linewidth=1.5)
    ax.text(tx, 1.3, tlabel, fontsize=11, ha='center', va='center',
            bbox=bbox_props, color='#1a5276')

# Unrepeated term boxes
for ux, ulabel in [(7.2, r'$\dfrac{k_1}{(x-\alpha_1)}$'), (9.4, r'$\dfrac{k_2}{(x-\alpha_2)}$')]:
    bbox_props = dict(boxstyle='round,pad=0.4', facecolor='#fef9e7', edgecolor='#7d6608', linewidth=1.5)
    ax.text(ux, 1.3, ulabel, fontsize=11, ha='center', va='center',
            bbox=bbox_props, color='#7d6608')

# Plus signs between terms
for px in [2.5, 3.9, 5.3, 6.3, 8.3]:
    ax.text(px, 1.3, '+', fontsize=16, ha='center', va='center', color='#444444')

# Blue arrows from repeated factor box to each of the three terms
for tx in term_positions:
    ax.annotate('', xy=(tx, 1.85), xytext=(repeated_box_x, 3.25),
                arrowprops=dict(arrowstyle='->', color='#2980b9', lw=1.8,
                                connectionstyle='arc3,rad=0.0'))

# Brown arrows from unrepeated factor boxes to their terms
for ux in [7.2, 9.4]:
    ax.annotate('', xy=(ux, 1.85), xytext=(ux, 3.25),
                arrowprops=dict(arrowstyle='->', color='#b7950b', lw=1.8))

# Legend
blue_patch = mpatches.Patch(facecolor='#d6eaf8', edgecolor='#1a5276', label='Repeated factor — full ladder of descending powers')
brown_patch = mpatches.Patch(facecolor='#fef9e7', edgecolor='#7d6608', label='Unrepeated factor — one term only')
ax.legend(handles=[blue_patch, brown_patch], loc='lower right', fontsize=10,
          framealpha=0.95, edgecolor='#aaaaaa')

ax.set_title('Denominator Factors → Partial-Fraction Terms', fontsize=14,
             fontweight='bold', pad=12, color='#111111')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777147448029-dz53r6m0.png", dpi=150, bbox_inches="tight")