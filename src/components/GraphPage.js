// src/components/GraphPage.js
import React, { useRef, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';

export default function GraphPage() {
  const fgRef = useRef();

  const data = {
    nodes: [
      { id: 'Home',    name: 'Home',    url: '/'       },
      { id: 'CV',      name: 'CV',      url: '/cv'     },
      { id: 'Contact', name: 'Contact', url: '/contact'},
    ],
    links: [
      { source: 'Home',   target: 'CV'      },
      { source: 'Home',   target: 'Contact' },
    ],
  };

  // once mounted, you can tweak physics if you like:
  useEffect(() => {
    const fg = fgRef.current;
    fg.d3Force('charge').strength(-120);
    fg.d3Force('link').distance(150);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        nodeLabel="name"
        nodeAutoColorBy="id"
        linkOpacity={0.4}

        onNodeClick={node => {
          if (node.url) window.location.href = node.url;
        }}

        // optional: make things float a bit
        onEngineStop={() => fgRef.current.zoomToFit(400)}
      />
    </div>
  );
}
