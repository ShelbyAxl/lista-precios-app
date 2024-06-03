import { Box } from "@mui/material";
import { useState } from "react";
import RolesNavTab from "../components/tabs/RolesNavTab";
import RolesTable from "../components/tables/RolesTable";
import CondicionTab from "../../condicion/components/tables/CondicionTable";

const Roles = () => {
  const [currentRowInRolesTab, setCurrentRowInRolesTab] = useState(0);
  const [currentTabInPrincipalTab, setCurrentNameTabInBusinessTab] = useState("ROLES");
  return (

    <Box>
       <RolesNavTab 
          currentRowInBusinessTab={setCurrentRowInRolesTab}
          setCurrentNameTabInBusinessTab={setCurrentNameTabInBusinessTab}
       />
       {currentTabInPrincipalTab == "ROLES" && <RolesTable />}
       {currentTabInPrincipalTab == "CONDICION" && <CondicionTab />}
    </Box>
  );
};

export default Roles;
