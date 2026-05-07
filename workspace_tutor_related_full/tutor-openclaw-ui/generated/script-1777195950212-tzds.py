import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

fig, ax = plt.subplots(figsize=(11, 7))
ax.set_xlim(0, 11)
ax.set_ylim(0, 7)
ax.axis('off')
fig.patch.set_facecolor('white')

def draw_box(ax, x, y, w, h, text, facecolor, edgecolor, fontsize=10, textcolor='#1a1a2e', bold=False):
    box = FancyBboxPatch((x - w/2, y - h/2), w, h, boxstyle='round,pad=0.12',
                          linewidth=2, edgecolor=edgecolor, facecolor=facecolor)
    ax.add_patch(box)
    weight = 'bold' if bold else 'normal'
    ax.text(x, y, text, ha='center', va='center', fontsize=fontsize,
            color=textcolor, fontweight=weight, wrap=True,
            multialignment='center')

def arrow(ax, x1, y1, x2, y2, color='#333333'):
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle='->', color=color, lw=2))

# Title
ax.text(5.5, 6.7, 'Exam Workflow: Repeated-Factor Partial Fractions (Example B.10)',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#1a1a2e')

# Step 1: Recognize
draw_box(ax, 5.5, 6.0, 4.5, 0.65, 'Recognize repeated factor in denominator', '#e8f4f8', '#457b9d', fontsize=10, bold=True)

arrow(ax, 5.5, 5.67, 5.5, 5.32)

# Step 2: Write all powers
draw_box(ax, 5.5, 5.0, 4.5, 0.65, 'Write ALL descending powers in template\n(do not skip any power)', '#fff0f0', '#e63946', fontsize=9)

arrow(ax, 5.5, 4.67, 5.5, 4.32)

# Step 3: Easy coefficients
draw_box(ax, 5.5, 4.0, 5.5, 0.65,
         'Cover-up: find k (simple factor, x = −2) → k = 1\nCover-up: find a₀ (highest repeated power, x = −1) → a₀ = 2',
         '#f0fff4', '#2d6a4f', fontsize=9)

arrow(ax, 5.5, 3.67, 5.5, 3.32)

# Decision: remaining unknowns
draw_box(ax, 5.5, 3.0, 3.2, 0.55, 'Remaining unknowns: a₁, a₂', '#fffbe6', '#e9c46a', fontsize=9, bold=True)

# Branch left: Route A
arrow(ax, 3.9, 3.0, 2.5, 2.35)
ax.text(2.2, 2.75, 'Route A', ha='center', va='center', fontsize=8, color='#555', style='italic')
draw_box(ax, 2.2, 2.0, 3.6, 0.75,
         'Clear fractions, equate\ncoefficients of useful powers:\n1+a₂=4 → a₂=3; then a₁=1',
         '#f5f0ff', '#6a4c93', fontsize=8.5)

# Branch right: Route B
arrow(ax, 7.1, 3.0, 8.5, 2.35)
ax.text(8.8, 2.75, 'Route B', ha='center', va='center', fontsize=8, color='#555', style='italic')
draw_box(ax, 8.8, 2.0, 3.6, 0.75,
         'Shortcut: multiply by x, let x→∞\n→ 4 = a₂+1, so a₂ = 3\nPlug x=0 → a₁ = 1',
         '#fff5f0', '#e76f51', fontsize=8.5)

# Arrows to final box
arrow(ax, 2.2, 1.62, 4.5, 1.15)
arrow(ax, 8.8, 1.62, 6.5, 1.15)

# Final box
draw_box(ax, 5.5, 0.8, 5.0, 0.65,
         'Check: substitute a convenient x-value to verify all coefficients',
         '#e8f4f8', '#457b9d', fontsize=9, bold=True)

# Result label
ax.text(5.5, 0.2, 'Result: a₀ = 2,  a₁ = 1,  a₂ = 3,  k = 1',
        ha='center', va='center', fontsize=10, color='#1b4332', fontweight='bold',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='#d8f3dc', edgecolor='#2d6a4f', linewidth=1.5))

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777195950212-smu4gfut.png", dpi=150, bbox_inches="tight")