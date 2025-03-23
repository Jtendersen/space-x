export interface Rocket {
  id: number;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: Date;
  country: string;
  company: string;
  height: Diameter;
  diameter: Diameter;
  mass: Mass;
  payload_weights: PayloadWeight[];
  first_stage: FirstStage;
  second_stage: SecondStage;
  engines: Engines;
  landing_legs: LandingLegs;
  flickr_images: string[];
  wikipedia: string;
  description: string;
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
}

export interface Diameter {
  meters: number;
  feet: number;
}

export interface Engines {
  number: number;
  type: string;
  version: string;
  layout: string;
  isp: ISP;
  engine_loss_max: number;
  propellant_1: string;
  propellant_2: string;
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
  thrust_to_weight: number;
}

export interface ISP {
  sea_level: number;
  vacuum: number;
}

export interface Thrust {
  kN: number;
  lbf: number;
}

export interface FirstStage {
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
}

export interface LandingLegs {
  number: number;
  material: null;
}

export interface Mass {
  kg: number;
  lb: number;
}

export interface PayloadWeight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}

export interface SecondStage {
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
  thrust: Thrust;
  payloads: Payloads;
}

export interface Payloads {
  option_1: string;
  composite_fairing: CompositeFairing;
}

export interface CompositeFairing {
  height: Diameter;
  diameter: Diameter;
}

export type RocketsResponse = Rocket[];
