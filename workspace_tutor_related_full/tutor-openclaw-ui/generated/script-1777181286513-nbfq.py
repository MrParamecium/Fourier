import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

fig, ax = plt.subplots(figsize=(8, 9))
ax.set_xlim(0, 10)
ax.set_ylim(0, 12)
ax.axis('off')
fig.patch.set_facecolor('white')

# Box definitions: (x_center, y_center, width, height, text)
boxes = [
    (5, 10.5, 8.5, 1.2,
     'Step 1: Write the partial fraction form\n'
     r'$\frac{N(x)}{(x+1)^3(x+2)} = \frac{a_0}{(x+1)^3}+\frac{a_1}{(x+1)^2}+\frac{a_2}{x+1}+\frac{k}{x+2}$'),
    (5, 8.0, 8.5, 1.4,
     'Step 2: Use cover-up on easy coefficients\n'
     'Find $a_0$ (cover $(x+1)^3$, set $x=-1$) and $k$ (cover $(x+2)$, set $x=-2$)'),
    (5, 5.5, 8.5, 1.4,
     'Step 3: Find remaining coefficients\n'
     'Substitute known values, multiply through by the common denominator,\n'
     'then match polynomial coefficients or use a shortcut substitution'),
    (5, 3.0, 8.5, 1.4,
     'Step 4: Check\n'
     'Verify with leftover coefficient equations or plug in a convenient x-value'),
]

for (xc, yc, w, h, txt) in boxes:
    fancy = FancyBboxPatch((xc - w/2, yc - h/2), w, h,
                           boxstyle='round,pad=0.15',
                           linewidth=2, edgecolor='#2255AA',
                           facecolor='#EEF3FF')
    ax.add_patch(fancy)
    ax.text(xc, yc, txt, ha='center', va='center',
            fontsize=9.5, color='#111111',
            multialignment='center',
            wrap=True)

# Arrows between boxes
arrow_xs = [5, 5, 5]
arrow_y_starts = [9.8, 7.3, 4.8]
arrow_y_ends   = [8.7, 6.2, 3.7]
for ax_x, ys, ye in zip(arrow_xs, arrow_y_starts, arrow_y_ends):
    ax.annotate('', xy=(ax_x, ye), xytext=(ax_x, ys),
                arrowprops=dict(arrowstyle='->', color='#2255AA', lw=2))

# Side note near Step 2
ax.text(9.3, 8.0,
        'Avoid\nrepeated\ndifferentiation',
        ha='center', va='center',
        fontsize=8, color='#AA3300',
        style='italic',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='#FFF3EE',
                  edgecolor='#AA3300', linewidth=1.2))
ax.annotate('', xy=(9.05, 8.0), xytext=(8.75, 8.0),
            arrowprops=dict(arrowstyle='->', color='#AA3300', lw=1.5))

ax.set_title('Hybrid Partial Fraction Workflow: Cover-Up + Algebraic Cleanup',
             fontsize=11, fontweight='bold', pad=10, color='#111111')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777181286513-pwmsoao9.png", dpi=150, bbox_inches="tight")