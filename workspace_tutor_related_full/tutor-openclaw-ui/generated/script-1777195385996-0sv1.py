import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

fig, ax = plt.subplots(figsize=(10, 7))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')
fig.patch.set_facecolor('white')

# Box positions: (x_center, y_center, width, height)
boxes = [
    (5.0, 8.5, 8.5, 1.2),
    (5.0, 6.3, 8.5, 1.2),
    (5.0, 4.1, 8.5, 1.2),
    (5.0, 1.9, 8.5, 1.2),
]

box_labels = [
    "Step 1: Factor the denominator and write the partial-fraction template",
    "Step 2: Multiply both sides by the common denominator (clear fractions)",
    "Step 3: Expand and collect terms by powers of x",
    "Step 4: Equate coefficients of matching powers and solve for constants",
]

box_colors = ['#dce8f5', '#ddf0dd', '#fff3cd', '#f5dce8']
border_colors = ['#3a7abf', '#3a9e3a', '#c8960c', '#bf3a7a']

for i, (bx, by, bw, bh) in enumerate(boxes):
    fancy = FancyBboxPatch(
        (bx - bw / 2, by - bh / 2), bw, bh,
        boxstyle="round,pad=0.08",
        linewidth=2,
        edgecolor=border_colors[i],
        facecolor=box_colors[i]
    )
    ax.add_patch(fancy)
    ax.text(bx, by, box_labels[i], ha='center', va='center',
            fontsize=11, fontweight='bold', color='#1a1a1a',
            wrap=True, multialignment='center')

# Arrows between boxes
arrow_xs = [5.0, 5.0, 5.0]
arrow_ys_start = [7.9, 5.7, 3.5]
arrow_ys_end = [6.9, 4.7, 2.5]
for ax_x, ay_s, ay_e in zip(arrow_xs, arrow_ys_start, arrow_ys_end):
    ax.annotate('', xy=(ax_x, ay_e), xytext=(ax_x, ay_s),
                arrowprops=dict(arrowstyle='->', color='#444444', lw=2.0))

# Side note box for repeated factor
note_x, note_y = 8.7, 8.5
note_box = FancyBboxPatch((7.05, 7.85), 2.85, 1.3,
    boxstyle="round,pad=0.06",
    linewidth=1.5,
    edgecolor='#3a7abf',
    facecolor='#eef4fb',
    linestyle='dashed'
)
ax.add_patch(note_box)
ax.text(8.48, 8.85, 'Repeated factor note:', ha='center', va='center',
        fontsize=8.5, fontweight='bold', color='#3a7abf')
ax.text(8.48, 8.5, r'$(x+3)^2$ requires BOTH', ha='center', va='center',
        fontsize=8.5, color='#1a1a1a')
ax.text(8.48, 8.15, r'$\frac{k_3}{x+3}$ AND $\frac{k_4}{(x+3)^2}$', ha='center', va='center',
        fontsize=9, color='#bf3a3a')

# Connector line from note to Step 1 box right edge
ax.annotate('', xy=(6.75, 8.5), xytext=(7.05, 8.5),
            arrowprops=dict(arrowstyle='->', color='#3a7abf', lw=1.5, linestyle='dashed'))

# Title
ax.text(5.0, 9.7, 'Clearing-Fractions Method — Four Steps',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#1a1a1a')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777195385995-towcgucf.png", dpi=150, bbox_inches="tight")