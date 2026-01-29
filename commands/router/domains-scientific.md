# Scientific Domain Reference

Load this file when scientific/research keywords detected.

**Primary Resources:** claude-scientific-skills (144 skills), anthropic-life-sciences (6), gqy20-biology-plugins

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

| Domain         | Marketplace Repos                                          | Notes                                  |
| -------------- | ---------------------------------------------------------- | -------------------------------------- |
| All scientific | `claude-scientific-skills` (144)                           | Broad scientific coverage              |
| life sciences  | `anthropic-life-sciences` (6)                              | Anthropic official life sciences       |
| biology        | `gqy20-biology-plugins`, `claude-scientific-skills`        | Evolutionary biology, genomics         |
| bioinformatics | `claude-scientific-skills`                                 | Sequence analysis, BLAST, genomics     |
| chemistry      | `claude-scientific-skills`                                 | Molecular modeling, drug discovery     |
| proteomics     | `claude-scientific-skills`                                 | Protein analysis, structure prediction |
| clinical       | `claude-scientific-skills`                                 | Clinical trials, medical data          |
| physics        | `claude-scientific-skills`                                 | Simulations, quantum computing         |
| astronomy      | `claude-scientific-skills`                                 | Celestial data, telescope analysis     |

Search for specific scientific skills:
```bash
find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -li "<scientific keyword>"
```

## Integration Notes

- Scientific tasks often require WebSearch for current papers/data
- May need specialized MCP servers for data access
- Consider memory (claude-mem) for ongoing research context
- Check `anthropic-life-sciences` for Anthropic's official scientific tools
