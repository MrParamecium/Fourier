// Static syllabus data: SECTION_PREVIEWS_NEW (with Object.assign extension), syllabusDataNew, syllabusData alias.
// Loaded as a classic <script> before app.js. Pure data, no closures.
// Extracted in Phase 1 #2 of the refactor plan.

// ── SECTION_PREVIEWS_NEW (auto-generated) ──
const SECTION_PREVIEWS_NEW = {
  "1.1 Size of a Signal": {
    "en": "Signal energy and power are the fundamental metrics for measuring how 'big' a signal really is-not in amplitude, but in total content. These normalized measures (based on a 1-ohm load) become essential tools for comparing signals, analyzing approximation errors, and understanding signal-to-noise ratios on exams.",
    "zh": "信号能量和功率是衡量信号\"大小\"的基本指标--不是振幅,而是总体内容。这些归一化度量(基于1欧姆负载)成为比较信号、分析近似误差和理解信噪比的必要工具。",
    "emoji": "⚡",
    "refs": 8
  },
  "1.1-2 Size of a Signal": {
    "en": "Signal energy and power are the fundamental metrics for quantifying how 'big' a signal really is. Energy (the integral of squared magnitude) works perfectly for signals that die out, while power (time-averaged energy) handles signals that persist forever-and you'll need to know which one applies to pass any exam problem involving signal classification.",
    "zh": "信号能量和功率是量化信号\"大小\"的基本指标。能量(幅度平方的积分)适用于衰减的信号,而功率(能量的时间平均)则用于永不衰减的信号--在任何涉及信号分类的考试题中,你都需要知道何时使用哪一个。",
    "emoji": "📏",
    "refs": 1
  },
  "1.10 Internal Description: The State-Space Description": {
    "en": "State-space descriptions capture the internal dynamics of a system by tracking key variables (like capacitor voltages and inductor currents) from which all other signals can be reconstructed. This internal view is essential for understanding system behavior, designing controllers, and identifying whether a system is truly controllable and observable-properties that determine if you can actually steer and measure what matters.",
    "zh": "状态空间描述通过跟踪系统的关键变量(如电容器电压和电感器电流)来捕捉系统的内部动态,所有其他信号都可以从这些变量重构出来。这种内部视角对于理解系统行为、设计控制器以及识别系统是否真正可控和可观测至关重要--这些性质决定了你是否能够真正控制和测量重要的量。",
    "emoji": "⚙️",
    "refs": 3
  },
  "1.10-2 Signals and Systems - Problems": {
    "en": "These problems push you to translate real circuits and mechanical systems into state-variable form-the language that makes higher-order systems solvable. You'll practice identifying which voltages and currents matter as states, then writing the differential equations that govern them, skills that show up constantly on exams and in system modeling.",
    "zh": "这些题目要求你将实际电路和机械系统转化为状态变量形式--这是求解高阶系统的关键语言。你将练习识别哪些电压和电流作为状态变量,然后写出控制它们的微分方程,这些技能在考试和系统建模中频繁出现。",
    "emoji": "⚙️",
    "refs": 1
  },
  "1.11 MATLAB: Working with Functions": {
    "en": "Plotting oscillatory functions in MATLAB requires more finesse than you might think-too few sample points and your beautiful cosine wave becomes a jagged mess. This section shows why choosing the right sampling density (typically 100 points per oscillation) is essential for capturing fast-changing signals accurately, and introduces practical MATLAB commands like anonymous functions and axis formatting to make your plots publication-ready.",
    "zh": "在MATLAB中绘制振荡函数需要比你想象的更多技巧--样本点太少,你的余弦波就会变成锯齿状的混乱。本节展示为什么选择正确的采样密度(通常每个振荡100个点)对于准确捕捉快速变化的信号至关重要,并介绍实用的MATLAB命令(如匿名函数和坐标轴格式化)来使你的图表达到出版质量。",
    "emoji": "📈",
    "refs": 2
  },
  "1.11-1 Anonymous Functions": {
    "en": "Anonymous functions let you define mathematical expressions on the fly in MATLAB without creating separate files-perfect for quickly testing exponentially damped sinusoids and other signals you'll encounter in homework and exams. The @ symbol syntax makes it easy to evaluate your function at any input, whether a single point or an entire vector for plotting.",
    "zh": "匿名函数让你在MATLAB中快速定义数学表达式,无需创建单独的文件--非常适合快速测试指数衰减正弦波和其他信号处理中常见的信号。使用@符号语法可以轻松在任意输入点(单个点或整个向量)处计算函数值,便于绘图。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.11-2 Relational Operators and the Unit Step Function": {
    "en": "The unit step function is a fundamental building block in signals and systems, and MATLAB's relational operators make it surprisingly simple to define and visualize. This section shows how to use the >= operator to create u(t) as an anonymous function, then tackles two practical plotting pitfalls-axis scaling that hides your signal and the jagged appearance of discontinuities-that every student encounters when first coding step functions.",
    "zh": "单位阶跃函数是信号与系统中的基本构件,MATLAB的关系运算符使其定义和可视化变得出奇地简单。本节展示如何使用>=运算符将u(t)创建为匿名函数,然后解决两个实际绘图问题--隐藏信号的轴缩放和不连续性的锯齿状外观--这是每个学生首次编写阶跃函数时都会遇到的问题。",
    "emoji": "📊",
    "refs": 1
  },
  "1.11-3 Visualizing Operations on the Independent Variable": {
    "en": "Time shifting and scaling aren't just abstract concepts-they're operations you can visualize directly in MATLAB using anonymous functions. This section shows how to plot transformed versions of a function like g(2t+1), breaking down what happens when you compress time and shift the waveform left, with concrete examples using causal exponential cosines that help you see exactly where the signal turns on.",
    "zh": "时间移位和缩放不仅仅是抽象概念--你可以在MATLAB中使用匿名函数直接可视化这些操作。本节展示如何绘制函数的变换版本(如g(2t+1)),分解时间压缩和波形左移时发生的情况,并使用因果指数余弦的具体例子帮助你看到信号的确切开启点。",
    "emoji": "📊",
    "refs": 1
  },
  "1.11-4 MATLAB: Working with Functions": {
    "en": "MATLAB transforms abstract signal operations into visual reality-this section shows how to plot reflected and time-shifted versions of signals like g(-t+1) and composite functions, then tackles numerical integration to estimate signal energy without solving integrals by hand. These practical coding skills bridge theory and the computational tools you'll use on exams and in labs.",
    "zh": "MATLAB 将抽象的信号运算转化为可视化现实--本节展示如何绘制反射和时移信号(如 g(-t+1) 和复合函数),然后介绍数值积分来估计信号能量,无需手工求解积分。这些实用的编程技能连接了理论与你在考试和实验中使用的计算工具。",
    "emoji": "📊",
    "refs": 2
  },
  "1.12 Summary": {
    "en": "This chapter wrap-up consolidates everything you've learned about signals and systems-from energy calculations to stability conditions. You'll see how all the classifications (continuous vs. discrete, periodic vs. aperiodic, causal vs. noncausal) fit together, plus a MATLAB drill to cement your computational skills before moving to more complex topics.",
    "zh": "本章总结整合了你所学的信号与系统的全部内容--从能量计算到稳定性条件。你将看到所有分类(连续与离散、周期与非周期、因果与非因果)如何相互关联,以及一个MATLAB练习来巩固你的计算技能,为后续更复杂的主题做准备。",
    "emoji": "📋",
    "refs": 2
  },
  "1.2 Determining Power and RMS Value": {
    "en": "Power and RMS values reveal how much energy a signal carries-and for sinusoids, these quantities depend only on amplitude, not frequency or phase. This section walks through calculating power for both real sinusoids and complex exponentials using time-averaging, then introduces time scaling operations that compress or stretch signals by replacing t with at, a fundamental manipulation you'll use constantly when analyzing system responses.",
    "zh": "功率和RMS值揭示了信号携带的能量大小--对于正弦信号,这些量仅取决于幅度,与频率或相位无关。本节通过时间平均法演示如何计算实正弦和复指数信号的功率,随后介绍时间缩放操作,通过将t替换为at来压缩或拉伸信号,这是分析系统响应时经常使用的基本操作。",
    "emoji": "⚡",
    "refs": 4
  },
  "1.2-1 Time Shifting": {
    "en": "Time shifting is the foundation of how signals move through systems-delay a signal by replacing t with (t-T), and you've got the core operation behind every filter and communication system. This section breaks down why positive delays shift right and negative delays shift left, with visual examples that make the pattern stick for exam problems.",
    "zh": "时间移位是信号在系统中运动的基础--通过用(t-T)替换t来延迟信号,这是每个滤波器和通信系统背后的核心操作。本节解释为什么正延迟向右移动,负延迟向左移动,并通过可视化示例帮助你掌握考试中的相关问题。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.2-2 Time Scaling": {
    "en": "Time scaling reveals how speeding up or slowing down a signal changes its mathematical form-compress by factor a and you get x(at), expand and you get x(t/a), with t=0 always staying put as your anchor. This operation is essential for understanding how systems respond to signals played at different rates, a skill you'll need for both continuous and discrete signal problems on exams.",
    "zh": "时间缩放揭示了信号加速或减速如何改变其数学形式--压缩因子a得到x(at),扩展得到x(t/a),而t=0始终保持不变作为锚点。这个操作对于理解系统如何响应以不同速率播放的信号至关重要,是连续和离散信号问题考试中必需的技能。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.2-3 Time Reversal": {
    "en": "Time reversal flips a signal backward in time by replacing t with -t, creating a mirror image across the vertical axis. This simple substitution is fundamental to understanding signal transformations and appears constantly in convolution, correlation, and system analysis-making it essential for predicting how signals behave under time manipulation.",
    "zh": "时间反转通过将 t 替换为 -t 来将信号向后翻转,在垂直轴上创建镜像。这个简单的替换对于理解信号变换至关重要,在卷积、相关性和系统分析中频繁出现,是预测信号在时间操作下行为的关键。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.2-4 Some Useful Signal Operations": {
    "en": "Time reversal, scaling, and shifting rarely happen in isolation-this section shows how to combine them systematically. You'll see why x(2t - 6) can be built two different ways, and why the *order* of operations matters for getting the right answer on exams.",
    "zh": "时间反转、缩放和平移很少单独出现--本节系统地展示如何组合它们。你将看到为什么 x(2t - 6) 可以用两种不同的方式构建,以及为什么操作的*顺序*对于在考试中得到正确答案至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.3 Time Shifting": {
    "en": "Time shifting shows how signals move left or right on the time axis-delay a signal by replacing t with (t-1), advance it by replacing t with (t+1). This fundamental operation appears constantly in real systems like audio processing and control, where you need to account for transmission delays or predict future behavior.",
    "zh": "时间移位展示了信号如何在时间轴上左右移动--用(t-1)替换t可以延迟信号,用(t+1)替换t可以提前信号。这个基本操作在音频处理和控制系统等实际应用中无处不在,用来处理传输延迟或预测未来行为。",
    "emoji": "⏱️",
    "refs": 3
  },
  "1.3-2 Classification of Signals": {
    "en": "Signals come in five distinct flavors, and mixing them up is a common exam trap. This section separates continuous-time from analog, periodic from energy signals, and deterministic from random-each classification answers a different question about how a signal behaves. Getting these distinctions right is essential for choosing the right analysis tools later.",
    "zh": "信号有五种不同的分类方式,混淆它们是常见的考试陷阱。本节区分连续时间与模拟信号、周期与能量信号、确定性与随机信号--每种分类都回答了关于信号如何表现的不同问题。正确理解这些区别对于后续选择合适的分析工具至关重要。",
    "emoji": "🏷️",
    "refs": 1
  },
  "1.3-3 Periodic and Aperiodic Signals": {
    "en": "Periodic signals repeat themselves forever-they satisfy x(t) = x(t + T0) for some fundamental period T0-while aperiodic signals don't follow this pattern. This classification is crucial for exam problems because periodic signals unlock powerful analysis tools like Fourier series, whereas aperiodic signals require different techniques like Fourier transforms.",
    "zh": "周期信号永远重复自身--满足 x(t) = x(t + T0),其中 T0 是基本周期--而非周期信号则不遵循这种模式。这种分类对考试至关重要,因为周期信号能够使用傅里叶级数等强大的分析工具,而非周期信号则需要傅里叶变换等不同的技术。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.3-5 Some Useful Signal Models": {
    "en": "Energy and power signals represent two mutually exclusive categories that classify real-world signals-most practical signals are energy signals with finite total energy, while power signals require infinite duration and constant average power. This section also separates deterministic signals (completely predictable from a mathematical formula) from random signals (described only through probability), setting the stage for the fundamental signal models like steps, impulses, and exponentials that appear throughout systems analysis.",
    "zh": "能量信号和功率信号是两个互斥的分类,用来描述实际信号--大多数实际信号是具有有限总能量的能量信号,而功率信号需要无限持续时间和恒定平均功率。本节还区分了确定性信号(可以从数学公式完全预测)和随机信号(仅通过概率描述),为系统分析中出现的基本信号模型(如阶跃、冲激和指数函数)奠定基础。",
    "emoji": "📊",
    "refs": 1
  },
  "1.3-6 Signals and Systems - Problems": {
    "en": "This problem set reinforces the foundational signal classifications that appear throughout signals and systems-from distinguishing energy versus power signals to determining periodicity in composite waveforms. These exercises are essential for building intuition about how signals behave under time scaling and transformations, skills you'll need to tackle more complex system analysis.",
    "zh": "这套习题强化了信号与系统中的基础信号分类--从区分能量信号与功率信号到确定复合波形的周期性。这些练习对于建立信号在时间缩放和变换下的行为直觉至关重要,这些技能是解决更复杂系统分析问题所必需的。",
    "emoji": "📋",
    "refs": 1
  },
  "1.4-1 The Unit Step Function u(t)": {
    "en": "The unit step function u(t) is your gateway to representing causal signals-those that start at t=0 and stay silent before. This section shows how multiplying any signal by u(t) instantly makes it causal, and how combining shifted step functions lets you build piecewise signals like rectangular pulses with a single elegant expression instead of messy case definitions.",
    "zh": "单位阶跃函数u(t)是表示因果信号的关键工具--这些信号从t=0开始,之前保持为零。本节展示如何将任何信号乘以u(t)使其变为因果信号,以及如何组合移位的阶跃函数用单一表达式构建分段信号(如矩形脉冲),而不需要繁琐的分段定义。",
    "emoji": "📍",
    "refs": 1
  },
  "1.4-2 The Unit Impulse Function δ(t)": {
    "en": "The unit impulse δ(t) is a mathematical idealization of an infinitely tall, infinitesimally narrow pulse that carries exactly one unit of area-the foundation for analyzing how systems respond to sudden shocks. This section shows why the impulse matters: it's the building block for representing any signal and the key to understanding convolution and system response in signals and systems.",
    "zh": "单位冲激函数δ(t)是一个数学理想化模型,表示无限高、无穷窄但面积为1的脉冲--是分析系统对突然冲击响应的基础。本节揭示冲激函数的重要性:它是表示任意信号的基本单元,也是理解卷积和系统响应的关键。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.4-3 The Exponential Function est": {
    "en": "The exponential function e^st is the foundation of signal analysis-when s is complex (σ + jω), it captures both decay/growth and oscillation in a single elegant expression. This section builds from singularity functions (impulse, step, ramp) to show why e^st appears everywhere in system responses and Fourier analysis, making it essential for solving differential equations and understanding LTI behavior.",
    "zh": "指数函数e^st是信号分析的基础--当s为复数(σ + jω)时,它在一个优雅的表达式中同时捕捉衰减/增长和振荡。本节从奇异函数(冲激、阶跃、斜坡)出发,说明为什么e^st在系统响应和傅里叶分析中无处不在,这对求解微分方程和理解LTI系统行为至关重要。",
    "emoji": "📈",
    "refs": 2
  },
  "1.5 Complex Frequency and the Exponential Function": {
    "en": "The complex exponential e^(st) is the Swiss Army knife of signals-it unifies constants, decaying/growing exponentials, sinusoids, and damped oscillations into a single framework. By plotting complex frequency s = σ + jω on the s-plane, you gain geometric insight into system behavior that's essential for Laplace transforms and stability analysis on exams.",
    "zh": "复指数函数 e^(st) 是信号分析的万能工具--它将常数、衰减/增长指数、正弦波和阻尼振荡统一在一个框架内。通过在 s 平面上绘制复频率 s = σ + jω,你可以获得对系统行为的几何直观理解,这对拉普拉斯变换和考试中的稳定性分析至关重要。",
    "emoji": "📈",
    "refs": 5
  },
  "1.5-1 Even and Odd Functions": {
    "en": "Symmetry is a powerful shortcut in signal analysis-even and odd functions reveal hidden structure that simplifies calculations throughout the course. This section defines these mirror-image properties mathematically and shows how multiplying even and odd functions together follows predictable rules, a pattern you'll exploit repeatedly in Fourier analysis and convolution problems.",
    "zh": "对称性是信号分析中的强大捷径--偶函数和奇函数揭示了隐藏的结构,可以简化整个课程中的计算。本节从数学角度定义了这些镜像性质,并展示了偶函数和奇函数相乘如何遵循可预测的规则,这是你在傅里叶分析和卷积问题中会反复利用的模式。",
    "emoji": "🪞",
    "refs": 1
  },
  "1.5-2 Even and Odd Components of a Signal": {
    "en": "Every signal can be split into even and odd parts-a decomposition that simplifies integration and reveals hidden symmetries. This section shows why integrals of odd functions vanish over symmetric intervals and provides the exact formulas to extract both components from any signal, with exponential decay as a concrete example.",
    "zh": "任何信号都可以分解为偶部分和奇部分--这种分解简化了积分运算并揭示了隐藏的对称性。本节说明为什么奇函数在对称区间上的积分为零,并提供从任意信号中提取两个分量的精确公式,以指数衰减为具体例子。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.6 Systems": {
    "en": "Systems are the engines that transform signals-whether it's an RC circuit filtering noise or a digital processor computing outputs. This section extends even/odd decomposition to complex signals using conjugate symmetry, then pivots to the big picture: how systems are modeled, analyzed, and designed through terminal relationships and interconnection laws. You'll see why the black-box view matters for everything from circuit analysis to control design.",
    "zh": "系统是转换信号的引擎--无论是RC电路滤除噪声还是数字处理器计算输出。本节将偶/奇分解扩展到复信号,使用共轭对称性和共轭反对称性,然后转向全局视角:系统如何通过端子关系和互连定律进行建模、分析和设计。你将看到黑箱视图为什么对从电路分析到控制设计的一切都很重要。",
    "emoji": "⚙️",
    "refs": 2
  },
  "1.7 Classification of Systems": {
    "en": "Every linear system splits into two independent pieces: what happens because of initial conditions (zero-input response) and what happens because of the input signal (zero-state response). This decomposition, proven through the superposition principle, is why constant-coefficient differential equations perfectly describe real circuits and systems-and it's essential for predicting system behavior on exams.",
    "zh": "每个线性系统都可以分解为两个独立的部分:由初始条件引起的响应(零输入响应)和由输入信号引起的响应(零状态响应)。通过叠加原理证明的这种分解方法,解释了为什么常系数微分方程能够完美描述实际电路和系统--这对于考试中预测系统行为至关重要。",
    "emoji": "🔀",
    "refs": 9
  },
  "1.7-1 Classification of Systems": {
    "en": "Systems fall into eight distinct categories-linear or nonlinear, causal or noncausal, stable or unstable-and knowing which type you're dealing with determines everything about how you analyze it. This section focuses on linearity, the most powerful property in signals and systems: if input x1 produces output y1 and input x2 produces output y2, then x1+x2 must produce y1+y2 (superposition). Mastering system classification is essential for exam problems because it tells you which tools and theorems you can actually use.",
    "zh": "系统分为八大类别--线性或非线性、因果或非因果、稳定或不稳定--而你处理的系统类型决定了分析方法的一切。本节重点讨论线性性,这是信号与系统中最强大的性质:如果输入x1产生输出y1,输入x2产生输出y2,那么x1+x2必须产生y1+y2(叠加原理)。掌握系统分类对考试至关重要,因为它告诉你哪些工具和定理实际上可以使用。",
    "emoji": "🏗️",
    "refs": 2
  },
  "1.7-2 Time-Invariant and Time-Varying Systems": {
    "en": "Time-invariant systems have a special superpower: delay the input, and the output gets delayed by exactly the same amount. This section reveals why this commutativity property matters-it's the defining characteristic that separates well-behaved, predictable systems from time-varying ones that break this rule. You'll see why this distinction is crucial for analyzing real circuits and signals on exams.",
    "zh": "时不变系统有一个特殊的性质:输入延迟多少,输出就延迟多少。本节揭示了这种交换性为什么重要--它是区分行为良好、可预测系统与违反此规则的时变系统的决定性特征。你将看到为什么这种区分对于在考试中分析真实电路和信号至关重要。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-3 Classification of Systems": {
    "en": "A system's behavior can change with time or stay consistent-and this distinction fundamentally shapes how you analyze it. This section separates time-invariant systems (where delaying the input delays the output by the same amount) from time-varying ones using concrete counterexamples, then introduces whether a system responds instantaneously or depends on past values. Mastering this classification is essential because LTI systems unlock powerful analysis tools like convolution and Fourier methods.",
    "zh": "系统的行为可能随时间变化,也可能保持一致--这种区别从根本上影响你的分析方法。本节通过具体反例区分时不变系统(输入延迟会导致输出相同延迟)和时变系统,然后介绍系统是瞬时响应还是依赖过去值。掌握这种分类至关重要,因为LTI系统能够解锁卷积和傅里叶等强大的分析工具。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-4 Causal and Noncausal Systems": {
    "en": "A system's ability to 'remember' past inputs separates the practical from the impossible-memoryless systems respond instantly to the current input alone, while dynamic systems carry memory of what came before. Causality adds a crucial constraint: causal systems cannot peek into the future, making them the only kind you'll find in real circuits and physical devices. This section dissects when systems have memory, when they don't, and why noncausal systems are useful in theory but forbidden in real-time applications.",
    "zh": "系统是否具有'记忆'能力决定了它的本质--无记忆系统仅对当前输入做出瞬时响应,而动态系统则保留过去输入的信息。因果性施加了一个关键约束:因果系统无法预知未来,这使其成为实际电路和物理设备中唯一可行的类型。本节剖析系统何时具有记忆、何时没有记忆,以及为什么非因果系统在理论中有用但在实时应用中被禁用。",
    "emoji": "⏰",
    "refs": 1
  },
  "1.7-5 Continuous-Time and Discrete-Time Systems": {
    "en": "Noncausal systems look into the future-an impossible feat in the real world, but a clever time delay can make them practically useful. This section contrasts the mathematical ideal of noncausal behavior with physical reality, then pivots to the fundamental distinction between continuous-time and discrete-time systems, showing how sampling bridges the two worlds.",
    "zh": "非因果系统能够预知未来--这在现实中是不可能的,但巧妙的时间延迟可以使其在实践中变得有用。本节对比了非因果行为的数学理想与物理现实,然后转向连续时间系统和离散时间系统的根本区别,展示采样如何连接这两个世界。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-7 Invertible and Noninvertible Systems": {
    "en": "Can you always recover the input from the output? Invertible systems preserve all input information through a one-to-one mapping, while noninvertible systems (like rectifiers) lose information by collapsing multiple inputs into the same output. This distinction is crucial for understanding when equalization and signal recovery are possible-and when they're fundamentally impossible.",
    "zh": "你能否总是从输出恢复输入信号?可逆系统通过一一映射保留所有输入信息,而不可逆系统(如整流器)会将多个输入映射到同一输出,导致信息丢失。这个区分对于判断何时可以进行均衡和信号恢复至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.7-8 Stable and Unstable Systems": {
    "en": "A system's stability determines whether bounded inputs produce bounded outputs-the foundation of reliable signal processing. This section distinguishes between invertible and non-invertible systems, then applies BIBO stability tests to classify real systems like differentiators and time-scaling operations, showing why some amplify disturbances while others remain controlled.",
    "zh": "系统的稳定性决定了有界输入是否产生有界输出--这是可靠信号处理的基础。本节区分可逆和不可逆系统,然后对微分器和时间缩放等实际系统应用BIBO稳定性测试,说明为什么某些系统会放大干扰而其他系统保持受控。",
    "emoji": "⚖️",
    "refs": 1
  },
  "1.8 System Model: Input-Output Description": {
    "en": "The differential operator D notation transforms messy integral equations into clean algebraic expressions-this section shows how to write input-output relationships for circuits and mechanical systems in a form that's much easier to manipulate. You'll see RC circuits and mass-spring-dashpot systems expressed using operators, a skill that directly simplifies solving for system responses on exams.",
    "zh": "微分算子D记号将复杂的积分方程转化为简洁的代数表达式--本节展示如何用算子形式写出电路和机械系统的输入-输出关系。你将看到RC电路和质量-弹簧-阻尼器系统如何用算子表示,这项技能能直接简化考试中求解系统响应的过程。",
    "emoji": "⚙️",
    "refs": 6
  },
  "1.8-1 System Model: Input-Output Description": {
    "en": "Every physical system needs a mathematical language-this section shows how Kirchhoff's laws and component models translate circuits into input-output equations. You'll see the RLC circuit example worked through step-by-step, establishing the foundation for all the differential equations you'll solve on exams.",
    "zh": "每个物理系统都需要一种数学语言--本节展示基尔霍夫定律和元件模型如何将电路转化为输入输出方程。你将看到RLC电路示例的逐步推导,为考试中要解决的所有微分方程奠定基础。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.8-2 Mechanical Systems": {
    "en": "Mechanical systems follow the same mathematical rules as electrical circuits-Newton's second law replaces Kirchhoff's laws, but the differential equations look identical. This section shows how masses, springs, and dampers combine to create the mechanical analogs of resistors, capacitors, and inductors, giving you a unified framework for analyzing everything from car suspensions to seismic sensors.",
    "zh": "机械系统遵循与电路相同的数学规则--牛顿第二定律取代基尔霍夫定律,但微分方程形式完全相同。本节展示质量、弹簧和阻尼器如何组合成电阻、电容和电感的机械类似物,为你提供一个统一的框架来分析从汽车悬架到地震传感器的各种系统。",
    "emoji": "🔧",
    "refs": 1
  },
  "1.8-3 Electromechanical Systems": {
    "en": "DC motors bridge electricity and motion-this section shows how current input becomes rotational output through the interplay of electromagnetic torque, inertia, and friction. You'll derive the fundamental differential equation governing motor behavior, a critical model for control systems and exam problems involving real-world actuators.",
    "zh": "直流电动机将电能转化为机械运动--本节展示电流输入如何通过电磁转矩、转动惯量和摩擦力的相互作用转化为旋转输出。你将推导控制电动机行为的基本微分方程,这是控制系统和涉及实际执行器的考试问题的关键模型。",
    "emoji": "⚙️",
    "refs": 1
  },
  "1.9 Internal and External Descriptions of a System": {
    "en": "A system's behavior can be described two completely different ways: from the outside (what you measure at the terminals) or from the inside (every signal flowing through it). This section reveals why a black-box input-output relationship can hide internal dynamics-using a capacitor circuit to show how initial conditions and hidden states matter for real systems, and introducing the critical concepts of controllability and observability.",
    "zh": "系统的行为可以用两种完全不同的方式描述:从外部观察(在端子处测量的信号)或从内部分析(系统内部的每个信号)。本节揭示了为什么黑箱输入输出关系会隐藏内部动态--通过电容电路示例说明初始条件和隐藏状态的重要性,并引入可控性和可观测性这两个关键概念。",
    "emoji": "🔍",
    "refs": 2
  },
  "B.1 Complex Numbers": {
    "en": "Complex numbers weren't invented out of thin air-they emerged from a 16th-century puzzle where mathematicians like Cardano found themselves taking square roots of negative numbers while solving perfectly real cubic equations. This section traces how imaginary numbers went from suspicious mathematical artifacts to indispensable tools, and shows you the core operations (conjugates, magnitude, angle) that make complex numbers essential for analyzing signals and systems.",
    "zh": "复数并非凭空产生,而是从16世纪的一个谜题中诞生的--卡尔达诺等数学家在求解实系数三次方程时,意外地遇到了负数的平方根。本节追溯了虚数从可疑的数学工具演变为不可或缺的分析手段的历程,并介绍了复数的核心运算(共轭、模、幅角),这些都是信号与系统分析的基础。",
    "emoji": "🔢",
    "refs": 8
  },
  "B.1": {
    "en": "Complex numbers weren't invented out of thin air-they emerged from a 16th-century puzzle where mathematicians like Cardano found themselves taking square roots of negative numbers while solving perfectly real cubic equations. This section traces how imaginary numbers went from suspicious mathematical artifacts to indispensable tools, and shows you the core operations (conjugates, magnitude, angle) that make complex numbers essential for analyzing signals and systems.",
    "zh": "复数并非凭空产生,而是从16世纪的一个谜题中诞生的--卡尔达诺等数学家在求解实系数三次方程时,意外地遇到了负数的平方根。本节追溯了虚数从可疑的数学工具演变为不可或缺的分析手段的历程,并介绍了复数的核心运算(共轭、模、幅角),这些都是信号与系统分析的基础。",
    "emoji": "🔢",
    "refs": 8
  },
  "B.1-1 Complex Numbers - A Historical Note": {
    "en": "Complex numbers aren't actually mysterious-they're just unfamiliar. This historical note traces how our number system evolved from simple counting to fractions to the complex plane, showing that imaginary numbers are as natural as the innovations that came before them. You'll see why engineers and scientists rely on complex numbers for signals and systems, making this foundation essential for everything that follows.",
    "zh": "复数其实并不神秘,只是我们还不够熟悉。这个历史注记追溯了我们的数字系统如何从简单计数演进到分数,再到复平面,说明虚数和之前的数学创新一样自然。你将看到为什么工程师和科学家在信号与系统中依赖复数,这个基础对后续所有内容都至关重要。",
    "emoji": "📜",
    "refs": 1
  },
  "B.1-1": {
    "en": "Complex numbers aren't actually mysterious-they're just unfamiliar. This historical note traces how our number system evolved from simple counting to fractions to the complex plane, showing that imaginary numbers are as natural as the innovations that came before them. You'll see why engineers and scientists rely on complex numbers for signals and systems, making this foundation essential for everything that follows.",
    "zh": "复数其实并不神秘,只是我们还不够熟悉。这个历史注记追溯了我们的数字系统如何从简单计数演进到分数,再到复平面,说明虚数和之前的数学创新一样自然。你将看到为什么工程师和科学家在信号与系统中依赖复数,这个基础对后续所有内容都至关重要。",
    "emoji": "📜",
    "refs": 1
  },
  "B.1-2 Algebra of Complex Numbers": {
    "en": "Complex numbers live on a 2D plane where the real and imaginary parts become coordinates-and Euler's formula is the bridge that lets you switch between rectangular form (a + jb) and polar form (re^(jθ)) effortlessly. This algebraic foundation is essential for analyzing AC circuits and frequency-domain signals, where complex exponentials replace messy trigonometry.",
    "zh": "复数存在于二维平面上,实部和虚部成为坐标--欧拉公式是让你在矩形形式(a + jb)和极坐标形式(re^(jθ))之间轻松切换的桥梁。这个代数基础对于分析交流电路和频域信号至关重要,其中复指数替代了复杂的三角函数。",
    "emoji": "📐",
    "refs": 1
  },
  "B.1-2": {
    "en": "Complex numbers live on a 2D plane where the real and imaginary parts become coordinates-and Euler's formula is the bridge that lets you switch between rectangular form (a + jb) and polar form (re^(jθ)) effortlessly. This algebraic foundation is essential for analyzing AC circuits and frequency-domain signals, where complex exponentials replace messy trigonometry.",
    "zh": "复数存在于二维平面上,实部和虚部成为坐标--欧拉公式是让你在矩形形式(a + jb)和极坐标形式(re^(jθ))之间轻松切换的桥梁。这个代数基础对于分析交流电路和频域信号至关重要,其中复指数替代了复杂的三角函数。",
    "emoji": "📐",
    "refs": 1
  },
  "B.2 Sinusoids": {
    "en": "Sinusoids are the building blocks of signal analysis-every periodic waveform you'll encounter starts here. This section breaks down amplitude, frequency, phase, and the crucial relationship between hertz and radians, then shows you how phase shifts translate directly into time delays, making it easy to sketch and manipulate these signals for circuit and system problems.",
    "zh": "正弦信号是信号分析的基础--你遇到的每个周期波形都从这里开始。本节分解了幅度、频率、相位的含义,以及赫兹与弧度之间的关键关系,然后展示相位移动如何直接转化为时间延迟,使你能轻松绘制和操纵这些信号来解决电路和系统问题。",
    "emoji": "〰️",
    "refs": 3
  },
  "B.2": {
    "en": "Sinusoids are the building blocks of signal analysis-every periodic waveform you'll encounter starts here. This section breaks down amplitude, frequency, phase, and the crucial relationship between hertz and radians, then shows you how phase shifts translate directly into time delays, making it easy to sketch and manipulate these signals for circuit and system problems.",
    "zh": "正弦信号是信号分析的基础--你遇到的每个周期波形都从这里开始。本节分解了幅度、频率、相位的含义,以及赫兹与弧度之间的关键关系,然后展示相位移动如何直接转化为时间延迟,使你能轻松绘制和操纵这些信号来解决电路和系统问题。",
    "emoji": "〰️",
    "refs": 3
  },
  "B.2-1 Addition of Sinusoids": {
    "en": "Two sinusoids at the same frequency always combine into a single sinusoid-a result that's fundamental to AC circuit analysis and signal processing. This section derives the exact formulas for the resultant amplitude and phase, then shows how phasors (rotating vectors in the complex plane) make this geometric addition intuitive and visual.",
    "zh": "同频率的两个正弦波总是合成为一个正弦波--这是交流电路分析和信号处理的基础。本节推导合成波的幅度和相位公式,然后用相量(复平面中的旋转向量)直观地展示这种几何加法。",
    "emoji": "➕",
    "refs": 1
  },
  "B.2-1": {
    "en": "Two sinusoids at the same frequency always combine into a single sinusoid-a result that's fundamental to AC circuit analysis and signal processing. This section derives the exact formulas for the resultant amplitude and phase, then shows how phasors (rotating vectors in the complex plane) make this geometric addition intuitive and visual.",
    "zh": "同频率的两个正弦波总是合成为一个正弦波--这是交流电路分析和信号处理的基础。本节推导合成波的幅度和相位公式,然后用相量(复平面中的旋转向量)直观地展示这种几何加法。",
    "emoji": "➕",
    "refs": 1
  },
  "B.3 Sketching Signals": {
    "en": "The time constant is your shortcut for sketching exponential decay-it tells you exactly when a signal drops to 37% of its starting value. This section shows how to use this single number to quickly sketch any decaying exponential without a calculator, making exam sketches fast and accurate.",
    "zh": "时间常数是绘制指数衰减的快捷方法--它告诉你信号何时衰减到初始值的37%。本节展示如何使用这个单一数字快速绘制任何衰减指数,无需计算器,使考试中的草图绘制快速准确。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3": {
    "en": "The time constant is your shortcut for sketching exponential decay-it tells you exactly when a signal drops to 37% of its starting value. This section shows how to use this single number to quickly sketch any decaying exponential without a calculator, making exam sketches fast and accurate.",
    "zh": "时间常数是绘制指数衰减的快捷方法--它告诉你信号何时衰减到初始值的37%。本节展示如何使用这个单一数字快速绘制任何衰减指数,无需计算器,使考试中的草图绘制快速准确。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3-1 Monotonic Exponentials": {
    "en": "Monotonic exponentials form the backbone of real-world signal decay and growth-think of how a battery discharges or how vibrations fade in a damped system. This section connects sinusoids to exponentials through Euler's formula, showing how complex exponentials elegantly unify sines and cosines, and teaches you to sketch these fundamental building blocks that appear in every transient response you'll analyze.",
    "zh": "单调指数信号是现实世界中信号衰减和增长的基础--想象电池放电或阻尼系统中振动衰减的过程。本节通过欧拉公式将正弦波与指数联系起来,展示复指数如何优雅地统一正弦和余弦,并教你绘制这些基本构件,它们出现在你将分析的每个瞬态响应中。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3-1": {
    "en": "Monotonic exponentials form the backbone of real-world signal decay and growth-think of how a battery discharges or how vibrations fade in a damped system. This section connects sinusoids to exponentials through Euler's formula, showing how complex exponentials elegantly unify sines and cosines, and teaches you to sketch these fundamental building blocks that appear in every transient response you'll analyze.",
    "zh": "单调指数信号是现实世界中信号衰减和增长的基础--想象电池放电或阻尼系统中振动衰减的过程。本节通过欧拉公式将正弦波与指数联系起来,展示复指数如何优雅地统一正弦和余弦,并教你绘制这些基本构件,它们出现在你将分析的每个瞬态响应中。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3-2 The Exponentially Varying Sinusoid": {
    "en": "Exponentially varying sinusoids combine two behaviors: a sinusoid that oscillates while an exponential envelope squeezes its amplitude to zero. This section shows how to sketch these signals by treating the decaying exponential and oscillation separately, then multiplying them together-a technique that appears constantly in transient response analysis and damped systems.",
    "zh": "指数衰减的正弦信号结合了两种行为:正弦振荡同时被指数包络压缩其幅度至零。本节展示如何通过分别处理衰减指数和振荡,然后将它们相乘来绘制这些信号--这种技术在瞬态响应分析和阻尼系统中频繁出现。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3-2": {
    "en": "Exponentially varying sinusoids combine two behaviors: a sinusoid that oscillates while an exponential envelope squeezes its amplitude to zero. This section shows how to sketch these signals by treating the decaying exponential and oscillation separately, then multiplying them together-a technique that appears constantly in transient response analysis and damped systems.",
    "zh": "指数衰减的正弦信号结合了两种行为:正弦振荡同时被指数包络压缩其幅度至零。本节展示如何通过分别处理衰减指数和振荡,然后将它们相乘来绘制这些信号--这种技术在瞬态响应分析和阻尼系统中频繁出现。",
    "emoji": "📉",
    "refs": 1
  },
  "B.4 Cramer's Rule": {
    "en": "Cramer's Rule provides a determinant-based formula for solving systems of linear equations-a technique you'll use repeatedly when analyzing circuit equations and system responses. This section shows how to express solutions directly using determinants, plus visualizes how exponential envelopes modulate oscillating signals, a pattern central to damped system behavior.",
    "zh": "克拉默法则通过行列式公式求解线性方程组--这是分析电路方程和系统响应时反复使用的技术。本节展示如何用行列式直接表示解,并可视化指数包络如何调制振荡信号,这是阻尼系统行为的核心模式。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.4": {
    "en": "Cramer's Rule provides a determinant-based formula for solving systems of linear equations-a technique you'll use repeatedly when analyzing circuit equations and system responses. This section shows how to express solutions directly using determinants, plus visualizes how exponential envelopes modulate oscillating signals, a pattern central to damped system behavior.",
    "zh": "克拉默法则通过行列式公式求解线性方程组--这是分析电路方程和系统响应时反复使用的技术。本节展示如何用行列式直接表示解,并可视化指数包络如何调制振荡信号,这是阻尼系统行为的核心模式。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.5 Partial Fraction Expansion": {
    "en": "Partial fraction expansion breaks down complex rational functions into simpler pieces-a crucial technique for inverse Laplace transforms and system analysis. This section distinguishes between proper and improper rational functions, shows how polynomial long division handles the improper case, and reveals the Heaviside method for extracting residues from complex-conjugate pole pairs.",
    "zh": "部分分式展开将复杂的有理函数分解为更简单的部分--这是逆拉普拉斯变换和系统分析的关键技术。本节区分真分式和假分式,展示多项式长除法如何处理假分式情况,并揭示Heaviside方法从复共轭极点对中提取留数的过程。",
    "emoji": "🔀",
    "refs": 3
  },
  "B.5": {
    "en": "Partial fraction expansion breaks down complex rational functions into simpler pieces-a crucial technique for inverse Laplace transforms and system analysis. This section distinguishes between proper and improper rational functions, shows how polynomial long division handles the improper case, and reveals the Heaviside method for extracting residues from complex-conjugate pole pairs.",
    "zh": "部分分式展开将复杂的有理函数分解为更简单的部分--这是逆拉普拉斯变换和系统分析的关键技术。本节区分真分式和假分式,展示多项式长除法如何处理假分式情况,并揭示Heaviside方法从复共轭极点对中提取留数的过程。",
    "emoji": "🔀",
    "refs": 3
  },
  "B.5-1 Method of Clearing Fractions": {
    "en": "Partial fraction expansion breaks complex rational functions into simpler pieces-and the method of clearing fractions is your most direct tool for finding them. By multiplying through by the common denominator and matching coefficients, you'll systematically solve for each unknown constant, a technique that appears constantly on exams whenever you need to invert Laplace transforms or decompose system responses.",
    "zh": "部分分式展开将复杂的有理函数分解为更简单的部分--清分母法是求解这些部分的最直接工具。通过乘以公分母并匹配同次幂系数,你可以系统地求解每个未知常数,这种技术在反演拉普拉斯变换或分解系统响应时频繁出现。",
    "emoji": "🔀",
    "refs": 1
  },
  "B.5-1": {
    "en": "Partial fraction expansion breaks complex rational functions into simpler pieces-and the method of clearing fractions is your most direct tool for finding them. By multiplying through by the common denominator and matching coefficients, you'll systematically solve for each unknown constant, a technique that appears constantly on exams whenever you need to invert Laplace transforms or decompose system responses.",
    "zh": "部分分式展开将复杂的有理函数分解为更简单的部分--清分母法是求解这些部分的最直接工具。通过乘以公分母并匹配同次幂系数,你可以系统地求解每个未知常数,这种技术在反演拉普拉斯变换或分解系统响应时频繁出现。",
    "emoji": "🔀",
    "refs": 1
  },
  "B.5-2 The Heaviside \"Cover-Up\" Method": {
    "en": "The Heaviside cover-up method is a shortcut that replaces tedious algebra with a single evaluation trick-multiply by the factor you want to isolate, then plug in its root. This technique is essential for quickly decomposing rational functions into partial fractions, especially when all denominator factors are distinct, and it's a favorite on exams because it's fast and mechanical once you see the pattern.",
    "zh": "Heaviside掩盖法是一个巧妙的快速技巧,用单次代入替代繁琐的代数运算--将两边同乘要分离的因子,然后代入其根值即可。这种方法对于快速分解有理函数的部分分式至关重要,特别是当分母的所有因子都不重复时,它在考试中很受欢迎,因为一旦掌握规律就能机械地快速求解。",
    "emoji": "🎯",
    "refs": 1
  },
  "B.5-2": {
    "en": "The Heaviside cover-up method is a shortcut that replaces tedious algebra with a single evaluation trick-multiply by the factor you want to isolate, then plug in its root. This technique is essential for quickly decomposing rational functions into partial fractions, especially when all denominator factors are distinct, and it's a favorite on exams because it's fast and mechanical once you see the pattern.",
    "zh": "Heaviside掩盖法是一个巧妙的快速技巧,用单次代入替代繁琐的代数运算--将两边同乘要分离的因子,然后代入其根值即可。这种方法对于快速分解有理函数的部分分式至关重要,特别是当分母的所有因子都不重复时,它在考试中很受欢迎,因为一旦掌握规律就能机械地快速求解。",
    "emoji": "🎯",
    "refs": 1
  },
  "B.5-3 Repeated Factors of Q(x)": {
    "en": "Repeated factors in the denominator require a different partial fraction strategy than simple poles-you can't just cover up and substitute. This section extends the Heaviside cover-up method using differentiation to extract coefficients for repeated roots, a critical technique when the same factor appears multiple times in Q(x).",
    "zh": "分母中的重复因子需要与简单极点不同的部分分式策略--你不能只是遮住并代入。本节通过微分扩展Heaviside覆盖法来提取重复根的系数,这是当同一因子在Q(x)中出现多次时的关键技术。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-3": {
    "en": "Repeated factors in the denominator require a different partial fraction strategy than simple poles-you can't just cover up and substitute. This section extends the Heaviside cover-up method using differentiation to extract coefficients for repeated roots, a critical technique when the same factor appears multiple times in Q(x).",
    "zh": "分母中的重复因子需要与简单极点不同的部分分式策略--你不能只是遮住并代入。本节通过微分扩展Heaviside覆盖法来提取重复根的系数,这是当同一因子在Q(x)中出现多次时的关键技术。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-4 Partial Fraction Expansion with Repeated Factors": {
    "en": "Repeated factors in the denominator require a different strategy than simple poles-the Heaviside cover-up method alone isn't enough. This section shows how successive differentiation unlocks the coefficients for repeated roots, turning a seemingly complex algebraic puzzle into a systematic procedure that works every time.",
    "zh": "分母中的重根需要不同于简单极点的策略--单独使用Heaviside覆盖法是不够的。本节展示了如何通过逐次求导来解锁重根的系数,将看似复杂的代数问题转化为每次都有效的系统程序。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-4": {
    "en": "Repeated factors in the denominator require a different strategy than simple poles-the Heaviside cover-up method alone isn't enough. This section shows how successive differentiation unlocks the coefficients for repeated roots, turning a seemingly complex algebraic puzzle into a systematic procedure that works every time.",
    "zh": "分母中的重根需要不同于简单极点的策略--单独使用Heaviside覆盖法是不够的。本节展示了如何通过逐次求导来解锁重根的系数,将看似复杂的代数问题转化为每次都有效的系统程序。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-5 Improper F(x) with m = n": {
    "en": "When the numerator and denominator of a rational function have the same degree, you can't skip the partial fraction setup-there's an extra constant term hiding in the expansion. This section shows why polynomial long division is your first move, then how to find all coefficients using the same techniques as proper fractions.",
    "zh": "当有理函数的分子和分母次数相同时,不能跳过部分分式的设置--展开式中隐藏着一个额外的常数项。本节说明为什么多项式长除法是第一步,然后如何使用与真分式相同的技术来求所有系数。",
    "emoji": "⚖️",
    "refs": 1
  },
  "B.5-5": {
    "en": "When the numerator and denominator of a rational function have the same degree, you can't skip the partial fraction setup-there's an extra constant term hiding in the expansion. This section shows why polynomial long division is your first move, then how to find all coefficients using the same techniques as proper fractions.",
    "zh": "当有理函数的分子和分母次数相同时,不能跳过部分分式的设置--展开式中隐藏着一个额外的常数项。本节说明为什么多项式长除法是第一步,然后如何使用与真分式相同的技术来求所有系数。",
    "emoji": "⚖️",
    "refs": 1
  },
  "B.5-6 Modified Partial Fractions": {
    "en": "Partial fraction expansion gets trickier when you have repeated roots-this is where modified partial fractions save the day. By dividing by x first, expanding, then multiplying back, you unlock a clean form (kx/(x-λi)r) that's essential for inverse z-transforms and handling complex rational functions without messy algebra.",
    "zh": "当遇到重根时,标准部分分式展开会变得复杂--这正是改进型部分分式大显身手的地方。通过先除以x、展开、再乘回x的技巧,你可以得到简洁的形式(kx/(x-λi)r),这对反z变换和处理复杂有理函数至关重要,能避免繁琐的代数运算。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-6": {
    "en": "Partial fraction expansion gets trickier when you have repeated roots-this is where modified partial fractions save the day. By dividing by x first, expanding, then multiplying back, you unlock a clean form (kx/(x-λi)r) that's essential for inverse z-transforms and handling complex rational functions without messy algebra.",
    "zh": "当遇到重根时,标准部分分式展开会变得复杂--这正是改进型部分分式大显身手的地方。通过先除以x、展开、再乘回x的技巧,你可以得到简洁的形式(kx/(x-λi)r),这对反z变换和处理复杂有理函数至关重要,能避免繁琐的代数运算。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.6 Vectors and Matrices": {
    "en": "Matrices are the language of linear transformations-they encode how vectors get rotated, scaled, and combined. This section builds from n-dimensional vectors to matrix operations, showing how simultaneous linear equations become elegant matrix multiplications and why the conformability rules matter for your calculations.",
    "zh": "矩阵是线性变换的语言--它们编码向量如何被旋转、缩放和组合。本节从n维向量构建到矩阵运算,展示联立线性方程如何转化为优雅的矩阵乘法,以及为什么相容性规则对你的计算至关重要。",
    "emoji": "🔲",
    "refs": 3
  },
  "B.6": {
    "en": "Matrices are the language of linear transformations-they encode how vectors get rotated, scaled, and combined. This section builds from n-dimensional vectors to matrix operations, showing how simultaneous linear equations become elegant matrix multiplications and why the conformability rules matter for your calculations.",
    "zh": "矩阵是线性变换的语言--它们编码向量如何被旋转、缩放和组合。本节从n维向量构建到矩阵运算,展示联立线性方程如何转化为优雅的矩阵乘法,以及为什么相容性规则对你的计算至关重要。",
    "emoji": "🔲",
    "refs": 3
  },
  "B.6-1 Some Definitions and Properties": {
    "en": "Matrices come in several standard forms-diagonal, identity, zero, and symmetric-each with specific properties that simplify calculations and appear constantly in system analysis. This section establishes the notation and definitions you'll need to work with matrices fluently, including the transpose operation that swaps rows and columns.",
    "zh": "矩阵有多种标准形式--对角矩阵、单位矩阵、零矩阵和对称矩阵--每种都有特定的性质,能简化计算并在系统分析中频繁出现。本节建立了你需要熟练使用矩阵的记号和定义,包括交换行列的转置运算。",
    "emoji": "🔲",
    "refs": 1
  },
  "B.6-1": {
    "en": "Matrices come in several standard forms-diagonal, identity, zero, and symmetric-each with specific properties that simplify calculations and appear constantly in system analysis. This section establishes the notation and definitions you'll need to work with matrices fluently, including the transpose operation that swaps rows and columns.",
    "zh": "矩阵有多种标准形式--对角矩阵、单位矩阵、零矩阵和对称矩阵--每种都有特定的性质,能简化计算并在系统分析中频繁出现。本节建立了你需要熟练使用矩阵的记号和定义,包括交换行列的转置运算。",
    "emoji": "🔲",
    "refs": 1
  },
  "B.6-2 Matrix Algebra": {
    "en": "Matrix algebra forms the computational backbone for analyzing multi-input, multi-output systems and solving coupled differential equations. This section covers the essential operations-addition, scalar multiplication, and the foundations of matrix multiplication-that you'll use constantly when working with state-space representations and system matrices on exams.",
    "zh": "矩阵代数是分析多输入多输出系统和求解耦合微分方程的计算基础。本节介绍基本运算--加法、标量乘法和矩阵乘法的基础--这些是你在考试中处理状态空间表示和系统矩阵时必须掌握的工具。",
    "emoji": "📊",
    "refs": 1
  },
  "B.6-2": {
    "en": "Matrix algebra forms the computational backbone for analyzing multi-input, multi-output systems and solving coupled differential equations. This section covers the essential operations-addition, scalar multiplication, and the foundations of matrix multiplication-that you'll use constantly when working with state-space representations and system matrices on exams.",
    "zh": "矩阵代数是分析多输入多输出系统和求解耦合微分方程的计算基础。本节介绍基本运算--加法、标量乘法和矩阵乘法的基础--这些是你在考试中处理状态空间表示和系统矩阵时必须掌握的工具。",
    "emoji": "📊",
    "refs": 1
  },
  "B.6-5 Background - Problems": {
    "en": "This problem set reinforces two essential mathematical tools: decomposing rational functions into partial fractions and using matrix methods to solve linear systems. You'll practice both hand calculations and systematic approaches that directly apply to finding signal constants, analyzing system responses, and solving the kinds of equations that appear throughout signals and systems coursework.",
    "zh": "本题集强化了两个关键数学工具:将有理函数分解为部分分式,以及使用矩阵方法求解线性方程组。你将练习手工计算和系统方法,这些直接应用于求信号常数、分析系统响应,以及求解信号与系统课程中常见的方程。",
    "emoji": "📋",
    "refs": 1
  },
  "B.6-5": {
    "en": "This problem set reinforces two essential mathematical tools: decomposing rational functions into partial fractions and using matrix methods to solve linear systems. You'll practice both hand calculations and systematic approaches that directly apply to finding signal constants, analyzing system responses, and solving the kinds of equations that appear throughout signals and systems coursework.",
    "zh": "本题集强化了两个关键数学工具:将有理函数分解为部分分式,以及使用矩阵方法求解线性方程组。你将练习手工计算和系统方法,这些直接应用于求信号常数、分析系统响应,以及求解信号与系统课程中常见的方程。",
    "emoji": "📋",
    "refs": 1
  },
  "B.7 MATLAB: Elementary Operations": {
    "en": "MATLAB's plotting and matrix tools turn abstract math into visual insights and computational solutions. This section shows how to annotate plots with labels and titles, visualize complex roots on the unit circle, and solve systems of linear equations using matrix operations-essential skills for verifying your signal processing calculations by hand and in code.",
    "zh": "MATLAB的绘图和矩阵工具将抽象数学转化为可视化洞察和计算解决方案。本节展示如何用标签和标题注释图表、在单位圆上可视化复数根,以及使用矩阵运算求解线性方程组--这些是验证信号处理计算的必备技能。",
    "emoji": "📊",
    "refs": 3
  },
  "B.7": {
    "en": "MATLAB's plotting and matrix tools turn abstract math into visual insights and computational solutions. This section shows how to annotate plots with labels and titles, visualize complex roots on the unit circle, and solve systems of linear equations using matrix operations-essential skills for verifying your signal processing calculations by hand and in code.",
    "zh": "MATLAB的绘图和矩阵工具将抽象数学转化为可视化洞察和计算解决方案。本节展示如何用标签和标题注释图表、在单位圆上可视化复数根,以及使用矩阵运算求解线性方程组--这些是验证信号处理计算的必备技能。",
    "emoji": "📊",
    "refs": 3
  },
  "B.7-1 MATLAB Overview": {
    "en": "MATLAB's workspace is where all your variables live-and knowing how to navigate it with commands like whos, clear, and save is essential for efficient problem-solving in signals and systems. This section shows you how to organize, inspect, and persist your work across sessions, turning MATLAB from a calculator into a reproducible computational environment.",
    "zh": "MATLAB的工作区是所有变量的存储地--掌握whos、clear和save等命令对于在信号与系统中高效求解至关重要。本节介绍如何组织、检查和跨会话保存你的工作,将MATLAB从简单计算器转变为可重复的计算环境。",
    "emoji": "💾",
    "refs": 1
  },
  "B.7-1": {
    "en": "MATLAB's workspace is where all your variables live-and knowing how to navigate it with commands like whos, clear, and save is essential for efficient problem-solving in signals and systems. This section shows you how to organize, inspect, and persist your work across sessions, turning MATLAB from a calculator into a reproducible computational environment.",
    "zh": "MATLAB的工作区是所有变量的存储地--掌握whos、clear和save等命令对于在信号与系统中高效求解至关重要。本节介绍如何组织、检查和跨会话保存你的工作,将MATLAB从简单计算器转变为可重复的计算环境。",
    "emoji": "💾",
    "refs": 1
  },
  "B.7-2 Calculator Operations": {
    "en": "MATLAB functions as a powerful calculator, but first you need to know how to ask for help-this section shows you the help commands and navigation tools that let you quickly find what you need. You'll also master scalar arithmetic and complex number operations using MATLAB's built-in constants, skills that form the foundation for every computation you'll run.",
    "zh": "MATLAB 可以作为强大的计算器,但首先你需要知道如何寻求帮助--本节介绍帮助命令和导航工具,让你快速找到所需信息。你还将掌握标量运算和复数操作,这些基础技能是你运行任何计算的基础。",
    "emoji": "🧮",
    "refs": 1
  },
  "B.7-2": {
    "en": "MATLAB functions as a powerful calculator, but first you need to know how to ask for help-this section shows you the help commands and navigation tools that let you quickly find what you need. You'll also master scalar arithmetic and complex number operations using MATLAB's built-in constants, skills that form the foundation for every computation you'll run.",
    "zh": "MATLAB 可以作为强大的计算器,但首先你需要知道如何寻求帮助--本节介绍帮助命令和导航工具,让你快速找到所需信息。你还将掌握标量运算和复数操作,这些基础技能是你运行任何计算的基础。",
    "emoji": "🧮",
    "refs": 1
  },
  "B.7-3 Vector Operations": {
    "en": "MATLAB's colon notation (a:b:c) transforms tedious manual calculations into one-line vector operations-perfect for generating sequences of roots, powers, and complex logarithms all at once. This section shows how Euler's formula and vectorized functions let you compute cube roots of -1 or find all 100th roots simultaneously, a technique that appears constantly in signal processing when analyzing poles and zeros.",
    "zh": "MATLAB的冒号记号(a:b:c)将繁琐的手工计算转化为一行向量操作--非常适合一次性生成根、幂次和复对数的序列。本节展示欧拉公式和向量化函数如何让你同时计算-1的立方根或找到所有100次根,这种技术在分析极点和零点时频繁出现在信号处理中。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.7-3": {
    "en": "MATLAB's colon notation (a:b:c) transforms tedious manual calculations into one-line vector operations-perfect for generating sequences of roots, powers, and complex logarithms all at once. This section shows how Euler's formula and vectorized functions let you compute cube roots of -1 or find all 100th roots simultaneously, a technique that appears constantly in signal processing when analyzing poles and zeros.",
    "zh": "MATLAB的冒号记号(a:b:c)将繁琐的手工计算转化为一行向量操作--非常适合一次性生成根、幂次和复对数的序列。本节展示欧拉公式和向量化函数如何让你同时计算-1的立方根或找到所有100次根,这种技术在分析极点和零点时频繁出现在信号处理中。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.7-4 Simple Plotting": {
    "en": "MATLAB's plot command turns vectors into graphs, but there's a critical gotcha: vector indices start at 1, not 0, and they don't automatically align with your actual time or frequency values. This section shows how to create a 10 Hz sinusoid, evaluate it at the right points, and visualize it correctly-essential skills for any signal you'll need to display in homework or exams.",
    "zh": "MATLAB的plot命令能将向量转化为图形,但有一个关键陷阱:向量索引从1开始而非0,且不会自动对应你的实际时间或频率值。本节展示如何创建10 Hz正弦波、在正确的点进行求值,以及正确地将其可视化--这些是你在作业或考试中显示任何信号所需的基本技能。",
    "emoji": "📈",
    "refs": 1
  },
  "B.7-4": {
    "en": "MATLAB's plot command turns vectors into graphs, but there's a critical gotcha: vector indices start at 1, not 0, and they don't automatically align with your actual time or frequency values. This section shows how to create a 10 Hz sinusoid, evaluate it at the right points, and visualize it correctly-essential skills for any signal you'll need to display in homework or exams.",
    "zh": "MATLAB的plot命令能将向量转化为图形,但有一个关键陷阱:向量索引从1开始而非0,且不会自动对应你的实际时间或频率值。本节展示如何创建10 Hz正弦波、在正确的点进行求值,以及正确地将其可视化--这些是你在作业或考试中显示任何信号所需的基本技能。",
    "emoji": "📈",
    "refs": 1
  },
  "B.7-5 Element-by-Element Operations": {
    "en": "Element-by-element operations are what make MATLAB practical for signal processing-they let you multiply, divide, and exponentiate vectors term-by-term without reshaping matrices. This section shows you when to use .*, ./, and .^ instead of their matrix cousins, and how to layer multiple signals (like a sinusoid inside an exponential envelope) on a single plot with proper labels and legends.",
    "zh": "逐元素运算是MATLAB在信号处理中的实用工具--它们让你可以对向量逐项进行乘法、除法和幂运算,而无需重塑矩阵。本节展示何时使用 .*、./ 和 .^ 而不是矩阵运算,以及如何在单个图形上叠加多个信号(如指数包络内的正弦波),并添加适当的标签和图例。",
    "emoji": "⊙",
    "refs": 1
  },
  "B.7-5": {
    "en": "Element-by-element operations are what make MATLAB practical for signal processing-they let you multiply, divide, and exponentiate vectors term-by-term without reshaping matrices. This section shows you when to use .*, ./, and .^ instead of their matrix cousins, and how to layer multiple signals (like a sinusoid inside an exponential envelope) on a single plot with proper labels and legends.",
    "zh": "逐元素运算是MATLAB在信号处理中的实用工具--它们让你可以对向量逐项进行乘法、除法和幂运算,而无需重塑矩阵。本节展示何时使用 .*、./ 和 .^ 而不是矩阵运算,以及如何在单个图形上叠加多个信号(如指数包络内的正弦波),并添加适当的标签和图例。",
    "emoji": "⊙",
    "refs": 1
  },
  "B.7-6 Matrix Operations": {
    "en": "MATLAB treats matrices as its native language, and this section shows you how to build them efficiently using built-in functions like ones(), zeros(), and eye(). You'll see how square bracket notation with spaces or commas creates row and column vectors, plus how to visualize multiple signals side-by-side-essential skills for any computational problem in signals and systems.",
    "zh": "MATLAB 以矩阵作为其原生语言,本节展示如何使用 ones()、zeros() 和 eye() 等内置函数高效地构建矩阵。你将学会用方括号记号(用空格或逗号分隔元素)创建行向量和列向量,以及如何并排可视化多个信号--这些都是信号与系统计算问题中的必备技能。",
    "emoji": "🔲",
    "refs": 1
  },
  "B.7-6": {
    "en": "MATLAB treats matrices as its native language, and this section shows you how to build them efficiently using built-in functions like ones(), zeros(), and eye(). You'll see how square bracket notation with spaces or commas creates row and column vectors, plus how to visualize multiple signals side-by-side-essential skills for any computational problem in signals and systems.",
    "zh": "MATLAB 以矩阵作为其原生语言,本节展示如何使用 ones()、zeros() 和 eye() 等内置函数高效地构建矩阵。你将学会用方括号记号(用空格或逗号分隔元素)创建行向量和列向量,以及如何并排可视化多个信号--这些都是信号与系统计算问题中的必备技能。",
    "emoji": "🔲",
    "refs": 1
  },
  "B.7-7 Partial Fraction Expansions": {
    "en": "Partial fraction expansions break complex rational functions into simpler pieces-and MATLAB's residue command does the heavy lifting for you. This section shows how to use residue to find coefficients, poles, and direct terms automatically, including tricky cases with repeated roots, plus a quick look at residuez for discrete-time systems.",
    "zh": "部分分式展开将复杂的有理函数分解成更简单的部分--MATLAB的residue命令可以自动完成这项工作。本节展示如何使用residue找到系数、极点和直接项,包括处理重根的复杂情况,还简要介绍了用于离散时间系统的residuez函数。",
    "emoji": "🔧",
    "refs": 1
  },
  "B.7-7": {
    "en": "Partial fraction expansions break complex rational functions into simpler pieces-and MATLAB's residue command does the heavy lifting for you. This section shows how to use residue to find coefficients, poles, and direct terms automatically, including tricky cases with repeated roots, plus a quick look at residuez for discrete-time systems.",
    "zh": "部分分式展开将复杂的有理函数分解成更简单的部分--MATLAB的residue命令可以自动完成这项工作。本节展示如何使用residue找到系数、极点和直接项,包括处理重根的复杂情况,还简要介绍了用于离散时间系统的residuez函数。",
    "emoji": "🔧",
    "refs": 1
  },
  "B.8-10 Solution of Quadratic and Cubic Equations": {
    "en": "L'Hôpital's Rule and polynomial solving techniques form the algebraic backbone for handling limits and equation solutions that appear throughout signals analysis. This section covers the quadratic formula, Cardano's method for cubic equations, and how to transform complex cubics into simpler depressed forms-essential tools when characteristic equations arise in system analysis.",
    "zh": "洛必达法则和多项式求解技术构成了信号分析中处理极限和方程求解的代数基础。本节涵盖二次公式、三次方程的卡尔达诺方法,以及如何将复杂三次方程转化为更简单的压低三次方程--这些是系统分析中特征方程出现时的必备工具。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.8-10": {
    "en": "L'Hôpital's Rule and polynomial solving techniques form the algebraic backbone for handling limits and equation solutions that appear throughout signals analysis. This section covers the quadratic formula, Cardano's method for cubic equations, and how to transform complex cubics into simpler depressed forms-essential tools when characteristic equations arise in system analysis.",
    "zh": "洛必达法则和多项式求解技术构成了信号分析中处理极限和方程求解的代数基础。本节涵盖二次公式、三次方程的卡尔达诺方法,以及如何将复杂三次方程转化为更简单的压低三次方程--这些是系统分析中特征方程出现时的必备工具。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.8-3 Appendix: Useful Mathematical Formulas": {
    "en": "This appendix collects the mathematical formulas you'll reach for repeatedly-from Euler's formula and complex number identities to geometric series and power sums. Having these at your fingertips saves time on exams and lets you focus on the signals and systems concepts rather than deriving basics.",
    "zh": "这个附录汇集了你会反复使用的数学公式--从欧拉公式和复数恒等式到几何级数和幂和。将这些公式放在手边可以节省考试时间,让你专注于信号与系统的概念,而不是推导基础知识。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-3": {
    "en": "This appendix collects the mathematical formulas you'll reach for repeatedly-from Euler's formula and complex number identities to geometric series and power sums. Having these at your fingertips saves time on exams and lets you focus on the signals and systems concepts rather than deriving basics.",
    "zh": "这个附录汇集了你会反复使用的数学公式--从欧拉公式和复数恒等式到几何级数和幂和。将这些公式放在手边可以节省考试时间,让你专注于信号与系统的概念,而不是推导基础知识。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-6 Appendix: Useful Mathematical Formulas": {
    "en": "This reference page collects the mathematical formulas you'll reach for constantly: Taylor and Maclaurin series for function approximation, power series expansions for exponentials and trig functions, and the trigonometric identities (including Euler's formula) that appear throughout signal analysis. Bookmark this-you'll use it on every exam.",
    "zh": "这个参考页汇集了你在信号处理中经常需要的数学公式:泰勒级数和麦克劳林级数用于函数近似,指数和三角函数的幂级数展开,以及贯穿信号分析的三角恒等式(包括欧拉公式)。收藏这一页--考试中会频繁用到。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-6": {
    "en": "This reference page collects the mathematical formulas you'll reach for constantly: Taylor and Maclaurin series for function approximation, power series expansions for exponentials and trig functions, and the trigonometric identities (including Euler's formula) that appear throughout signal analysis. Bookmark this-you'll use it on every exam.",
    "zh": "这个参考页汇集了你在信号处理中经常需要的数学公式:泰勒级数和麦克劳林级数用于函数近似,指数和三角函数的幂级数展开,以及贯穿信号分析的三角恒等式(包括欧拉公式)。收藏这一页--考试中会频繁用到。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-7 Common Derivative Formulas": {
    "en": "Derivative formulas are your computational backbone-this reference page collects all the standard rules (power, product, quotient, chain) and derivatives of polynomials, exponentials, logarithms, and trig functions in one place. Paired with essential trigonometric identities (angle addition, power reduction, product-to-sum), this section is your go-to lookup when transforming signals and solving differential equations on exams.",
    "zh": "导数公式是你的计算基础--这个参考页面汇集了所有标准法则(幂法则、乘积法则、商法则、链式法则)以及多项式、指数、对数和三角函数的导数。结合基本的三角恒等式(角度加法、幂次化简、积化和差),这一部分是你在考试中变换信号和求解微分方程时的必查手册。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-7": {
    "en": "Derivative formulas are your computational backbone-this reference page collects all the standard rules (power, product, quotient, chain) and derivatives of polynomials, exponentials, logarithms, and trig functions in one place. Paired with essential trigonometric identities (angle addition, power reduction, product-to-sum), this section is your go-to lookup when transforming signals and solving differential equations on exams.",
    "zh": "导数公式是你的计算基础--这个参考页面汇集了所有标准法则(幂法则、乘积法则、商法则、链式法则)以及多项式、指数、对数和三角函数的导数。结合基本的三角恒等式(角度加法、幂次化简、积化和差),这一部分是你在考试中变换信号和求解微分方程时的必查手册。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-8 Indefinite Integrals": {
    "en": "This reference table collects the indefinite integral formulas you'll need most often-from integration by parts to tricky products of exponentials and trig functions. Rather than deriving each one during an exam, you can verify your integration technique against these standard forms and catch errors before they propagate through your Laplace transform or Fourier analysis work.",
    "zh": "这个参考表汇总了你最常用的不定积分公式--从分部积分到指数函数与三角函数的复杂乘积。与其在考试中逐个推导,不如用这些标准形式来验证你的积分技巧,在错误传播到拉普拉斯变换或傅里叶分析之前就发现问题。",
    "emoji": "∫",
    "refs": 1
  },
  "B.8-8": {
    "en": "This reference table collects the indefinite integral formulas you'll need most often-from integration by parts to tricky products of exponentials and trig functions. Rather than deriving each one during an exam, you can verify your integration technique against these standard forms and catch errors before they propagate through your Laplace transform or Fourier analysis work.",
    "zh": "这个参考表汇总了你最常用的不定积分公式--从分部积分到指数函数与三角函数的复杂乘积。与其在考试中逐个推导,不如用这些标准形式来验证你的积分技巧,在错误传播到拉普拉斯变换或傅里叶分析之前就发现问题。",
    "emoji": "∫",
    "refs": 1
  },
  "1.4 Describing a Triangle Function with the Unit Step": {
    "en": "Piecewise signals like triangles aren't as complicated as they look-unit step functions let you write them as clean mathematical expressions. This section shows how to decompose a triangular waveform into ramps and gates, then reconstruct it using step functions, a technique that's essential for analyzing real-world signals in exams and applications.",
    "zh": "三角形波形这样的分段信号看起来很复杂,但单位阶跃函数能让你用简洁的数学表达式描述它们。本节展示如何将三角波形分解为斜坡和门脉冲,然后用阶跃函数重新组合,这是考试和实际应用中分析真实信号的关键技巧。",
    "emoji": "📐",
    "refs": 7
  },
  "B.2-2 Sinusoids in Terms of Exponentials": {
    "en": "Euler's formula reveals the hidden connection between sinusoids and complex exponentials, showing that cos(ωt) and sin(ωt) are actually the real and imaginary parts of e^(jωt). This perspective transforms how you analyze AC circuits, modulation, and frequency-domain problems-mastering this bridge is essential for understanding why engineers prefer working with complex exponentials on exams.",
    "zh": "欧拉公式揭示了正弦波与复指数之间的隐藏联系,表明 cos(ωt) 和 sin(ωt) 实际上是 e^(jωt) 的实部和虚部。这个视角改变了你分析交流电路、调制和频域问题的方式--掌握这个桥梁对于理解工程师为什么更喜欢在考试中使用复指数至关重要。",
    "emoji": "🌉",
    "refs": 1
  },
  "B.5-2 Heaviside Cover-Up Method": {
    "en": "The Heaviside cover-up method is a clever algebraic trick that lets you find partial fraction coefficients in seconds instead of solving systems of equations. When your denominator factors into distinct linear terms, this technique eliminates the tedious algebra-you literally \"cover up\" factors and substitute strategic values to extract each coefficient instantly.",
    "zh": "Heaviside覆盖法是一个巧妙的代数技巧,能让你在几秒内求出部分分式系数,而不必求解方程组。当分母分解为不同的线性因子时,这种方法消除了繁琐的代数运算--你只需\"覆盖\"某些因子并代入特定值就能立即提取每个系数。",
    "emoji": "⚡",
    "refs": 1
  },
  "B.5-4 A Combination of Heaviside and Clearing Fractions": {
    "en": "When your partial fraction expansion has repeated factors, the standard cover-up method alone falls short-you'll need to combine it with strategic differentiation and algebraic clearing. This hybrid technique lets you efficiently find all coefficients without getting bogged down in messy systems of equations, making it essential for tackling complex rational functions on exams.",
    "zh": "当部分分式展开式中出现重根时,单纯的留数法(cover-up method)已经不够用了--你需要将其与有策略的求导和代数消元相结合。这种混合技巧能让你高效地求出所有系数,避免陷入复杂的方程组,是考试中处理复杂有理函数的关键。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-5 Improper F(x) with m=n": {
    "en": "When your numerator and denominator have the same degree, you can't jump straight to partial fractions-polynomial long division comes first. This technique separates the rational function into a polynomial plus a proper fraction, which then becomes manageable for standard partial fraction decomposition. Mastering this step prevents common errors on exams where improper fractions trip up unprepared students.",
    "zh": "当分子和分母的次数相同时,不能直接进行部分分式分解,必须先进行多项式长除法。这种技巧将有理函数分解为多项式加上真分式,然后才能用标准的部分分式分解方法处理。掌握这一步骤能避免考试中许多学生在处理假分式时犯的常见错误。",
    "emoji": "➗",
    "refs": 1
  },
  "B.8 Appendix: Useful Mathematical Formulas": {
    "en": "This appendix collects the essential mathematical formulas you'll repeatedly reach for while solving signals and systems problems-trigonometric identities, derivatives, integrals, and algebraic manipulations all in one place. Having these formulas at your fingertips during problem-solving and exams saves time and reduces errors when you need to focus on the signals concepts rather than formula derivation.",
    "zh": "本附录汇集了你在解决信号与系统问题时会反复使用的基本数学公式--三角恒等式、导数规则、积分表和代数运算都集中在一处。在解题和考试中随时查阅这些公式可以节省时间,减少错误,让你能够专注于信号概念而不是公式推导。",
    "emoji": "📋",
    "refs": 1
  },
  "1.1-1 Signal Energy": {
    "en": "Signal energy measures the total power contained in a finite-duration signal by integrating the square of its amplitude over time. This metric is essential for comparing signal magnitudes and appears frequently in exam problems involving signal classification and power calculations.",
    "zh": "信号能量通过对信号幅度平方在时间上的积分来衡量有限持续时间信号中包含的总功率。这个指标对于比较信号大小和在考试中涉及信号分类及功率计算的问题中频繁出现。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.1-2 Signal Power": {
    "en": "Signal power measures how much energy a signal delivers on average over time-think of it as the steady hum of an engine rather than the total fuel burned. This concept becomes essential when dealing with infinite-duration signals where total energy would be undefined, making power the practical metric for comparing signal magnitudes on exams.",
    "zh": "信号功率衡量信号在一段时间内平均传递的能量--可以想象为引擎的稳定功率输出而非总燃料消耗。当处理无限持续时间的信号时这个概念至关重要,因为总能量会趋于无穷,因此功率成为考试中比较信号大小的实用指标。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.2 Some Useful Signal Operations": {
    "en": "Shifting, scaling, and reversal are the three fundamental moves you can perform on any signal-think of them as the basic edits in a signal's timeline. These operations show up constantly in filtering, modulation, and system analysis, making them essential tools for solving exam problems where you need to transform signals in time or amplitude.",
    "zh": "平移、缩放和反转是你可以对任何信号执行的三个基本操作--可以把它们看作信号时间轴上的基本编辑。这些操作在滤波、调制和系统分析中频繁出现,是解决需要在时间或幅度上变换信号的考试问题的必备工具。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.2-4 Combined Operations": {
    "en": "Real exam problems throw multiple operations at you simultaneously-what happens when you shift AND scale a signal, or reverse it AND then delay it? This section breaks down the correct sequence for combining transformations, because the order matters critically. Mastering these combinations is what separates confident problem-solvers from those who second-guess themselves on test day.",
    "zh": "真实考试题目往往同时应用多个操作--当你既要移位又要缩放一个信号时会发生什么?或者先反转再延迟?本节讲解组合变换的正确顺序,因为操作的先后顺序至关重要。掌握这些组合变换是区分考试中自信答题者和犹豫不决者的关键。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.3 Classification of Signals": {
    "en": "Signals come in different flavors, and knowing which type you're dealing with determines your entire analysis strategy. This section breaks down the major classifications-continuous versus discrete, periodic versus aperiodic, and energy versus power signals-so you can pick the right tools for the job on exams.",
    "zh": "信号有不同的类型,识别信号属于哪一类决定了你的整个分析策略。本节介绍主要分类--连续与离散、周期与非周期、能量与功率信号--帮助你在考试中选择正确的分析工具。",
    "emoji": "🏷️",
    "refs": 1
  },
  "1.3-1 Continuous-Time and Discrete-Time Signals": {
    "en": "Signals come in two fundamental flavors: continuous-time signals exist at every moment in time (like your heartbeat as a smooth curve), while discrete-time signals only have values at specific intervals (like your heart rate measured once per second). This distinction shapes everything about how you'll analyze and process signals on exams.",
    "zh": "信号有两种基本形式:连续时间信号在时间的每一刻都有定义(就像心跳的平滑曲线),而离散时间信号只在特定时刻有值(就像每秒测量一次心率)。这个区分决定了你在考试中如何分析和处理信号的方式。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.3-2 Analog and Digital Signals": {
    "en": "The real world speaks in analog-continuous signals that can take any value-but computers only understand digital: discrete, quantized levels. This section reveals why your smartphone converts sound waves into 1s and 0s, and what information gets lost (or preserved) in that conversion. Mastering this distinction is essential for understanding sampling, quantization, and why some signals need analog-to-digital converters.",
    "zh": "现实世界用模拟信号说话--连续信号可以取任何值--但计算机只能理解数字信号:离散的、量化的电平。本节揭示了你的智能手机如何将声波转换为1和0,以及在这个转换过程中哪些信息会丢失(或保留)。掌握这一区别对于理解采样、量化和为什么某些信号需要模数转换器至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.3-4 Energy and Power Signals": {
    "en": "Signals split into two fundamental categories: those with finite energy (like a brief pulse that eventually dies out) and those with finite power (like an endless sinusoid that keeps going forever). This classification matters because it determines which mathematical tools you'll use for analysis and which theorems apply to your problem on exams.",
    "zh": "信号分为两个基本类别:有限能量信号(如最终衰减的脉冲)和有限功率信号(如永远持续的正弦波)。这个分类很重要,因为它决定了你在分析中使用哪些数学工具,以及在考试中哪些定理适用于你的问题。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.3-5 Deterministic and Random Signals": {
    "en": "Some signals follow predictable mathematical rules you can write down exactly, while others behave unpredictably and need statistical descriptions instead. This section shows you how to tell them apart and why the tools for analyzing each type are completely different-a crucial fork in the road between deterministic and probabilistic signal analysis.",
    "zh": "有些信号遵循可以精确写下的数学规则,而其他信号则表现得不可预测,需要用统计方法来描述。本节教你如何区分这两种信号,以及为什么分析每种信号的工具完全不同--这是确定性信号分析和概率信号分析之间的关键分岔点。",
    "emoji": "🎲",
    "refs": 1
  },
  "1.4 Some Useful Signal Models": {
    "en": "Three mathematical idealizations-the unit step, impulse, and complex exponential-form the foundation for analyzing real systems. These signal models appear repeatedly in exam problems because they're both mathematically tractable and physically meaningful, making them essential tools for decomposing and understanding more complex signals.",
    "zh": "单位阶跃、冲激和复指数这三个数学理想化模型是分析实际系统的基础。这些信号模型在考试题中频繁出现,因为它们既在数学上易于处理,又具有物理意义,是分解和理解复杂信号的必备工具。",
    "emoji": "📦",
    "refs": 1
  },
  "1.4-3 The Exponential Function e^st": {
    "en": "The complex exponential e^(st) is the Swiss Army knife of signal processing-a single formula that captures DC signals, growing/decaying exponentials, and sinusoids all at once. This section shows why e^(st) is the natural input for LTI systems and how its real and imaginary parts reveal the behavior of any signal you'll encounter on exams.",
    "zh": "复指数e^(st)是信号处理中的万能工具--一个公式就能同时表示直流信号、增长/衰减指数和正弦波。本节讲解为什么e^(st)是LTI系统的自然输入,以及它的实部和虚部如何揭示考试中任何信号的行为特征。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.5 Even and Odd Functions": {
    "en": "Every signal hides a secret structure: it can always be decomposed into an even part (mirror-symmetric) and an odd part (antisymmetric). This decomposition isn't just elegant-it's a powerful tool that simplifies Fourier analysis, reduces computation, and reveals hidden symmetries in systems. Recognizing even and odd functions will save you time on exams and deepen your intuition about signal behavior.",
    "zh": "每个信号都隐藏着一个秘密结构:它总是可以分解为偶函数部分(镜像对称)和奇函数部分(反对称)。这种分解不仅优雅,而且是简化傅里叶分析、减少计算量和揭示系统隐藏对称性的强大工具。识别偶函数和奇函数将为你节省考试时间,并加深你对信号行为的直觉理解。",
    "emoji": "🪞",
    "refs": 1
  },
  "1.5-1 Some Properties of Even and Odd Functions": {
    "en": "Even and odd functions have special multiplication and integration properties that can dramatically simplify your calculations. When you multiply or integrate combinations of even and odd functions, the results follow predictable patterns-mastering these rules means you can often eliminate half the terms in Fourier analysis problems without doing the full computation.",
    "zh": "偶函数和奇函数的乘法与积分具有特殊性质,能够显著简化你的计算过程。当你将偶函数和奇函数的组合进行乘法或积分运算时,结果遵循可预测的规律--掌握这些规则意味着在傅里叶分析问题中,你往往可以跳过一半的项而无需完整计算。",
    "emoji": "⚖️",
    "refs": 1
  },
  "1.7-1 Linear and Nonlinear Systems": {
    "en": "The difference between linear and nonlinear systems determines whether you can use superposition to break complex problems into simpler pieces. Linear systems obey a fundamental rule: the response to a sum of inputs equals the sum of individual responses-this is what makes LTI analysis tractable on exams. Nonlinear systems shatter this assumption, which is why most real-world problems are either approximated as linear or require completely different solution techniques.",
    "zh": "线性系统和非线性系统的区别决定了你是否能用叠加原理将复杂问题分解成简单部分。线性系统遵循一个基本规则:对输入之和的响应等于各个响应之和--这正是LTI分析在考试中可行的原因。非线性系统打破了这一假设,这就是为什么大多数现实问题要么被近似为线性,要么需要完全不同的求解技术。",
    "emoji": "⚖️",
    "refs": 1
  },
  "1.7-3 Instantaneous and Dynamic Systems": {
    "en": "Some systems respond instantly to what you feed them right now-like a simple amplifier that just scales the input. Others have memory, storing past information to shape their current output-like a capacitor that remembers its charge. This section separates these two fundamentally different behaviors and explains why dynamic systems require differential equations while instantaneous ones don't.",
    "zh": "有些系统只对当前输入立即做出响应--就像一个简单的放大器只是缩放输入。而其他系统具有记忆性,存储过去的信息来影响当前输出--就像电容器记住其电荷一样。本节区分这两种根本不同的行为,并解释为什么动态系统需要微分方程,而瞬时系统则不需要。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-6 Analog and Digital Systems": {
    "en": "Analog systems work with continuous signals flowing through physical circuits, while digital systems chop those signals into discrete samples and process them mathematically. You'll encounter both on exams, and knowing their fundamental differences-continuous vs. discrete, hardware vs. computation-is essential for analyzing real-world applications from audio equipment to smartphones.",
    "zh": "模拟系统处理通过物理电路流动的连续信号,而数字系统将信号分割成离散样本并进行数学处理。考试中会同时出现这两种系统,理解它们的根本区别--连续与离散、硬件与计算--对分析从音频设备到智能手机等实际应用至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.1-1 A Historical Note": {
    "en": "Complex numbers were not accepted overnight-for centuries, mathematicians dismissed √(-1) as meaningless. This section traces how \"impossible\" numbers became indispensable tools for engineering and signal analysis.",
    "zh": "复数并非一开始就被接受--几个世纪里,数学家们认为 √(-1) 毫无意义。这一节追溯了这些不可能的数如何从被排斥到成为工程与信号分析不可或缺的工具。",
    "emoji": "📜",
    "refs": 1
  }
};
// ── END SECTION_PREVIEWS_NEW ──

Object.assign(SECTION_PREVIEWS_NEW, {
  "3.1 Introduction": {
    "en": "This opening section moves the course from continuous-time thinking into discrete-time signals. It sets up sequences, sample indexing, and the energy/power viewpoint you need before solving difference-equation systems.",
    "emoji": "🔢",
    "refs": 1
  },
  "3.2 Useful Signal Operations": {
    "en": "Discrete-time signals can be shifted, reversed, and scaled, but the integer index makes each operation feel different from the continuous-time case. This section trains you to track samples without losing signs, offsets, or support intervals.",
    "emoji": "↔️",
    "refs": 1
  },
  "3.3 Some Useful Discrete-Time Signal Models": {
    "en": "Impulse, step, exponential, sinusoidal, and complex-exponential sequences are the building blocks for discrete-time analysis. This section gives you the standard models that later become inputs, modes, and test signals for LTID systems.",
    "emoji": "🧱",
    "refs": 5
  },
  "3.4 Examples of Discrete-Time Systems": {
    "en": "Discrete-time systems can delay, average, accumulate, difference, or filter a sequence. This section turns those operations into input-output rules, then classifies the systems so you know which analysis tools are allowed.",
    "emoji": "⚙️",
    "refs": 1
  },
  "3.5 Discrete-Time System Equations": {
    "en": "Difference equations are the discrete-time counterpart of differential equations. This section shows how recursive rules generate outputs step by step and why initial conditions must be handled carefully.",
    "emoji": "🧮",
    "refs": 1
  },
  "3.6 System Response to Internal Conditions: The Zero-Input Response": {
    "en": "The zero-input response explains what a discrete-time system does because of stored internal conditions alone. This section focuses on characteristic roots and natural modes before any external input is applied.",
    "emoji": "🌱",
    "refs": 1
  },
  "3.7 The Unit Impulse Response h[n]": {
    "en": "The impulse response is the fingerprint of an LTID system. This section shows how one response, h[n], contains enough information to predict the output for any input through convolution.",
    "emoji": "📍",
    "refs": 1
  },
  "3.8 System Response to External Input: The Zero-State Response": {
    "en": "The zero-state response is what the input alone contributes when the system starts from rest. This section builds the convolution-sum view and connects graphical shifting, summing, and interconnected systems.",
    "emoji": "🔁",
    "refs": 3
  },
  "3.9 System Stability": {
    "en": "Stability asks whether bounded inputs and internal modes stay under control. This section compares BIBO and asymptotic stability, then links both ideas to impulse responses and characteristic roots.",
    "emoji": "⚖️",
    "refs": 3
  },
  "3.10 Intuitive Insights into System Behavior": {
    "en": "This section builds quick visual intuition for discrete-time system behavior without solving every sample. It connects modes, resonance, impulse-response width, time constants, and pulse spreading.",
    "emoji": "💡",
    "refs": 1
  },
  "3.11 MATLAB: Discrete-Time Signals and Systems": {
    "en": "This MATLAB section turns the discrete-time theory into computation. You will create stem plots, simulate filtering, write custom system functions, and verify convolution numerically.",
    "emoji": "💻",
    "refs": 4
  },
  "3.12 Appendix: Impulse Response for a Special Case": {
    "en": "This appendix handles a special impulse-response derivation that is easy to skip but useful when roots or system equations take a particular form. It gives a compact reference for a case that often appears inside longer solutions.",
    "emoji": "📎",
    "refs": 1
  },
  "3.13 Summary": {
    "en": "The summary ties together discrete-time signals, difference equations, impulse responses, convolution, and stability. Use it as a checklist for what you should be able to recognize and compute before moving to transforms.",
    "emoji": "✅",
    "refs": 1
  },
  "4.1 The Laplace Transform": {
    "en": "The Laplace transform converts time-domain signals and system equations into algebraic expressions in the s-domain. This section introduces the transform pair, inverse transform idea, and why poles start to matter.",
    "emoji": "🔭",
    "refs": 1
  },
  "4.2 Some Properties of the Laplace Transform": {
    "en": "Laplace-transform properties are the shortcuts that keep problems from becoming long integrals. This section covers shifting, differentiation, integration, scaling, and convolution rules you will use constantly.",
    "emoji": "🧰",
    "refs": 6
  },
  "4.3 Solution of Differential and Integro-Differential Equations": {
    "en": "This section uses the Laplace transform to solve system equations with initial conditions, inputs, and feedback-like terms. It separates zero-input and zero-state thinking while making stability and inverse systems algebraic.",
    "emoji": "🧩",
    "refs": 4
  },
  "4.4 Analysis of Electrical Networks: The Transformed Network": {
    "en": "Circuit elements become algebraic impedances and sources in the transformed network. This section shows how Laplace-domain circuit analysis turns differential equations into familiar network equations.",
    "emoji": "🔌",
    "refs": 1
  },
  "4.5 Block Diagrams": {
    "en": "Block diagrams make system interconnections visible. This section teaches you to read cascades, sums, feedback loops, and equivalent transfer functions without getting lost in signal-flow notation.",
    "emoji": "▣",
    "refs": 1
  },
  "4.6 System Realization": {
    "en": "A transfer function is not just a formula; it can be built as an actual system. This section develops direct, cascade, parallel, and transposed realizations so you can move between algebra and implementation.",
    "emoji": "🏗️",
    "refs": 5
  },
  "4.7 Application to Feedback and Controls": {
    "en": "Feedback changes a system's poles, stability, and transient behavior. This section applies Laplace-domain tools to a control example where closed-loop structure matters more than the individual blocks.",
    "emoji": "🎛️",
    "refs": 1
  },
  "4.8 Frequency Response of an LTIC System": {
    "en": "Frequency response explains how an LTIC system scales and shifts sinusoids in steady state. This section connects H(s) to H(jw) and prepares the bridge from transient analysis to filtering.",
    "emoji": "📡",
    "refs": 1
  },
  "4.9 Bode Plots": {
    "en": "Bode plots turn a transfer function into magnitude and phase sketches. This section teaches the pole-zero building blocks, slopes, corner frequencies, and approximations that make frequency response readable by eye.",
    "emoji": "📈",
    "refs": 5
  },
  "4.10 Filter Design by Placement of Poles and Zeros of H(s)": {
    "en": "Pole-zero placement is the design language of analog filters. This section shows how lowpass, bandpass, notch, and practical filter specifications emerge from where poles and zeros sit in the s-plane.",
    "emoji": "🎚️",
    "refs": 5
  },
  "4.11 The Bilateral Laplace Transform": {
    "en": "The bilateral Laplace transform adds the region of convergence, which is essential for distinguishing signals with the same algebraic expression. This section connects ROC, causality, and system analysis.",
    "emoji": "🌐",
    "refs": 2
  },
  "4.12 MATLAB: Continuous-Time Filters": {
    "en": "This MATLAB section makes continuous-time filter analysis concrete. You will evaluate frequency responses, design Butterworth and Chebyshev filters, and use cascaded second-order sections for cleaner implementation.",
    "emoji": "💻",
    "refs": 4
  },
  "4.13 Summary": {
    "en": "The summary consolidates Laplace transforms, transformed circuits, transfer functions, realizations, feedback, Bode plots, and filter design. Use it to check whether you can move fluently between time, s-domain, and frequency views.",
    "emoji": "✅",
    "refs": 1
  },
  "5.1 The z-Transform": {
    "en": "The z-transform is the discrete-time counterpart of the Laplace transform. This section introduces transform pairs, inverse methods, power series, and partial fractions for sequences.",
    "emoji": "🔢",
    "refs": 2
  },
  "5.2 Some Properties of the z-Transform": {
    "en": "z-transform properties are the algebraic moves behind most discrete-time system solutions. This section covers shifting, scaling, differentiation, reversal, and convolution in the z-domain.",
    "emoji": "🧰",
    "refs": 5
  },
  "5.3 z-Transform Solution of Linear Difference Equations": {
    "en": "Difference equations become algebraic equations after the z-transform. This section uses transfer functions, zero-state response, stability, and inverse systems to analyze LTID systems efficiently.",
    "emoji": "🧩",
    "refs": 3
  },
  "5.4 System Realization": {
    "en": "Discrete-time transfer functions can be implemented as recursive structures. This section turns rational H(z) expressions into realizations that expose delays, gains, and feedback paths.",
    "emoji": "🏗️",
    "refs": 1
  },
  "5.5 Frequency Response of Discrete-Time Systems": {
    "en": "Discrete-time frequency response is periodic, which makes sampling and aliasing unavoidable. This section explains H(e^jw), the repeated spectrum, and why sampling rate changes what frequencies mean.",
    "emoji": "📡",
    "refs": 2
  },
  "5.6 Frequency Response from Pole-Zero Locations": {
    "en": "Pole-zero geometry lets you estimate magnitude and phase without expanding every formula. This section shows how locations in the z-plane shape peaks, notches, bandwidth, and stability intuition.",
    "emoji": "🎯",
    "refs": 1
  },
  "5.7 Digital Processing of Analog Signals": {
    "en": "Digital processing of analog signals links the continuous world to sampled computation. This section follows the chain from sampling through discrete-time processing and back toward analog reconstruction.",
    "emoji": "🔄",
    "refs": 1
  },
  "5.8 The Bilateral z-Transform": {
    "en": "The bilateral z-transform adds the region of convergence, making causality and stability visible in the z-plane. This section uses ROC logic to distinguish sequences and analyze LTID systems.",
    "emoji": "🌐",
    "refs": 2
  },
  "5.9 Connecting the Laplace and z-Transforms": {
    "en": "This section links s-domain and z-domain thinking through sampling relationships. It explains how continuous-time poles map into discrete-time behavior and why the two transforms tell compatible stories.",
    "emoji": "🔗",
    "refs": 1
  },
  "5.10 MATLAB: Discrete-Time IIR Filters": {
    "en": "This MATLAB section turns z-domain filter theory into working IIR designs. You will inspect pole-zero plots, transform analog filters, handle bilinear warping, and use second-order sections for numerical reliability.",
    "emoji": "💻",
    "refs": 8
  },
  "5.11 Summary": {
    "en": "The summary gathers z-transforms, difference-equation solutions, realizations, frequency response, pole-zero geometry, sampling links, and IIR filter design. Use it as the checklist before moving deeper into Fourier analysis.",
    "emoji": "✅",
    "refs": 1
  }
});

const syllabusDataNew = [
  {
    chapter: 'B Background',
    sections: [
      { title: 'B.1 Complex Numbers', subsections: ['B.1-1 A Historical Note', 'B.1-2 Algebra of Complex Numbers'] },
      { title: 'B.2 Sinusoids', subsections: ['B.2-1 Addition of Sinusoids', 'B.2-2 Sinusoids in Terms of Exponentials'] },
      { title: 'B.3 Sketching Signals', subsections: ['B.3-1 Monotonic Exponentials', 'B.3-2 The Exponentially Varying Sinusoid'] },
      { title: "B.4 Cramer's Rule", subsections: [] },
      { title: 'B.5 Partial Fraction Expansion', subsections: ['B.5-1 Method of Clearing Fractions', 'B.5-2 Heaviside Cover-Up Method', 'B.5-3 Repeated Factors of Q(x)', 'B.5-4 A Combination of Heaviside and Clearing Fractions', 'B.5-5 Improper F(x) with m=n', 'B.5-6 Modified Partial Fractions'] },
      { title: 'B.6 Vectors and Matrices', subsections: ['B.6-1 Some Definitions and Properties', 'B.6-2 Matrix Algebra'] },
      { title: 'B.7 MATLAB: Elementary Operations', subsections: ['B.7-1 MATLAB Overview', 'B.7-2 Calculator Operations', 'B.7-3 Vector Operations', 'B.7-4 Simple Plotting', 'B.7-5 Element-by-Element Operations', 'B.7-6 Matrix Operations', 'B.7-7 Partial Fraction Expansions'] },
      { title: 'B.8 Appendix: Useful Mathematical Formulas', subsections: ['B.8-1 Some Useful Constants', 'B.8-2 Complex Numbers', 'B.8-3 Sums', 'B.8-4 Taylor and Maclaurin Series', 'B.8-5 Power Series', 'B.8-6 Trigonometric Identities', 'B.8-7 Common Derivative Formulas', 'B.8-8 Indefinite Integrals', "B.8-9 L'Hopital's Rule", 'B.8-10 Solution of Quadratic and Cubic Equations'] }
    ]
  },
  {
    chapter: 'Chapter 1: Signals and Systems',
    sections: [
      { title: '1.1 Size of a Signal', subsections: ['1.1-1 Signal Energy', '1.1-2 Signal Power'] },
      { title: '1.2 Some Useful Signal Operations', subsections: ['1.2-1 Time Shifting', '1.2-2 Time Scaling', '1.2-3 Time Reversal', '1.2-4 Combined Operations'] },
      { title: '1.3 Classification of Signals', subsections: ['1.3-1 Continuous-Time and Discrete-Time Signals', '1.3-2 Analog and Digital Signals', '1.3-3 Periodic and Aperiodic Signals', '1.3-4 Energy and Power Signals', '1.3-5 Deterministic and Random Signals'] },
      { title: '1.4 Some Useful Signal Models', subsections: ['1.4-1 The Unit Step Function u(t)', '1.4-2 The Unit Impulse Function δ(t)', '1.4-3 The Exponential Function e^st'] },
      { title: '1.5 Even and Odd Functions', subsections: ['1.5-1 Some Properties of Even and Odd Functions', '1.5-2 Even and Odd Components of a Signal'] },
      { title: '1.6 Systems', subsections: [] },
      { title: '1.7 Classification of Systems', subsections: ['1.7-1 Linear and Nonlinear Systems', '1.7-2 Time-Invariant and Time-Varying Systems', '1.7-3 Instantaneous and Dynamic Systems', '1.7-4 Causal and Noncausal Systems', '1.7-5 Continuous-Time and Discrete-Time Systems', '1.7-6 Analog and Digital Systems', '1.7-7 Invertible and Noninvertible Systems', '1.7-8 Stable and Unstable Systems'] },
      { title: '1.8 System Model: Input-Output Description', subsections: ['1.8-1 Electrical Systems', '1.8-2 Mechanical Systems', '1.8-3 Electromechanical Systems'] },
      { title: '1.9 Internal and External Descriptions of a System', subsections: [] },
      { title: '1.10 Internal Description: The State-Space Description', subsections: [] },
      { title: '1.11 MATLAB: Working with Functions', subsections: ['1.11-1 Anonymous Functions', '1.11-2 Relational Operators and the Unit Step Function', '1.11-3 Visualizing Operations on the Independent Variable', '1.11-4 Numerical Integration and Estimating Signal Energy'] },
      { title: '1.12 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 2: Time-Domain Analysis of Continuous-Time Systems',
    sections: [
      { title: '2.1 Introduction', subsections: [] },
      { title: '2.2 System Response to Internal Conditions: The Zero-Input Response', subsections: ['2.2-1 Some Insights into the Zero-Input Behavior of a System'] },
      { title: '2.3 The Unit Impulse Response h(t)', subsections: [] },
      { title: '2.4 System Response to External Input: The Zero-State Response', subsections: ['2.4-1 The Convolution Integral', '2.4-2 Graphical Understanding of Convolution Operation', '2.4-3 Interconnected Systems', '2.4-4 A Very Special Function for LTIC Systems: The Everlasting Exponential e^st', '2.4-5 Total Response'] },
      { title: '2.5 System Stability', subsections: ['2.5-1 External (BIBO) Stability', '2.5-2 Internal (Asymptotic) Stability', '2.5-3 Relationship Between BIBO and Asymptotic Stability'] },
      { title: '2.6 Intuitive Insights into System Behavior', subsections: ['2.6-1 Dependence of System Behavior on Characteristic Modes', '2.6-2 Response Time of a System: The System Time Constant', '2.6-3 Time Constant and Rise Time of a System', '2.6-4 Time Constant and Filtering', '2.6-5 Time Constant and Pulse Dispersion (Spreading)', '2.6-6 Time Constant and Rate of Information Transmission', '2.6-7 The Resonance Phenomenon'] },
      { title: '2.7 MATLAB: M-Files', subsections: ['2.7-1 Script M-Files', '2.7-2 Function M-Files', '2.7-3 For-Loops', '2.7-4 Graphical Understanding of Convolution'] },
      { title: '2.8 Appendix: Determining the Impulse Response', subsections: [] },
      { title: '2.9 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 3: Time-Domain Analysis of Discrete-Time Systems',
    sections: [
      { title: '3.1 Introduction', subsections: ['3.1-1 Size of a Discrete-Time Signal'] },
      { title: '3.2 Useful Signal Operations', subsections: [] },
      { title: '3.3 Some Useful Discrete-Time Signal Models', subsections: ['3.3-1 Discrete-Time Impulse Function delta[n]', '3.3-2 Discrete-Time Unit Step Function u[n]', '3.3-3 Discrete-Time Exponential gamma^n', '3.3-4 Discrete-Time Sinusoid cos(Omega n + theta)', '3.3-5 Discrete-Time Complex Exponential e^(j Omega n)'] },
      { title: '3.4 Examples of Discrete-Time Systems', subsections: ['3.4-1 Classification of Discrete-Time Systems'] },
      { title: '3.5 Discrete-Time System Equations', subsections: ['3.5-1 Recursive (Iterative) Solution of Difference Equation'] },
      { title: '3.6 System Response to Internal Conditions: The Zero-Input Response', subsections: [] },
      { title: '3.7 The Unit Impulse Response h[n]', subsections: ['3.7-1 The Closed-Form Solution of h[n]'] },
      { title: '3.8 System Response to External Input: The Zero-State Response', subsections: ['3.8-1 Graphical Procedure for the Convolution Sum', '3.8-2 Interconnected Systems', '3.8-3 Total Response'] },
      { title: '3.9 System Stability', subsections: ['3.9-1 External (BIBO) Stability', '3.9-2 Internal (Asymptotic) Stability', '3.9-3 Relationship Between BIBO and Asymptotic Stability'] },
      { title: '3.10 Intuitive Insights into System Behavior', subsections: [] },
      { title: '3.11 MATLAB: Discrete-Time Signals and Systems', subsections: ['3.11-1 Discrete-Time Functions and Stem Plots', '3.11-2 System Responses Through Filtering', '3.11-3 A Custom Filter Function', '3.11-4 Discrete-Time Convolution'] },
      { title: '3.12 Appendix: Impulse Response for a Special Case', subsections: [] },
      { title: '3.13 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 4: Continuous-Time System Analysis Using the Laplace Transform',
    sections: [
      { title: '4.1 The Laplace Transform', subsections: ['4.1-1 Finding the Inverse Transform'] },
      { title: '4.2 Some Properties of the Laplace Transform', subsections: ['4.2-1 Time Shifting', '4.2-2 Frequency Shifting', '4.2-3 The Time-Differentiation Property', '4.2-4 The Time-Integration Property', '4.2-5 The Scaling Property', '4.2-6 Time Convolution and Frequency Convolution'] },
      { title: '4.3 Solution of Differential and Integro-Differential Equations', subsections: ['4.3-1 Comments on Initial Conditions at 0- and at 0+', '4.3-2 Zero-State Response', '4.3-3 Stability', '4.3-4 Inverse Systems'] },
      { title: '4.4 Analysis of Electrical Networks: The Transformed Network', subsections: ['4.4-1 Analysis of Active Circuits'] },
      { title: '4.5 Block Diagrams', subsections: [] },
      { title: '4.6 System Realization', subsections: ['4.6-1 Direct Form I Realization', '4.6-2 Direct Form II Realization', '4.6-3 Cascade and Parallel Realizations', '4.6-4 Transposed Realization', '4.6-5 Using Operational Amplifiers for System Realization'] },
      { title: '4.7 Application to Feedback and Controls', subsections: ['4.7-1 Analysis of a Simple Control System'] },
      { title: '4.8 Frequency Response of an LTIC System', subsections: ['4.8-1 Steady-State Response to Causal Sinusoidal Inputs'] },
      { title: '4.9 Bode Plots', subsections: ['4.9-1 Constant Ka1 a2 / b1 b3', '4.9-2 Pole (or Zero) at the Origin', '4.9-3 First-Order Pole (or Zero)', '4.9-4 Second-Order Pole (or Zero)', '4.9-5 The Transfer Function from the Frequency Response'] },
      { title: '4.10 Filter Design by Placement of Poles and Zeros of H(s)', subsections: ['4.10-1 Dependence of Frequency Response on Poles and Zeros of H(s)', '4.10-2 Lowpass Filters', '4.10-3 Bandpass Filters', '4.10-4 Notch (Bandstop) Filters', '4.10-5 Practical Filters and Their Specifications'] },
      { title: '4.11 The Bilateral Laplace Transform', subsections: ['4.11-1 Properties of the Bilateral Laplace Transform', '4.11-2 Using the Bilateral Transform for Linear System Analysis'] },
      { title: '4.12 MATLAB: Continuous-Time Filters', subsections: ['4.12-1 Frequency Response and Polynomial Evaluation', '4.12-2 Butterworth Filters and the Find Command', '4.12-3 Using Cascaded Second-Order Sections for Butterworth Filter Realization', '4.12-4 Chebyshev Filters'] },
      { title: '4.13 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 5: Discrete-Time System Analysis Using the z-Transform',
    sections: [
      { title: '5.1 The z-Transform', subsections: ['5.1-1 Inverse Transform by Partial Fraction Expansion and Tables', '5.1-2 Inverse z-Transform by Power Series Expansion'] },
      { title: '5.2 Some Properties of the z-Transform', subsections: ['5.2-1 Time-Shifting Properties', '5.2-2 z-Domain Scaling Property (Multiplication by gamma^n)', '5.2-3 z-Domain Differentiation Property (Multiplication by n)', '5.2-4 Time-Reversal Property', '5.2-5 Convolution Property'] },
      { title: '5.3 z-Transform Solution of Linear Difference Equations', subsections: ['5.3-1 Zero-State Response of LTID Systems: The Transfer Function', '5.3-2 Stability', '5.3-3 Inverse Systems'] },
      { title: '5.4 System Realization', subsections: [] },
      { title: '5.5 Frequency Response of Discrete-Time Systems', subsections: ['5.5-1 The Periodic Nature of Frequency Response', '5.5-2 Aliasing and Sampling Rate'] },
      { title: '5.6 Frequency Response from Pole-Zero Locations', subsections: [] },
      { title: '5.7 Digital Processing of Analog Signals', subsections: [] },
      { title: '5.8 The Bilateral z-Transform', subsections: ['5.8-1 Properties of the Bilateral z-Transform', '5.8-2 Using the Bilateral z-Transform for Analysis of LTID Systems'] },
      { title: '5.9 Connecting the Laplace and z-Transforms', subsections: [] },
      { title: '5.10 MATLAB: Discrete-Time IIR Filters', subsections: ['5.10-1 Frequency Response and Pole-Zero Plots', '5.10-2 Transformation Basics', '5.10-3 Transformation by First-Order Backward Difference', '5.10-4 Bilinear Transformation', '5.10-5 Bilinear Transformation with Prewarping', '5.10-6 Example: Butterworth Filter Transformation', '5.10-7 Problems Finding Polynomial Roots', '5.10-8 Using Cascaded Second-Order Sections to Improve Design'] },
      { title: '5.11 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 6: Continuous-Time Signal Analysis: The Fourier Series',
    sections: [
      { title: '6.1 Periodic Signal Representation by Trigonometric Fourier Series', subsections: ['6.1-1 The Fourier Spectrum', '6.1-2 The Effect of Symmetry', '6.1-3 Determining the Fundamental Frequency and Period'] },
      { title: '6.2 Existence and Convergence of the Fourier Series', subsections: ['6.2-1 Convergence of a Series', '6.2-2 The Role of Amplitude and Phase Spectra in Waveshaping'] },
      { title: '6.3 Exponential Fourier Series', subsections: ['6.3-1 Exponential Fourier Spectra', "6.3-2 Parseval's Theorem", '6.3-3 Properties of the Fourier Series'] },
      { title: '6.4 LTIC System Response to Periodic Inputs', subsections: [] },
      { title: '6.5 Generalized Fourier Series: Signals as Vectors', subsections: ['6.5-1 Component of a Vector', '6.5-2 Signal Comparison and Component of a Signal', '6.5-3 Extension to Complex Signals', '6.5-4 Signal Representation by an Orthogonal Signal Set'] },
      { title: '6.6 Numerical Computation of Dn', subsections: [] },
      { title: '6.7 MATLAB: Fourier Series Applications', subsections: ['6.7-1 Periodic Functions and the Gibbs Phenomenon', '6.7-2 Optimization and Phase Spectra'] },
      { title: '6.8 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 7: Continuous-Time Signal Analysis: The Fourier Transform',
    sections: [
      { title: '7.1 Aperiodic Signal Representation by the Fourier Integral', subsections: ['7.1-1 Physical Appreciation of the Fourier Transform'] },
      { title: '7.2 Transforms of Some Useful Functions', subsections: ['7.2-1 Connection Between the Fourier and Laplace Transforms'] },
      { title: '7.3 Some Properties of the Fourier Transform', subsections: [] },
      { title: '7.4 Signal Transmission Through LTIC Systems', subsections: ['7.4-1 Signal Distortion During Transmission', '7.4-2 Bandpass Systems and Group Delay'] },
      { title: '7.5 Ideal and Practical Filters', subsections: [] },
      { title: '7.6 Signal Energy', subsections: [] },
      { title: '7.7 Application to Communications: Amplitude Modulation', subsections: ['7.7-1 Double-Sideband, Suppressed-Carrier (DSB-SC) Modulation', '7.7-2 Amplitude Modulation (AM)', '7.7-3 Single-Sideband Modulation (SSB)', '7.7-4 Frequency-Division Multiplexing'] },
      { title: '7.8 Data Truncation: Window Functions', subsections: ['7.8-1 Using Windows in Filter Design'] },
      { title: '7.9 MATLAB: Fourier Transform Topics', subsections: ['7.9-1 The Sinc Function and the Scaling Property', "7.9-2 Parseval's Theorem and Essential Bandwidth", '7.9-3 Spectral Sampling', '7.9-4 Kaiser Window Functions'] },
      { title: '7.10 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 8: Sampling: The Bridge from Continuous to Discrete',
    sections: [
      { title: '8.1 The Sampling Theorem', subsections: ['8.1-1 Practical Sampling'] },
      { title: '8.2 Signal Reconstruction', subsections: ['8.2-1 Practical Difficulties in Signal Reconstruction', '8.2-2 Some Applications of the Sampling Theorem'] },
      { title: '8.3 Analog-to-Digital (A/D) Conversion', subsections: [] },
      { title: '8.4 Dual of Time Sampling: Spectral Sampling', subsections: [] },
      { title: '8.5 Numerical Computation of the Fourier Transform: The Discrete Fourier Transform', subsections: ['8.5-1 Some Properties of the DFT', '8.5-2 Some Applications of the DFT'] },
      { title: '8.6 The Fast Fourier Transform (FFT)', subsections: [] },
      { title: '8.7 MATLAB: The Discrete Fourier Transform', subsections: ['8.7-1 Computing the Discrete Fourier Transform', '8.7-2 Improving the Picture with Zero Padding', '8.7-3 Quantization'] },
      { title: '8.8 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 9: Fourier Analysis of Discrete-Time Signals',
    sections: [
      { title: '9.1 Discrete-Time Fourier Series (DTFS)', subsections: ['9.1-1 Periodic Signal Representation by Discrete-Time Fourier Series', '9.1-2 Fourier Spectra of a Periodic Signal x[n]'] },
      { title: '9.2 Aperiodic Signal Representation by Fourier Integral', subsections: ['9.2-1 Nature of Fourier Spectra', '9.2-2 Connection Between the DTFT and the z-Transform'] },
      { title: '9.3 Properties of the DTFT', subsections: [] },
      { title: '9.4 LTI Discrete-Time System Analysis by DTFT', subsections: ['9.4-1 Distortionless Transmission', '9.4-2 Ideal and Practical Filters'] },
      { title: '9.5 DTFT Connection with the CTFT', subsections: ['9.5-1 Use of DFT and FFT for Numerical Computation of the DTFT'] },
      { title: '9.6 Generalization of the DTFT to the z-Transform', subsections: [] },
      { title: '9.7 MATLAB: Working with the DTFS and the DTFT', subsections: ['9.7-1 Computing the Discrete-Time Fourier Series', '9.7-2 Measuring Code Performance', '9.7-3 FIR Filter Design by Frequency Sampling'] },
      { title: '9.8 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 10: State-Space Analysis',
    sections: [
      { title: '10.1 Mathematical Preliminaries', subsections: ['10.1-1 Derivatives and Integrals of a Matrix', '10.1-2 The Characteristic Equation of a Matrix: The Cayley-Hamilton Theorem', '10.1-3 Computation of an Exponential and a Power of a Matrix'] },
      { title: '10.2 Introduction to State Space', subsections: [] },
      { title: '10.3 A Systematic Procedure to Determine State Equations', subsections: ['10.3-1 Electrical Circuits', '10.3-2 State Equations from a Transfer Function'] },
      { title: '10.4 Solution of State Equations', subsections: ['10.4-1 Laplace Transform Solution of State Equations', '10.4-2 Time-Domain Solution of State Equations'] },
      { title: '10.5 Linear Transformation of a State Vector', subsections: ['10.5-1 Diagonalization of Matrix A'] },
      { title: '10.6 Controllability and Observability', subsections: ['10.6-1 Inadequacy of the Transfer Function Description of a System'] },
      { title: '10.7 State-Space Analysis of Discrete-Time Systems', subsections: ['10.7-1 Solution in State Space', '10.7-2 The z-Transform Solution'] },
      { title: '10.8 MATLAB: Toolboxes and State-Space Analysis', subsections: ['10.8-1 z-Transform Solutions to Discrete-Time, State-Space Systems', '10.8-2 Transfer Functions from State-Space Representations', '10.8-3 Controllability and Observability of Discrete-Time Systems', '10.8-4 Matrix Exponentiation and the Matrix Exponential'] },
      { title: '10.9 Summary', subsections: [] }
    ]
  }
];

const syllabusData = syllabusDataNew;
