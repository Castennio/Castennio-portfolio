declare module "fluid-simulation-react" {
  import { ComponentType } from "react";

  interface FluidConfig {
    textureDownsample?: number;
    densityDissipation?: number;
    velocityDissipation?: number;
    pressureDissipation?: number;
    pressureIterations?: number;
    curl?: number;
    splatRadius?: number;
  }

  interface FluidSimulationProps {
    config?: FluidConfig;
    color?: number[][];
  }

  const FluidSimulation: ComponentType<FluidSimulationProps>;
  export default FluidSimulation;
}
