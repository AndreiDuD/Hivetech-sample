import PropTypes from "prop-types";
import "./clientcard.css";

function ClientCard({ client, selected, onClick }) {
  
  return (
    <div className="card">
      <a className={`card1 ${selected ? "active" : ""}`} onClick={onClick}>
        <p>{client.name}</p>
        <p className="small">{client.description}</p>
        {selected ? (
          <div className="go-corner-cross">
            <div className="go-cross">✖</div>
          </div>
        ) : (
          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        )}
      </a>
    </div>
  );
}

ClientCard.propTypes = {
  client: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ClientCard;
