import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

fig, ax = plt.subplots(figsize=(10, 7))
ax.set_xlim(0, 10)
ax.set_ylim(0, 7)
ax.axis('off')
fig.patch.set_facecolor('white')

def draw_box(ax, x, y, w, h, text, fontsize=9, color='#E8F4FD', edgecolor='#2980B9', bold_first=False):
    box = FancyBboxPatch((x, y), w, h, boxstyle='round,pad=0.1',
                          facecolor=color, edgecolor=edgecolor, linewidth=1.8)
    ax.add_patch(box)
    ax.text(x + w/2, y + h/2, text, ha='center', va='center',
            fontsize=fontsize, wrap=True,
            multialignment='center',
            fontweight='bold' if bold_first else 'normal',
            color='#1a1a1a')

def draw_arrow(ax, x1, y1, x2, y2):
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle='->', color='#2471A3', lw=2.0))

# Box 1: Input
draw_box(ax, 0.3, 5.5, 9.4, 1.1,
         r'$F(x) = \dfrac{4x^3+16x^2+23x+13}{(x+1)^3(x+2)}$',
         fontsize=10, color='#D6EAF8', bold_first=True)

# Box 2: Decomposition template
draw_box(ax, 0.3, 3.9, 9.4, 1.0,
         r'Decompose:  $\dfrac{a_0}{(x+1)^3}+\dfrac{a_1}{(x+1)^2}+\dfrac{a_2}{x+1}+\dfrac{k}{x+2}$',
         fontsize=9.5, color='#EBF5FB')

draw_arrow(ax, 5.0, 5.5, 5.0, 4.9)

# Arrow down to two side boxes
draw_arrow(ax, 5.0, 3.9, 2.5, 3.1)
draw_arrow(ax, 5.0, 3.9, 7.5, 3.1)

# Box 3a: Easy by Heaviside
draw_box(ax, 0.3, 2.0, 4.2, 1.0,
         'EASY by Heaviside Cover-Up\n'
         r'$k$: cover $(x+2)$, set $x=-2$ $\Rightarrow$ $k=1$' + '\n'
         r'$a_0$: cover $(x+1)^3$, set $x=-1$ $\Rightarrow$ $a_0=2$',
         fontsize=8.2, color='#D5F5E3', edgecolor='#1E8449')

# Box 3b: Remaining unknowns
draw_box(ax, 5.5, 2.0, 4.2, 1.0,
         'REMAINING Unknowns\n'
         r'$a_1$ and $a_2$ — not directly accessible' + '\n'
         'by simple substitution alone',
         fontsize=8.2, color='#FDEBD0', edgecolor='#CA6F1E')

# Arrows down to clearing fractions
draw_arrow(ax, 2.4, 2.0, 3.8, 1.2)
draw_arrow(ax, 7.6, 2.0, 6.2, 1.2)

# Box 4: Clear fractions
draw_box(ax, 1.5, 0.2, 7.0, 0.95,
         r'Clear Fractions: multiply by $(x+1)^3(x+2)$, match coefficients of $x^3, x^2, \ldots$' + '\n'
         r'Solve $a_2=3$, $a_1=1$  |  Leftover equations $\Rightarrow$ VERIFICATION CHECK',
         fontsize=8.2, color='#F4ECF7', edgecolor='#7D3C98')

plt.title('Hybrid Partial Fractions: Solve Order at a Glance',
          fontsize=11, fontweight='bold', pad=8, color='#1a1a1a')
plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777196200666-lvq4ckmu.png", dpi=150, bbox_inches="tight")