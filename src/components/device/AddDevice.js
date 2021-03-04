import React from 'react';
import firebase from "../../Firebase";

export default class AddDevice extends React.Component {
    componentWillMount() {
        let deviceName = this.props.match.params.deviceName || "";
        this.state = { device: undefined };
        this.loadDevice(deviceName);
    }

    loadDevice(deviceName) {
        firebase.auth().signInAnonymously().then(user => {
            firebase.database().ref('devices/' + deviceName).once('value').then(result => {
                const device = result.val();
                this.setState({
                    device: device
                });

                this.refs.name.value = deviceName;

                if(device) {
                    this.refs.name.value = device.name;
                    this.refs.os.value = device.os;
                    this.refs.imei.value = device.imei;
                    this.refs.whitelist.value = device.whitelist;
                    this.refs.tribe.value = device.tribe;
                    this.refs.model.value = device.model;
                }
            });
        });
    }

    save() {
        let model = this.refs.model.value;
        let name = this.refs.name.value;
        let os = this.refs.os.value;
        let imei = this.refs.imei.value;
        let whitelist = this.refs.whitelist.value;
        let tribe = this.refs.tribe.value;

        let updates = {};
        let device = {
            name: name,
            model: model,
            os: os,
            imei: imei,
            tribe: tribe,
            whitelist: whitelist,
            reserver: (this.state.device && this.state.device.reserver) ? this.state.device.reserver : ""
        };

        if(this.state.device && this.state.device.deviceUsers) device.deviceUsers = this.state.device.deviceUsers;

        updates['/devices/' + name] = device;

        firebase.database().ref().update(updates).then(()=>{ alert('success') });
    }


    render() {
        let {name = "", tribe = "", model = "", os = "", imei = "", whitelist = ""} = this.state.device || {};
        let title = this.state.device ? `Edit device ${name}` : `Add device ${this.props.match.params.deviceName}`;

        return (
            <div className="container">
                <div className="row">
                    <div className="col m12 center">
                        <h4>{title}</h4>
                    </div>

                    <div>
                        <label>Model</label><input type="text" defaultValue={model} ref="model"/>
                        <label>Name</label><input type="text" defaultValue={name} ref="name"/>
                        <label>OS</label><input type="text" defaultValue={os} ref="os"/>
                        <label>IMEI</label><input type="text" defaultValue={imei} ref="imei"/>
                        <label>White List (YES, NO)</label><input type="text" defaultValue={whitelist} ref="whitelist"/>
                        <label>Tribe</label><input type="text" defaultValue={tribe} ref="tribe"/>

                        <a onClick={this.save.bind(this)} className="waves-effect waves-light btn">Save</a>
                    </div>
                </div>
            </div>
        )
    }
}

