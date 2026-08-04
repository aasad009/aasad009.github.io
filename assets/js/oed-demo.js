(() => {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const PRESETS = {
    poor: [1.0, 1.1, 1.2],
    well: [-1.0, 0.0, 1.0],
    moderate: [-2.0, -1.7, -0.7],
  };
  const TRUE_PARAMS = [2, -3, 5];
  const X_MIN = -2;
  const X_MAX = 3;

  function clamp(value, low, high) {
    return Math.min(high, Math.max(low, value));
  }

  function formatNumber(value, digits = 2) {
    if (!Number.isFinite(value)) return "∞";
    const abs = Math.abs(value);
    if ((abs > 0 && abs < 0.01) || abs >= 10000) return value.toExponential(2);
    return value.toFixed(digits);
  }

  function determinant3(matrix) {
    const [a, b, c] = matrix[0];
    const [d, e, f] = matrix[1];
    const [g, h, i] = matrix[2];
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  }

  function solve3(matrix, rhs) {
    const augmented = matrix.map((row, index) => [...row, rhs[index]]);

    for (let column = 0; column < 3; column += 1) {
      let pivot = column;
      for (let row = column + 1; row < 3; row += 1) {
        if (Math.abs(augmented[row][column]) > Math.abs(augmented[pivot][column])) pivot = row;
      }
      if (Math.abs(augmented[pivot][column]) < 1e-11) return null;
      [augmented[column], augmented[pivot]] = [augmented[pivot], augmented[column]];

      const divisor = augmented[column][column];
      for (let j = column; j < 4; j += 1) augmented[column][j] /= divisor;

      for (let row = 0; row < 3; row += 1) {
        if (row === column) continue;
        const factor = augmented[row][column];
        for (let j = column; j < 4; j += 1) augmented[row][j] -= factor * augmented[column][j];
      }
    }

    return augmented.map((row) => row[3]);
  }

  function symmetricEigenvalues3(input) {
    const a = input.map((row) => row.slice());
    for (let iteration = 0; iteration < 40; iteration += 1) {
      let p = 0;
      let q = 1;
      let largest = Math.abs(a[0][1]);
      for (const [i, j] of [[0, 2], [1, 2]]) {
        const candidate = Math.abs(a[i][j]);
        if (candidate > largest) {
          largest = candidate;
          p = i;
          q = j;
        }
      }
      if (largest < 1e-12) break;

      const phi = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
      const cosine = Math.cos(phi);
      const sine = Math.sin(phi);
      const app = cosine * cosine * a[p][p] - 2 * sine * cosine * a[p][q] + sine * sine * a[q][q];
      const aqq = sine * sine * a[p][p] + 2 * sine * cosine * a[p][q] + cosine * cosine * a[q][q];

      for (let r = 0; r < 3; r += 1) {
        if (r === p || r === q) continue;
        const arp = a[r][p];
        const arq = a[r][q];
        a[r][p] = a[p][r] = cosine * arp - sine * arq;
        a[r][q] = a[q][r] = sine * arp + cosine * arq;
      }
      a[p][p] = app;
      a[q][q] = aqq;
      a[p][q] = a[q][p] = 0;
    }
    return [a[0][0], a[1][1], a[2][2]].sort((x, y) => x - y);
  }

  function normalEquations(design, observations) {
    const jtJ = Array.from({ length: 3 }, () => Array(3).fill(0));
    const jtY = Array(3).fill(0);
    design.forEach((row, index) => {
      for (let i = 0; i < 3; i += 1) {
        jtY[i] += row[i] * observations[index];
        for (let j = 0; j < 3; j += 1) jtJ[i][j] += row[i] * row[j];
      }
    });
    return { jtJ, jtY };
  }

  function createSvgElement(name, attributes = {}) {
    const element = document.createElementNS(SVG_NS, name);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
    return element;
  }

  function mulberry32(seed) {
    return function random() {
      let t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function gaussianTriplet(seed) {
    const random = mulberry32(seed);
    const values = [];
    while (values.length < 3) {
      const u1 = Math.max(random(), 1e-9);
      const u2 = random();
      const radius = Math.sqrt(-2 * Math.log(u1));
      values.push(radius * Math.cos(2 * Math.PI * u2));
      if (values.length < 3) values.push(radius * Math.sin(2 * Math.PI * u2));
    }
    return values;
  }

  function initDemo(root, index) {
    const xInputs = [...root.querySelectorAll("[data-oed-x]")];
    const xOutputs = [...root.querySelectorAll("[data-oed-x-output]")];
    const noiseInput = root.querySelector("[data-oed-noise]");
    const noiseOutput = root.querySelector("[data-oed-noise-output]");
    const chart = root.querySelector("[data-oed-chart]");
    const status = root.querySelector("[data-oed-status]");
    const matrix = root.querySelector("[data-oed-matrix]");
    const conditionOutput = root.querySelector("[data-oed-condition]");
    const determinantOutput = root.querySelector("[data-oed-determinant]");
    const errorOutput = root.querySelector("[data-oed-error]");
    const parameterOutputs = {
      a: root.querySelector('[data-oed-param="a"]'),
      b: root.querySelector('[data-oed-param="b"]'),
      c: root.querySelector('[data-oed-param="c"]'),
    };

    let seed = 1197 + index * 97;
    let standardNoise = gaussianTriplet(seed);

    function setPreset(name) {
      const values = PRESETS[name];
      if (!values) return;
      xInputs.forEach((input, i) => { input.value = String(values[i]); });
      root.querySelectorAll("[data-oed-preset]").forEach((button) => {
        button.classList.toggle("is-active", button.dataset.oedPreset === name);
      });
      render();
    }

    function clearPresetState() {
      root.querySelectorAll("[data-oed-preset]").forEach((button) => button.classList.remove("is-active"));
    }

    function renderMatrix(design) {
      matrix.replaceChildren();
      const bracketLeft = document.createElement("span");
      bracketLeft.className = "oed-matrix-bracket";
      bracketLeft.textContent = "[";
      const rows = document.createElement("span");
      rows.className = "oed-matrix-rows";
      design.forEach((row) => {
        const rowElement = document.createElement("span");
        rowElement.className = "oed-matrix-row";
        row.forEach((value) => {
          const cell = document.createElement("span");
          cell.textContent = formatNumber(value, 2);
          rowElement.appendChild(cell);
        });
        rows.appendChild(rowElement);
      });
      const bracketRight = document.createElement("span");
      bracketRight.className = "oed-matrix-bracket";
      bracketRight.textContent = "]";
      matrix.append(bracketLeft, rows, bracketRight);
    }

    function drawChart(xValues, observations, estimated) {
      chart.replaceChildren();
      const width = 760;
      const height = 430;
      const margin = { left: 62, right: 24, top: 30, bottom: 54 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const samples = 180;
      const trueSeries = [];
      const fitSeries = [];
      for (let i = 0; i <= samples; i += 1) {
        const x = X_MIN + (X_MAX - X_MIN) * i / samples;
        trueSeries.push([x, TRUE_PARAMS[0] * x * x + TRUE_PARAMS[1] * x + TRUE_PARAMS[2]]);
        fitSeries.push([x, estimated[0] * x * x + estimated[1] * x + estimated[2]]);
      }

      const allY = [...trueSeries.map((d) => d[1]), ...fitSeries.map((d) => d[1]), ...observations];
      let yMin = Math.min(...allY);
      let yMax = Math.max(...allY);
      if (!Number.isFinite(yMin) || !Number.isFinite(yMax)) { yMin = -20; yMax = 40; }
      const span = Math.max(12, yMax - yMin);
      yMin -= span * 0.12;
      yMax += span * 0.12;
      yMin = clamp(yMin, -120, 80);
      yMax = clamp(yMax, -40, 120);
      if (yMax - yMin < 12) yMax = yMin + 12;

      const xScale = (x) => margin.left + (x - X_MIN) / (X_MAX - X_MIN) * innerWidth;
      const yScale = (y) => margin.top + (yMax - y) / (yMax - yMin) * innerHeight;

      const defs = createSvgElement("defs");
      const clip = createSvgElement("clipPath", { id: `oed-chart-clip-${index}` });
      clip.appendChild(createSvgElement("rect", { x: margin.left, y: margin.top, width: innerWidth, height: innerHeight, rx: 10 }));
      defs.appendChild(clip);
      chart.appendChild(defs);

      const background = createSvgElement("rect", { x: margin.left, y: margin.top, width: innerWidth, height: innerHeight, rx: 12, class: "oed-chart-background" });
      chart.appendChild(background);

      for (let tick = -2; tick <= 3; tick += 1) {
        const x = xScale(tick);
        chart.appendChild(createSvgElement("line", { x1: x, y1: margin.top, x2: x, y2: margin.top + innerHeight, class: "oed-chart-grid" }));
        const label = createSvgElement("text", { x, y: height - 20, class: "oed-chart-tick", "text-anchor": "middle" });
        label.textContent = String(tick);
        chart.appendChild(label);
      }

      const yTicks = 5;
      for (let i = 0; i <= yTicks; i += 1) {
        const value = yMin + (yMax - yMin) * i / yTicks;
        const y = yScale(value);
        chart.appendChild(createSvgElement("line", { x1: margin.left, y1: y, x2: margin.left + innerWidth, y2: y, class: "oed-chart-grid" }));
        const label = createSvgElement("text", { x: margin.left - 12, y: y + 4, class: "oed-chart-tick", "text-anchor": "end" });
        label.textContent = formatNumber(value, 0);
        chart.appendChild(label);
      }

      chart.appendChild(createSvgElement("line", { x1: margin.left, y1: margin.top + innerHeight, x2: margin.left + innerWidth, y2: margin.top + innerHeight, class: "oed-chart-axis" }));
      chart.appendChild(createSvgElement("line", { x1: margin.left, y1: margin.top, x2: margin.left, y2: margin.top + innerHeight, class: "oed-chart-axis" }));

      const xLabel = createSvgElement("text", { x: margin.left + innerWidth / 2, y: height - 3, class: "oed-chart-axis-label", "text-anchor": "middle" });
      xLabel.textContent = "x";
      chart.appendChild(xLabel);
      const yLabel = createSvgElement("text", { x: 17, y: margin.top + innerHeight / 2, class: "oed-chart-axis-label", "text-anchor": "middle", transform: `rotate(-90 17 ${margin.top + innerHeight / 2})` });
      yLabel.textContent = "y";
      chart.appendChild(yLabel);

      const group = createSvgElement("g", { "clip-path": `url(#oed-chart-clip-${index})` });
      function pathFor(series) {
        return series.map(([x, y], i) => `${i === 0 ? "M" : "L"}${xScale(x).toFixed(2)},${yScale(y).toFixed(2)}`).join(" ");
      }
      group.appendChild(createSvgElement("path", { d: pathFor(trueSeries), class: "oed-chart-true" }));
      group.appendChild(createSvgElement("path", { d: pathFor(fitSeries), class: "oed-chart-fit" }));

      xValues.forEach((x, i) => {
        const cx = xScale(x);
        const cy = yScale(observations[i]);
        group.appendChild(createSvgElement("line", { x1: cx, y1: yScale(TRUE_PARAMS[0] * x * x + TRUE_PARAMS[1] * x + TRUE_PARAMS[2]), x2: cx, y2: cy, class: "oed-chart-residual" }));
        group.appendChild(createSvgElement("circle", { cx, cy, r: 8, class: "oed-chart-point" }));
      });
      chart.appendChild(group);
    }

    function render() {
      const xValues = xInputs.map((input) => Number(input.value));
      const noiseStd = Number(noiseInput.value);
      xOutputs.forEach((output, i) => { output.value = formatNumber(xValues[i], 2); output.textContent = formatNumber(xValues[i], 2); });
      noiseOutput.value = formatNumber(noiseStd, 2);
      noiseOutput.textContent = formatNumber(noiseStd, 2);

      const design = xValues.map((x) => [x * x, x, 1]);
      const trueY = xValues.map((x) => TRUE_PARAMS[0] * x * x + TRUE_PARAMS[1] * x + TRUE_PARAMS[2]);
      const observations = trueY.map((value, i) => value + noiseStd * standardNoise[i]);
      const { jtJ, jtY } = normalEquations(design, observations);
      const estimated = solve3(jtJ, jtY) || [NaN, NaN, NaN];
      const eigenvalues = symmetricEigenvalues3(jtJ).map((value) => Math.max(0, value));
      const minEigenvalue = eigenvalues[0];
      const maxEigenvalue = eigenvalues[2];
      const sqrtCondition = minEigenvalue > 1e-12 ? Math.sqrt(maxEigenvalue / minEigenvalue) : Infinity;
      const sqrtDeterminant = Math.sqrt(Math.max(0, determinant3(jtJ)));
      const error = Math.sqrt(estimated.reduce((sum, value, i) => sum + (value - TRUE_PARAMS[i]) ** 2, 0));

      conditionOutput.textContent = formatNumber(sqrtCondition, 2);
      determinantOutput.textContent = formatNumber(sqrtDeterminant, 2);
      errorOutput.textContent = formatNumber(error, 2);
      parameterOutputs.a.textContent = formatNumber(estimated[0], 3);
      parameterOutputs.b.textContent = formatNumber(estimated[1], 3);
      parameterOutputs.c.textContent = formatNumber(estimated[2], 3);

      let state = "poor";
      if (sqrtCondition < 10) state = "good";
      else if (sqrtCondition < 250) state = "moderate";
      status.dataset.state = state;
      status.textContent = root.dataset[`status${state[0].toUpperCase()}${state.slice(1)}`] || state;

      renderMatrix(design);
      drawChart(xValues, observations, estimated);
    }

    root.querySelectorAll("[data-oed-preset]").forEach((button) => {
      button.addEventListener("click", () => setPreset(button.dataset.oedPreset));
    });
    xInputs.forEach((input) => input.addEventListener("input", () => { clearPresetState(); render(); }));
    noiseInput.addEventListener("input", render);
    root.querySelector("[data-oed-regenerate]").addEventListener("click", () => {
      seed += 1;
      standardNoise = gaussianTriplet(seed);
      render();
    });

    setPreset("well");
  }

  document.querySelectorAll("[data-oed-demo]").forEach(initDemo);
})();
