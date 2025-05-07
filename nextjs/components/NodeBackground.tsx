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

  // Add animation variants
  const nodeAnimationVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: (delay: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
      },
    },
  };

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

    // Create background nodes in a more symmetrical, yet organic pattern
    const backgroundNodes: Node[] = [];
    const numBackgroundNodes = 50; // Reduced slightly for better spacing
    const minDistance = 4; // Adjusted slightly
    const outerRingMinRadius = mediumNodeDistance + 10; // Start outside medium nodes
    const outerRingMaxRadius = 45; // Limit the spread
    const jitterAmount = 3; // How much randomness to add

    for (let i = 0; i < numBackgroundNodes; i++) {
      let x: number, y: number, tooClose: boolean;
      let attempts = 0;
      const maxAttempts = 10; // Prevent infinite loops

      do {
        attempts++;
        // Calculate base position in the outer ring
        const angle = Math.random() * 2 * Math.PI; // Random angle
        const radius =
          outerRingMinRadius +
          Math.random() * (outerRingMaxRadius - outerRingMinRadius);
        const baseX = centerX + Math.cos(angle) * radius;
        const baseY = centerY + Math.sin(angle) * radius;

        // Add jitter
        const jitterX = (Math.random() - 0.5) * 2 * jitterAmount;
        const jitterY = (Math.random() - 0.5) * 2 * jitterAmount;
        x = baseX + jitterX;
        y = baseY + jitterY;

        // Clamp coordinates to stay roughly within viewbox edges
        x = Math.max(5, Math.min(95, x));
        y = Math.max(5, Math.min(95, y));

        tooClose = false;
        const allExistingNodes = [
          centerNode,
          ...mediumNodes,
          ...backgroundNodes,
        ];
        for (const node of allExistingNodes) {
          const distance = Math.hypot(x - node.x, y - node.y);
          // Check distance against appropriate radius (small node vs others)
          const effectiveMinDistance =
            node.radius + smallNodeRadius + minDistance;
          if (distance < effectiveMinDistance) {
            tooClose = true;
            break;
          }
        }
      } while (tooClose && attempts < maxAttempts);

      // Only add the node if a suitable position was found
      if (!tooClose) {
        backgroundNodes.push({
          id: numMediumNodes + i + 2,
          x,
          y,
          radius: smallNodeRadius,
          delay: 0.3 + Math.random() * 0.4, // Add slight random delay variation
        });
      }
    }

    const allNodes = [centerNode, ...mediumNodes, ...backgroundNodes];
    const newConnections: Connection[] = [];
    const nodeConnections = new Map<number, number>(); // Track connections per node

    // Connect medium nodes to center
    mediumNodes.forEach((node) => {
      newConnections.push({
        id: `c-${centerNode.id}-${node.id}`,
        from: centerNode.id,
        to: node.id,
        isMedium: true,
        delay: 0.1,
      });
      nodeConnections.set(node.id, 1);
    });
    nodeConnections.set(centerNode.id, mediumNodes.length);

    // First pass: Connect background nodes to nearest medium nodes
    const maxConnectionDistance = 20; // Increased for better coverage
    const maxConnectionsPerMediumNode = 5; // Slightly increased
    const mediumNodeConnections = new Map<number, number>();

    backgroundNodes.forEach((bgNode) => {
      // Find the closest medium nodes
      const mediumNodeDistances = mediumNodes
        .map((medNode) => ({
          node: medNode,
          distance: Math.hypot(bgNode.x - medNode.x, bgNode.y - medNode.y),
        }))
        .sort((a, b) => a.distance - b.distance);

      // Try to connect to the closest medium nodes
      for (const { node: medNode, distance } of mediumNodeDistances) {
        if (distance < maxConnectionDistance) {
          const currentConnections = mediumNodeConnections.get(medNode.id) || 0;
          if (currentConnections < maxConnectionsPerMediumNode) {
            newConnections.push({
              id: `c-${medNode.id}-${bgNode.id}`,
              from: medNode.id,
              to: bgNode.id,
              delay: 0.2,
            });
            mediumNodeConnections.set(medNode.id, currentConnections + 1);
            nodeConnections.set(
              bgNode.id,
              (nodeConnections.get(bgNode.id) || 0) + 1
            );
            break;
          }
        }
      }
    });

    // Second pass: Connect background nodes to each other
    backgroundNodes.forEach((node, i) => {
      const nodeConnectionCount = nodeConnections.get(node.id) || 0;

      // If node has no connections yet, find the closest nodes to connect to
      if (nodeConnectionCount === 0) {
        const nearestNodes = [...backgroundNodes, ...mediumNodes]
          .filter((n) => n.id !== node.id)
          .map((otherNode) => ({
            node: otherNode,
            distance: Math.hypot(node.x - otherNode.x, node.y - otherNode.y),
          }))
          .sort((a, b) => a.distance - b.distance);

        // Connect to the closest node
        const closest = nearestNodes[0];
        newConnections.push({
          id: `c-${node.id}-${closest.node.id}`,
          from: node.id,
          to: closest.node.id,
          delay: 0.3,
        });
        nodeConnections.set(node.id, (nodeConnections.get(node.id) || 0) + 1);
      }

      // Add additional connections for nearby nodes
      backgroundNodes.slice(i + 1).forEach((otherNode) => {
        const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
        if (distance < maxConnectionDistance * 0.6) {
          newConnections.push({
            id: `c-${node.id}-${otherNode.id}`,
            from: node.id,
            to: otherNode.id,
            delay: 0.3,
          });
          nodeConnections.set(node.id, (nodeConnections.get(node.id) || 0) + 1);
          nodeConnections.set(
            otherNode.id,
            (nodeConnections.get(otherNode.id) || 0) + 1
          );
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
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feOffset dx="0.2" dy="0.2" />
            <feGaussianBlur stdDeviation="0.2" result="shadow" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0"
              in="shadow"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient
            id="bg-gradient-light"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#f1f5f9" stopOpacity="0" />
            <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.5" />
          </radialGradient>
          <radialGradient
            id="bg-gradient-dark"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.5" />
          </radialGradient>
        </defs>
        {/* Background */}
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          className="fill-[url(#bg-gradient-light)] dark:fill-[url(#bg-gradient-dark)] opacity-30"
        />
        <g className="opacity-[0.3] dark:opacity-[0.2]">
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
                  ? "fill-slate-500 dark:fill-slate-600"
                  : node.isMedium
                  ? "fill-slate-400 dark:fill-slate-700"
                  : "fill-slate-300 dark:fill-slate-800"
              }
              filter="url(#shadow)"
              initial="initial"
              animate={["animate", "float"]}
              whileHover="hover"
              variants={{
                ...nodeAnimationVariants,
                float: {
                  y: node.isMain
                    ? [-0.2, 0.2, -0.2]
                    : node.isMedium
                    ? [-0.5, 0.5, -0.5]
                    : [-0.3, 0.3, -0.3],
                  transition: {
                    duration: node.isMain ? 6 : node.isMedium ? 5 : 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: node.delay,
                  },
                },
              }}
              custom={node.delay}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
