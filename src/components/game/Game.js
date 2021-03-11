import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import Player from '../../views/Player';
import {Spinner} from '../../views/design/Spinner';
import {Button} from '../../views/design/Button';
import {withRouter} from 'react-router-dom';

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null
        };
    }

    async logout() {
        try {
            const requestBody = JSON.stringify({
                token: localStorage.getItem('token'),
            });

            const response = await api.post('/users/logout', requestBody);

            localStorage.removeItem('token');
            localStorage.removeItem('username')
            localStorage.removeItem('userId')

            this.props.history.push('/login');
        } catch (error) {
            alert(`Something went wrong during the logout: \n${handleError(error)}`);
        }
    }

    async componentDidMount() {
        try {
            const response = await api.get('/users');
            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            this.setState({users: response.data});

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    routeToProfile(key) {
        localStorage.setItem('idToFetch', key);

        this.props.history.push('/game/profile')
    }

    render() {
        return (
            <Container>
                <h2>Happy Coding! </h2>
                <p>Get all users from secure end point:</p>
                {!this.state.users ? (
                    <Spinner/>
                ) : (
                    <div>
                        <Users>
                            {this.state.users.map(user => {
                                return (
                                    <PlayerContainer key={user.id}
                                                     onClick={() => {
                                                         this.routeToProfile(user.id);
                                                     }}>
                                        <Player user={user}/>
                                    </PlayerContainer>
                                );
                            })}
                        </Users>
                    </div>
                )}
                <ButtonContainer>
                    <Button
                        width= "auto"
                        onClick={() => {
                            this.logout();
                        }}
                    >
                        Logout
                    </Button>

                    <Button
                        width="50%"
                        onClick={() => {
                            this.props.history.push('/game/editor');
                        }}
                    >
                        Edit Own Profile
                    </Button>
                </ButtonContainer>

            </Container>
        );
    }

}

export default withRouter(Game);
