import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { addNewHero } from "../../actions/index";
import { v4 as uuidv4 } from "uuid";
const HeroesAddForm = () => {
  const { request } = useHttp();
  const [hero, setHero] = useState({ name: "", description: "", element: "" });
  const [filter, setFilter] = useState([]);
  const { filters, heroes } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await request("http://localhost:3001/filters");
        setFilter(data);
      } catch (error) {}
    };
    fetchFilters();
  }, []);

  const elementTranslation = {
    fire: "Огонь",
    water: "Вода",
    wind: "Ветер",
    earth: "Земля",
    all: "Все",
  };

  const testFunc = (e) => {
    setHero({
      ...hero,
      [e.target.name]: e.target.value,
    });
  };

  const test = async (e) => {
    e.preventDefault();
    const newHero = { ...hero, id: uuidv4() };
    try {
      const data = await request(
        "http://localhost:3001/heroes",
        "POST",
        JSON.stringify(newHero),
        {
          "Content-Type": "application/json",
        }
      );
      dispatch(addNewHero(newHero));

      setHero({ name: "", description: "", element: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={test}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          value={hero.name}
          onChange={(e) => testFunc(e)}
          placeholder="Как меня зовут?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="description"
          value={hero.description}
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
          onChange={(e) => testFunc(e)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={hero.element}
          onChange={(e) => testFunc(e)}
        >
          <option>Я владею элементом...</option>
          {filter.map((element) => {
            return (
              <option value={element} key={element}>
                {elementTranslation[element]}
              </option>
            );
          })}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
