import { Launch } from "types";
import { addFavorite, removeFavorite } from "api/favorites";
import { ReactComponent as Star } from "assets/images/star.svg";
import "./index.scss";
import { useState } from "react";

interface LaunchCardProps {
  launch: Launch;
  updateFavorite: Function;
}

export const LaunchCard = ({ launch, updateFavorite }: LaunchCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClickFavorite = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await (launch.favorite
        ? removeFavorite(launch.flight_number)
        : addFavorite(launch.flight_number));
      updateFavorite(launch.flight_number);
    } catch (error) {
      console.error("Error setting favorite status... ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="launch-card">
      <div
        className="patch"
        style={{ backgroundImage: `url(${launch.mission_patch})` }}
      />
      <div className="content">
        <h3>{launch.mission_name}</h3>
        <span className="details">{launch.details}</span>
        <span className="date">
          {new Date(launch.launch_date_unix).toDateString()}
        </span>
        <Star
          onClick={handleClickFavorite}
          className={launch.favorite ? "active" : ""}
        />
      </div>
    </div>
  );
};
