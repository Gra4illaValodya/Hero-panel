import { v4 as uuidv4 } from "uuid";

export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};
export const addNewHero = (newHero) => {
  return { type: "ADD_NEW_HERO", payload: { ...newHero } };
};
export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};
