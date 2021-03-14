import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import {Spinner} from "../../views/design/Spinner";
import ProfileBox from "../../views/ProfileBox";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const PlayerContainer = styled(BaseContainer)`
      display:inline-block;
      color: white;
      text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  margin-top: 2em;
  width: 36em;
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

            // fake loading time
            await new Promise(resolve => setTimeout(resolve, 1000));

            this.setState({user: new User(response.data)})

            console.log(response.data)

            //localStorage.removeItem('idToFetch');

        } catch(error){
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    render(){
        return (
            <Container>
                {!this.state.user ? (
                    <Spinner />
                    ) : (
                        <PlayerContainer>
                            <Label>Welcome to {this.state.user.username}s profile page!</Label>
                            <ProfileBox attribute = {"Username: " + this.state.user.username} />
                            <ProfileBox attribute = {"OnlineStatus: " + this.state.user.status} />
                            <ProfileBox attribute = {"Creation Date: " + this.state.user.creationDate} />

                            {/* Placeholder */}
                            <ProfileBox attribute = {"Birthdate: " + this.state.user.birthDate} />
                        </PlayerContainer>

                )}
                <ButtonContainer>
                    <Button
                        width="50%"
                        onClick={() => {
                            this.props.history.push('/game/dashboard');
                        }}
                    >
                        User List
                    </Button>
                </ButtonContainer>
            </Container>
        )
    }
}

export default withRouter(Profile);