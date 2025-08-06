// src/components/GraphPage.js
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

    // gentle cooling (lower = slower decay, longer simulation)
    fg.d3AlphaDecay(0.03);

    // small pull towards center
    fg.d3Force('center').strength(0.05);

    // re-kick the simulation
    fg.alpha(1).restart();
  }, []);

  return (
    <div className="force-graph-container" style={{ width: '100%', height: '100%' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeAutoColorBy="group"
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
        nodeCanvasObject={(node, ctx, globalScale) => {
          // draw circle
          const r = 8 / globalScale;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color || '#00cc66';
          ctx.fill();

          // draw label
          ctx.font = `${12 / globalScale}px Sans-Serif`;
          ctx.fillStyle = '#ffffff';
          ctx.fillText(node.id, node.x + r + 2, node.y + r / 2);
        }}
        onNodeClick={node => {
          // navigate on click
          window.location.href = node.url;
        }}
      />
    </div>
  );
}
