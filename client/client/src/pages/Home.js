import React, { useContext } from "react";
import Stack from "@mui/material/Stack";

import AppContext from "../context/AppContext";
import ShowGateway from "../components/ShowGateway";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function Home() {
  const { gateways } = useContext(AppContext);

  return (
    <Stack direction="row" spacing={2} alignItems="center" marginTop={3}>
      {/* {gateways.map((g) => (
        <ShowGateway key={g.id} gateway={g} />
      ))} */}
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Stack>
  );
}

export default Home;
