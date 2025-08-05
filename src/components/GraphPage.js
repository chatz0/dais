import React, { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import graphData from '../data/graphData.json';

export default function GraphPage() {
  const fgRef = useRef();

  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;

    // repulsive force between nodes
    fg.d3Force('charge').strength(-200);
    // link length + stiffness
    fg.d3Force('link').distance(120).strength(0.8);
    // how quickly the simulation cools down (was d3VelocityDecay)
    fg.d3AlphaDecay(0.4);
    // center-pull force
    fg.d3Force('center').strength(0.05);
    // kick off the simulation fresh
    fg.alpha(1).restart();
  }, []);

  return (
    <div className="force-graph-container">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        nodeAutoColorBy="group"
        onNodeClick={node => window.location.href = node.url}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = node.color || '#fff';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8 / globalScale, 0, 2 * Math.PI, false);
          ctx.fill();
          ctx.fillStyle = '#000';
          ctx.fillText(label, node.x + 10 / globalScale, node.y + 4 / globalScale);
        }}
      />
    </div>
  );
}
