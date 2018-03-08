import React, { Component } from 'react';
import logo from './logo.svg';
import styled from 'styled-components'
import './App.css';

import * as firebase from 'firebase'

const title = firebase.database().ref('Title')
const testDB = firebase.database().ref('Test')
const provider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()

const Button = styled.button`
    padding: 10px 25px;
    font-size: 24px;
`

const Container = styled.div`
`

class App extends Component {
    constructor() {
        super()
        this.state = {
            title: 'Welcome',
            dbChildren: [],
            status: true
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
        this.loginWithFacebook = this.loginWithFacebook.bind(this)
        this.loginWithGoogle = this.loginWithGoogle.bind(this)

        testDB.once('value')
        .then(snap => {
            const dbChildren = []
            snap.forEach(childSnap => {
                dbChildren.push(childSnap.val())
            })
            this.setState({dbChildren: dbChildren})
        })
    }

    componentDidMount() {
        title.on('value', snap => {
            this.setState({title: snap.val()})
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const v = e.target.title.value
        title.set(v)
    }

    toggleStatus() {
        this.state.status ? this.setState({status: false}) :
        this.setState({status: true})

        this.state.status ? firebase.database().goOnline() :
        firebase.database().goOffline()
    }

    loginWithGoogle() {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
        });    }

        loginWithFacebook() {
            firebase.auth().signInWithPopup(facebookProvider).then(function(result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">{this.state.title}</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <form action="#" onSubmit={this.handleSubmit}>
                    <input type="text" name="title"/>
                    <input type="submit"/>
                </form>
                <Button onClick={this.toggleStatus}>Toggle status</Button>
                <Container>
                    <ul>
                        {this.state.dbChildren.map((child, i) => {
                            return(
                                <li key={i}>
                                    {child}
                                </li>
                            )
                        })}
                    </ul>
                </Container>
                <Button onClick={this.loginWithGoogle}>Google Signin</Button>
                <Button onClick={this.loginWithFacebook}>Facebook Signin</Button>
            </div>
        );
    }
}

export default App;
