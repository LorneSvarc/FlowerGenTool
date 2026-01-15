
import React, { useState, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Stars } from '@react-three/drei';
import Flower3D from './components/Flower3D';
import Decay3D from './components/Decay3D';
import Sprout3D from './components/Sprout3D';
import Overlay from './components/Overlay';
import { DEFAULT_FLOWER, DEFAULT_SPROUT } from './constants';
import { FlowerDNA, DecayDNA, SproutDNA } from './types';
import { generateFlowerDNA } from './services/geminiService';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'flower' | 'decay' | 'sprout'>('flower');
  const [dna, setDna] = useState<FlowerDNA>(DEFAULT_FLOWER);
  const [decayDna, setDecayDna] = useState<DecayDNA>({
    name: "Fracture",
    description: "A wound in the earth",
    size: 1.5,
    aspectRatio: 1.0,
    edgeWobble: 0.3,
    layer1Color: "#333333",
    layer2Color: "#555555",
    layer3Color: "#777777",
    crackCount: 8,
    crackWobble: 0.4,
    crack1Color: "#ffffff",
    crack2Color: "#cccccc",
    crack3Color: "#aaaaaa",
  });
  const [sproutDna, setSproutDna] = useState<SproutDNA>(DEFAULT_SPROUT);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = useCallback(async (prompt?: string, mood?: string) => {
    setIsLoading(true);
    try {
      const newDna = await generateFlowerDNA(prompt, mood);
      setDna(newDna);
    } catch (error) {
      console.error("Evolution failed:", error);
      // Fallback or notification could go here
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdateDNA = useCallback((updates: Partial<FlowerDNA>) => {
    setDna(prev => ({ ...prev, ...updates }));
  }, []);

  const handleUpdateDecayDNA = useCallback((updates: Partial<DecayDNA>) => {
    setDecayDna(prev => ({ ...prev, ...updates }));
  }, []);

  const handleUpdateSproutDNA = useCallback((updates: Partial<SproutDNA>) => {
    setSproutDna(prev => ({ ...prev, ...updates }));
  }, []);

  // Keyboard Interaction Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          handleGenerate();
          break;
        case 'KeyR':
          handleGenerate();
          break;
        case 'ArrowUp':
          handleUpdateDNA({ scale: Math.min(dna.scale + 0.05, 2) });
          break;
        case 'ArrowDown':
          handleUpdateDNA({ scale: Math.max(dna.scale - 0.05, 0.2) });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dna, handleGenerate, handleUpdateDNA]);

  return (
    <div className="w-full h-screen bg-black select-none">
      <Canvas
        shadows
        camera={{ position: [0, 2, 8], fov: 45 }}
        gl={{ antialias: true, stencil: false, depth: true }}
      >
        <color attach="background" args={['#050505']} />

        {/* Environment & Lighting */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="night" />

        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />

        <React.Suspense fallback={null}>
          {viewMode === 'flower' && (
            <Flower3D
              dna={dna}
              onPetalClick={(idx) => {
                // Interactive Feedback: Subtle pulse when clicking petals
                handleUpdateDNA({ glowIntensity: Math.min(dna.glowIntensity + 0.2, 4) });
                setTimeout(() => {
                  handleUpdateDNA({ glowIntensity: dna.glowIntensity });
                }, 200);
              }}
            />
          )}
          {viewMode === 'decay' && <Decay3D dna={decayDna} />}
          {viewMode === 'sprout' && <Sprout3D dna={sproutDna} />}
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={20}
            blur={2}
            far={4.5}
          />
        </React.Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      <Overlay
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        dna={dna}
        decayDna={decayDna}
        sproutDna={sproutDna}
        isLoading={isLoading}
        onGenerate={handleGenerate}
        onUpdateDNA={handleUpdateDNA}
        onUpdateDecayDNA={handleUpdateDecayDNA}
        onUpdateSproutDNA={handleUpdateSproutDNA}
      />

      {/* Loading Transition Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center pointer-events-none z-50 transition-opacity">
          <div className="flex flex-col items-center gap-4 animate-pulse">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            <span className="text-xs tracking-[0.3em] uppercase text-white font-light">Synthesizing DNA</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
