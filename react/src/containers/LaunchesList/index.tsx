import { useEffect, useContext, useState } from "react";
import { ModeContext } from "contexts/ModeContext";
import { Launch } from "types";
import { LaunchCard, Search, Pagination, CARDS_PER_PAGE } from "components";
import { getLaunches } from "../../api";
import "./index.scss";
import { useLocalStorage } from "hooks";

export const LaunchesList = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [filteredLaunches, setFilteredLaunches] = useState<Launch[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showAll } = useContext(ModeContext);
  const { favorites, updateFavorite } = useLocalStorage();

  const filterLaunches = () => {
    if (searchText.trim() !== "") {
      setCurrentPage(1);
    }

    const filtered = launches.filter((launch) => {
      const isFavorite = Boolean(favorites[launch.flight_number]);
      const matchesFavoriteFilter = showAll || isFavorite;
      const matchesSearchText =
        searchText.trim() === "" ||
        (launch.mission_name &&
          launch.mission_name.toLowerCase().includes(searchText.toLowerCase()));

      return matchesFavoriteFilter && matchesSearchText;
    });

    return setFilteredLaunches(
      filtered
      // launches.filter((l: Launch) => showAll || l.favorite)
    );
  };

  const loadLaunches = async () => {
    setIsLoading(true);
    try {
      const launches = await getLaunches();
      setLaunches(launches);
    } catch (error) {
      console.error("Error loading launches... ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLaunches();
  }, []);

  useEffect(filterLaunches, [searchText, showAll, launches]);

  return (
    <div className="launches-list-container">
      <Search value={searchText} onChange={setSearchText} />
      <div className="launches-list">
        {isLoading ? (
          <div className="loading">Loading or spinner component...</div>
        ) : (
          filteredLaunches
            .filter(
              (_: Launch, i: number) =>
                i >= CARDS_PER_PAGE * (currentPage - 1) &&
                i < CARDS_PER_PAGE * currentPage
            )
            .map((launch, i) => (
              <LaunchCard
                key={launch.flight_number}
                launch={{
                  ...launch,
                  favorite: Boolean(favorites[launch.flight_number]),
                }}
                updateFavorite={updateFavorite}
              />
            ))
        )}
      </div>
      <Pagination
        value={currentPage}
        onChange={setCurrentPage}
        itemsCount={filteredLaunches.length}
      />
    </div>
  );
};
