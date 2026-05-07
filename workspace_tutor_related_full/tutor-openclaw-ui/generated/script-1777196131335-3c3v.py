import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch

fig, ax = plt.subplots(figsize=(10, 7))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')
fig.patch.set_facecolor('white')

# Title
ax.text(5, 9.5, 'Heaviside Cover-Up Method — Workflow', fontsize=14, fontweight='bold',
        ha='center', va='center', color='#1a1a2e')

# Step boxes
step_data = [
    (1, 'STEP 1', 'Write the partial fraction form',
     r'$F(x) = \frac{P(x)}{(x-\lambda_1)(x-\lambda_2)(x-\lambda_3)}$',
     r'$= \frac{k_1}{x-\lambda_1} + \frac{k_2}{x-\lambda_2} + \frac{k_3}{x-\lambda_3}$',
     '#e8f4f8', '#2196F3'),
    (2, 'STEP 2', 'Cover up the target factor',
     r'To find $k_1$: hide $(x - \lambda_1)$',
     r'$\boxed{\text{cover}} \cdot (x-\lambda_2)(x-\lambda_3)$  →  only $k_1$ survives',
     '#fff8e1', '#FF9800'),
    (3, 'STEP 3', r'Substitute the root $x = \lambda_1$',
     r'$k_1 = \left.\frac{P(x)}{(x-\lambda_2)(x-\lambda_3)}\right|_{x=\lambda_1}$',
     r'All other terms contain $(\lambda_1 - \lambda_j) \neq 0$, so they vanish',
     '#e8f5e9', '#4CAF50'),
]

box_tops = [8.2, 5.8, 3.4]
for i, (step_num, label, desc, line1, line2, bg, border) in enumerate(step_data):
    y_top = box_tops[i]
    rect = mpatches.FancyBboxPatch((0.4, y_top - 1.9), 9.2, 2.0,
                                    boxstyle='round,pad=0.1',
                                    linewidth=2, edgecolor=border,
                                    facecolor=bg)
    ax.add_patch(rect)
    ax.text(0.75, y_top - 0.15, label, fontsize=10, fontweight='bold',
            color=border, va='center')
    ax.text(2.2, y_top - 0.15, desc, fontsize=10, color='#1a1a2e', va='center')
    ax.text(5.0, y_top - 0.75, line1, fontsize=10, ha='center', va='center',
            color='#1a1a2e')
    ax.text(5.0, y_top - 1.35, line2, fontsize=9, ha='center', va='center',
            color='#444444', style='italic')

# Arrows between steps
for y_arrow in [6.3, 3.9]:
    ax.annotate('', xy=(5, y_arrow - 0.35), xytext=(5, y_arrow),
                arrowprops=dict(arrowstyle='->', color='#555555', lw=2))

# Key insight box at bottom
rect_key = mpatches.FancyBboxPatch((0.4, 0.3), 9.2, 1.1,
                                    boxstyle='round,pad=0.1',
                                    linewidth=2, edgecolor='#9C27B0',
                                    facecolor='#f3e5f5')
ax.add_patch(rect_key)
ax.text(5.0, 0.95, 'KEY INSIGHT', fontsize=10, fontweight='bold',
        ha='center', va='center', color='#6A1B9A')
ax.text(5.0, 0.58,
        r'Cover the factor $\Rightarrow$ plug in its root $\Rightarrow$ read off the coefficient. Repeat for each $k_r$.',
        fontsize=9.5, ha='center', va='center', color='#1a1a2e')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777196131335-ys1fpmlg.png", dpi=150, bbox_inches="tight")