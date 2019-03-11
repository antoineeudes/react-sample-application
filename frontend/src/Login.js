import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ReactDOM from 'react-dom';


class Login extends Component {
    constructor(props)  {
        super(props);
        this.state={
            email:'',
            password:''
        }
    }


    handleChange(event) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        this.setState({[fieldName]:fieldVal});
    }

    handleSubmit(event){
        event.preventDefault();
        var apiBaseUrl = "http://localhost:8000/api/user/login";
        var payload={
            "email":this.state.email,
            "password":this.state.password
        };
        console.log(payload)
        fetch(apiBaseUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(function (response) {
            var alertVariant = 'danger';
            if (response.status==true) {
                alertVariant="success";
            }
            ReactDOM.render(
                <Alert variant={alertVariant}>
                    {response["message"]}
                </Alert>, 
                document.getElementById("apimessage"));
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
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