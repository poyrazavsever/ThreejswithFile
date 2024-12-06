import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const ShirtModel = () => {
  const { scene } = useGLTF('/models/shirt.glb'); // GLB dosyasının yolu

  return <primitive object={scene} scale={1} />;
};

const ModalUploader = () => {
  return (
    <div>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} />
        <ShirtModel/>
      </Canvas>
    </div>
  );
};

export default ModalUploader;
