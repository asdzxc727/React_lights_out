import React, { useState } from "react";
import Cell from './Cell';
import "../styles/Board.css";

export default function Board(props) {
  const { nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 } = props;
  const [state, setState] = useState({ hasWon: false, board: createBoard() });
  const { board, hasWon } = state;


  function createBoard() {
    let board = [];
    for (let r = 0; r < nrows; r++) {
      let row = [];
      for (let c = 0; c < ncols; c++) {
        row.push(Math.random() < chanceLightStartsOn)
      }
      board.push(row);
    }
    // TODO: create array-of-arrays of true/false values
    return board
  }

  function flipCellsAround(coord) {

    let newBoard = board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        newBoard[y][x] = !newBoard[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);
    flipCell(y + 1, x);
    flipCell(y - 1, x);

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every(row => row.every(cell => !cell));
    // let hasWon = true;
    // for(let r = 0; r < this.props.nrows; r++){
    //   for(let c = 0; c< this.props.ncols; c++){
    //     if(!board[r][c]){
    //       hasWon = false;
    //     }
    //   }
    // }
    setState({ board: newBoard, hasWon: hasWon });
  }

  function makeTable() {
    let tblBoard = [];
    for (let r = 0; r < nrows; r++) {
      let row = [];
      for (let c = 0; c < ncols; c++) {
        let coord = `${r}-${c}`
        row.push(
          <Cell
            key={coord}
            isLit={board[r][c]}
            flipCellsAroundMe={() => flipCellsAround(coord)}
          />
        );
      }
      console.log(row)

      tblBoard.push(<tr key={r}>{row}</tr>);
    }
    return (
      <table className="Board">
        <tbody>
          {tblBoard}
        </tbody>
      </table>
    );
  }


  return (
    <div>
      {hasWon ? (
        <div className='winner'>
          <span className='neon-orange'>YOU</span>
          <span className='neon-blue'>WIN!</span>
        </div>
      ) : (
        <div>
          <div className='Board-title'>
            <div className='neon-orange'>Lights</div>
            <div className='neon-blue'>Out</div>
          </div>
          {makeTable()}
        </div>
      )}
    </div>
  );

}