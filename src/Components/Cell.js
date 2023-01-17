import React from "react";
import "../styles/Cell.css"

export default function Cell(props) {

  const handleClick = (evt) => {
    // call up to the board to flip cells around this cell
    props.flipCellsAroundMe();
  }

  let classes = "Cell" + (props.isLit ? " Cell-lit" : "");

  return (
      <td className={classes} onClick={handleClick} />
  );
}