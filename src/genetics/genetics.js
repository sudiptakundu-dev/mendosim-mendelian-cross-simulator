class MendelianCrossSimulator {
    constructor(data) {
        this.crossType = data.crossType;
        this.offspringCount = data.offspringCount;
        this.genes = data.genes;
        this.geneGametes = [];
        this.offspring = [];
        this.genotypeStats = {};
        this.phenotypeStats = {};
    }

    generateGametes() {
        this.geneGametes = [];
        for (const gene of this.genes) {
            this.geneGametes.push({
                gene: gene.gene,
                parent1Gametes: this.getGametes(gene.parent1),
                parent2Gametes: this.getGametes(gene.parent2),
            })
        }
    }

    getGametes(genotype) {
        const gametes = [...genotype];
        if (gametes[0] === gametes[1]) gametes.splice(1, 1);
        return gametes;
    }

    generateGeneGenotype(geneGameteData) {
        const parent1Gametes = geneGameteData.parent1Gametes;
        const parent2Gametes = geneGameteData.parent2Gametes;

        let genotype = [
            this.getRandomAllele(parent1Gametes),
            this.getRandomAllele(parent2Gametes)
        ].join('');

        genotype = this.normalizeGenotype(genotype);

        return genotype;
    }

    normalizeGenotype(genotype) {
        if (
            genotype[0] === genotype[0].toLowerCase() &&
            genotype[1] === genotype[1].toUpperCase()
        ) {
            genotype = [...genotype].reverse().join('');
        }
        return genotype;
    }

    getRandomAllele(gametes) {
        return gametes[Math.floor(Math.random() * gametes.length)];
    }

    getOffspringGenotype() {
        let offspringGenotype = "";
        for (const geneGameteData of this.geneGametes) {
            offspringGenotype += this.generateGeneGenotype(geneGameteData);
        }
        return offspringGenotype;
    }

    simulateOffspring() {
        this.offspring = [];

        for (let i = 0; i < this.offspringCount; i++) {
            this.offspring.push(this.getOffspringGenotype());
        }
    }

    countGenotypes() {
        this.genotypeStats = {};
        for (const genotype of this.offspring) {
            if (this.genotypeStats[genotype]) {
                this.genotypeStats[genotype].count += 1;
                this.genotypeStats[genotype].percentage = (this.genotypeStats[genotype].count/this.offspringCount)*100;
            } else {
                this.genotypeStats[genotype] = {count: 1, percentage: (1/this.offspringCount)*100};
            }
        }
    }

    getPhenotype(genotype) {
        const geneGenotypes = genotype.match(/.{1,2}/g);

        const phenotypeParts = geneGenotypes.map(
            geneGenotype => geneGenotype[0]
        );

        return phenotypeParts.join("-");
    }

    countPhenotypes() {
        this.phenotypeStats = {};

        for (const [genotype, stats] of Object.entries(this.genotypeStats)) {
            const phenotype = this.getPhenotype(genotype);

            if (this.phenotypeStats[phenotype]) {
                this.phenotypeStats[phenotype].count += stats.count;
                this.phenotypeStats[phenotype].percentage =
                    (this.phenotypeStats[phenotype].count / this.offspringCount) * 100;
            } else {
                this.phenotypeStats[phenotype] = {
                    count: stats.count,
                    percentage: (stats.count / this.offspringCount) * 100,
                };
            }
        }
    }

    run() {
        // Grand Total Timer for the entire process
        console.time("🚀 GRAND TOTAL SIMULATION TIME");

        // 1. Measure Gamete Generation
        console.time("  ↳ Step 1: generateGametes()");
        this.generateGametes();
        console.timeEnd("  ↳ Step 1: generateGametes()");

        // 2. Measure Offspring Simulation (The 1 Million Loop)
        console.time("  ↳ Step 2: simulateOffspring() 🧵");
        this.simulateOffspring();
        console.timeEnd("  ↳ Step 2: simulateOffspring() 🧵");

        // 3. Measure Genotype Counting
        console.time("  ↳ Step 3: countGenotypes() 📊");
        this.countGenotypes();
        console.timeEnd("  ↳ Step 3: countGenotypes() 📊");

        // 4. Measure Phenotype Counting
        console.time("  ↳ Step 4: countPhenotypes() 🧪");
        this.countPhenotypes();
        console.timeEnd("  ↳ Step 4: countPhenotypes() 🧪");

        // End Grand Total
        console.log("-----------------------------------------");
        console.timeEnd("🚀 GRAND TOTAL SIMULATION TIME");
    }
}

export default MendelianCrossSimulator;


// Valid input for this engine is like the following:
// const simulationData = {
//   crossType: "4",
//   offspringCount: 5000,
//   genes: [
//     {
//       gene: "A",
//       parent1: "Aa",
//       parent2: "aa",
//     },
//     {
//       gene: "B",
//       parent1: "Bb",
//       parent2: "Bb",
//     },
//     {
//       gene: "C",
//       parent1: "CC",
//       parent2: "Cc",
//     },
//     {
//       gene: "D",
//       parent1: "dd",
//       parent2: "Dd",
//     },
//   ],
// };