import { useState, useEffect } from "react";
import Header from "./components/Header";
import InputCard from "./components/CustomCards/InputCard";
import MendelianCrossSimulator from "./genetics/genetics";
import BarChart from "./components/CustomCards/BarChart";
import Card from "./components/Card";
import StatsTable from "./components/CustomCards/StatsTable";

function App() {
  const [simulationData, setSimulationData] = useState({
    crossType: "1",
    offspringCount: 100,
    genes: [
      {
        gene: "",
        parent1: "",
        parent2: "",
      },
    ],
  });
  
  const [genotypeStats, setGenotypeStats] = useState(null);
  const [phenotypeStats, setPhenotypeStats] = useState(null);
  const [showCards, setShowCards] = useState(false);

  const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "light";
});

useEffect(() => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}, [theme]);

  function handleCrossTypeChange(value) {
    setSimulationData((prev) => ({
      ...prev,
      crossType: value,
      genes: Array.from({ length: Number(value) }, () => ({
        gene: "",
        parent1: "",
        parent2: "",
      })),
    }));
  }

  function handleOffspringCountChange(value) {
    if (value === "") {
      setSimulationData((prev) => ({
        ...prev,
        offspringCount: "",
      }));
      return;
    }

    const num = Number(value);

    if (isNaN(num)) return;
    if (num < 1 || num > 10000) return;

    setSimulationData((prev) => ({
      ...prev,
      offspringCount: num,
    }));
  }

  function handleRunSimulation() {
    // console.log(simulationData);
    const simulator = new MendelianCrossSimulator(simulationData);

    simulator.run();

    // console.log(simulator.offspring);
    // console.log(simulator.genotypeStats);
    // console.log(simulator.phenotypeStats);

    setShowCards(true);

    setGenotypeStats(simulator.genotypeStats);
    setPhenotypeStats(simulator.phenotypeStats);
  }

  return (
    <div className="h-screen flex flex-col">
      <Header theme={theme} setTheme={setTheme}/>

      <div className="flex flex-1 overflow-auto w-full">
        <div className="h-full p-4">
          <InputCard
            simulationData={simulationData}
            setSimulationData={setSimulationData}
            onCrossTypeChange={handleCrossTypeChange}
            onOffspringCountChange={handleOffspringCountChange}
            onRunSimulation={handleRunSimulation}
            className="overflow-y-auto custom-scrollbar w-100"
          />
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-4 m-4 ml-0">
            <Card className={`h-70 ${showCards? "opacity-100" : "opacity-0"}`}>
              <BarChart title="Genotype" stats={genotypeStats} isDark={theme === "dark"}/>
            </Card>
            <Card className={`h-70 ${showCards? "opacity-100" : "opacity-0"}`}>
              <BarChart title="Phenotype" stats={phenotypeStats} isDark={theme === "dark"}/>
            </Card>
          </div>
          <div className="flex gap-4 w-full pr-4 mb-4">
            <StatsTable title="Genotype" stats={genotypeStats} className={`flex-1 ${showCards? "opacity-100" : "opacity-0"}`}/>
            <StatsTable title="Phenotype" stats={phenotypeStats} className={`flex-1 ${showCards? "opacity-100" : "opacity-0"}`}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;