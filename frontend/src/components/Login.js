import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ReactDOM from 'react-dom';
import apiBaseUrl from '../constants';
import { store } from '../store/configureStore';
import UserInfo from '../store/userClass';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'


class Login extends Component {
    constructor(props)  {
        super(props);
        this.state={
            email:'',
            password:''
        };
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        this.setState({[fieldName]:fieldVal});
    }

    handleSubmit(event) {
        event.preventDefault();
        var payload={
            "email":this.state.email,
            "password":this.state.password
        };
        fetch(apiBaseUrl+'user/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(function (response) {
            console.log(response);
            var alertVariant = 'danger';
            if (response.status!==true) {
                ReactDOM.render(
                    <Alert variant={alertVariant}>
                        {response["message"]}
                    </Alert>, 
                    document.getElementById("apimessage"));
            } else {
                const userInfo = new UserInfo();
                userInfo.email = response.account.email;
                userInfo.token = response.account.token;
                const action = { type: "UPDATE_USERIDS", value: userInfo };
                store.dispatch(action);
                console.log(store.getState());
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        if (store.getState().userInfo.token !== '') {
            return <Redirect to='/' />;
        }
        return (
            <div>
                <div id="banner" className="jumbotron">
                    <h1 className="display-4">Login to your account!</h1>
                    <hr />
                    <p>You don't have an account yet? Then <Link to="/register">register</Link>.</p>
                </div>
                <Form onSubmit={(event) => this.handleSubmit(event)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" defaultValue={this.state.email} onChange={this.handleChange.bind(this)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
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

export default Login;