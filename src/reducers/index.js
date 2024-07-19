const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NEW_HERO":
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    case "DELETE_HERO":
      return {
        ...state,
        heroes: state.heroes.filter((hero) => hero.id !== action.payload),
      };
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    default:
      return state;
  }
};

export default reducer;
