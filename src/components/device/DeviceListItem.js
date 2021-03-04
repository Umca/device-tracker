import React from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';
import * as deviceActions from '../../actions/DeviceActions'
import {bindActionCreators} from 'redux'

const DeviceModel = styled.p`
        color:#039be5;
        font-weight:bold;
        font-size:1.11em;
    `;

const ReserveButton = styled.button`
    cursor:pointer;
    border: ${props => props.reserved ? "1px solid red" : '1px solid green'} ;
    padding: 5px 25px 5px 25px;
    border-radius: 25px;
    font-size: 1.2em;
    width: 150px;
    color: ${props => props.reserved ? "white" : 'green'};
    background-color :  ${props => props.reserved ? "red" : 'transparent'};
    margin: 5px; 
    &:hover {
       border: ${props => props.reserved ? "1px solid green" : '1px solid red'} ;
       background-color : ${props => props.reserved ? "transparent" : 'red'};
       color: ${props => props.reserved ? "green" : 'white'};
    }
`;

class DeviceListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {updated: false};
    }

    reserve() {
        let username = this.props.user,
            device = this.props.device;

        if (username) {
            this.props.deviceAction.reserveDevice(device.name, username);
        } else {
            alert("Not logged in");
        }
    }

    render() {
        let device = this.props.device,
            listItem = this.props.listItem,
            reserve = device.reserver ? "Cancel" : "Reserve",
            reserveStatus = device.reserver ? device.reserver : "FREE";

        return (
            <tr>
                {
                    listItem ?
                        <td><DeviceModel>{device.model}</DeviceModel></td> :
                        <td>{device.model}</td>
                }
                <td><b>{device.name}</b></td>
                <td>{device.os}</td>
                <td>{device.imei}</td>
                <td>{reserveStatus}</td>
                <td>{device.whitelist}</td>
                <td>{device.tribe}</td>
                <td className="center">
                    {
                        this.props.device.reserver ?
                            (
                                this.props.device.reserver === this.props.user ?
                                    <ReserveButton reserved
                                                   onClick={this.reserve.bind(this)}>{reserve}</ReserveButton> :
                                    <b><p className="center red-text">Reserved</p></b>) :
                            <ReserveButton onMouseUp={this.reserve.bind(this)}>{reserve}</ReserveButton>
                    }
                </td>
            </tr>
        );
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
        deviceAction: bindActionCreators(deviceActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceListItem)