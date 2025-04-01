import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

type Node = {
  id: number;
  x: number;
  y: number;
  radius: number;
  isMain?: boolean;
  isMedium?: boolean;
  delay: number;
};

type Connection = {
  id: string;
  from: number;
  to: number;
  isMedium?: boolean;
  delay: number;
};

export function NodeBackground() {
  const [mounted, setMounted] = useState(false);

  // Generate nodes and connections once and memoize them
  const { nodes, connections } = useMemo(() => {
    const centerX = 50;
    const centerY = 50;
    const mainNodeRadius = 6;
    const mediumNodeRadius = 4;
    const smallNodeRadius = 1.5;

    // Create the central node
    const centerNode: Node = {
      id: 1,
      x: centerX,
      y: centerY,
      radius: mainNodeRadius,
      isMain: true,
      delay: 0,
    };

    // Create medium-sized concept nodes around the center
    const mediumNodes: Node[] = [];
    const numMediumNodes = 8;
    const mediumNodeDistance = 20;

    for (let i = 0; i < numMediumNodes; i++) {
      const angle = (i * 2 * Math.PI) / numMediumNodes;
      const x = centerX + Math.cos(angle) * mediumNodeDistance;
      const y = centerY + Math.sin(angle) * mediumNodeDistance;

      mediumNodes.push({
        id: i + 2,
        x,
        y,
        radius: mediumNodeRadius,
        isMedium: true,
        delay: 0.2,
      });
    }

    // Create background nodes in a more organic pattern
    const backgroundNodes: Node[] = [];
    const numBackgroundNodes = 60; // Reduced for better performance
    const minDistance = 5;

    for (let i = 0; i < numBackgroundNodes; i++) {
      let x: number, y: number, tooClose: boolean;

      do {
        x = 10 + Math.random() * 80;
        y = 10 + Math.random() * 80;
        tooClose = false;

        const allExistingNodes = [
          centerNode,
          ...mediumNodes,
          ...backgroundNodes,
        ];
        for (const node of allExistingNodes) {
          const distance = Math.hypot(x - node.x, y - node.y);
          if (distance < minDistance) {
            tooClose = true;
            break;
          }
        }
      } while (tooClose);

      backgroundNodes.push({
        id: numMediumNodes + i + 2,
        x,
        y,
        radius: smallNodeRadius,
        delay: 0.3 + (i / numBackgroundNodes) * 0.5,
      });
    }

    const allNodes = [centerNode, ...mediumNodes, ...backgroundNodes];
    const newConnections: Connection[] = [];

    // Connect medium nodes to center
    mediumNodes.forEach((node) => {
      newConnections.push({
        id: `c-${centerNode.id}-${node.id}`,
        from: centerNode.id,
        to: node.id,
        isMedium: true,
        delay: 0.1,
      });
    });

    // Connect background nodes based on proximity
    const maxConnectionDistance = 12;
    allNodes.forEach((node, i) => {
      allNodes.slice(i + 1).forEach((otherNode) => {
        const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
        if (distance < maxConnectionDistance) {
          if (
            !(node.isMedium && otherNode.isMedium) &&
            !node.isMain &&
            !otherNode.isMain
          ) {
            newConnections.push({
              id: `c-${node.id}-${otherNode.id}`,
              from: node.id,
              to: otherNode.id,
              delay: 0.4,
            });
          }
        }
      });
    });

    return { nodes: allNodes, connections: newConnections };
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <g className="opacity-[0.2] dark:opacity-[0.15]">
          {/* Connections */}
          {connections.map((connection) => {
            const fromNode = nodes.find((n) => n.id === connection.from);
            const toNode = nodes.find((n) => n.id === connection.to);
            if (!fromNode || !toNode) return null;

            return (
              <motion.line
                key={connection.id}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="currentColor"
                strokeWidth={connection.isMedium ? "0.3" : "0.1"}
                strokeDasharray={connection.isMedium ? "" : "0.5 1"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: connection.delay,
                }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => (
            <motion.circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={node.radius}
              className={
                node.isMain
                  ? "fill-slate-400 dark:fill-slate-600"
                  : node.isMedium
                  ? "fill-slate-300 dark:fill-slate-700"
                  : "fill-slate-200 dark:fill-slate-800"
              }
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: node.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
