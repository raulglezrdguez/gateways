import React, { useContext } from "react";
import Stack from "@mui/material/Stack";

import AppContext from "../context/AppContext";
import ShowGateway from "../components/ShowGateway";

function Home() {
  const { gateways } = useContext(AppContext);

  return (
    <Stack
      direction="row"
      gap={2}
      justifyContent={"center"}
      alignItems="center"
      marginTop={3}
      flexWrap={"wrap"}
    >
      {gateways.map((g) => (
        <ShowGateway key={g.id} gateway={g} />
      ))}
    </Stack>
  );
}

export default Home;
