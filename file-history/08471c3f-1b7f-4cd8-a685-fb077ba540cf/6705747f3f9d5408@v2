/**
 * Graph Simulation Configuration
 * D3 force simulation setup for graph visualization
 */

import * as d3 from 'd3';
import type { GraphNode, GraphEdge } from './graphDataProcessor';

export interface SimulationNode extends GraphNode, d3.SimulationNodeDatum {
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface SimulationLink {
  source: string | SimulationNode;
  target: string | SimulationNode;
  type: 'backlink' | 'tag';
  strength: number;
}

/**
 * Create and configure D3 force simulation
 */
export function createForceSimulation(
  nodes: GraphNode[],
  edges: GraphEdge[],
  width: number,
  height: number
): d3.Simulation<SimulationNode, SimulationLink> {
  // Convert nodes and edges to simulation format
  const simNodes: SimulationNode[] = nodes.map((node) => ({ ...node }));
  const simLinks: SimulationLink[] = edges.map((edge) => ({ ...edge }));

  // Create simulation
  const simulation = d3
    .forceSimulation<SimulationNode, SimulationLink>(simNodes)
    .force(
      'link',
      d3
        .forceLink<SimulationNode, SimulationLink>(simLinks)
        .id((d) => d.id)
        .distance((d) => {
          // Shorter distance for backlinks, longer for tag connections
          return d.type === 'backlink' ? 100 : 150;
        })
        .strength((d) => d.strength)
    )
    .force('charge', d3.forceManyBody().strength(-300)) // Repulsion between nodes
    .force('center', d3.forceCenter(width / 2, height / 2)) // Center the graph
    .force(
      'collision',
      d3.forceCollide().radius((d: any) => d.size + 5)
    ) // Prevent overlap
    .force('x', d3.forceX(width / 2).strength(0.05)) // Weak pull toward center X
    .force('y', d3.forceY(height / 2).strength(0.05)); // Weak pull toward center Y

  return simulation;
}

/**
 * Get simulation data after it has run
 */
export function getSimulationData(
  simulation: d3.Simulation<SimulationNode, SimulationLink>
): {
  nodes: SimulationNode[];
  links: SimulationLink[];
} {
  return {
    nodes: simulation.nodes(),
    links: simulation.force('link') ? (simulation.force('link') as any).links() : [],
  };
}

/**
 * Restart simulation with new alpha
 */
export function restartSimulation(
  simulation: d3.Simulation<SimulationNode, SimulationLink>,
  alpha: number = 0.3
): void {
  simulation.alpha(alpha).restart();
}

/**
 * Stop simulation
 */
export function stopSimulation(
  simulation: d3.Simulation<SimulationNode, SimulationLink>
): void {
  simulation.stop();
}
