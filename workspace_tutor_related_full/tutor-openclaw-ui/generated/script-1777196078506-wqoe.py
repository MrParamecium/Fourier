import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

fig, ax = plt.subplots(figsize=(8, 7))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')
fig.patch.set_facecolor('white')

boxes = [
    (5, 8.5, 'Write partial fraction form', '#1a1a2e', 'white'),
    (5, 6.2, 'Use cover-up on easy factors:\nfind k and a\u2080 directly', '#0f3460', 'white'),
    (5, 3.9, 'Clear fractions\n(multiply both sides by full denominator)', '#16213e', 'white'),
    (5, 1.6, 'Solve remaining coefficients\nby coefficient matching or shortcuts', '#1a1a2e', 'white'),
]

for (cx, cy, label, facecolor, textcolor) in boxes:
    bbox = FancyBboxPatch((cx - 3.5, cy - 0.75), 7, 1.5,
                          boxstyle='round,pad=0.15',
                          linewidth=1.8,
                          edgecolor='#2563eb',
                          facecolor=facecolor)
    ax.add_patch(bbox)
    ax.text(cx, cy, label, ha='center', va='center',
            fontsize=11, color=textcolor, fontweight='bold',
            multialignment='center')

arrow_xs = [5, 5, 5]
arrow_ys_start = [7.75, 5.45, 3.15]
arrow_ys_end = [6.97, 4.67, 2.37]
for xs, ys, ye in zip(arrow_xs, arrow_ys_start, arrow_ys_end):
    ax.annotate('', xy=(xs, ye), xytext=(xs, ys),
                arrowprops=dict(arrowstyle='->', color='#2563eb', lw=2.2))

note_text = 'Note: Repeated roots make full Heaviside slower\n(requires repeated differentiation)'
ax.text(5, 5.05, note_text, ha='center', va='center',
        fontsize=8.5, color='#b45309',
        style='italic',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='#fef3c7', edgecolor='#d97706', linewidth=1.2))

ax.set_title('Hybrid Method: Heaviside + Clearing Fractions', fontsize=13,
             fontweight='bold', color='#1a1a2e', pad=12)

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777196078506-yt3f65e2.png", dpi=150, bbox_inches="tight")