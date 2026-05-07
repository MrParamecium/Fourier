import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, ax = plt.subplots(figsize=(10, 7))
fig.patch.set_facecolor('white')
ax.set_xlim(0, 10)
ax.set_ylim(0, 7)
ax.axis('off')
ax.set_facecolor('white')

def draw_step(ax, y, label, formula, label_color='#333333', formula_color='#111111', fontsize=12):
    ax.text(0.3, y, label, ha='left', va='center', fontsize=10, color=label_color, fontweight='bold')
    ax.text(5.0, y, formula, ha='center', va='center', fontsize=fontsize, color=formula_color)

# Title
ax.text(5.0, 6.6, 'Worked Example: Partial Fraction Decomposition with m = n',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#111111')
ax.plot([0.2, 9.8], [6.3, 6.3], color='#aaaaaa', linewidth=1.0)

# Step 1
draw_step(ax, 5.8, 'Step 1  Original function:',
          r'$F(x) = \dfrac{3x^2 + 9x - 20}{(x-2)(x+3)}$', fontsize=12)

# Step 2
draw_step(ax, 4.7, 'Step 2  Detect m = n = 2, write setup:',
          r'$F(x) = 3 + \dfrac{k_1}{x-2} + \dfrac{k_2}{x+3}$', fontsize=12)

# Step 3
draw_step(ax, 3.6, 'Step 3  Find k\u2081  (set x = 2):',
          r'$k_1 = \left.\dfrac{3x^2+9x-20}{x+3}\right|_{x=2} = \dfrac{10}{5} = 2$', fontsize=12)

# Step 4
draw_step(ax, 2.5, 'Step 4  Find k\u2082  (set x = \u22123):',
          r'$k_2 = \left.\dfrac{3x^2+9x-20}{x-2}\right|_{x=-3} = \dfrac{-20}{-5} = 4$', fontsize=12)

# Divider
ax.plot([0.2, 9.8], [1.85, 1.85], color='#aaaaaa', linewidth=0.8)

# Final answer box
final_box = mpatches.FancyBboxPatch((0.5, 0.55), 6.5, 1.1,
    boxstyle='round,pad=0.08', linewidth=2.0, edgecolor='#2255aa', facecolor='#eef3ff')
ax.add_patch(final_box)
ax.text(0.9, 1.10, 'Final Answer:', ha='left', va='center', fontsize=11, fontweight='bold', color='#2255aa')
ax.text(4.5, 1.10, r'$F(x) = 3 + \dfrac{2}{x-2} + \dfrac{4}{x+3}$',
        ha='center', va='center', fontsize=13, color='#111111')

# Caution note
caution_box = mpatches.FancyBboxPatch((7.2, 0.45), 2.5, 1.3,
    boxstyle='round,pad=0.08', linewidth=1.5, edgecolor='#cc3333', facecolor='#fff0f0')
ax.add_patch(caution_box)
ax.text(8.45, 1.20, 'Trap:', ha='center', va='center', fontsize=10, fontweight='bold', color='#cc3333')
ax.text(8.45, 0.85, 'Do not omit the 3', ha='center', va='center', fontsize=10, color='#cc3333')
ax.text(8.45, 0.60, r'(the constant $b_n$)', ha='center', va='center', fontsize=9, color='#cc3333', style='italic')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777196220917-ge6kvw86.png", dpi=150, bbox_inches="tight")