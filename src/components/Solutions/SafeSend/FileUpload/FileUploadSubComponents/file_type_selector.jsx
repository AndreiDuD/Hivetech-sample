import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../../../../App.jsx";
import { useContext } from "react";

function FileTypeSelector({ fileType, handleFileTypeChange }) {
  const { user, isAuthenticated } = useContext(UserContext);
  const [accessList, setAccessList] = useState([]);
  const [optionsLoaded, setOptionsLoaded] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const accessRoleList = user?.app_metadata?.roles || [];
      setAccessList(accessRoleList);
      setOptionsLoaded(true);
    }
  }, [isAuthenticated, user]);

  const renderFileTypeOptions = () => {
    if (optionsLoaded) {
      const availableOptions = [];

      if (accessList.includes("Hivetech")) {
        availableOptions.push(
          <option key="tb" value="xlsx">
            TB
          </option>,
          <option key="gl" value="docx">
            GL
          </option>
        );
      }

      if (accessList.includes("Payroll")) {
        availableOptions.push(
          <option key="payroll1" value="3">
            Payroll_1
          </option>,
          <option key="payroll2" value="4">
            Payroll_2
          </option>
        );
      }

      // Add more file type options as needed

      return availableOptions;
    } else {
      // If options are not loaded yet, display a loading indicator or a message
      return <option value="">Loading options...</option>;
    }
  };

  return (
    <td className="px-4 py-2">
      <select
        value={fileType}
        onChange={handleFileTypeChange}
        className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg"
      >
        <option key="" value=""></option>
        {renderFileTypeOptions()}
      </select>
    </td>
  );
}

FileTypeSelector.propTypes = {
  fileType: PropTypes.string.isRequired,
  handleFileTypeChange: PropTypes.func.isRequired,
};

export default FileTypeSelector;
