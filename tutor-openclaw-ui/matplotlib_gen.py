#!/usr/bin/env python3
"""
matplotlib_gen.py — Tutor Agent chart renderer
Reads a JSON python_spec from stdin, renders a matplotlib figure, saves PNG to output_path.
Usage:
    echo '<json>' | python3 matplotlib_gen.py
or:
    python3 matplotlib_gen.py '<json string>'
Output (stdout, JSON):
    {"ok": true, "output_path": "generated/chart-xxx.png"}
    {"ok": false, "error": "..."}
"""
import sys
import json
import os
import traceback

def render(spec, output_path):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    import numpy as np

    fig, ax = plt.subplots(figsize=(7, 5))
    fig.patch.set_facecolor('#FFFBF5')
    ax.set_facecolor('#FFFBF5')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_color('#9C8B7C')
    ax.spines['bottom'].set_color('#9C8B7C')
    ax.tick_params(colors='#5E5045')
    ax.xaxis.label.set_color('#332922')
    ax.yaxis.label.set_color('#332922')
    ax.title.set_color('#332922')

    desc = spec.get('description', '')
    x_range = spec.get('x_range', [-5, 5])
    y_range = spec.get('y_range', [-5, 5])
    title = spec.get('title', '')
    xlabel = spec.get('xlabel', '')
    ylabel = spec.get('ylabel', '')

    # ── Complex plane ────────────────────────────────────────────────────────
    if spec.get('type') == 'complex_plane' or 'complex' in desc.lower() or 'points' in spec:
        ax.axhline(0, color='#9C8B7C', linewidth=1)
        ax.axvline(0, color='#9C8B7C', linewidth=1)
        ax.set_xlim(x_range)
        ax.set_ylim(y_range)
        ax.set_xlabel(xlabel or 'Real', fontsize=11)
        ax.set_ylabel(ylabel or 'Imaginary', fontsize=11)
        ax.set_title(title or 'Complex Plane', fontsize=13, fontweight='bold')
        ax.grid(True, alpha=0.25, color='#EADDCc')
        ax.set_aspect('equal')

        for pt in spec.get('points', []):
            r = float(pt.get('real', 0))
            i = float(pt.get('imag', 0))
            lbl = pt.get('label', f'{r}+{i}j')
            ax.plot(r, i, 'o', color='#F59E0B', markersize=8, zorder=5)
            ax.annotate(lbl, (r, i), textcoords='offset points', xytext=(8, 6),
                        color='#332922', fontsize=10)
            ax.plot([r, r], [0, i], '--', color='#F59E0B', alpha=0.5, linewidth=1)
            ax.plot([0, r], [i, i], '--', color='#F59E0B', alpha=0.5, linewidth=1)
            ax.annotate('', xy=(r, i), xytext=(0, 0),
                        arrowprops=dict(arrowstyle='->', color='#D97706', lw=1.8))

    # ── Function plot ────────────────────────────────────────────────────────
    elif 'functions' in spec or spec.get('type') == 'function_plot':
        x = np.linspace(x_range[0], x_range[1], 500)
        colors = ['#F59E0B', '#D97706', '#92400E', '#FBBF24']
        for idx, fn in enumerate(spec.get('functions', [])):
            expr = fn.get('expr', '')
            lbl = fn.get('label', expr)
            color = colors[idx % len(colors)]
            try:
                y = eval(expr, {'x': x, 'np': np, '__builtins__': {}})  # noqa: S307
                ax.plot(x, y, label=lbl, color=color, linewidth=2)
            except Exception:
                pass
        ax.set_xlim(x_range)
        ax.set_ylim(y_range)
        ax.set_xlabel(xlabel or 'x', fontsize=11)
        ax.set_ylabel(ylabel or 'y', fontsize=11)
        ax.set_title(title, fontsize=13, fontweight='bold')
        ax.legend(fontsize=9)
        ax.grid(True, alpha=0.25, color='#EADDCc')
        ax.axhline(0, color='#9C8B7C', linewidth=0.8)
        ax.axvline(0, color='#9C8B7C', linewidth=0.8)

    # ── Signal / waveform ────────────────────────────────────────────────────
    elif spec.get('type') == 'waveform' or 'signal' in desc.lower() or 'waveform' in desc.lower():
        t = np.linspace(x_range[0], x_range[1], 1000)
        colors = ['#F59E0B', '#D97706', '#92400E']
        for idx, sig in enumerate(spec.get('signals', [])):
            freq = float(sig.get('freq', 1))
            amp = float(sig.get('amp', 1))
            phase = float(sig.get('phase', 0))
            lbl = sig.get('label', f'{amp}·sin(2π·{freq}t + {phase})')
            y = amp * np.sin(2 * np.pi * freq * t + phase)
            ax.plot(t, y, label=lbl, color=colors[idx % len(colors)], linewidth=2)
        ax.set_xlabel(xlabel or 'Time (s)', fontsize=11)
        ax.set_ylabel(ylabel or 'Amplitude', fontsize=11)
        ax.set_title(title or 'Signal Waveform', fontsize=13, fontweight='bold')
        ax.legend(fontsize=9)
        ax.grid(True, alpha=0.25, color='#EADDCc')
        ax.axhline(0, color='#9C8B7C', linewidth=0.8)

    # ── Bar chart / generic ──────────────────────────────────────────────────
    elif spec.get('type') == 'bar' or 'bar' in desc.lower():
        cats = spec.get('categories', [])
        vals = spec.get('values', [])
        bars = ax.bar(cats, vals, color='#F59E0B', edgecolor='#D97706', linewidth=0.8)
        ax.set_xlabel(xlabel, fontsize=11)
        ax.set_ylabel(ylabel, fontsize=11)
        ax.set_title(title, fontsize=13, fontweight='bold')
        ax.grid(True, alpha=0.2, axis='y', color='#EADDCc')
        for bar, val in zip(bars, vals):
            ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.02 * max(vals or [1]),
                    str(val), ha='center', va='bottom', fontsize=9, color='#332922')

    else:
        # Fallback: blank annotated axes
        ax.text(0.5, 0.5, desc or 'Chart', transform=ax.transAxes,
                ha='center', va='center', fontsize=12, color='#9C8B7C',
                wrap=True)
        ax.set_xlim(x_range)
        ax.set_ylim(y_range)
        ax.set_title(title or 'Generated Chart', fontsize=13)
        ax.grid(True, alpha=0.2)

    plt.tight_layout(pad=1.2)
    os.makedirs(os.path.dirname(output_path) or '.', exist_ok=True)
    fig.savefig(output_path, dpi=130, bbox_inches='tight',
                facecolor=fig.get_facecolor())
    plt.close(fig)

def main():
    if len(sys.argv) > 1:
        raw = sys.argv[1]
    else:
        raw = sys.stdin.read()

    try:
        spec = json.loads(raw)
    except json.JSONDecodeError as e:
        print(json.dumps({"ok": False, "error": f"JSON parse error: {e}"}))
        sys.exit(1)

    output_path = spec.get('output_path', f'generated/chart-{os.getpid()}.png')

    try:
        render(spec, output_path)
        print(json.dumps({"ok": True, "output_path": output_path}))
    except Exception:
        print(json.dumps({"ok": False, "error": traceback.format_exc()}))
        sys.exit(1)

if __name__ == '__main__':
    main()
