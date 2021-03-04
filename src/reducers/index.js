const initialState = {
    //Need for login
    user: undefined,

    //All devices
    devices: []
};

export default function appState(state = initialState, action) {
    switch (action.type) {
        case "SET_USER":
            return {...state, user: action.payload};

        case "SET_DEVICES":
            return {...state, devices: action.payload};

        default: break;
    }

    return state;
}

