import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch

fig, ax = plt.subplots(figsize=(9, 10))
fig.patch.set_facecolor('white')
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')

ax.text(5, 9.65, r'Worked Example: $F(x)=\frac{3x^2+9x-20}{(x-2)(x+3)}$',
    ha='center', va='center', fontsize=13, fontweight='bold', color='#212121')
ax.axhline(y=9.3, xmin=0.03, xmax=0.97, color='#BDBDBD', linewidth=1)

steps = [
    {
        'label': 'Step 1',
        'color_edge': '#1565C0',
        'color_face': '#E3F2FD',
        'color_text': '#0D47A1',
        'title': 'Compare degrees: m = n',
        'lines': [
            r'Numerator degree = 2,  Denominator degree = 2',
            r'Degrees match $\Rightarrow$ add constant term first.',
            r'Leading coefficient ratio: $3 / 1 = 3$',
        ]
    },
    {
        'label': 'Step 2',
        'color_edge': '#1565C0',
        'color_face': '#E3F2FD',
        'color_text': '#0D47A1',
        'title': 'Write the expansion form',
        'lines': [
            r'$F(x) = 3 + \dfrac{k_1}{x-2} + \dfrac{k_2}{x+3}$',
        ]
    },
    {
        'label': 'Step 3',
        'color_edge': '#2E7D32',
        'color_face': '#E8F5E9',
        'color_text': '#1B5E20',
        'title': 'Cover-up to find coefficients',
        'lines': [
            r'$k_1 = \left.\frac{3x^2+9x-20}{x+3}\right|_{x=2} = \frac{12+18-20}{5} = \frac{10}{5} = 2$',
            r'$k_2 = \left.\frac{3x^2+9x-20}{x-2}\right|_{x=-3} = \frac{27-27-20}{-5} = \frac{-20}{-5} = 4$',
        ]
    },
    {
        'label': 'Step 4',
        'color_edge': '#6A1B9A',
        'color_face': '#F3E5F5',
        'color_text': '#4A148C',
        'title': 'Final answer',
        'lines': [
            r'$F(x) = 3 + \dfrac{2}{x-2} + \dfrac{4}{x+3}$',
        ]
    },
]

box_heights = [2.0, 1.5, 2.2, 1.5]
total_h = sum(box_heights)
gap = (9.2 - total_h) / (len(steps) + 1)

y_cursor = 9.2
for i, (step, bh) in enumerate(zip(steps, box_heights)):
    y_top = y_cursor - gap
    y_box = y_top - bh
    ax.add_patch(FancyBboxPatch((0.3, y_box), 9.4, bh,
        boxstyle='round,pad=0.12',
        linewidth=2, edgecolor=step['color_edge'], facecolor=step['color_face']))
    ax.text(0.75, y_top - 0.22, step['label'],
        ha='left', va='center', fontsize=10, fontweight='bold',
        color='white',
        bbox=dict(boxstyle='round,pad=0.25', facecolor=step['color_edge'], edgecolor='none'))
    ax.text(2.2, y_top - 0.22, step['title'],
        ha='left', va='center', fontsize=11, fontweight='bold', color=step['color_text'])
    line_y = y_top - 0.6
    line_spacing = (bh - 0.65) / max(len(step['lines']), 1)
    for j, line in enumerate(step['lines']):
        ax.text(5.0, line_y - j * line_spacing, line,
            ha='center', va='center', fontsize=10.5, color='#212121')
    y_cursor = y_box

# Red warning box at bottom
warn_y = y_cursor - gap
ax.add_patch(FancyBboxPatch((0.3, warn_y - 0.7), 9.4, 0.7,
    boxstyle='round,pad=0.1',
    linewidth=2, edgecolor='#C62828', facecolor='#FFEBEE'))
ax.text(5, warn_y - 0.35,
    r'Missing $+3$ = common exam mistake. Always write the constant first.',
    ha='center', va='center', fontsize=10.5, color='#B71C1C', fontweight='bold')

plt.tight_layout(pad=0.5)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777196071182-571bmjp2.png", dpi=150, bbox_inches="tight")