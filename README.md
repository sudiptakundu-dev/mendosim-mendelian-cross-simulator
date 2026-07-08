<div align="center">

# 🧬 MendoSim

### A High-Performance Monte Carlo Mendelian Cross Simulator

</div>

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-Data%20Viz-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)

</div>

<p align="center">
MendoSim is an interactive genetics simulator that models Mendelian inheritance — from <b>Monohybrid</b> to <b>Tetrahybrid</b> crosses — using a custom-built <b>Monte Carlo simulation engine</b>. Instead of computing theoretical ratios directly, it simulates thousands of individual gamete segregation and fertilization events, letting genotype and phenotype ratios emerge naturally from randomness, just like they do in nature.
</p>

<div align="center">

### 🚀 [**Launch Live Demo**](https://sudiptakundu-dev.github.io/mendosim-mendelian-cross-simulator/) 🚀

</div>

---

## 🎬 Demo

<!-- Place demo.gif here — a short screen recording showing a cross being configured, simulated, and the resulting charts/tables appearing -->
<div align="center">
  <img src="./assets/demo.gif" alt="MendoSim Demo" width="850">
</div>

---

## 🖼️ Screenshot Gallery

<!-- Screenshot: dashboard.png — main dashboard showing cross configuration (parent genotypes, number of offspring, dominance settings) -->
<div align="center">
  <img src="./assets/dashboard.png" alt="Dashboard" width="800"><br>
  <sub><b>Main Dashboard</b> — configure parental genotypes and simulation parameters</sub>
</div>

<br>

<!-- Screenshot: results.png — statistical results table showing genotype/phenotype counts and ratios -->
<div align="center">
  <img src="./assets/results.png" alt="Results Table" width="800"><br>
  <sub><b>Statistical Results</b> — genotype and phenotype frequency breakdown</sub>
</div>

<br>

<!-- Screenshot: charts.png — interactive Chart.js bar/pie charts of simulation output -->
<div align="center">
  <img src="./assets/charts.png" alt="Interactive Charts" width="800"><br>
  <sub><b>Interactive Charts</b> — visualizing simulated offspring distributions</sub>
</div>

<br>

<!-- Screenshot: dark-mode.png — the dashboard in dark mode -->
<div align="center">
  <img src="./assets/dark-mode.png" alt="Dark Mode" width="800"><br>
  <sub><b>Dark Mode</b> — full dashboard theming support</sub>
</div>

---

## 📑 Table of Contents

