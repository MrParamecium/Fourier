import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

fig, ax = plt.subplots(figsize=(14, 4))
ax.set_xlim(0, 14)
ax.set_ylim(0, 4)
ax.axis('off')
fig.patch.set_facecolor('white')

# Box dimensions
box_width = 3.6
box_height = 2.0
box_y = 1.0
box_positions = [0.4, 5.0, 9.6]
box_color = '#D6EAF8'
border_color = '#2980B9'

# Box labels (title + content)
box_titles = ['Step 1: Start with F(x)', 'Step 2: Divide by x and decompose', 'Step 3: Multiply back by x']
box_contents = [
    r'$F(x) = \frac{5x^2+20x+18}{(x+2)(x+3)^2}$',
    r'$\frac{F(x)}{x} = \frac{1}{x}+\frac{1}{x+2}-\frac{2}{x+3}+\frac{1}{(x+3)^2}$',
    r'$F(x) = 1+\frac{x}{x+2}-\frac{2x}{x+3}+\frac{x}{(x+3)^2}$'
]

for i, (xpos, title, content) in enumerate(zip(box_positions, box_titles, box_contents)):
    # Draw box
    fancy = FancyBboxPatch((xpos, box_y), box_width, box_height,
                           boxstyle='round,pad=0.08',
                           linewidth=1.8, edgecolor=border_color,
                           facecolor=box_color)
    ax.add_patch(fancy)
    # Title text
    ax.text(xpos + box_width / 2, box_y + box_height - 0.28, title,
            ha='center', va='top', fontsize=9.5, fontweight='bold', color='#1A5276')
    # Content formula
    ax.text(xpos + box_width / 2, box_y + box_height / 2 - 0.05, content,
            ha='center', va='center', fontsize=8.5, color='#1C2833',
            wrap=True)

# Draw arrows between boxes
for i in range(2):
    x_start = box_positions[i] + box_width + 0.05
    x_end = box_positions[i + 1] - 0.05
    y_mid = box_y + box_height / 2
    ax.annotate('',
                xy=(x_end, y_mid),
                xytext=(x_start, y_mid),
                arrowprops=dict(arrowstyle='->', color='#2980B9', lw=2.2))

# Note under last box
note_x = box_positions[2] + box_width / 2
note_y = box_y - 0.38
ax.text(note_x, note_y,
        u'Target form: kx / (x \u2212 \u03bb)\u02b3',
        ha='center', va='top', fontsize=9, color='#922B21',
        fontstyle='italic',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='#FADBD8', edgecolor='#C0392B', linewidth=1.2))

plt.title('Modified Partial Fractions — Three-Step Procedure',
          fontsize=12, fontweight='bold', color='#1A5276', pad=10)
plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777181400232-3bj6ri92.png", dpi=150, bbox_inches="tight")