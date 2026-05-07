import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch

fig, ax = plt.subplots(figsize=(12, 6))
ax.set_xlim(0, 12)
ax.set_ylim(0, 10)
ax.axis('off')
fig.patch.set_facecolor('white')

# --- Left panel background ---
left_box = mpatches.FancyBboxPatch((0.3, 1.0), 4.4, 8.2,
    boxstyle='round,pad=0.15', linewidth=1.5,
    edgecolor='#2c3e50', facecolor='#eaf4fb')
ax.add_patch(left_box)

# --- Right panel background ---
right_box = mpatches.FancyBboxPatch((7.3, 1.0), 4.4, 8.2,
    boxstyle='round,pad=0.15', linewidth=1.5,
    edgecolor='#2c3e50', facecolor='#eafaf1')
ax.add_patch(right_box)

# --- Left panel title ---
ax.text(2.5, 8.8, 'Ordinary Partial Fractions',
    ha='center', va='center', fontsize=13, fontweight='bold',
    color='#154360')

# --- Left panel terms ---
left_terms = [
    r'$\dfrac{A}{x}$',
    r'$\dfrac{B}{x+2}$',
    r'$\dfrac{C}{x+3}$',
    r'$\dfrac{D}{(x+3)^2}$'
]
for i, term in enumerate(left_terms):
    y_pos = 7.4 - i * 1.35
    ax.text(2.5, y_pos, term, ha='center', va='center',
            fontsize=14, color='#1a5276')
    if i < len(left_terms) - 1:
        ax.text(2.5, y_pos - 0.55, '+', ha='center', va='center',
                fontsize=14, color='#555')

# --- Right panel title ---
ax.text(9.5, 8.8, 'Modified Partial Fractions',
    ha='center', va='center', fontsize=13, fontweight='bold',
    color='#145a32')

# --- Right panel subtitle ---
ax.text(9.5, 8.35, '(target form for inverse z-transform)',
    ha='center', va='center', fontsize=9, color='#555',
    style='italic')

# --- Right panel terms ---
right_terms = [
    r'$A$',
    r'$\dfrac{Bx}{x+2}$',
    r'$\dfrac{Cx}{x+3}$',
    r'$\dfrac{Dx}{(x+3)^2}$'
]
for i, term in enumerate(right_terms):
    y_pos = 7.4 - i * 1.35
    ax.text(9.5, y_pos, term, ha='center', va='center',
            fontsize=14, color='#1e8449')
    if i < len(right_terms) - 1:
        ax.text(9.5, y_pos - 0.55, '+', ha='center', va='center',
                fontsize=14, color='#555')

# --- Center arrow ---
arrow = FancyArrowPatch((4.85, 5.2), (7.15, 5.2),
    arrowstyle='->', mutation_scale=22,
    linewidth=2.0, color='#884ea0')
ax.add_patch(arrow)

# --- Arrow label ---
ax.text(6.0, 5.65, 'Expand F(x)/x first,', ha='center', va='center',
        fontsize=9, color='#6c3483', fontweight='bold')
ax.text(6.0, 5.25, 'then multiply by x', ha='center', va='center',
        fontsize=9, color='#6c3483', fontweight='bold')

# --- Warning box at bottom ---
warn_box = mpatches.FancyBboxPatch((0.5, 0.08), 11.0, 0.75,
    boxstyle='round,pad=0.1', linewidth=1.2,
    edgecolor='#c0392b', facecolor='#fdedec')
ax.add_patch(warn_box)
ax.text(6.0, 0.46,
    'Trap: do not decompose F(x) directly if the required form has x in the numerators.',
    ha='center', va='center', fontsize=10, color='#922b21', fontweight='bold')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777181290761-28fjxilz.png", dpi=150, bbox_inches="tight")