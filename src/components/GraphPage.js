import React, { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useNavigate } from 'react-router-dom';

// Node data with correct icon sources
const nodes = [
  {
    id: 'cv',
    name: 'CV',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg', // LinkedIn (CDN)
  },
  {
    id: 'dblp',
    name: 'DBLP',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/dblp.svg', // DBLP (CDN)
  },
  {
    id: 'scholar',
    name: 'Google Scholar',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlescholar.svg', // Scholar (CDN)
  },
  {
    id: 'ucd',
    name: 'UCD',
    icon: `${process.env.PUBLIC_URL}/icons/ucd.png`, // Local icon from public/icons
  },
];

// Links (if you have navigation between nodes)
const links = [
  { source: 'cv', target: 'dblp' },
  { source: 'dblp', target: 'scholar' },
  { source: 'scholar', target: 'ucd' },
];

const GraphPage = () => {
  const fgRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-200);
    }
  }, []);

  return (
    <div style={{ height: '100vh', backgroundColor: '#111' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={{ nodes, links }}
        nodeCanvasObject={(node, ctx) => {
          const img = new Image();
          img.src = node.icon;
          img.onload = () => {
            ctx.drawImage(img, node.x - 15, node.y - 15, 30, 30); // Centered 30x30 icon
          };
        }}
        onNodeClick={(node) => {
          // Optional navigation (customize per node)
          if (node.id === 'cv') navigate('/cv');
          else if (node.id === 'dblp') window.open('https://dblp.org/pid/135/6249.html', '_blank');
          else if (node.id === 'scholar') window.open('https://scholar.google.com.hk/citations?hl=en&user=vXz1bl4AAAAJ', '_blank');
          else if (node.id === 'ucd') window.open('https://www.ucd.ie/', '_blank');
        }}
        linkColor={() => '#00ff88'}
      />
    </div>
  );
};

export default GraphPage;
