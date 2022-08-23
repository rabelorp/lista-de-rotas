import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import api from "./providers/api";
import FullScreenDialog, { IRef } from "./components/dialog/dialog";

function Location(
  description: string,
  data_inicio: string,
  data_fim: string,
  plataforma: string,
  localizacao: string
) {
  return { description, data_inicio, data_fim, plataforma, localizacao };
}

function Row(props: { row: ReturnType<typeof Location> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const popupRef = useRef<IRef>(null);

  return (
    <>
      <FullScreenDialog
        title="Visualizar"
        location={row.localizacao}
        ref={popupRef}
      />
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {" "}
          {row.description}
        </TableCell>
        <TableCell align="right">{row.data_inicio}</TableCell>
        <TableCell align="right">{row.data_fim}</TableCell>
        <TableCell align="right">{row.plataforma}</TableCell>
        <TableCell align="right">{row.localizacao}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Localização
              </Typography>
              <Table size="small" aria-label="locations">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {" "}
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          popupRef.current?.handleClickOpen("raveki")
                        }
                      >
                        Visualizar
                      </Button>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button variant="outlined" color="warning">
                        Editar
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" color="error">
                        Deletar
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function Home() {
  const [localizations, setLocalizations] = useState([]);

  useEffect(() => {
    api.get("/localizations").then((response: any) => {
      setLocalizations(response.data);
    });
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ height: "100vh" }}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Descrição</TableCell>
                  <TableCell align="right">Data Inicio</TableCell>
                  <TableCell align="right">Data Fim</TableCell>
                  <TableCell align="right">Plataforma</TableCell>
                  <TableCell align="right">Localização</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {localizations.map((localization, index) => (
                  <Row key={index} row={localization} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}

export default Home;
