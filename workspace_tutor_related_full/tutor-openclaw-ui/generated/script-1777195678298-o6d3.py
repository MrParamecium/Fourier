import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch
import numpy as np

fig, ax = plt.subplots(figsize=(14, 5))
ax.set_xlim(0, 14)
ax.set_ylim(0, 5)
ax.axis('off')
fig.patch.set_facecolor('white')

# Title
ax.text(7, 4.6, 'When the Cover-Up Method Works Fast', fontsize=15, fontweight='bold',
        ha='center', va='center', color='#1a1a2e')

# Case definitions
cases = [
    {
        'x': 0.3,
        'title': 'Distinct Linear Factors',
        'example': r'$\frac{P(x)}{(x-a)(x-b)(x-c)}$',
        'verdict': 'Direct cover-up works',
        'icon': '\u2714',
        'color': '#2e7d32',
        'bg': '#e8f5e9',
        'border': '#66bb6a'
    },
    {
        'x': 3.8,
        'title': 'Complex-Conjugate Factors',
        'example': r'$\frac{P(x)}{(x-\alpha-j\beta)(x-\alpha+j\beta)}$',
        'verdict': 'Cover-up still works',
        'icon': '\u2714',
        'color': '#2e7d32',
        'bg': '#e8f5e9',
        'border': '#66bb6a'
    },
    {
        'x': 7.3,
        'title': 'Linear + Irreducible Quadratic',
        'example': r'$\frac{P(x)}{(x-a)(x^2+bx+c)}$',
        'verdict': 'Cover-up for linear only;\nsolve quadratic numerator separately',
        'icon': '!',
        'color': '#e65100',
        'bg': '#fff8e1',
        'border': '#ffb300'
    },
    {
        'x': 10.8,
        'title': 'Repeated Factor',
        'example': r'$\frac{P(x)}{(x-a)^2(x-b)}$',
        'verdict': 'Direct cover-up\nincomplete — extra steps needed',
        'icon': '\u2718',
        'color': '#c62828',
        'bg': '#ffebee',
        'border': '#ef5350'
    }
]

box_width = 3.2
box_height = 3.6

for case in cases:
    x0 = case['x']
    y0 = 0.5
    # Background box
    rect = FancyBboxPatch((x0, y0), box_width, box_height,
                          boxstyle='round,pad=0.08',
                          facecolor=case['bg'],
                          edgecolor=case['border'],
                          linewidth=2)
    ax.add_patch(rect)

    # Icon circle
    circle = plt.Circle((x0 + box_width / 2, y0 + box_height - 0.38), 0.28,
                         color=case['color'], zorder=5)
    ax.add_patch(circle)
    ax.text(x0 + box_width / 2, y0 + box_height - 0.38, case['icon'],
            fontsize=13, fontweight='bold', ha='center', va='center',
            color='white', zorder=6)

    # Title
    ax.text(x0 + box_width / 2, y0 + box_height - 0.9, case['title'],
            fontsize=9.5, fontweight='bold', ha='center', va='center',
            color='#1a1a2e', wrap=True)

    # Example formula
    ax.text(x0 + box_width / 2, y0 + box_height - 1.7, case['example'],
            fontsize=9, ha='center', va='center', color='#333333')

    # Verdict
    ax.text(x0 + box_width / 2, y0 + 0.55, case['verdict'],
            fontsize=8.5, ha='center', va='center',
            color=case['color'], fontweight='bold',
            multialignment='center')

import os
os.makedirs('generated', exist_ok=True)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1777195678298-6yaiyt46.png", dpi=150, bbox_inches="tight")
plt.close()