import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch
import matplotlib.patheffects as pe

fig, ax = plt.subplots(figsize=(10, 9))
fig.patch.set_facecolor('white')
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')

ax.text(5, 9.6, r'Worked Example: $F(x) = \dfrac{3x^2+9x-20}{(x-2)(x+3)}$',
    fontsize=13, ha='center', va='center', fontweight='bold', color='#2c3e50')

step_data = [
    {
        'y': 8.3,
        'label': 'Step 1',
        'text': r'Degrees match (both = 2)  $\Rightarrow$  start with constant  $\mathbf{3}$',
        'color': '#d6eaf8',
        'edge': '#1a5276'
    },
    {
        'y': 6.9,
        'label': 'Step 2',
        'text': r'Write:  $F(x) = 3 + \dfrac{k_1}{x-2} + \dfrac{k_2}{x+3}$',
        'color': '#d6eaf8',
        'edge': '#1a5276'
    },
    {
        'y': 5.3,
        'label': 'Step 3',
        'text': r'Cover-up at $x=2$:  $k_1 = \dfrac{3(4)+18-20}{2+3} = \dfrac{10}{5} = 2$',
        'color': '#d6eaf8',
        'edge': '#1a5276'
    },
    {
        'y': 3.7,
        'label': 'Step 4',
        'text': r'Cover-up at $x=-3$:  $k_2 = \dfrac{3(9)-27-20}{-3-2} = \dfrac{-20}{-5} = 4$',
        'color': '#d6eaf8',
        'edge': '#1a5276'
    },
]

for step in step_data:
    box = FancyBboxPatch((0.4, step['y'] - 0.55), 9.2, 1.0,
        boxstyle='round,pad=0.15', linewidth=1.8,
        edgecolor=step['edge'], facecolor=step['color'])
    ax.add_patch(box)
    ax.text(1.1, step['y'] - 0.05, step['label'], fontsize=10,
        ha='center', va='center', fontweight='bold', color=step['edge'])
    ax.text(5.5, step['y'] - 0.05, step['text'], fontsize=11,
        ha='center', va='center', color='#1b2631')

# Arrows between steps
for y_top, y_bot in [(7.75, 7.45), (6.35, 5.85), (4.75, 4.25)]:
    ax.annotate('', xy=(5, y_bot), xytext=(5, y_top),
        arrowprops=dict(arrowstyle='->', color='#5d6d7e', lw=1.8))

# Final answer box (green)
final_box = FancyBboxPatch((0.8, 1.5), 8.4, 1.6,
    boxstyle='round,pad=0.2', linewidth=2.5,
    edgecolor='#1e8449', facecolor='#eafaf1')
ax.add_patch(final_box)
ax.text(5, 2.55, 'Final Answer', fontsize=11, ha='center', va='center',
    fontweight='bold', color='#1e8449')
ax.text(5, 1.95,
    r'$F(x) = 3 + \dfrac{2}{x-2} + \dfrac{4}{x+3}$',
    fontsize=13, ha='center', va='center', color='#145a32', fontweight='bold')

ax.annotate('', xy=(5, 3.1), xytext=(5, 3.65),
    arrowprops=dict(arrowstyle='->', color='#5d6d7e', lw=1.8))

# Red trap note
trap_box = FancyBboxPatch((5.8, 0.1), 3.9, 1.1,
    boxstyle='round,pad=0.1', linewidth=1.5,
    edgecolor='#c0392b', facecolor='#fdedec')
ax.add_patch(trap_box)
ax.text(7.75, 0.82, 'TRAP', fontsize=9, ha='center', va='center',
    fontweight='bold', color='#c0392b')
ax.text(7.75, 0.38, 'Forgetting the constant 3\nmakes the whole setup wrong.',
    fontsize=8.5, ha='center', va='center', color='#922b21')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777196195878-xnpvosdh.png", dpi=150, bbox_inches="tight")