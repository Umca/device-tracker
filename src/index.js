import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'
import App from './components/App'

const store = configureStore();

class Main extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById('root'));