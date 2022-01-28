import React, { useContext } from "react";
import Stack from "@mui/material/Stack";

import AppContext from "../context/AppContext";
import ShowGateway from "../components/ShowGateway";

function Home() {
  const { gateways } = useContext(AppContext);

  return (
    <Stack direction="column" spacing={2} alignItems="center" marginTop={3}>
      {gateways.map((g) => (
        <ShowGateway key={g.id} gateway={g} />
      ))}
    </Stack>
  );
}

export default Home;
