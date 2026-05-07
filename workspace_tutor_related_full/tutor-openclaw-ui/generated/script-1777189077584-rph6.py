import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, (ax_left, ax_right) = plt.subplots(1, 2, figsize=(13, 6))
fig.patch.set_facecolor('white')

# ── LEFT PANEL: operation-to-form table ──────────────────────────────────────
ax_left.set_facecolor('white')
ax_left.axis('off')

ax_left.text(0.5, 0.97, 'Fast Form Choice', fontsize=15, fontweight='bold',
             ha='center', va='top', transform=ax_left.transAxes, color='#1a1a2e')

rows = [
    ('Operation', 'Best Form', True),
    ('Addition / Subtraction', 'Cartesian  a + jb', False),
    ('Multiplication / Division', 'Polar  re^{j\\theta}', False),
    ('Powers / Roots', 'Polar  re^{j\\theta}', False),
    ('Read Re / Im directly', 'Cartesian  a + jb', False),
]

col_x = [0.05, 0.58]
row_h = 0.14
start_y = 0.84

for i, (op, form, is_header) in enumerate(rows):
    y = start_y - i * row_h
    bg_color = '#1a1a2e' if is_header else ('#e8f4fd' if 'Cartesian' in form else '#fff3e0' if 'Polar' in form else '#f5f5f5')
    txt_color = 'white' if is_header else '#1a1a2e'
    rect = mpatches.FancyBboxPatch((0.02, y - 0.06), 0.96, row_h - 0.01,
                                    boxstyle='round,pad=0.01', linewidth=0.5,
                                    edgecolor='#cccccc', facecolor=bg_color,
                                    transform=ax_left.transAxes, clip_on=False)
    ax_left.add_patch(rect)
    ax_left.text(col_x[0], y - 0.01, op, fontsize=11, fontweight='bold' if is_header else 'normal',
                 ha='left', va='center', transform=ax_left.transAxes, color=txt_color)
    ax_left.text(col_x[1], y - 0.01, form, fontsize=11, fontweight='bold' if is_header else 'normal',
                 ha='left', va='center', transform=ax_left.transAxes, color=txt_color)

# Legend patches
cart_patch = mpatches.Patch(color='#e8f4fd', label='Cartesian')
polar_patch = mpatches.Patch(color='#fff3e0', label='Polar')
ax_left.legend(handles=[cart_patch, polar_patch], loc='lower center',
               bbox_to_anchor=(0.5, 0.01), ncol=2, fontsize=10,
               framealpha=0.9, edgecolor='#cccccc')

# ── RIGHT PANEL: complex plane with quadrant labels ───────────────────────────
ax_right.set_facecolor('white')
ax_right.set_xlim(-4.5, 4.5)
ax_right.set_ylim(-4.5, 4.5)
ax_right.axhline(0, color='black', linewidth=1.5)
ax_right.axvline(0, color='black', linewidth=1.5)
ax_right.set_xlabel('Real axis', fontsize=11)
ax_right.set_ylabel('Imaginary axis', fontsize=11)
ax_right.set_title('Quadrant Check — Never Skip This', fontsize=13, fontweight='bold', color='#1a1a2e', pad=10)
ax_right.grid(True, linestyle='--', alpha=0.35, color='gray')
ax_right.tick_params(labelsize=9)

# Quadrant labels
for label, x, y in [('I\n(+, +)', 3.2, 3.2), ('II\n(−, +)', -3.2, 3.2),
                     ('III\n(−, −)', -3.2, -3.2), ('IV\n(+, −)', 3.2, -3.2)]:
    ax_right.text(x, y, label, fontsize=10, ha='center', va='center',
                  color='#555555', fontstyle='italic')

# Example points
examples = [
    (2, 3, '2+3j', 'I', '#2196F3'),
    (-2, 1, '−2+j', 'II', '#4CAF50'),
    (-2, -3, '−2−3j', 'III', '#F44336'),
    (1, -3, '1−3j', 'IV', '#FF9800'),
]
for xp, yp, lbl, quad, col in examples:
    ax_right.plot(xp, yp, 'o', color=col, markersize=8, zorder=5)
    offset_x = 0.25 if xp > 0 else -0.25
    offset_y = 0.3
    ax_right.annotate(lbl, (xp, yp), xytext=(xp + offset_x, yp + offset_y),
                      fontsize=9, color=col, fontweight='bold',
                      arrowprops=dict(arrowstyle='->', color=col, lw=1.0))

# Warning box
warn_text = r'$\tan^{-1}(b/a)$ alone' + '\ncan give the WRONG angle!\nAlways check the quadrant.'
ax_right.text(0, -4.1, warn_text, fontsize=9.5, ha='center', va='center',
              color='#b71c1c', fontweight='bold',
              bbox=dict(boxstyle='round,pad=0.4', facecolor='#ffebee', edgecolor='#f44336', linewidth=1.5))

plt.tight_layout(pad=2.0)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777189077584-c8r4ezqk.png", dpi=150, bbox_inches="tight")