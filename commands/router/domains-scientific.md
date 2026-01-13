# Scientific Domain Reference

Load this file when scientific/research keywords detected.

**Primary Resource:** claude-scientific-skills marketplace (125+ specialized skills)

## Domain Detection Keywords

| Domain           | Keywords                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `bioinformatics` | bioinformatics, genomics, dna, rna, sequence, gene, biopython, scanpy, fasta, blast, genome  |
| `chemistry`      | chemistry, molecule, compound, rdkit, chembl, drug, molecular, reaction, synthesis, chemical |
| `proteomics`     | protein, proteomic, uniprot, alphafold, amino acid, peptide, structure prediction            |
| `clinical`       | clinical, trial, patient, clinvar, medical, healthcare, diagnosis, treatment, phenotype      |
| `physics`        | physics, quantum, qiskit, simulation, particle, mechanics, relativity, thermodynamics        |
| `astronomy`      | astronomy, astro, astropy, telescope, celestial, planet, star, galaxy, cosmology             |
| `materials`      | materials, material science, polymer, alloy, crystallography, solid state                    |
| `lab-automation` | lab, laboratory, protocol, benchling, automation, experiment, assay                          |

## Resource Mapping

| Domain         | Marketplace                         | Notes                                  |
| -------------- | ----------------------------------- | -------------------------------------- |
| All scientific | `claude-scientific-skills`          | 125+ specialized skills                |
| bioinformatics | Load bioinformatics-specific skills | genomics, sequence analysis            |
| chemistry      | Load chemistry-specific skills      | molecular modeling, drug discovery     |
| proteomics     | Load proteomics-specific skills     | protein analysis, structure prediction |
| clinical       | Load clinical-specific skills       | clinical trials, medical data          |
| physics        | Load physics-specific skills        | simulations, quantum computing         |
| astronomy      | Load astronomy-specific skills      | celestial data, telescope analysis     |

## Integration Notes

- Scientific tasks often require WebSearch for current papers/data
- May need specialized MCP servers for data access
- Consider memory (claude-mem) for ongoing research context
