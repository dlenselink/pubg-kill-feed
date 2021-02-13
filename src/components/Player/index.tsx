import React from "react";
import { useGlobalState } from "Components/Context";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 250,
    tableLayout: "fixed"
  },
});

export const Player = () => {
  const globalState = useGlobalState();
  const classes = useStyles();
  const s = globalState.playerStats;

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">K/D</TableCell>
              <TableCell align="right">ADR</TableCell>
              <TableCell align="right">Win %</TableCell>
              <TableCell align="right">Top 10 %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={0}>
              <TableCell component="th" scope="row">Solo</TableCell>
              <TableCell align="right">{s.solo.kdr}</TableCell>
              <TableCell align="right">{s.solo.adr}</TableCell>
              <TableCell align="right">{s.solo.win_percentage}</TableCell>
              <TableCell align="right">{s.solo.top10_percentage}</TableCell>
            </TableRow>
            <TableRow key={1}>
              <TableCell component="th" scope="row">Solo FPP</TableCell>
              <TableCell align="right">{s.solo_fpp.kdr}</TableCell>
              <TableCell align="right">{s.solo_fpp.adr}</TableCell>
              <TableCell align="right">{s.solo_fpp.win_percentage}</TableCell>
              <TableCell align="right">{s.solo_fpp.top10_percentage}</TableCell>
            </TableRow>
            <TableRow key={2}>
            <TableCell component="th" scope="row">Duo</TableCell>
              <TableCell align="right">{s.duo.kdr}</TableCell>
              <TableCell align="right">{s.duo.adr}</TableCell>
              <TableCell align="right">{s.duo.win_percentage}</TableCell>
              <TableCell align="right">{s.duo.top10_percentage}</TableCell>
            </TableRow>
            <TableRow key={3}>
            <TableCell component="th" scope="row">Duo FPP</TableCell>
              <TableCell align="right">{s.duo_fpp.kdr}</TableCell>
              <TableCell align="right">{s.duo_fpp.adr}</TableCell>
              <TableCell align="right">{s.duo_fpp.win_percentage}</TableCell>
              <TableCell align="right">{s.duo_fpp.top10_percentage}</TableCell>
            </TableRow>
            <TableRow key={4}>
            <TableCell component="th" scope="row">Squad</TableCell>
              <TableCell align="right">{s.squad.kdr}</TableCell>
              <TableCell align="right">{s.squad.adr}</TableCell>
              <TableCell align="right">{s.squad.win_percentage}</TableCell>
              <TableCell align="right">{s.squad.top10_percentage}</TableCell>
            </TableRow>
            <TableRow key={5}>
            <TableCell component="th" scope="row">Squad FPP</TableCell>
              <TableCell align="right">{s.squad_fpp.kdr}</TableCell>
              <TableCell align="right">{s.squad_fpp.adr}</TableCell>
              <TableCell align="right">{s.squad_fpp.win_percentage}</TableCell>
              <TableCell align="right">{s.squad_fpp.top10_percentage}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
