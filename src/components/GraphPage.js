import React, { useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const GraphPage = () => {
  const fgRef = useRef();
  const [graphData, setGraphData] = useState({
    nodes: [
      { id: 'About', color: '#34d399', icon: '👤' },
      { id: 'Research', color: '#3b82f6', icon: '📚' },
      { id: 'Teaching', color: '#f59e0b', icon: '🎓' }
    ],
    links: [
      { source: 'About', target: 'Research' },
      { source: 'About', target: 'Teaching' }
    ]
  });

  const [hoverNode, setHoverNode] = useState(null);

  // Preload logos
  const iconImages = {};
  ['LinkedIn', 'Google Scholar', 'UCD', 'DBLP'].forEach(id => {
    const img = new Image();
    img.onload = () => {
      iconImages[id] = img;
    };
    img.src = `/icons/${id.toLowerCase().replace(/ /g, '_')}.png`;
  });

  const handleNodeClick = node => {
    if (node.id === 'Research' && !graphData.nodes.find(n => n.id === 'Publications')) {
      const randomOffset = () => Math.random() * 300 - 150;
      const publications = {
        id: 'Publications',
        color: '#ff79c6',
        icon: '📄',
        x: node.x + randomOffset(),
        y: node.y + randomOffset()
      };
      const projects = {
        id: 'Projects',
        color: '#ffb86c',
        icon: '💻',
        x: node.x + randomOffset(),
        y: node.y + randomOffset()
      };
      setGraphData({
        nodes: [...graphData.nodes, publications, projects],
        links: [
          ...graphData.links,
          { source: 'Research', target: 'Publications' },
          { source: 'Research', target: 'Projects' }
        ]
      });
    }

    if (node.id === 'About' && !graphData.nodes.find(n => n.id === 'CV')) {
      const randomOffset = () => Math.random() * 300 - 150;
      const newNodes = [
        {
          id: 'CV',
          color: '#facc15',
          icon: '📄',
          x: node.x + randomOffset(),
          y: node.y + randomOffset()
        },
        {
          id: 'Contact',
          color: '#0ea5e9',
          icon: '📬',
          x: node.x + randomOffset(),
          y: node.y + randomOffset()
        },
        {
          id: 'UCD',
          color: '#3b82f6',
          icon: '🎓',
          x: node.x + randomOffset(),
          y: node.y + randomOffset(),
          url: 'https://www.ucd.ie'
        },
        {
          id: 'LinkedIn',
          color: '#0a66c2',
          icon: '💼',
          x: node.x + randomOffset(),
          y: node.y + randomOffset(),
          url: 'https://www.linkedin.com/in/dimhatzo/'
        },
        {
          id: 'DBLP',
          color: '#6b7280',
          icon: '🗂️',
          x: node.x + randomOffset(),
          y: node.y + randomOffset(),
          url: 'https://dblp.org/pid/135/6249.html'
        },
        {
          id: 'Google Scholar',
          color: '#34a853',
          icon: '📖',
          x: node.x + randomOffset(),
          y: node.y + randomOffset(),
          url: 'https://scholar.google.com.hk/citations?hl=en&user=vXz1bl4AAAAJ'
        }
      ];
      const newLinks = newNodes.map(n => ({ source: 'About', target: n.id }));
      setGraphData({
        nodes: [...graphData.nodes, ...newNodes],
        links: [...graphData.links, ...newLinks]
      });
    } else if (node.url) {
      window.open(node.url, '_blank');
    } else {
      const route = node.id.toLowerCase().replace(" ", "-");
      window.location.href = `/${route}`;
    }
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#111' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        onNodeClick={handleNodeClick}
        nodeLabel="id"
        nodeCanvasObject={(node, ctx, globalScale) => {
          const fontSize = node === hoverNode ? 24 / globalScale : 18 / globalScale;
          const radius = fontSize * 3;
          ctx.save();
          ctx.shadowColor = node === hoverNode ? '#0ff' : node.color;
          ctx.shadowBlur = node === hoverNode ? 25 : 10;

          if (iconImages[node.id] && iconImages[node.id].complete && iconImages[node.id].naturalHeight !== 0) {
            const img = iconImages[node.id];
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
            ctx.clip();
            ctx.drawImage(img, node.x - radius, node.y - radius, radius * 2, radius * 2);
          } else {
            ctx.fillStyle = 'rgba(34, 197, 94, 0.85)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = node.color;
            ctx.font = `bold ${fontSize * 2}px system-ui, -apple-system, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.icon || '•', node.x, node.y);
          }

          if (node === hoverNode && !iconImages[node.id]) {
            ctx.font = `bold ${fontSize * 0.75}px system-ui, -apple-system, sans-serif`;
            ctx.fillText(node.id, node.x, node.y + radius + fontSize);
          }

          ctx.restore();
        }}
        onNodeHover={setHoverNode}
      />
    </div>
  );
};

export default GraphPage;
