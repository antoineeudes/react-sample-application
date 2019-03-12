import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ReactDOM from 'react-dom';
import apiBaseUrl from '../constants';
import Login from './Login';
import { store } from '../store/configureStore';
import App from '../App';
import UserInfo from '../store/userClass';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Register extends Component {
    constructor(props)  {
        super(props);
        this.state={
            email:'',
            password:''
        };
        ReactDOM.render(
            <Router>
                <div>
                    <h1 className="display-4">Register</h1>
                    <p>You already have an account? Then <Link to="/login/">login</Link>.</p>
                    <Route path="/login/" component={Login} />        
                </div>
            </Router>, 
            document.getElementById("banner"));
        ReactDOM.render(this.render(), document.getElementById("root"))
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        this.setState({[fieldName]:fieldVal});
    }

    handleRegistrationSubmit(event) {
        event.preventDefault();
        var payload={
            "email":this.state.email,
            "password":this.state.password
        };
        console.log(payload)
        fetch(apiBaseUrl+'user/new', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(function (response) {
            console.log(response);
            var alertVariant = 'danger';
            if (response.status===true) {
                const userInfo = new UserInfo();
                userInfo.email = response.account.email;
                userInfo.token = response.account.token;
                const action = { type: "UPDATE_USERIDS", value: userInfo };
                store.dispatch(action);
                console.log(store.getState());
                // ReactDOM.render(<App />, document.getElementById("root"));
            }
            ReactDOM.render(
                <Alert variant={alertVariant}>
                    {response["message"]}
                </Alert>, 
                document.getElementById("apimessage"));
            console.log(response);
            return response;
        })
        .then(function () {
            ReactDOM.render(<App />, document.getElementById("root"));
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Form onSubmit={(event) => this.handleRegistrationSubmit(event)}>
                    <Form.Group controlId="formBasicRegistrationEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" defaultValue={this.state.email} onChange={this.handleChange.bind(this)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicRegistrationPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" defaultValue={this.state.password} onChange={this.handleChange.bind(this)} />
                    </Form.Group>
                    <div id="apimessage"></div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Register;