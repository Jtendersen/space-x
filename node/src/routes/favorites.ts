import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favorites";
import { auth } from "../middlewares/auth";

export default (router) => {
  router.get("/favorites", auth, getFavorites);
};
