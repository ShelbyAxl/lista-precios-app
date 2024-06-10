import { Box } from "@mui/material";
import { useState } from "react";
import InstitutesTab from "../components/tabs/InstitutesTab";
import InstitutesNavTab from "../components/tabs/InstitutesNavTab";
import InstitutesTable from "../components/tables/InstitutesTable"
import Precios from "../../precios/pages/Precios";
import Roles from "../../roles/pages/Roles";
import Promociones from "../../promociones/pages/Promociones";
import Negocios from "../../negocios/pages/Negocios";


const Institutes = () => {

const [currentRowInInstitutesTab, setCurrentRowInInstitutesTab] = useState(null);
const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("INSTITUTOS"); 

  return (
    <Box>
      <InstitutesNavTab
        currentRowInInstitutesTab={setCurrentRowInInstitutesTab}
        setCurrentNameTabInPrincipalTab={setCurrentTabInPrincipalTab}
      />
      { currentTabInPrincipalTab === "INSTITUTOS" && <InstitutesTable /> }
      { currentTabInPrincipalTab === "PRECIOS" && <Precios /> }
      { currentTabInPrincipalTab === "ROLES" && <Roles /> }
      { currentTabInPrincipalTab === "PROMOCIONES" && <Promociones /> }
      { currentTabInPrincipalTab === "NEGOCIOS" && <Negocios /> }
    </Box>
  );
};

export default Institutes;
