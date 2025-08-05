import React, { useEffect, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { useNavigate } from 'react-router-dom';

const GraphPage = () => {
  const graphRef = useRef();
  const navigate = useNavigate();

  // Graph data
  const data = {
    nodes: [
      { id: 'cv', icon: '🎓', link: '/cv' },
      { id: 'contact', icon: '👤', link: '/contact' },
      { id: 'research', icon: '📚', link: '/research' },
      { id: 'projects', icon: '🗂️', link: '/projects' },
      { id: 'teaching', icon: '📖', link: '/teaching' },
      { id: 'work', icon: '💼', link: '/work' }
    ],
    links: [
      { source: 'cv', target: 'contact' },
      { source: 'cv', target: 'research' },
      { source: 'research', target: 'projects' },
      { source: 'research', target: 'teaching' },
      { source: 'projects', target: 'work' },
      { source: 'work', target: 'contact' }
    ]
  };

  useEffect(() => {
    if (graphRef.current) {
      const fg = graphRef.current;

      // Adjust forces for better spacing
      fg.d3Force('charge').strength(-500); // repulsion strength
      fg.d3Force('link').distance(150);    // distance between linked nodes
      fg.d3Force('center');                // center graph on canvas
    }
  }, []);

  return (
    <div style={{ height: '100vh', backgroundColor: '#111' }}>
      <div className="force-graph-container" style={{ position: 'relative' }}>
        <ForceGraph2D
          ref={graphRef}
          graphData={data}
          nodeCanvasObject={(node, ctx) => {
            const size = 40;

            // Glow effect
            ctx.beginPath();
            ctx.arc(node.x, node.y, size * 0.6, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(0, 255, 136, 0.3)';
            ctx.fill();

            // Node circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, size / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#00cc66';
            ctx.fill();
            ctx.strokeStyle = '#00ff88';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Icon
            ctx.font = `${size / 1.5}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#000';
            ctx.fillText(node.icon, node.x, node.y);
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 40, 0, 2 * Math.PI, false);
            ctx.fill();
          }}
          onNodeClick={(node) => {
            if (node.link) {
              navigate(node.link);
            }
          }}
          linkColor={() => 'rgba(255,255,255,0.2)'}
          linkWidth={1.5}
        />
      </div>
    </div>
  );
};

export default GraphPage;
