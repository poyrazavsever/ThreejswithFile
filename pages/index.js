import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Text } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { useEffect, useState } from 'react';

function Moon() {
  const { scene } = useGLTF('/models/moon.glb');

  const [close, setClose] = useState(false);

  const { scale, position } = useSpring({
    scale: close ? [1, 1, 1] : [0.2, 0.2, 0.2],
    position: close ? [0, 0, 1] : [0, 0, 3],
    config: { mass: 13, tension: 670, friction: 260 },
  });

  useEffect(() => {
    setClose(true);
  }, []);

  return (
    <animated.primitive
      object={scene}
      scale={scale}
      position={position}
    />
  );
}

function TheMoonText() {
  return (
    <>
      <Text
        position={[0, 2, 0]} 
        fontSize={0.5}
        fontWeight={800}
        color="gray"
        anchorX="center"
        anchorY="middle"
      >
        The Moon
      </Text>

      <Text
        position={[2, 0.5, 0]}
        fontSize={0.2}
        color="lightgray"
        anchorX="left"
        anchorY="middle"
        maxWidth={2}
      >
        Did you know? The Moon is Earth's only natural satellite and is about 4.5 billion years old.
      </Text>
    </>
  );
}

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Moon />
        <TheMoonText />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
