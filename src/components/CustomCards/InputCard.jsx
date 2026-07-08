import Button from "../Button";
import Card from "../Card";
import CardHeader from "../CardHeader";
import InputLabel from "../InputLabel";
import { Select, TextInput } from "../Inputs";

function InputCard({
  simulationData,
  setSimulationData,
  onCrossTypeChange,
  onOffspringCountChange,
  onRunSimulation,
  className = "",
}) {
  const { crossType, offspringCount, genes } = simulationData;
  function handleGeneChange(index, value) {
    value = value.toUpperCase();

    if (value !== "" && !/^[A-Z]$/.test(value)) return;

    const updatedGenes = [...genes];
    updatedGenes[index].gene = value;
    updatedGenes[index].parent1 = "";
    updatedGenes[index].parent2 = "";

    setSimulationData((prev) => ({
      ...prev,
      genes: updatedGenes,
    }));
  }

  function handleParentGenotypeChange(index, parent, value) {
    const updatedGenes = [...genes];
    updatedGenes[index][parent] = value;

    setSimulationData((prev) => ({
      ...prev,
      genes: updatedGenes,
    }));
  }

  function hasDuplicate(index) {
    const gene = genes[index].gene;

    if (!gene) return false;

    return genes.some(
      (item, i) => i !== index && item.gene === gene
    );
  }

  function getGenotypeOptions(gene) {
    if (!gene) return [];

    const lower = gene.toLowerCase();

    return [
      {
        value: `${gene}${gene}`,
        label: `${gene}${gene}`,
      },
      {
        value: `${gene}${lower}`,
        label: `${gene}${lower}`,
      },
      {
        value: `${lower}${lower}`,
        label: `${lower}${lower}`,
      },
    ];
  }

  const isFormValid = genes.every(
    (item, index) =>
      item.gene &&
      item.parent1 &&
      item.parent2 &&
      !hasDuplicate(index)
  );

  return (
    <Card className={`h-full space-y-4 ${className}`}>
      <CardHeader icon="tune" text="Simulation Setup" className="sticky top-0 bg-(--bg-card) z-100 pt-6"/>

      <div>
        <InputLabel htmlFor="crossType" label="Cross Type" />

        <Select
          value={crossType}
          onChange={onCrossTypeChange}
          options={[
            { value: "1", label: "Monohybrid Cross" },
            { value: "2", label: "Dihybrid Cross" },
            { value: "3", label: "Trihybrid Cross" },
            { value: "4", label: "Tetrahybrid Cross" },
          ]}
          className="w-full"
        />
      </div>

      <div>
        <InputLabel
          htmlFor="offspringCount"
          label="Number of Offspring"
        />

        <TextInput
          id="offspringCount"
          type="number"
          min={1}
          max={10000}
          value={offspringCount}
          onChange={(e) => onOffspringCountChange(e.target.value)}
          className="w-full"
          placeholder="e.g. 100"
        />
      </div>

      <div>
        <InputLabel label="Genes" />

        <div className="space-y-6 mt-2">
          {genes.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-(--border) space-y-3"
            >
              <InputLabel
                htmlFor={`gene-${index}`}
                label={`Gene ${index + 1}`}
              />

              <TextInput
                id={`gene-${index}`}
                value={item.gene}
                maxLength={1}
                placeholder={`e.g. ${String.fromCharCode(65 + index)}`}
                onChange={(e) =>
                  handleGeneChange(index, e.target.value)
                }
                className={
                  hasDuplicate(index)
                    ? "w-full border-red-500 focus:border-red-500 focus:ring-red-500/30"
                    : "w-full"
                }
              />

              {hasDuplicate(index) && (
                <p className="text-sm text-red-500">
                  Each gene must be unique.
                </p>
              )}

              {item.gene && !hasDuplicate(index) && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <InputLabel label="Parent 1" />

                    <Select
                      value={item.parent1}
                      onChange={(value) =>
                        handleParentGenotypeChange(
                          index,
                          "parent1",
                          value
                        )
                      }
                      options={getGenotypeOptions(item.gene)}
                      placeholder="Select genotype"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <InputLabel label="Parent 2" />

                    <Select
                      value={item.parent2}
                      onChange={(value) =>
                        handleParentGenotypeChange(
                          index,
                          "parent2",
                          value
                        )
                      }
                      options={getGenotypeOptions(item.gene)}
                      placeholder="Select genotype"
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="h-30"></div>

      <div className="pb-6 pt-1 sticky bottom-0 z-100 bg-(--bg-card) shadow-[0_-4px_10px_8px_var(--bg-card)]">
        <Button
          onClick={onRunSimulation}
          disabled={!isFormValid}
          className="w-full"
          icon="play_arrow"
        >
          Run Simulation
        </Button>
      </div>
    </Card>
  );
}

export default InputCard;