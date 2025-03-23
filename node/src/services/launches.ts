/* eslint-disable camelcase */
import { getUserFavorites } from "./favorites";
import { LaunchesResponse } from "./types/launchApiResponse.type";
import { RocketsResponse } from "./types/rocketApiResponse.type";

interface ProcessedLaunch {
  flight_number: number;
  mission_name: string;
  mission_patch: string;
  rocket: {
    rocket_id: string;
    rocket_name: string;
    active: boolean;
    cost_per_launch: number;
    company: string;
  };
  favorite?: boolean;
}

export const processLaunches = async (
  userId: string,
  launches: LaunchesResponse,
  rockets: RocketsResponse
): Promise<ProcessedLaunch[]> => {
  const userFavorites = await getUserFavorites(userId);

  return launches
    .map((launch) => {
      const rocketDetails = rockets.find(
        (rocket) => rocket.rocket_id === launch.rocket.rocket_id
      );
      if (!rocketDetails) {
        return null;
      }

      return {
        flight_number: launch.flight_number,
        mission_name: launch.mission_name,
        mission_patch: launch.links.mission_patch,
        launch_date_unix: launch.launch_date_unix,
        rocket: {
          rocket_id: rocketDetails.rocket_id,
          rocket_name: rocketDetails.rocket_name,
          active: rocketDetails.active,
          cost_per_launch: rocketDetails.cost_per_launch,
          company: rocketDetails.company,
        },
        favorite: userFavorites.some(
          (fav) => fav.flight_number === launch.flight_number
        ),
      };
    })
    .filter((launch) => launch !== null);
};
