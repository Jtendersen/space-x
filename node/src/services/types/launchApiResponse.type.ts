export interface Launch {
  flight_number: number;
  mission_name: string;
  mission_id: any[];
  upcoming: boolean;
  launch_year: string;
  launch_date_unix: number;
  launch_date_utc: Date;
  launch_date_local: Date;
  is_tentative: boolean;
  tentative_max_precision: string;
  tbd: boolean;
  launch_window: number;
  rocket: Rocket;
  ships: any[];
  telemetry: Telemetry;
  launch_site: LaunchSite;
  launch_success: boolean;
  launch_failure_details: LaunchFailureDetails;
  links: Links;
  details: string;
  static_fire_date_utc: Date;
  static_fire_date_unix: number;
  timeline: Timeline;
  crew: null;
}

export interface LaunchFailureDetails {
  time: number;
  altitude: null;
  reason: string;
}

export interface LaunchSite {
  site_id: string;
  site_name: string;
  site_name_long: string;
}

export interface Links {
  mission_patch: string;
  mission_patch_small: string;
  reddit_campaign: null;
  reddit_launch: null;
  reddit_recovery: null;
  reddit_media: null;
  presskit: null;
  article_link: string;
  wikipedia: string;
  video_link: string;
  youtube_id: string;
  flickr_images: any[];
}

export interface Rocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
  first_stage: FirstStage;
  second_stage: SecondStage;
  fairings: Fairings;
}

export interface Fairings {
  reused: boolean;
  recovery_attempt: boolean;
  recovered: boolean;
  ship: null;
}

export interface FirstStage {
  cores: Core[];
}

export interface Core {
  core_serial: string;
  flight: number;
  block: null;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  land_success: null;
  landing_intent: boolean;
  landing_type: null;
  landing_vehicle: null;
}

export interface SecondStage {
  block: number;
  payloads: Payload[];
}

export interface Payload {
  payload_id: string;
  norad_id: any[];
  reused: boolean;
  customers: string[];
  nationality: string;
  manufacturer: string;
  payload_type: string;
  payload_mass_kg: number;
  payload_mass_lbs: number;
  orbit: string;
  orbit_params: OrbitParams;
}

export interface OrbitParams {
  reference_system: string;
  regime: string;
  longitude: null;
  semi_major_axis_km: null;
  eccentricity: null;
  periapsis_km: number;
  apoapsis_km: number;
  inclination_deg: number;
  period_min: null;
  lifespan_years: null;
  epoch: null;
  mean_motion: null;
  raan: null;
  arg_of_pericenter: null;
  mean_anomaly: null;
}

export interface Telemetry {
  flight_club: null;
}

export interface Timeline {
  webcast_liftoff: number;
}

export type LaunchesResponse = Launch[];
