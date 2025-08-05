// src/components/GraphPage.js
import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function GraphPage() {
  const fgRef = useRef();

  // Inline data
  const data = {
    nodes: [
      { id: 'Home',    name: 'Home',    url: '/'       },
      { id: 'CV',      name: 'CV',      url: '/cv'     },
      { id: 'Contact', name: 'Contact', url: '/contact'}
    ],
    links: [
      { source: 'Home',    target: 'CV'      },
      { source: 'Home',    target: 'Contact' }
    ]
  };

  // Build adjacency lookup
  const adj = {};
  data.nodes.forEach(n => (adj[n.id] = new Set()));
  data.links.forEach(l => {
    adj[l.source].add(l.target);
    adj[l.target].add(l.source);
  });

  // Hover state
  const [hoverNode, setHoverNode] = useState(null);

  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;

    fg.d3Force('charge').strength(-200);
    fg.d3Force('link').distance(120).strength(0.8);
    fg.d3VelocityDecay(0.3);
    fg.d3Force('center').strength(0.05);
    fg.alpha(1).restart();
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#111' }}>
      {/* Tooltip */}
      {hoverNode && (
        <div style={{
          position: 'absolute',
          top: hoverNode.y + window.innerHeight/2,
          left: hoverNode.x + window.innerWidth/2,
          pointerEvents: 'none',
          background: 'rgba(0,0,0,0.7)',
          color: '#fff',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          {hoverNode.name}
        </div>
      )}

      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        nodeRelSize={8}
        linkWidth={1}
        linkColor={link => {
          if (!hoverNode) return 'rgba(0,255,136,0.2)';
          return (link.source.id === hoverNode.id || link.target.id === hoverNode.id)
            ? 'rgba(0,255,136,0.8)'
            : 'rgba(255,255,255,0.05)';
        }}
        nodeCanvasObject={(node, ctx, scale) => {
          const x = node.x, y = node.y;
          const r = 8 / scale;
          const isHighlighted = !hoverNode || node.id === hoverNode.id || adj[hoverNode.id].has(node.id);

          // circle
          ctx.beginPath();
          ctx.arc(x, y, r, 0, 2 * Math.PI, false);
          ctx.fillStyle = isHighlighted ? '#0f0' : 'rgba(0,255,136,0.2)';
          ctx.fill();

          // label
          ctx.font = `${12/scale}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = isHighlighted ? '#fff' : 'rgba(255,255,255,0.2)';
          ctx.fillText(node.name, x, y - r - 6);
        }}
        onNodeHover={node => setHoverNode(node || null)}
        onNodeClick={node => node.url && (window.location.href = node.url)}
        backgroundColor="transparent"
      />
    </div>
  );
}
