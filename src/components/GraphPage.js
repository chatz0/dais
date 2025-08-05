import React, { useRef, useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { useNavigate } from 'react-router-dom';

const GraphPage = () => {
  const navigate = useNavigate();
  const graphRef = useRef();

  // Base nodes
  const [graphData, setGraphData] = useState({
    nodes: [
      { id: 'About', icon: `${process.env.PUBLIC_URL}/icons/ucd.png`, main: true },
      { id: 'Research', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google-scholar.svg', main: true },
      { id: 'Teaching', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg', main: true }
    ],
    links: [
      { source: 'About', target: 'Research' },
      { source: 'About', target: 'Teaching' }
    ]
  });

  // Handle node clicks
  const handleNodeClick = node => {
    if (node.id === 'Research') {
      setGraphData(prev => ({
        nodes: [
          ...prev.nodes,
          { id: 'Publications', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/dblp.svg' },
          { id: 'Projects', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google-scholar.svg' }
        ],
        links: [
          ...prev.links,
          { source: 'Research', target: 'Publications' },
          { source: 'Research', target: 'Projects' }
        ]
      }));
    } else if (node.id === 'CV') {
      navigate('/cv');
    } else if (node.id === 'Contact') {
      navigate('/contact');
    }
  };

  // Floating animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (graphRef.current) {
        graphRef.current.d3Force('charge').strength(-250); // repulsion for better spacing
        graphRef.current.d3AlphaTarget(0.1);
        graphRef.current.refresh();
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0a0a0a' }}>
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const size = 40;
          const img = new Image();
          img.src = node.icon;

          ctx.save();
          ctx.beginPath();
          ctx.arc(node.x, node.y, size / 2, 0, 2 * Math.PI, false);
          ctx.fillStyle = '#00ff88';
          ctx.fill();
          ctx.closePath();

          img.onload = () => {
            ctx.drawImage(img, node.x - size / 2, node.y - size / 2, size, size);
          };
          ctx.restore();
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          const size = 40;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, size / 2, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        linkColor={() => '#00ff88'}
        linkWidth={2}
        onNodeClick={handleNodeClick}
        cooldownTicks={100}
      />
    </div>
  );
};

export default GraphPage;
