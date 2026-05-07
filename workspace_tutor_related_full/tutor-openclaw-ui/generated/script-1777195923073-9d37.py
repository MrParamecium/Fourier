import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, ax = plt.subplots(figsize=(10, 6.5))
ax.set_xlim(0, 10)
ax.set_ylim(0, 7)
ax.axis('off')
fig.patch.set_facecolor('white')

# Title
ax.text(5, 6.65,
        r'Worked Example: $F(x) = \dfrac{3x^2+9x-20}{(x-2)(x+3)}$',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#222222')

step_color = '#4a90d9'
label_color = '#555555'
text_color = '#111111'

steps = [
    (r'Step 1', r'Degrees: numerator $= 2$, denominator $= 2$  $\Rightarrow$  $m = n = 2$  (equal-degree rule applies)', 5.7),
    (r'Step 2', r'Leading numerator coefficient: $b_n = b_2 = 3$', 4.7),
    (r'Step 3', r'Write setup: $F(x) = 3 + \dfrac{k_1}{x-2} + \dfrac{k_2}{x+3}$', 3.7),
    (r'Step 4', r'$k_1 = (x-2)F(x)\big|_{x=2} = \dfrac{12+18-20}{5} = \dfrac{10}{5} = 2$', 2.65),
    (r'Step 5', r'$k_2 = (x+3)F(x)\big|_{x=-3} = \dfrac{27-27-20}{-5} = \dfrac{-20}{-5} = 4$', 1.65),
]

for label, body, y in steps:
    ax.text(0.35, y, label + ':', fontsize=10, fontweight='bold',
            color=step_color, va='center')
    ax.text(1.55, y, body, fontsize=10.5, color=text_color, va='center')

# Divider before final answer
ax.plot([0.3, 9.7], [1.05, 1.05], color='#cccccc', linewidth=1)

# Final answer box
final_box = mpatches.FancyBboxPatch((0.5, 0.12), 9.0, 0.78,
    boxstyle='round,pad=0.07', linewidth=2,
    edgecolor='#e07b39', facecolor='#fff4ec')
ax.add_patch(final_box)

ax.text(5.0, 0.51,
        r'$F(x) = 3 + \dfrac{2}{x-2} + \dfrac{4}{x+3}$',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#c0392b')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777195923073-vcdbzx4x.png", dpi=150, bbox_inches="tight")