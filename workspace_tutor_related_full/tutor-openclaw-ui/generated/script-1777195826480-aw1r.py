import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch

fig, ax = plt.subplots(figsize=(12, 6))
ax.set_xlim(0, 12)
ax.set_ylim(0, 6)
ax.axis('off')
fig.patch.set_facecolor('white')

# Title
ax.text(6, 5.6, 'Partial-Fraction Template: Repeated vs. Unrepeated Factors',
        ha='center', va='center', fontsize=13, fontweight='bold', color='#1a1a2e')

# --- Denominator box ---
denom_box = mpatches.FancyBboxPatch((0.3, 3.8), 11.4, 0.9,
    boxstyle='round,pad=0.1', linewidth=1.5,
    edgecolor='#2c3e50', facecolor='#eaf0fb')
ax.add_patch(denom_box)
ax.text(6, 4.25, r'Denominator:  $(x-\lambda)^r \cdot (x-\alpha_1) \cdot (x-\alpha_2) \cdots$',
        ha='center', va='center', fontsize=12, color='#1a1a2e')
ax.text(0.7, 4.25, 'Q(x) =', ha='left', va='center', fontsize=11, color='#555')

# --- Repeated factor label ---
ax.text(2.8, 3.55, 'Repeated factor', ha='center', va='center',
        fontsize=9.5, color='#c0392b', fontstyle='italic')
ax.annotate('', xy=(2.8, 3.75), xytext=(2.8, 3.58),
            arrowprops=dict(arrowstyle='->', color='#c0392b', lw=1.5))

# --- Unrepeated factors label ---
ax.text(8.5, 3.55, 'Unrepeated factors', ha='center', va='center',
        fontsize=9.5, color='#2980b9', fontstyle='italic')
ax.annotate('', xy=(8.5, 3.75), xytext=(8.5, 3.58),
            arrowprops=dict(arrowstyle='->', color='#2980b9', lw=1.5))

# --- Expansion row ---
ax.text(0.5, 2.9, 'Expansion:', ha='left', va='center', fontsize=11,
        color='#555', fontweight='bold')

# Repeated-factor terms (red boxes)
repeated_terms = [
    r'$\dfrac{a_0}{(x-\lambda)^r}$',
    r'$\dfrac{a_1}{(x-\lambda)^{r-1}}$',
    r'$\cdots$',
    r'$\dfrac{a_{r-1}}{x-\lambda}$',
]
repeated_x = [1.1, 2.7, 4.1, 5.0]
for i, (term, xpos) in enumerate(zip(repeated_terms, repeated_x)):
    if term != r'$\cdots$':
        box = mpatches.FancyBboxPatch((xpos - 0.65, 2.25), 1.3, 0.9,
            boxstyle='round,pad=0.08', linewidth=1.2,
            edgecolor='#c0392b', facecolor='#fdf2f2')
        ax.add_patch(box)
    ax.text(xpos, 2.7, term, ha='center', va='center', fontsize=10.5, color='#c0392b')
    if i < len(repeated_terms) - 1 and repeated_terms[i+1] != r'$\cdots$' and term != r'$\cdots$':
        ax.text((xpos + repeated_x[i+1]) / 2, 2.7, '+', ha='center', va='center',
                fontsize=12, color='#333')
    elif term == r'$\cdots$':
        pass

ax.text(5.85, 2.7, '+', ha='center', va='center', fontsize=12, color='#333')

# Unrepeated-factor terms (blue boxes)
unrepeated_terms = [
    r'$\dfrac{k_1}{x-\alpha_1}$',
    r'$\dfrac{k_2}{x-\alpha_2}$',
    r'$\cdots$',
]
unrepeated_x = [7.0, 8.8, 10.2]
for i, (term, xpos) in enumerate(zip(unrepeated_terms, unrepeated_x)):
    if term != r'$\cdots$':
        box = mpatches.FancyBboxPatch((xpos - 0.75, 2.25), 1.5, 0.9,
            boxstyle='round,pad=0.08', linewidth=1.2,
            edgecolor='#2980b9', facecolor='#eaf4fb')
        ax.add_patch(box)
    ax.text(xpos, 2.7, term, ha='center', va='center', fontsize=10.5, color='#2980b9')
    if i < len(unrepeated_terms) - 1 and unrepeated_terms[i+1] != r'$\cdots$':
        ax.text((xpos + unrepeated_x[i+1]) / 2, 2.7, '+', ha='center', va='center',
                fontsize=12, color='#333')

# Brace / grouping label under repeated terms
ax.annotate('', xy=(0.45, 2.1), xytext=(5.65, 2.1),
            arrowprops=dict(arrowstyle='<->', color='#c0392b', lw=1.2))
ax.text(3.05, 1.85, r'$r$ terms — one per power of $(x-\lambda)$',
        ha='center', va='center', fontsize=9.5, color='#c0392b', fontstyle='italic')

ax.annotate('', xy=(6.25, 2.1), xytext=(10.95, 2.1),
            arrowprops=dict(arrowstyle='<->', color='#2980b9', lw=1.2))
ax.text(8.6, 1.85, 'one term per unrepeated factor',
        ha='center', va='center', fontsize=9.5, color='#2980b9', fontstyle='italic')

# Red warning note
warn_box = mpatches.FancyBboxPatch((1.5, 0.25), 9.0, 0.75,
    boxstyle='round,pad=0.1', linewidth=1.5,
    edgecolor='#e74c3c', facecolor='#fff5f5')
ax.add_patch(warn_box)
ax.text(6.0, 0.62, 'Do not skip intermediate powers.',
        ha='center', va='center', fontsize=11, color='#c0392b', fontweight='bold')
ax.text(6.0, 0.38, 'Every power from r down to 1 must appear as a separate term.',
        ha='center', va='center', fontsize=9.5, color='#c0392b')

plt.tight_layout()
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777195826480-yoqzsv20.png", dpi=150, bbox_inches="tight")