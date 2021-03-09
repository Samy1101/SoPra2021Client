import React from "react";
import styled from "styled-components";
import {withRouter} from "react-router-dom";

const Container = styled.div`
  display: list-item;
  margin: 6px 0;
  width: auto;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;

const Attribute = styled.div`
  font-weight: bold;
  color: #06c4ff;
`;

const ProfileBox = ({attribute}) => {
    return (
        <Container>
            <Attribute>{attribute}</Attribute>
        </Container>);

};

export default withRouter(ProfileBox);