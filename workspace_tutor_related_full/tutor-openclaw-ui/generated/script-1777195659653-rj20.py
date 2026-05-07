import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch
import numpy as np

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 7))
fig.patch.set_facecolor('white')

for ax in [ax1, ax2]:
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')
    ax.set_facecolor('white')

# ---- LEFT PANEL: Denominator structure ----
ax1.set_title('Denominator Structure', fontsize=13, fontweight='bold', pad=12)

ax1.text(5, 9.2, 'F(x)  =', fontsize=12, ha='center', va='center')
ax1.text(5, 8.3,
    r'$\dfrac{P(x)}{\underbrace{(x-\lambda)^r}_{\text{repeated}} \cdot \underbrace{(x-\alpha_1)(x-\alpha_2)\cdots}_{\text{unrepeated}}}$',
    fontsize=12, ha='center', va='center')

repeated_box = mpatches.FancyBboxPatch((0.5, 5.8), 4.0, 1.6,
    boxstyle='round,pad=0.15', linewidth=2,
    edgecolor='#c0392b', facecolor='#fdecea')
ax1.add_patch(repeated_box)
ax1.text(2.5, 6.6, r'$(x-\lambda)^r$', fontsize=13, ha='center', va='center',
    color='#c0392b', fontweight='bold')
ax1.text(2.5, 6.05, 'Repeated factor\n(order r)', fontsize=9, ha='center', va='center',
    color='#c0392b')

unrepeated_box = mpatches.FancyBboxPatch((5.5, 5.8), 4.0, 1.6,
    boxstyle='round,pad=0.15', linewidth=2,
    edgecolor='#2980b9', facecolor='#eaf4fb')
ax1.add_patch(unrepeated_box)
ax1.text(7.5, 6.6, r'$(x-\alpha_1)(x-\alpha_2)\cdots$', fontsize=11, ha='center', va='center',
    color='#2980b9', fontweight='bold')
ax1.text(7.5, 6.05, 'Unrepeated factors', fontsize=9, ha='center', va='center',
    color='#2980b9')

ax1.annotate('', xy=(2.5, 5.0), xytext=(2.5, 5.75),
    arrowprops=dict(arrowstyle='->', color='#c0392b', lw=2))
ax1.annotate('', xy=(7.5, 5.0), xytext=(7.5, 5.75),
    arrowprops=dict(arrowstyle='->', color='#2980b9', lw=2))

ax1.text(2.5, 4.6, 'r terms in expansion', fontsize=9, ha='center', va='center',
    color='#c0392b', style='italic')
ax1.text(7.5, 4.6, '1 term each', fontsize=9, ha='center', va='center',
    color='#2980b9', style='italic')

ax1.text(5, 3.5, 'Rule: count the power\nto know how many terms', fontsize=10,
    ha='center', va='center', color='#555555',
    bbox=dict(boxstyle='round,pad=0.4', facecolor='#f9f9f9', edgecolor='#aaaaaa'))

# ---- RIGHT PANEL: Expansion ladder + coefficient workflow ----
ax2.set_title('Partial-Fraction Expansion & Coefficients', fontsize=13, fontweight='bold', pad=12)

ladder_labels = [
    (r'$\dfrac{a_0}{(x-\lambda)^r}$',      r'$a_0$: substitute $x=\lambda$',           8.4, '#c0392b'),
    (r'$\dfrac{a_1}{(x-\lambda)^{r-1}}$',  r'$a_1$: 1st derivative, then $x=\lambda$', 6.8, '#c0392b'),
    (r'$\vdots$',                            '',                                          5.5, '#c0392b'),
    (r'$\dfrac{a_{r-1}}{x-\lambda}$',       r'$a_{r-1}$: $(r{-}1)$th deriv $/(r{-}1)!$, then $x=\lambda$', 4.4, '#c0392b'),
]

for (term, rule, y, col) in ladder_labels:
    term_box = mpatches.FancyBboxPatch((0.3, y-0.55), 3.8, 0.9,
        boxstyle='round,pad=0.1', linewidth=1.5,
        edgecolor=col, facecolor='#fdecea')
    ax2.add_patch(term_box)
    ax2.text(2.2, y, term, fontsize=11, ha='center', va='center', color=col)
    if rule:
        ax2.text(6.5, y, rule, fontsize=8.5, ha='center', va='center', color='#333333',
            bbox=dict(boxstyle='round,pad=0.25', facecolor='#fff8e1', edgecolor='#f0c040', linewidth=1))
        ax2.annotate('', xy=(4.3, y), xytext=(4.15, y),
            arrowprops=dict(arrowstyle='->', color='#888888', lw=1.2))

ax2.text(5, 3.4, r'General: $a_j = \left.\dfrac{1}{j!}\dfrac{d^j}{dx^j}\left[(x-\lambda)^r F(x)\right]\right|_{x=\lambda}$',
    fontsize=10, ha='center', va='center', color='#c0392b',
    bbox=dict(boxstyle='round,pad=0.4', facecolor='#fdecea', edgecolor='#c0392b', linewidth=1.5))

ax2.text(7.5, 6.0, r'$+\dfrac{k_1}{x-\alpha_1}+\dfrac{k_2}{x-\alpha_2}+\cdots$',
    fontsize=11, ha='center', va='center', color='#2980b9')
ax2.text(7.5, 5.3, 'Ordinary cover-up\nat each root', fontsize=8.5, ha='center', va='center',
    color='#2980b9', style='italic',
    bbox=dict(boxstyle='round,pad=0.25', facecolor='#eaf4fb', edgecolor='#2980b9', linewidth=1))

ax2.text(5, 9.3, 'Repeated-factor ladder', fontsize=10, ha='center', va='center',
    color='#c0392b', fontweight='bold')
ax2.text(5, 8.85, r'(all powers from $r$ down to $1$)', fontsize=9, ha='center', va='center',
    color='#888888')

ax2.text(5, 2.2, 'Conceal repeated factor first, then differentiate', fontsize=9,
    ha='center', va='center', color='#555555', style='italic')

plt.tight_layout(pad=1.5)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777195659653-x6ld703m.png", dpi=150, bbox_inches="tight")