// Static data: course tracker statuses, grade rules, lecture schedule.
// Loaded as a classic <script> before app.js. Pure data, no closures.
// Extracted in Phase 1 #2 of the refactor plan.
// HOMEWORK_STATUSES removed in Phase 2 #13 with the Homework subsystem.

const COURSE_TRACKER_STATUSES = ['Not started', 'In progress', 'Done', 'Review'];

const COURSE_GRADE_RULES = [
  { label: 'Homework', detail: '10 HWs', weight: 20 },
  { label: 'Midterm 1', detail: '10/21', weight: 20 },
  { label: 'Midterm 2', detail: '11/18', weight: 20 },
  { label: 'Final', detail: 'Date TBA', weight: 40 }
];

const COURSE_SCHEDULE = [
  { id: 'lecture-1', date: '9/2', lecture: 'Lecture #1', topic: 'Math background: complex numbers, sinusoids', sections: 'B1-B2' },
  { id: 'lecture-2', date: '9/4', lecture: 'Lecture #2', topic: 'Signal energy, power; signal classifications; basic signal operations', sections: '1.1, 1.2, 1.3' },
  { id: 'lecture-3', date: '9/9', lecture: 'Lecture #3', topic: 'Useful signals; even and odd signals', sections: '1.4, 1.5' },
  { id: 'lecture-4', date: '9/11', lecture: 'Lecture #4', topic: 'Systems classifications', sections: '1.7' },
  { id: 'lecture-5', date: '9/16', lecture: 'Lecture #5', topic: 'Convolution and its properties', sections: '2.4.1' },
  { id: 'lecture-6', date: '9/18', lecture: 'Lecture #6', topic: 'Computing convolution: analytical and graphical methods', sections: '2.4-1, 2.4-2' },
  { id: 'lecture-7', date: '9/23', lecture: 'Lecture #7', topic: 'Responses of an LTI system, initial conditions, unit impulse response, zero-state response', sections: '2.1, 2.2, 2.3, 2.4' },
  { id: 'lecture-8', date: '9/25', lecture: 'Lecture #8', topic: 'Signal approximation by orthogonal signal set; trigonometric Fourier series; compact form', sections: '3.3.1, 3.3.2, 3.8, 3.4' },
  { id: 'lecture-9', date: '9/30', lecture: 'Lecture #9', topic: 'Existence conditions, determining fundamental frequency, exponential Fourier series', sections: '3.4, 3.5' },
  { id: 'lecture-10', date: '10/2', lecture: 'Lecture #10', topic: 'Relationship among different forms; properties of Fourier series', sections: 'Fourier series forms' },
  { id: 'lecture-11', date: '10/7', lecture: 'Lecture #11', topic: "Properties of Fourier series (cont'd)", sections: 'Fourier series properties' },
  { id: 'lecture-12', date: '10/9', lecture: 'Lecture #12', topic: 'Fourier transform and inverse; useful Fourier transforms', sections: '4.1, 4.2' },
  { id: 'lecture-13', date: '10/14', lecture: 'Lecture #13', topic: 'Problem session part 1; properties of Fourier transform', sections: '4.3' },
  { id: 'lecture-14', date: '10/16', lecture: 'Lecture #14', topic: 'Problem session part 2; application to communications', sections: '4.7' },
  { id: 'lecture-15', date: '10/21', lecture: 'Lecture #15', topic: 'Midterm 1', sections: 'Exam', milestone: 'Midterm 1' },
  { id: 'lecture-16', date: '10/23', lecture: 'Lecture #16', topic: 'Properties of Fourier transform', sections: '4.3' },
  { id: 'lecture-17', date: '10/28', lecture: 'Lecture #17', topic: 'Frequency response of an LTI system, ideal filters, Paley-Wiener criterion', sections: '4.4, 4.5, 3.7' },
  { id: 'lecture-18', date: '10/30', lecture: 'Lecture #18', topic: 'Fourier transform of periodic signals, LTI responses to periodic signals, Nyquist sampling theorem', sections: '4.6, 5.1' },
  { id: 'lecture-19', date: '11/6', lecture: 'Lecture #19', topic: 'Interpolation formula, aliasing and anti-aliasing filter, Laplace transform', sections: '5.1, 5.1-1, 5.1-2, 6.1' },
  { id: 'lecture-20', date: '11/11', lecture: 'Lecture #20', topic: 'Properties of Laplace transform', sections: '6.2, 6.4-2' },
  { id: 'lecture-21', date: '11/13', lecture: 'Lecture #21', topic: 'Inverse Laplace transform; calculating system response using Laplace transform', sections: '6.1-3, 6.3' },
  { id: 'lecture-22', date: '11/18', lecture: 'Lecture #22', topic: 'Midterm 2', sections: 'Exam', milestone: 'Midterm 2' },
  { id: 'lecture-23', date: '11/20', lecture: 'Lecture #23', topic: 'Calculating impulse response, asymptotic stability, BIBO stability', sections: '6.3-1, 2.6, 2.6-1' },
  { id: 'lecture-24', date: '11/25', lecture: 'Lecture #24', topic: 'Block diagrams; state-space representations', sections: '6.5, 6.6, 6.6-1, 6.6-2, 13.1, 13.2, 13.3' },
  { id: 'lecture-25', date: '12/2', lecture: 'Lecture #25', topic: 'State equations from transfer function; frequency response and zero-pole locations', sections: '7.1, 7.1-1, 7.4' },
  { id: 'lecture-26', date: '12/4', lecture: 'Lecture #26', topic: 'Review session', sections: 'Review', milestone: 'Review' }
];