- [Motivation](#-motivation)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [How the Genetics Engine Works](#-how-the-genetics-engine-works)
- [Performance](#-performance)
- [Current Limitations](#-current-limitations)
- [Future Roadmap](#-future-roadmap)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 💡 Motivation

Most online Mendelian genetics calculators work by directly plugging parental genotypes into a formula and returning the theoretical Punnett-square ratio (e.g. 9:3:3:1 for a dihybrid cross). That's mathematically correct, but it hides the actual biological process — meiosis, random gamete formation, and random fertilization — that produces those ratios in real populations.

MendoSim was built to make that process visible. Instead of calculating the answer directly, it **simulates** each offspring individually: gametes are randomly sampled from each parent's allele pool, and two gametes are randomly combined to form each offspring's genotype. Run enough of these trials, and the classic Mendelian ratios emerge on their own — a live demonstration of the **Law of Large Numbers** in a genetics context.

This project was built entirely from scratch as a way to combine an interest in genetics with front-end engineering and simulation design, without following a tutorial or boilerplate template.

---

## ✨ Features

- 🧬 Supports **Monohybrid, Dihybrid, Trihybrid, and Tetrahybrid** crosses
- 🎲 True **Monte Carlo simulation engine** — no shortcut formulas
- 🧪 Random **gamete segregation** per parent, per trait
- 🔀 Random **fertilization** (gamete pairing) per simulated offspring
- 📊 Real-time **genotype frequency** analysis
- 📈 Real-time **phenotype frequency** analysis
- 📉 Interactive, responsive **charts** (bar & pie) via Chart.js
- 📋 Detailed **statistical summary tables**
- ✅ Robust **input validation** for genotype and cross configuration
- 📱 Fully **responsive dashboard** layout
- 🌙 **Dark mode** support
- ⚡ **High-performance** simulation of up to **1,000,000 offspring** per run, computed client-side in milliseconds

---

## 🛠️ Tech Stack

| Category            | Technology                          |
|----------------------|--------------------------------------|
| UI Library            | React                              |
| Build Tool             | Vite                              |
| Styling                 | Tailwind CSS                     |
| Charting                | Chart.js + react-chartjs-2      |
| Language                | JavaScript (ES Modules)         |
| Hosting                  | GitHub Pages                    |

---

## 🏗️ Project Architecture

MendoSim is deliberately structured to keep the **simulation logic** independent of the **UI layer**, so the genetics engine can be reused, unit-tested, or extended without touching any React code.

```
┌─────────────────────┐
│      React UI        │   ← Dashboard, forms, layout, theming
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│   Validation Layer     │   ← Genotype & input validation
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│  Genetics Simulation   │   ← Gamete segregation & fertilization engine
│         Engine          │      (pure JS, framework-agnostic)
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│ Statistical Aggregation │   ← Genotype/phenotype counting & ratio calc
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│    Chart Rendering       │   ← Chart.js visualizations
└─────────────────────┘
```

**Key design principles:**

- The simulation engine has **no dependency on React** — it's plain JavaScript that accepts parameters and returns results.
- The UI layer is a **consumer** of the engine, not intertwined with it.
- Validation is handled as a **separate concern**, before data ever reaches the engine.
- This separation makes it straightforward to add new inheritance models (e.g. codominance) without rewriting the UI.

---

## 🔬 How the Genetics Engine Works

MendoSim's core engine simulates inheritance the way it actually happens biologically, rather than jumping straight to the theoretical ratio:

1. **Parent Genotype Input** — The user specifies each parent's genotype for one to four traits (e.g. `AaBb x AaBb`).
2. **Gamete Segregation** — For each trait, each parent's two alleles are treated as an independent pool. For every simulated offspring, one allele is **randomly sampled** from each parent for each trait, mimicking the random segregation of alleles during meiosis.
3. **Random Fertilization** — The randomly sampled allele from each parent is combined to form the offspring's genotype for that trait. This is repeated independently for each trait, respecting the principle of **independent assortment**.
4. **Repetition at Scale** — This process is repeated for the requested number of offspring (up to 1,000,000), each one an independent random trial.
5. **Phenotype Resolution** — Each offspring's genotype is translated into a phenotype using **complete dominance** rules.
6. **Aggregation** — Genotype and phenotype counts are tallied across all simulated offspring and converted into frequencies and ratios.
7. **Visualization** — The aggregated results are rendered as charts and statistical tables in real time.

Because each offspring is generated through independent random sampling rather than direct computation, the resulting ratios naturally converge toward the theoretical Mendelian ratios as the number of simulated offspring increases — a direct, visual demonstration of the **Law of Large Numbers**.

---

## ⚡ Performance

- Simulates up to **1,000,000 offspring** per run entirely client-side, with no backend or server round-trip.
- Full runs at this scale complete in **milliseconds**, thanks to a tight, allocation-conscious simulation loop.
- Simulation logic is optimized to avoid unnecessary re-renders by keeping heavy computation outside the React render cycle.
- Chart rendering is decoupled from the simulation loop, so large simulations don't block the UI from updating incrementally.
- Designed to scale cleanly with trait count (Monohybrid → Tetrahybrid) without a disproportionate performance hit, since each trait's segregation is computed independently per offspring.

---

## ⚠️ Current Limitations

MendoSim v1.0 focuses on core Mendelian inheritance and currently assumes:

- ✅ Complete dominance only (no codominance or incomplete dominance yet)
- ✅ Independent assortment for all traits
- ❌ No genetic linkage between traits
- ❌ No mutation modeling
- ❌ No epistasis (gene-gene interaction effects)
- ❌ No environmental effects on phenotype expression

These are intentional scope boundaries for v1.0, not oversights — see the roadmap below for what's planned next.

---

## 🗺️ Future Roadmap

- [ ] Punnett Square visualization alongside simulation results
- [ ] Codominance support
- [ ] Incomplete dominance support
- [ ] Multiple alleles (beyond simple dominant/recessive pairs)
- [ ] Genetic linkage between traits
- [ ] Sex-linked inheritance
- [ ] Epistasis (gene interaction modeling)
- [ ] Simulation history / run comparison
- [ ] Export results to CSV
- [ ] Export results to PDF

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
# Clone the repo
git clone https://github.com/sudiptakundu-dev/mendosim-mendelian-cross-simulator.git

# Navigate into the project directory
cd mendosim-mendelian-cross-simulator

# Install dependencies
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🚦 Usage

1. Open the app (locally via `npm run dev` or the [live demo](https://sudiptakundu-dev.github.io/mendosim-mendelian-cross-simulator/)).
2. Select the **cross type**: Monohybrid, Dihybrid, Trihybrid, or Tetrahybrid.
3. Enter the **parental genotypes** for each trait (e.g. `Aa` for one trait, `AaBb` for two).
4. Set the **number of offspring** to simulate (up to 1,000,000).
5. Click **Run Simulation** to trigger the Monte Carlo engine.
6. Explore the results:
   - Genotype and phenotype **frequency tables**
   - Interactive **bar and pie charts**
   - Observed ratios compared against theoretical Mendelian expectations
7. Toggle **dark mode** from the top navigation bar for a low-light friendly view.

---

## 🗂️ Project Structure

```
mendosim-mendelian-cross-simulator/
├── public/                    # Static assets
├── src/
│   ├── assets/                 # Images, icons, static media
│   ├── components/             # React UI components
│   │   ├── dashboard/            # Cross configuration forms
│   │   ├── charts/                # Chart.js wrapper components
│   │   └── results/                # Statistical result tables
│   ├── engine/                  # Genetics simulation engine (framework-agnostic)
│   │   ├── gameteSegregation.js
│   │   ├── fertilization.js
│   │   └── simulate.js
│   ├── validation/               # Input & genotype validation logic
│   ├── utils/                     # Statistical aggregation helpers
│   ├── hooks/                     # Custom React hooks
│   ├── App.jsx                    # Root application component
│   └── main.jsx                   # Application entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add: short description of your change"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request describing your changes

Please keep the simulation engine framework-agnostic when contributing new inheritance models, in line with the project's architecture.

---

## 👤 Author

<div align="center">

**Sudipta Kundu**

[![GitHub](https://img.shields.io/badge/GitHub-sudiptakundu--dev-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sudiptakundu-dev)

</div>

<div align="center">
<sub>Built with 🧬 and ☕ — MendoSim v1.0</sub>
</div>
