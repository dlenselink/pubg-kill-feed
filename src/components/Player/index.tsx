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
import { allModesInOrder } from "Components/Utils";

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
  const body = [];
  const s = globalState.playerStats
    ? globalState.playerStats
    : defaultState.playerStats;

  for (const [key, val] of Object.entries(allModesInOrder) as [string, string][]) {
    body.push(
      <StyledTableRow key={key}>
        <TableCell component="th" scope="row">{val}</TableCell>
        <TableCell align="right">{s[key].kdr > 0 ? s[key].kdr : ""}</TableCell>
        <TableCell align="right">{s[key].adr > 0 ? s[key].adr : ""}</TableCell>
        <TableCell align="right">{s[key].win_percentage > 0 ? s[key].win_percentage : ""}</TableCell>
        <TableCell align="right">{s[key].top10_percentage > 0 ? s[key].top10_percentage : ""}</TableCell>
      </StyledTableRow>
    );
  } 
  
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table className={`${classes.table} player-table`} size="small" aria-label="PUBG season statis">
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
            {body}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
