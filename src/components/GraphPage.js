// src/components/GraphPage.js
import React, { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useNavigate } from 'react-router-dom';

const ICON_URLS = {
  home:    `${process.env.PUBLIC_URL}/icons/home.png`,
  cv:      `${process.env.PUBLIC_URL}/icons/cv.png`,
  contact: `${process.env.PUBLIC_URL}/icons/contact.png`
};

const GraphPage = () => {
  const fgRef    = useRef();
  const navigate = useNavigate();
  // store Image objects here
  const icons    = useRef({});

  // preload icons and tweak forces
  useEffect(() => {
    Object.entries(ICON_URLS).forEach(([id, url]) => {
      const img = new Image();
      img.src = url;
      // when each image loads, trigger a redraw
      img.onload = () => {
        if (fgRef.current) fgRef.current.refresh();
      };
      icons.current[id] = img;
    });

    // ease off the repulsion so nodes spread out more
    fgRef.current.d3Force('charge').strength(-200);
    // slight centering force
    fgRef.current.d3Force('center').strength(0.05);
  }, []);

  // your graph data
  const graphData = {
    nodes: [
      { id: 'home'    },
      { id: 'cv'      },
      { id: 'contact' }
    ],
    links: [
      { source: 'home',    target: 'cv'      },
      { source: 'home',    target: 'contact' }
    ]
  };

  return (
    <div style={{ height: '100vh', background: '#111' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const R = 20; // radius

          // 1) draw the circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, R, 0, 2 * Math.PI, false);
          ctx.fillStyle = 'rgba(0, 255, 100, 0.6)';
          ctx.fill();

          // 2) if the icon is loaded, draw it
          const img = icons.current[node.id];
          if (img?.complete && img.naturalWidth > 0) {
            ctx.drawImage(
              img,
              node.x - R,
              node.y - R,
              R * 2,
              R * 2
            );
          }
        }}
        onNodeClick={node => navigate(`/${node.id}`)}
      />
    </div>
  );
};

export default GraphPage;
