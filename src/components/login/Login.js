import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../../actions/LoginActions'
import styled from "styled-components";

const LoginButton = styled.button`
    border: ${props => props.reserved ? "1px solid transparent" : '1px solid white'} ;
    padding: 5px 25px 5px 25px;
    border-radius: 25px;
    font-size: 1.2em;
    color: ${props => props.reserved ? "white" : 'white'};
    background-color :  ${props => props.reserved ? "white" : 'transparent'};
    margin: 5px;    
    &:hover {
        color: ${props => props.reserved ? "white" : 'white'};
  } 
`;

class Login extends React.Component {
    componentWillMount() {
        this.props.loginActions.setUser(localStorage.getItem('username') || "");
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="center col s12 m12 l12">
                        {
                            !this.props.user ? <input name="username" placeholder="USERNAME" ref="username"/> : null
                        }
                        {
                            this.props.user ?
                                <LoginButton onClick={this.logOut.bind(this)}>Log out, {this.props.user}</LoginButton> :
                                <LoginButton onClick={this.login.bind(this)}>Log In</LoginButton>
                        }
                    </div>
                </div>
            </div>
        );
    }

    login() {
        let username = this.refs.username.value;
        if (username) {
            localStorage.setItem('username', username);
            this.props.loginActions.setUser(username);
        } else {
            alert("Enter your username");
        }
    }

    logOut() {
        this.props.loginActions.setUser(undefined);
        localStorage.removeItem('username');
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        devices: state.devices
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
