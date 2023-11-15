import PropTypes from "prop-types";
import { useContext } from "react";
import ClientCard from "./client_card.jsx";
import { UserContext } from "../../../../App.jsx";

function ClientSelect({ selectedClient, handleClientChange }) {
  const { user } = useContext(UserContext);
  const clients = user.app_metadata?.Clients || [];
  const selectedClientObject = clients.find((client) => client.name === selectedClient);

  return (
    <div className="w-80 overflow-y-auto h-[60vh] ml-5 scrollbar scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-slate-500">
      <div className="flex flex-col flex-wrap">
      {selectedClient === '' ? (clients.map((client) => (
          <ClientCard
            key={client.name}
            client={client}
            selected={client.name === selectedClient}
            onClick={() => handleClientChange(client)}
          />
        ))) : (
          <ClientCard
            key={selectedClientObject.name}
            client={selectedClientObject}
            selected={true} // Since this is the selected client, set selected to true
            onClick={() => handleClientChange('')} // Handle deselection when clicking on the selected client
          />
        )}
      </div>
    </div>
  );
}

ClientSelect.propTypes = {
  selectedClient: PropTypes.string.isRequired,
  handleClientChange: PropTypes.func.isRequired,
};

export default ClientSelect;