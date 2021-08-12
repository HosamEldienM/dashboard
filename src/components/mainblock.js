import { useHistory } from "react-router-dom";

const MainBlock = ({ color, name, number, icon, location }) => {
  const history = useHistory();
  return (
    <div
      className={`col-6 col-md-3 link  bgtwo p-3 rounded m-3 myshadow border-start  border-5 position-relative border-${color}`}
      onClick={() => history.push(`./${location}`)}
    >
      <div className="py-1 px-4 position-absolute top-0 start-50  translate-middle badge  bgone bg-gradient">
        <h3>{number}</h3>
      </div>
      <h4 className="mt-4">{name}</h4>

      <h1 className="txtone">
        <i className={`fa fa-${icon}`}></i>
      </h1>
    </div>
  );
};

export default MainBlock;
