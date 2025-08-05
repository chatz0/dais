// src/components/GraphPage.js
import React, { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function GraphPage() {
  const fgRef = useRef();

  const data = {
    nodes: [
      { id: 'profile', name: 'Profile', fx: 0, fy: 0 },
      { id: 'research', name: 'Research' },
      { id: 'teaching', name: 'Teaching' },
      { id: 'cv', name: 'CV' },
      { id: 'contact', name: 'Contact' }
    ],
    links: [
      { source: 'profile', target: 'research' },
      { source: 'profile', target: 'teaching' },
      { source: 'profile', target: 'cv' },
      { source: 'profile', target: 'contact' }
    ]
  };

  useEffect(() => {
    if (!fgRef.current) return;
    // “Decay” controls how quickly the simulation cools; small = longer float
    fgRef.current.d3AlphaDecay(0.02);
    // Repel nodes
    fgRef.current.d3Force('charge').strength(-200);
    // Gentle pull towards center
    fgRef.current.d3Force('center').strength(0.05);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        nodeRelSize={14}
        linkColor={() => 'rgba(0,255,0,0.2)'}
        linkWidth={1.2}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const { x, y } = node;
          if (!isFinite(x) || !isFinite(y)) return;
          const r = 18;
          // glow gradient
          const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
          grad.addColorStop(0, 'rgba(0,255,0,0.8)');
          grad.addColorStop(1, 'rgba(0,255,0,0)');
          ctx.beginPath();
          ctx.arc(x, y, r, 0, 2 * Math.PI);
          ctx.fillStyle = grad;
          ctx.fill();
          // label
          ctx.font = `${12/globalScale}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#fff';
          ctx.fillText(node.name, x, y + (r+6)/globalScale);
        }}
        onNodeClick={node => {
          const routes = {
            research: '/research',
            teaching: '/teaching',
            cv: '/cv',
            contact: '/contact'
          };
          if (routes[node.id]) window.location.assign(routes[node.id]);
        }}
      />
    </div>
  );
}
