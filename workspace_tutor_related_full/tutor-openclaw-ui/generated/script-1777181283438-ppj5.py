import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, axes = plt.subplots(1, 2, figsize=(11, 5))
fig.patch.set_facecolor('white')

# ---- shared style ----
for ax in axes:
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis('off')
    ax.set_facecolor('white')

# ---- divider line between panels ----
fig.add_artist(plt.Line2D([0.5, 0.5], [0.05, 0.95],
                           transform=fig.transFigure,
                           color='#cccccc', linewidth=1.5))

# ---- LEFT PANEL: Proper case ----
ax_l = axes[0]

# Panel title
ax_l.text(0.5, 0.90, 'Proper case', fontsize=15, fontweight='bold',
          ha='center', va='center', color='#1a1a2e')
ax_l.text(0.5, 0.80, '(degree of numerator < degree of denominator)',
          fontsize=9, ha='center', va='center', color='#555555', style='italic')

# Condition box
rect_l = mpatches.FancyBboxPatch((0.08, 0.62), 0.84, 0.10,
                                   boxstyle='round,pad=0.02',
                                   linewidth=1.2, edgecolor='#3a86ff',
                                   facecolor='#e8f0fe')
ax_l.add_patch(rect_l)
ax_l.text(0.50, 0.67, 'm  <  n', fontsize=13, ha='center', va='center',
          color='#3a86ff', fontweight='bold')

# Formula
ax_l.text(0.50, 0.48,
          r'$F(x)=\dfrac{k_1}{x-\lambda_1}+\dfrac{k_2}{x-\lambda_2}+\cdots+\dfrac{k_n}{x-\lambda_n}$',
          fontsize=11, ha='center', va='center', color='#1a1a2e')

# Note
ax_l.text(0.50, 0.28,
          'No constant term needed.\nFind each k by cover-up substitution.',
          fontsize=9.5, ha='center', va='center', color='#444444',
          linespacing=1.6)

# ---- RIGHT PANEL: Special improper case m = n ----
ax_r = axes[1]

# Panel title
ax_r.text(0.5, 0.90, 'Special improper case', fontsize=15, fontweight='bold',
          ha='center', va='center', color='#1a1a2e')
ax_r.text(0.5, 0.80, '(numerator and denominator have the same degree)',
          fontsize=9, ha='center', va='center', color='#555555', style='italic')

# Condition box
rect_r = mpatches.FancyBboxPatch((0.08, 0.62), 0.84, 0.10,
                                   boxstyle='round,pad=0.02',
                                   linewidth=1.2, edgecolor='#e63946',
                                   facecolor='#fde8ea')
ax_r.add_patch(rect_r)
ax_r.text(0.50, 0.67, 'm  =  n', fontsize=13, ha='center', va='center',
          color='#e63946', fontweight='bold')

# Formula — highlight the extra constant
ax_r.text(0.50, 0.48,
          r'$F(x)=\underbrace{b_n}_{\text{extra}}+\dfrac{k_1}{x-\lambda_1}+\dfrac{k_2}{x-\lambda_2}+\cdots+\dfrac{k_n}{x-\lambda_n}$',
          fontsize=11, ha='center', va='center', color='#1a1a2e')

# Highlight box for the key difference
rect_note = mpatches.FancyBboxPatch((0.10, 0.16), 0.80, 0.18,
                                     boxstyle='round,pad=0.02',
                                     linewidth=1.5, edgecolor='#e63946',
                                     facecolor='#fff3f4')
ax_r.add_patch(rect_note)
ax_r.text(0.50, 0.255,
          'Only difference: extra constant  b\u2099\n(= leading numerator coefficient)\nAll k values found the same way as the proper case.',
          fontsize=9.5, ha='center', va='center', color='#c1121f',
          linespacing=1.6)

# ---- Overall title ----
fig.suptitle('Partial-Fraction Structure: Proper vs. Special Improper (m = n)',
             fontsize=13, fontweight='bold', color='#1a1a2e', y=1.01)

plt.tight_layout(pad=1.5)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777181283438-02q73ya8.png", dpi=150, bbox_inches="tight")