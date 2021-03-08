import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
    }

   async componentDidMount() {
        try {
            const response = await api.get('/users/' + localStorage.getItem('idToFetch'));

            console.log(response.data)
            this.state.user = new User(response.data);

            //localStorage.removeItem('idToFetch');

        } catch(error){
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    render(){
        return (
            <Container>
                <h1>pls work, man</h1>
            </Container>
        )
    }
}

export default withRouter(Profile);