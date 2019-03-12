import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        ReactDOM.render(
            <div>
                <h1 className="display-4">Home</h1>
            </div>, 
            document.getElementById("banner"));
    }

    render () {
        return (
            <div>
                <h1>Connected</h1>
            </div>
        )
    }
}

export default Home;