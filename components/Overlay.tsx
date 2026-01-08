
import React, { useState } from 'react';
import { Sparkles, Wand2, RefreshCw, Palette, Leaf, Info, MessageSquare } from 'lucide-react';
import { FlowerDNA } from '../types';
import { MOODS } from '../constants';

interface OverlayProps {
  dna: FlowerDNA;
  isLoading: boolean;
  onGenerate: (prompt?: string, mood?: string) => void;
  onUpdateDNA: (updates: Partial<FlowerDNA>) => void;
}

const Overlay: React.FC<OverlayProps> = ({ dna, isLoading, onGenerate, onUpdateDNA }) => {
  const [prompt, setPrompt] = useState("");
  const [showControls, setShowControls] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(prompt);
  };

  return (
    <div className="fixed inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-10">
      {/* Top Header */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="glass p-6 rounded-2xl max-w-xs transition-all duration-500 hover:scale-105">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {dna.name}
          </h1>
          <p className="text-sm text-gray-400 mt-2 italic">
            "{dna.description}"
          </p>
        </div>

        <button
          onClick={() => setShowControls(!showControls)}
          className="glass p-3 rounded-full hover:bg-white/10 transition-colors"
        >
          {showControls ? <Leaf className="w-6 h-6" /> : <Palette className="w-6 h-6" />}
        </button>
      </div>

      {/* Main Interaction Area */}
      <div className="flex flex-col items-center gap-6 pointer-events-auto">
        {/* Floating Controls (Desktop Side) */}
        {showControls && (
          <div className="glass p-6 rounded-3xl w-full max-w-md animate-in slide-in-from-bottom-4 duration-300 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 sticky top-0 bg-transparent backdrop-blur-sm z-10 py-2">
              <Leaf className="w-5 h-5 text-green-400" /> Botanical Sculptor
            </h3>

            <div className="space-y-6">
              {/* Structure Section */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-1">Structure</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Petal Count</label>
                    <input
                      type="range" min="3" max="32" step="1"
                      value={dna.petalCount}
                      onChange={(e) => onUpdateDNA({ petalCount: parseInt(e.target.value) })}
                      className="w-full accent-pink-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Petal Rows</label>
                    <input
                      type="range" min="1" max="5" step="1"
                      value={dna.petalRows}
                      onChange={(e) => onUpdateDNA({ petalRows: parseInt(e.target.value) })}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Petal Length</label>
                    <input
                      type="range" min="0.5" max="5" step="0.1"
                      value={dna.petalLength}
                      onChange={(e) => onUpdateDNA({ petalLength: parseFloat(e.target.value) })}
                      className="w-full accent-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Petal Width</label>
                    <input
                      type="range" min="0.1" max="3" step="0.1"
                      value={dna.petalWidth}
                      onChange={(e) => onUpdateDNA({ petalWidth: parseFloat(e.target.value) })}
                      className="w-full accent-purple-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Curvature</label>
                    <input
                      type="range" min="0" max="1" step="0.05"
                      value={dna.petalCurvature}
                      onChange={(e) => onUpdateDNA({ petalCurvature: parseFloat(e.target.value) })}
                      className="w-full accent-indigo-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Overall Scale</label>
                    <input
                      type="range" min="0.5" max="2" step="0.1"
                      value={dna.scale}
                      onChange={(e) => onUpdateDNA({ scale: parseFloat(e.target.value) })}
                      className="w-full accent-orange-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Stem Bend</label>
                    <input
                      type="range" min="-1" max="1" step="0.1"
                      value={dna.stemBend || 0}
                      onChange={(e) => onUpdateDNA({ stemBend: parseFloat(e.target.value) })}
                      className="w-full accent-lime-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Stem Leaves</label>
                    <input
                      type="range" min="0" max="3" step="1"
                      value={dna.leafCount || 0}
                      onChange={(e) => onUpdateDNA({ leafCount: parseInt(e.target.value) })}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Leaf Size</label>
                    <input
                      type="range" min="0.5" max="2" step="0.1"
                      value={dna.leafSize || 1}
                      onChange={(e) => onUpdateDNA({ leafSize: parseFloat(e.target.value) })}
                      className="w-full accent-emerald-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Leaf Angle</label>
                    <input
                      type="range" min="0" max="1" step="0.1"
                      value={dna.leafAngle === undefined ? 0.5 : dna.leafAngle}
                      onChange={(e) => onUpdateDNA({ leafAngle: parseFloat(e.target.value) })}
                      className="w-full accent-teal-400"
                    />
                  </div>
                </div>
              </div>

              {/* Colors Section */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-1">Chromatics</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-3 space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500 block">Emotions (Petal Colors)</label>
                    <div className="flex gap-2">
                      {dna.petalColors?.map((color, index) => (
                        <div key={index} className="h-8 w-full rounded-lg overflow-hidden relative border border-white/20 group">
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => {
                              const newColors = [...(dna.petalColors || [])];
                              newColors[index] = e.target.value;
                              onUpdateDNA({ petalColors: newColors });
                            }}
                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                          />
                          <div className="w-full h-full" style={{ backgroundColor: color }} />
                          {/* Remove button if more than 1 */}
                          {dna.petalColors.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault(); // Prevent opening color picker
                                const newColors = dna.petalColors.filter((_, i) => i !== index);
                                onUpdateDNA({ petalColors: newColors });
                              }}
                              className="absolute top-0 right-0 h-4 w-4 bg-black/50 hover:bg-red-500 text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity z-20"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                      {/* Add button if less than 3 */}
                      {(!dna.petalColors || dna.petalColors.length < 3) && (
                        <button
                          onClick={() => {
                            const newColors = [...(dna.petalColors || ["#ff0088"]), "#ffffff"];
                            onUpdateDNA({ petalColors: newColors });
                          }}
                          className="h-8 w-8 flex-shrink-0 rounded-lg border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500 block">Center</label>
                    <div className="h-8 rounded-lg overflow-hidden relative border border-white/20">
                      <input
                        type="color"
                        value={dna.centerColor}
                        onChange={(e) => onUpdateDNA({ centerColor: e.target.value })}
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                      />
                      <div className="w-full h-full" style={{ backgroundColor: dna.centerColor }} />
                    </div>
                  </div>
                  <div className="col-span-3 space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500 block">Associations (Stem Colors)</label>
                    <div className="flex gap-2">
                      {dna.stemColors?.map((color, index) => (
                        <div key={index} className="h-8 w-full rounded-lg overflow-hidden relative border border-white/20 group">
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => {
                              const newColors = [...(dna.stemColors || [])];
                              newColors[index] = e.target.value;
                              onUpdateDNA({ stemColors: newColors });
                            }}
                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                          />
                          <div className="w-full h-full" style={{ backgroundColor: color }} />
                          {/* Remove button if more than 1 */}
                          {dna.stemColors.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault(); // Prevent opening color picker
                                const newColors = dna.stemColors.filter((_, i) => i !== index);
                                onUpdateDNA({ stemColors: newColors });
                              }}
                              className="absolute top-0 right-0 h-4 w-4 bg-black/50 hover:bg-red-500 text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity z-20"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                      {/* Add button if less than 3 */}
                      {(!dna.stemColors || dna.stemColors.length < 3) && (
                        <button
                          onClick={() => {
                            const newColors = [...(dna.stemColors || ["#228b22"]), "#228b22"];
                            onUpdateDNA({ stemColors: newColors });
                          }}
                          className="h-8 w-8 flex-shrink-0 rounded-lg border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Effects Section */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-1">Vitality</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Bioluminescence</label>
                    <input
                      type="range" min="0" max="3" step="0.1"
                      value={dna.glowIntensity}
                      onChange={(e) => onUpdateDNA({ glowIntensity: parseFloat(e.target.value) })}
                      className="w-full accent-yellow-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Vitality Speed</label>
                    <input
                      type="range" min="0.1" max="2" step="0.1"
                      value={dna.wobbleSpeed}
                      onChange={(e) => onUpdateDNA({ wobbleSpeed: parseFloat(e.target.value) })}
                      className="w-full accent-red-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Generator Bar */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl flex items-center gap-2 glass p-2 rounded-full shadow-2xl"
        >
          <div className="px-4 flex-1">
            <input
              type="text"
              placeholder="Describe your dream flower..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 font-medium"
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-all disabled:opacity-50 group"
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            )}
            <span>Evolve</span>
          </button>
        </form>

        {/* Mood Chips */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xl">
          {MOODS.map((m) => (
            <button
              key={m}
              onClick={() => onGenerate(prompt, m)}
              disabled={isLoading}
              className="px-4 py-1.5 rounded-full glass text-xs font-semibold hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="absolute bottom-6 left-6 text-[10px] text-gray-500 uppercase tracking-widest hidden md:block">
        Left Click: Rotate • Scroll: Zoom • Right Click: Pan • Click Petals: Interact
      </div>
    </div>
  );
};

export default Overlay;
