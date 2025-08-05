// src/components/GraphPage.js
import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function GraphPage() {
  // your nodes & links
  const data = {
    nodes: [
      { id: 'Home',    name: 'Home',    url: '/'      },
      { id: 'CV',      name: 'CV',      url: '/cv'    },
      { id: 'Contact', name: 'Contact', url: '/contact'},
    ],
    links: [
      { source: 'Home',   target: 'CV'      },
      { source: 'Home',   target: 'Contact' },
    ]
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <ForceGraph2D
        graphData={data}

        // physics
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        linkDistance={120}
        nodeRelSize={12}

        // styling
        nodeCanvasObject={(node, ctx, scale) => {
          const r = 12 / scale;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
          ctx.fillStyle = '#0f0';
          ctx.fill();
          ctx.font = `${12 / scale}px sans-serif`;
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.name, node.x, node.y - r - 6);
        }}
        linkColor={() => 'rgba(255,255,255,0.2)'}
        linkWidth={1}

        // click behavior
        onNodeClick={node => {
          if (node.url) window.location.href = node.url;
        }}

        // turn off default background so our div bg shows
        backgroundColor="transparent"
      />
    </div>
  );
}
