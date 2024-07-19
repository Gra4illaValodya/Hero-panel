import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";
import { deleteHero } from "../../actions/index";
const HeroesListItem = ({ id, name, description, element }) => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  let elementClassName;

  switch (element) {
    case "fire":
      elementClassName = "bg-danger bg-gradient";
      break;
    case "water":
      elementClassName = "bg-primary bg-gradient";
      break;
    case "wind":
      elementClassName = "bg-success bg-gradient";
      break;
    case "earth":
      elementClassName = "bg-secondary bg-gradient";
      break;
    default:
      elementClassName = "bg-warning bg-gradient";
  }

  const deleteItem = async (e) => {
    e.preventDefault();
    try {
      await request(`http://localhost:3001/heroes/${id}`, "DELETE");
      dispatch(deleteHero(id));
    } catch (error) {
      console.error("Ошибка удаления героя:", error);
    }
  };
  return (
    <li
      className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
        className="img-fluid w-25 d-inline"
        alt="unknown hero"
        style={{ objectFit: "cover" }}
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
        <button
          type="button"
          className="btn-close btn-close"
          aria-label="Close"
          onClick={deleteItem}
        ></button>
      </span>
    </li>
  );
};

export default HeroesListItem;
