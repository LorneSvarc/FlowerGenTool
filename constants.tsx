
import { FlowerDNA, SproutDNA } from './types';

export const DEFAULT_FLOWER: FlowerDNA = {
  name: "Neon Primrose",
  description: "A digital bloom that pulses with the rhythm of the cybernetic garden.",
  petalCount: 8,
  petalRows: 2,
  petalLength: 2.5,
  petalWidth: 1.2,
  petalCurvature: 0.5,
  petalColors: ["#ff0088"],
  centerColor: "#ffd700",
  stemColors: ["#228b22"],
  glowIntensity: 1.5,
  wobbleSpeed: 0.8,
  scale: 1.0,
  stemBend: 0.2,
  leafCount: 2,
  leafSize: 1.0,
  leafOrientation: 0,
  leafAngle: 0.5,
};

export const DEFAULT_SPROUT: SproutDNA = {
  name: "Nascent",
  description: "A moment of potential, not yet defined.",
  
  // Bud (emotions) - horizontal rows of scales
  budColor: "#DFFF00",        // Chartreuse - Indifferent (primary, bottom row)
  budStripe2Color: "#DFFF00", // Middle row
  budStripe3Color: "#DFFF00", // Top row
  budSize: 1.0,
  budPointiness: 0.5,         // Not exposed in UI, kept for flexibility
  
  // Stem (primary association)
  stemColor: "#9DC183",       // Sage green - Self Care
  stemHeight: 1.0,            // Fixed internally
  stemCurve: 0.1,
  stemThickness: 0.8,         // Fixed internally
  
  // Cotyledons (associations 2 & 3)
  cotyledon1Color: "#9DC183",
  cotyledon2Color: "#9DC183",
  cotyledonSize: 1.0,
  
  // Animation
  swaySpeed: 0.5,
  swayAmount: 0.2,
  
  // General - smaller than flowers
  scale: 0.55,
};

export const MOODS = [
  "Ethereal & Dreamy",
  "Cyberpunk Neon",
  "Ancient Fossilized",
  "Cosmic Nebula",
  "Zen Minimalist",
  "Lava & Magma"
];
