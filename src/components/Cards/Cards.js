import React from "react";
import { Cards } from "./styled";
import { Container } from "./styled";

export const CardMusic = (props) => {
  return (
    <Container>
      <Cards onClick={props.onClick}>
        <h5>{props.id}</h5>
        <h3>{props.title}</h3>
        <p>{props.author}</p>
        <h4>{props.date}</h4>
        <h4>{props.file}</h4>
      </Cards>
    </Container>
  );
};
