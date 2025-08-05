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
    // link distance + stiffness
    fg.d3Force('link').distance(120).strength(0.8);
    // simulation cooling
    fg.d3AlphaDecay(0.4);
    // center pull
    fg.d3Force('center').strength(0.05);
    // re-kick the sim
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
          // draw circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8 / globalScale, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color || '#0f0';
          ctx.fill();
          // draw label
          ctx.font = `${12 / globalScale}px Sans-Serif`;
          ctx.fillStyle = '#fff';
          ctx.fillText(node.id, node.x + 10 / globalScale, node.y + 4 / globalScale);
        }}
      />
    </div>
  );
}
