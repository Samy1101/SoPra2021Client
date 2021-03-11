import React from "react";
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import {Button} from "./design/Button";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
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


const ProfileBoxEditable = ({attribute}) => {
    return (
        <Container>
            <Attribute>{attribute}</Attribute>
            <Button
                width="50%"
                onClick={() => { return true;
                }}
            >
                Edit
            </Button>
        </Container>
    );
};

export default withRouter(ProfileBoxEditable);