import React from "react";
import { defaultState, useGlobalState } from "Components/Context";
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 250,
    tableLayout: "fixed"
  },
});

export const Player = () => {
  const globalState = useGlobalState();
  const classes = useStyles();
  const s = globalState.playerStats
    ? globalState.playerStats
    : defaultState.playerStats;
  
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="right">K/D</StyledTableCell>
              <StyledTableCell align="right">ADR</StyledTableCell>
              <StyledTableCell align="right">Win %</StyledTableCell>
              <StyledTableCell align="right">Top 10 %</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
          <StyledTableRow key={0}>
            <TableCell component="th" scope="row">Solo</TableCell>
            <TableCell align="right">{s.solo.kdr}</TableCell>
            <TableCell align="right">{s.solo.adr}</TableCell>
            <TableCell align="right">{s.solo.win_percentage}</TableCell>
            <TableCell align="right">{s.solo.top10_percentage}</TableCell>
          </StyledTableRow>
          <StyledTableRow key={1}>
            <TableCell component="th" scope="row">Solo FPP</TableCell>
            <TableCell align="right">{s.solo_fpp.kdr}</TableCell>
            <TableCell align="right">{s.solo_fpp.adr}</TableCell>
            <TableCell align="right">{s.solo_fpp.win_percentage}</TableCell>
            <TableCell align="right">{s.solo_fpp.top10_percentage}</TableCell>
          </StyledTableRow>
          <StyledTableRow key={2}>
          <TableCell component="th" scope="row">Duo</TableCell>
            <TableCell align="right">{s.duo.kdr}</TableCell>
            <TableCell align="right">{s.duo.adr}</TableCell>
            <TableCell align="right">{s.duo.win_percentage}</TableCell>
            <TableCell align="right">{s.duo.top10_percentage}</TableCell>
          </StyledTableRow>
          <StyledTableRow key={3}>
          <TableCell component="th" scope="row">Duo FPP</TableCell>
            <TableCell align="right">{s.duo_fpp.kdr}</TableCell>
            <TableCell align="right">{s.duo_fpp.adr}</TableCell>
            <TableCell align="right">{s.duo_fpp.win_percentage}</TableCell>
            <TableCell align="right">{s.duo_fpp.top10_percentage}</TableCell>
          </StyledTableRow>
          <StyledTableRow key={4}>
          <TableCell component="th" scope="row">Squad</TableCell>
            <TableCell align="right">{s.squad.kdr}</TableCell>
            <TableCell align="right">{s.squad.adr}</TableCell>
            <TableCell align="right">{s.squad.win_percentage}</TableCell>
            <TableCell align="right">{s.squad.top10_percentage}</TableCell>
          </StyledTableRow>
          <StyledTableRow key={5}>
          <TableCell component="th" scope="row">Squad FPP</TableCell>
            <TableCell align="right">{s.squad_fpp.kdr}</TableCell>
            <TableCell align="right">{s.squad_fpp.adr}</TableCell>
            <TableCell align="right">{s.squad_fpp.win_percentage}</TableCell>
            <TableCell align="right">{s.squad_fpp.top10_percentage}</TableCell>
          </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
