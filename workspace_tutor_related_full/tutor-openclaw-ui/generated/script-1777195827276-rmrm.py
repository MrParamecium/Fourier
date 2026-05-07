import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, ax = plt.subplots(figsize=(13, 7))
ax.set_xlim(0, 13)
ax.set_ylim(0, 7)
ax.axis('off')
fig.patch.set_facecolor('white')

def rounded_box(ax, x, y, w, h, text, facecolor, edgecolor, fontsize=10, bold=False):
    box = mpatches.FancyBboxPatch((x - w/2, y - h/2), w, h,
        boxstyle='round,pad=0.12', linewidth=1.5,
        edgecolor=edgecolor, facecolor=facecolor)
    ax.add_patch(box)
    weight = 'bold' if bold else 'normal'
    ax.text(x, y, text, ha='center', va='center', fontsize=fontsize,
            color='#1a1a2e', fontweight=weight, wrap=True)

def arrow(ax, x1, y1, x2, y2, color='#555555'):
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle='->', color=color, lw=1.6))

# Title
ax.text(6.5, 6.65, 'Example B.10 — Solve Order Map',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#1a1a2e')

# Box 1: Denominator
rounded_box(ax, 6.5, 5.9, 5.5, 0.65,
    r'Denominator:  $(x+1)^3 \cdot (x+2)$',
    '#eaf0fb', '#2c3e50', fontsize=11, bold=True)

# Arrow down to template
arrow(ax, 6.5, 5.57, 6.5, 5.05)

# Box 2: Template
rounded_box(ax, 6.5, 4.72, 9.5, 0.62,
    r'Template:  $\dfrac{a_0}{(x+1)^3} + \dfrac{a_1}{(x+1)^2} + \dfrac{a_2}{x+1} + \dfrac{k}{x+2}$',
    '#f0f8ff', '#2980b9', fontsize=10.5)

# Arrow splits into two branches
arrow(ax, 3.8, 4.41, 2.5, 3.75, color='#2980b9')
arrow(ax, 9.2, 4.41, 10.5, 3.75, color='#c0392b')

# Branch A: Unrepeated root
rounded_box(ax, 2.5, 3.4, 4.2, 0.62,
    'Unrepeated root  x = -2', '#eaf4fb', '#2980b9', fontsize=10)
arrow(ax, 2.5, 3.09, 2.5, 2.55, color='#2980b9')
rounded_box(ax, 2.5, 2.25, 4.0, 0.55,
    'Cover-up  →  k = 1', '#d6eaf8', '#2980b9', fontsize=10, bold=True)

# Branch B: Repeated root
rounded_box(ax, 10.5, 3.4, 4.2, 0.62,
    'Repeated root  x = -1', '#fdf2f2', '#c0392b', fontsize=10)
arrow(ax, 10.5, 3.09, 10.5, 2.55, color='#c0392b')

# Three stacked derivative boxes
derivative_items = [
    (r'0th derivative of $G(x)$ at $x=-1$  →  $a_0 = 2$', 2.22),
    (r'1st derivative of $G(x)$ at $x=-1$  →  $a_1 = 1$', 1.62),
    (r'$\frac{1}{2!}$ × 2nd derivative of $G(x)$ at $x=-1$  →  $a_2 = 3$', 1.02),
]
for text, ypos in derivative_items:
    rounded_box(ax, 10.5, ypos, 5.0, 0.48, text, '#fff5f5', '#c0392b', fontsize=9.5)

# Note: G(x) definition
ax.text(10.5, 2.55, r'where $G(x) = (x+1)^3 F(x)$',
        ha='center', va='center', fontsize=9, color='#c0392b', fontstyle='italic')

# Final result box
rounded_box(ax, 6.5, 0.42, 11.5, 0.62,
    r'$F(x) = \dfrac{2}{(x+1)^3} + \dfrac{1}{(x+1)^2} + \dfrac{3}{x+1} + \dfrac{1}{x+2}$',
    '#f0fff0', '#27ae60', fontsize=11, bold=True)

# Arrows to final box
arrow(ax, 2.5, 1.97, 4.5, 0.62, color='#27ae60')
arrow(ax, 10.5, 0.78, 8.5, 0.62, color='#27ae60')

ax.text(6.5, 0.12, 'Final Answer', ha='center', va='center',
        fontsize=9, color='#27ae60', fontstyle='italic')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777195827276-cysy8jhe.png", dpi=150, bbox_inches="tight")