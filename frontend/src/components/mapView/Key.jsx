import keys from "../../data/keys";

const Key = () => {
  return (
    <div className="keys__container">
      <h3>Key</h3>
      <ul className="keys__list">
        {keys.map((key) => {
          return (
            <li className="key__item" style={{ color: key.color }}>
              {key.icon}
              <h5>{key.text}</h5>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Key;
