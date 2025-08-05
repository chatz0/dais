import React, { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3-force'; // For collision force

const GraphPage = () => {
  const fgRef = useRef();

  // Example graph data (replace with yours if stored elsewhere)
  const graphData = {
    nodes: [
      { id: 'Research', emoji: '📚' },
      { id: 'Teaching', emoji: '🎓' },
      { id: 'CV', emoji: '💼' },
      { id: 'Contact', emoji: '👤' },
      { id: 'Publications', emoji: '📖' },
      { id: 'Projects', emoji: '🗂️' }
    ],
    links: [
      { source: 'Research', target: 'Publications' },
      { source: 'Research', target: 'Projects' },
      { source: 'Teaching', target: 'CV' },
      { source: 'CV', target: 'Contact' }
    ]
  };

  useEffect(() => {
    if (fgRef.current) {
      // Increase repulsion between nodes
      fgRef.current.d3Force('charge').strength(-600);

      // Add collision detection to avoid overlapping nodes
      fgRef.current.d3Force('collide', d3.forceCollide(80)); // 80px spacing

      // Center force to keep graph visible
      fgRef.current.d3Force('center', d3.forceCenter());

      // Restart simulation to apply new forces
      fgRef.current.d3ReheatSimulation();
    }
  }, []);

  return (
    <div style={{ height: '100vh', backgroundColor: '#111' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        width={window.innerWidth}
        height={window.innerHeight}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.emoji || node.id;
          const fontSize = 24 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#00ff88';
          ctx.fillText(label, node.x, node.y);
        }}
        linkColor={() => '#00ff88'}
        linkWidth={2}
        cooldownTicks={100}
        onEngineStop={() => fgRef.current.zoomToFit(400)}
      />
    </div>
  );
};

export default GraphPage;
