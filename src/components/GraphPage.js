// src/components/GraphPage.js
import React, { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import graphData from '../data/graphData.json'; // your nodes & links

const GraphPage = () => {
  const fgRef = useRef();

  useEffect(() => {
    const fg = fgRef.current;

    // 1) stronger repulsion to prevent overlap
    fg.d3Force('charge').strength(-200);

    // 2) set link distance
    fg.d3Force('link').distance(120).strength(0.8);

    // 3) slow down cooling so layout has time to settle
    fgRef.current.d3VelocityDecay(0.3);

    // 4) pull everything toward center
    fg.d3Force('center').strength(0.05);

    // re-heat simulation
    fgRef.current.alpha(1).restart();
  }, []);

  return (
    <div className="force-graph-container" style={{ height: '100vh', width: '100vw' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeAutoColorBy="group"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
          ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.fillText(label, node.x + 10, node.y + 4);
        }}
        onNodeClick={node => window.open(node.url, '_blank')}
      />
    </div>
  );
};

export default GraphPage;
