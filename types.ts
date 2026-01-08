
export interface FlowerDNA {
  name: string;
  description: string;
  petalCount: number;
  petalRows: number;
  petalLength: number;
  petalWidth: number;
  petalCurvature: number;
  petalColor: string;
  centerColor: string;
  stemColor: string;
  glowIntensity: number;
  wobbleSpeed: number;
  scale: number;
  stemBend: number;
  leafCount: number;
  leafSize: number;
  leafOrientation: number;
  leafAngle: number;
}

export interface GenerationRequest {
  prompt?: string;
  mood?: string;
}
