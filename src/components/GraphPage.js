import React, { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

// Graph data
const graphData = {
  nodes: [
    { id: 'cv', emoji: '🎓' },
    { id: 'contact', emoji: '👤' },
    { id: 'publications', emoji: '📚' },
    { id: 'projects', emoji: '🗂️' },
    { id: 'teaching', emoji: '📖' },
    { id: 'work', emoji: '💼' }
  ],
  links: [
    { source: 'cv', target: 'contact' },
    { source: 'cv', target: 'publications' },
    { source: 'cv', target: 'projects' },
    { source: 'cv', target: 'teaching' },
    { source: 'cv', target: 'work' }
  ]
};

const GraphPage = () => {
  const graphRef = useRef();

  useEffect(() => {
    const graph = graphRef.current;

    // Node repulsion and spacing
    graph.d3Force('charge').strength(-250); // stronger negative = more spread
    graph.d3Force('collide').radius(70).strength(0.9);

    // Gentle floating animation
    const floatAmplitude = 0.5; // pixels
    const floatSpeed = 0.002; // oscillation speed
    const animate = () => {
      graphData.nodes.forEach((node, index) => {
        node.x += Math.sin(Date.now() * floatSpeed + index) * floatAmplitude;
        node.y += Math.cos(Date.now() * floatSpeed + index) * floatAmplitude;
      });
      graph.refresh(); // re-render graph with updated positions
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div style={{ height: '100vh', backgroundColor: '#111' }} className="force-graph-container">
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        nodeLabel="id"
        nodeAutoColorBy="id"
        nodeCanvasObject={(node, ctx) => {
          const size = 40;

          // Draw circle with glow
          ctx.beginPath();
          ctx.arc(node.x, node.y, size / 2, 0, 2 * Math.PI, false);
          ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 15;
          ctx.fill();

          // Draw emoji text in the circle
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#000';
          ctx.fillText(node.emoji, node.x, node.y);
        }}
        linkColor={() => 'rgba(255,255,255,0.2)'}
      />
    </div>
  );
};

export default GraphPage;
