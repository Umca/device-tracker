import firebase from "../Firebase";

export function authAndLoadDevices() {
    return dispatch => {
        firebase.auth().signInAnonymously().then(user => {
            firebase.database().ref('devices/').once('value').then(result => {
                let fetchedDevices = result.val(),
                    devices = [];

                for (let device in fetchedDevices) {
                    if (fetchedDevices.hasOwnProperty(device)) {
                        devices.push(fetchedDevices[device]);
                    }
                }

                dispatch(setAllDevices(devices));
            }).catch(function (err) {
                console.log(err.message);
            });

        }).catch(function (error) {
            console.log(error.message);
        });
    }
}

export function loadDevices() {
    return dispatch => {
        firebase.auth().signInAnonymously().then(user => {
            firebase.database().ref('devices/').once('value').then(result => {
                let fetchedDevices = result.val(),
                    devices = [];

                for (let device in fetchedDevices) {
                    if (fetchedDevices.hasOwnProperty(device)) {
                        devices.push(fetchedDevices[device]);
                    }
                }

                dispatch(setAllDevices(devices));
            }).catch(function (err) {
                console.log(err.message);
            });

        }).catch(function (error) {
            console.log(error.message);
        });
    }
}

export function reserveDevice(deviceName, username) {
    return dispatch => {
        firebase.database().ref('devices/' + deviceName).once('value').then(result => {
            let fetchedDevice = result.val(),
                updates = {};

            if (fetchedDevice.reserver && fetchedDevice.reserver === username) {
                fetchedDevice.reserver = "";

                let deviceUsers = updateDeviceUsers(fetchedDevice.deviceUsers, username);
                fetchedDevice.deviceUsers = deviceUsers;
                updates[`devices/${deviceName}`] = fetchedDevice;
                firebase.database().ref().update(updates);

            } else if (fetchedDevice.reserver === "") {
                fetchedDevice.reserver = username;
            } else {
                alert("Already reserved by " + fetchedDevice.reserver);
            }

            updates['devices/' + fetchedDevice.name] = fetchedDevice;

            firebase.database().ref().update(updates).then(() => {

                firebase.auth().signInAnonymously().then(user => {
                    firebase.database().ref('devices/').once('value').then(result => {
                        let fetchedDevices = result.val(),
                            devices = [];

                        for (let device in fetchedDevices) {
                            if (fetchedDevices.hasOwnProperty(device)) {
                                devices.push(fetchedDevices[device]);
                            }
                        }

                        dispatch(setAllDevices(devices));
                    });
                })
            });
        });
    }
}

function updateDeviceUsers(device, newUser) {
    let devices = [];
    device = device ? device : {};
    Object.keys(device).forEach(user => {
        devices.push(device[user]);
    });

    devices.push({"user": newUser, "date": Date.now()});
    devices.sort( (a, b) => {
        return b.date - a.date;
    });

    return devices;
}


function setAllDevices(devices) {
    return {
        type: 'SET_DEVICES',
        payload: devices
    }

}