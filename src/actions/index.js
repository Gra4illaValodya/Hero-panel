import { ReducerType } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};
export const filtersFetching = () => {
  return {
    type: "FILTERS_FETCHING",
  };
};
export const deleteHero = (id) => {
  return { type: "DELETE_HERO", payload: id };
};
export const filterElement = (element) => {
  return { type: "FILTER_ELEMENT", payload: element };
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
export const activeFilter = (filter) => {
  return {
    type: "ACTIVE_FILTER",
    payload: filter,
  };
};
export const filtersFetched = (filter) => {
  return {
    type: "FILTERS_FETCHED",
    payload: filter,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};
