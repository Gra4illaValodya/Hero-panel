const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  filterLoadingStatus: "idle",
  filteredHeroes: [],
  activeFilter: "all",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACTIVE_FILTER":
      return {
        ...state,
        activeFilter: action.payload,
        filteredHeroes:
          action.payload === "all"
            ? state.heroes
            : state.heroes.filter((hero) => hero.element === action.payload),
      };
    case "ADD_NEW_HERO":
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
        filteredHeroes:
          state.activeFilter === "all"
            ? [...state.heroes, action.payload]
            : state.activeFilter === action.payload.element
            ? [...state.filteredHeroes, action.payload]
            : state.filteredHeroes,
      };
    case "DELETE_HERO":
      return {
        ...state,
        heroes: state.heroes.filter((hero) => hero.id !== action.payload),
        filteredHeroes: state.filteredHeroes.filter(
          (hero) => hero.id !== action.payload
        ),
      };
    case "FILTER_ELEMENT":
      return {
        ...state,
        activeFilter: action.payload,
        filteredHeroes:
          action.payload === "all"
            ? state.heroes
            : state.heroes.filter((hero) => hero.element === action.payload),
      };
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "FILTERS_FETCHING":
      return {
        ...state,
        filterLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        filteredHeroes:
          state.activeFilter === "all"
            ? action.payload
            : action.payload.filter(
                (hero) => hero.element === state.activeFilter
              ),
        heroesLoadingStatus: "idle",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        filterLoadingStatus: "idle",
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
