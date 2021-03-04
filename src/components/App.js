import React from 'react';
import Login from './login/Login';
import styled from "styled-components";
import  "materialize-css/bin/materialize.css";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DeviceList from './device/DeviceList'
import AddDevice from './device/AddDevice'

const Head = styled.div` margin: 0; padding: 5px;`;
const Logo = styled.h4` color:white; `;

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Head className="orange white-text">
                        <div className="row">
                            <div className="col m9">
                                <Link to="/"><Logo>Device tracker</Logo></Link>
                            </div>
                            <div className="col m3">
                                <Login/>
                            </div>
                        </div>
                    </Head>

                    <Route exact path="/" component={DeviceList}/>
                    <Route path="/content" component={DeviceList}/>
                    <Route path="/device/:deviceName" component={AddDevice}/>
                </div>
            </Router>
        )
    }
}