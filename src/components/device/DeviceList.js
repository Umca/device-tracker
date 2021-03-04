import React from "react";
import DeviceListItem from "./DeviceListItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as deviceActions from "../../actions/DeviceActions";
import firebase from "../../Firebase";

class DeviceList extends React.Component {
  componentWillMount() {
    let me = this,
      currentUser = firebase.auth().currentUser;

    this.state = {
      query: "",
      devices: [],
    };

    if (!currentUser) {
      me.props.deviceAction.authAndLoadDevices();
    } else {
      me.props.deviceAction.loadDevices();
    }
  }

  searchDevice(event) {
    let query = event.target.value || "";
    this.setState({ query: query });
  }

  render() {
    const devices = this.props.devices.length ? this.props.devices : [];

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col m12">
              <input
                onChange={this.searchDevice.bind(this)}
                placeholder="SEARCH BY NAME/MODEL/IMEI"
                ref="searchBox"
              />
            </div>
          </div>

          <table className="bordered striped responsive-table">
            <thead>
              <tr>
                <th>MODEL</th>
                <th>NAME</th>
                <th>OS</th>
                <th>IMEI</th>
                <th>USER</th>
                <th>WHITE LIST</th>
                <th>TRIBE</th>
              </tr>
            </thead>
            <tbody>
              {devices
                .sort((devA, devB) => {
                  if (devA.whitelist === "YES") return 1;
                  else return -1;
                })
                .filter((device) => {
                  return (
                    device.model
                      .toLowerCase()
                      .indexOf(this.state.query.toLowerCase()) >= 0 ||
                    device.name
                      .toLowerCase()
                      .indexOf(this.state.query.toLowerCase()) >= 0 ||
                    this.state.query === ""
                  );
                })
                .map((device, index) => {
                  return (
                    <DeviceListItem
                      device={device}
                      key={device.name}
                      index={index}
                      listItem={true}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    devices: state.devices,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deviceAction: bindActionCreators(deviceActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);
