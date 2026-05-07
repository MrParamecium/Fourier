import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
x = np.linspace(-2, 2, 100)
plt.figure(figsize=(4,3))
plt.plot(x, x**2)
plt.savefig(r"/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/fig-1776783582679-39e88628.png", dpi=150, bbox_inches="tight")
