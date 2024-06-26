import { Box, Tab, Tabs, Stack } from "@mui/material";
import React, { useState } from "react";

const BusinessTabs = [
  "PROMOCIONES",
  "CONDICIONES",
];

const BusinessNavTab = ({
  currentRowInBusinessTab,
  setCurrentNameTabInBusinessTab,
}) => {
  const [currenTabIndex, setCurrentTabIndex] = useState(0);

  //FIC: Evento Change
  const handleChange = (e) => {
    setCurrentNameTabInBusinessTab(e.target.innerText.toUpperCase());
    switch (e.target.innerText.toUpperCase()) {
      case "PROMOCIONES":
        setCurrentTabIndex(0);
        break;
      case "CONDICIONES":
        setCurrentTabIndex(1);
        break;
    }
  };
  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        mx: 1,
        padding: 0.5,
      }}
    >
      <Tabs
        value={currenTabIndex}
        variant={"fullWidth"}
        onChange={handleChange}
        aria-label="icon tabs example"
        textColor="inherit"
      >
        {BusinessTabs.map((tab) => {
          return (
            <Tab
              key={tab}
              label={tab}
              disabled={currentRowInBusinessTab === null}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default BusinessNavTab;
