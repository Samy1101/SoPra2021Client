import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import User from '../shared/models/User';
import {withRouter} from 'react-router-dom';
import {Button} from '../../views/design/Button';
import {Spinner} from "../../views/design/Spinner";
import ProfileBox from "../../views/ProfileBox";
import DatePicker from 'react-date-picker';

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  
`;

const Attribute = styled.div`
  font-weight: bold;
  color: #06c4ff;
`;


const EditableContainer = styled.div`
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
  margin-top: 20px;
`;


class ProfileEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            editUsername: null,
            editBirthday: null,
        }
    }

    async componentDidMount() {
        try {
            const response = await api.get('/users/' + localStorage.getItem('userId'));

            // fake loading time
            await new Promise(resolve => setTimeout(resolve, 1000));

            this.setState({user: new User(response.data)})

            console.log(response.data)

            //localStorage.removeItem('idToFetch');

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }


    async updateUser() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.user.username,
                birthDate: this.state.user.birthday
            });

            await api.put('/users/' + localStorage.getItem('userId'), requestBody)

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }


    render() {
        return (
            <Container>
                {!this.state.user ? (
                    <Spinner/>
                ) : (
                    <PlayerContainer>
                        <Label>Edit your profile page!</Label>

                        {!this.state.editUsername ? (
                            <EditableContainer>
                                <Attribute>{"Username: " + this.state.user.username}</Attribute>
                                <Button
                                    width="50%"
                                    onClick={() => {
                                        this.setState({"editUsername": true});
                                    }}
                                >
                                    Edit
                                </Button>
                            </EditableContainer>
                        ) : (
                            <EditableContainer>
                                <InputField
                                    placeholder="Enter new username here"
                                    onChange={e => {
                                        this.setState(prevState => {
                                            let user = Object.assign({}, prevState.user);
                                            user.username = e.target.value;
                                            return {user}
                                        })
                                    }}
                                />
                                <Button
                                    width="50%"
                                    onClick={() => {
                                        this.updateUser();
                                        this.setState({"editUsername": false});
                                    }}
                                >
                                    Save
                                </Button>
                            </EditableContainer>
                        )}

                        <ProfileBox attribute={"OnlineStatus: " + this.state.user.status}/>
                        <ProfileBox attribute={"Creation Date: " + this.state.user.creationDate}/>

                        {!this.state.editBirthday ? (
                            <EditableContainer>
                                <Attribute>{"Birthday: " + this.state.user.birthday}</Attribute>
                                <Button
                                    width="50%"
                                    onClick={() => {
                                        this.setState({"editBirthday": true});
                                    }}
                                >
                                    Edit
                                </Button>
                            </EditableContainer>
                        ) : (
                            <EditableContainer>
                                <InputField
                                    placeholder="Enter new birthday here"
                                    onChange={e => {
                                        this.setState(prevState => {
                                            let user = Object.assign({}, prevState.user);
                                            user.birthday = e.target.value;
                                            return {user}
                                        })
                                    }}
                                />
                                <Button
                                    width="50%"
                                    onClick={() => {
                                        this.updateUser();
                                        this.setState({"editBirthday": false});
                                    }}
                                >
                                    Save
                                </Button>
                            </EditableContainer>
                        )}
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

export default withRouter(ProfileEditor);