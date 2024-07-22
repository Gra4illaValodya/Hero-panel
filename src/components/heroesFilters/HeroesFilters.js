import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import {
  filtersFetching,
  filtersFetched,
  activeFilter,
} from "../../actions/index";

const HeroesFilters = () => {
  const { filters, activeFilter: activeFilterState } = useSelector(
    (state) => state
  );
  console.log(filters);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((data) => {
        console.log(data);
        dispatch(filtersFetched(data));
      })
      .catch((error) => console.log(error));
  }, [dispatch, request]);

  const handleFilterClick = (filter) => {
    dispatch(activeFilter(filter));
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filters.map((el) => (
            <button
              className={`btn ${el.className} ${
                activeFilterState === el.name ? "active" : ""
              }`}
              value={el.name}
              key={el.name}
              onClick={() => handleFilterClick(el.name)}
            >
              {el.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
