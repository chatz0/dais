// src/components/GraphPage.js
import React, { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function GraphPage() {
  const fgRef = useRef();

  // Inline your graph data here
  const data = {
    nodes: [
      { id: 'Home',     name: 'Home',     url: '/' },
      { id: 'CV',       name: 'CV',       url: '/cv' },
      { id: 'Contact',  name: 'Contact',  url: '/contact' }
    ],
    links: [
      { source: 'Home',    target: 'CV'      },
      { source: 'Home',    target: 'Contact' }
    ]
  };

  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;

    // 1) Stronger repulsion
    fg.d3Force('charge').strength(-200);
    // 2) Comfortable link length
    fg.d3Force('link').distance(120).strength(0.8);
    // 3) Slow cooling so it settles nicely
    fg.d3VelocityDecay(0.3);
    // 4) Gentle centering
    fg.d3Force('center').strength(0.05);

    // Kick off the simulation
    fg.alpha(1).restart();
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        nodeRelSize={8}
        linkColor={() => 'rgba(0,255,136,0.2)'}
        linkWidth={1}
        nodeCanvasObject={(node, ctx, scale) => {
          const r = 8 / scale;
          // draw node circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
          ctx.fillStyle = '#0f0';
          ctx.fill();
          // draw label
          ctx.font = `${12/scale}px Sans-Serif`;
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.name, node.x, node.y - r - 6);
        }}
        onNodeClick={node => {
          if (node.url) window.location.href = node.url;
        }}
        backgroundColor="transparent"
      />
    </div>
  );
}
