import React, { Component } from 'react';
import logo from './logo.svg';
import styled from 'styled-components'
import './App.css';
import fire from './fire'

const title = fire.database().ref('Title')

const Button = styled.button`
    padding: 10px 25px;
    font-size: 24px;
`

class App extends Component {
    constructor() {
        super()
        this.state = {
            title: 'Welcome',
            status: true
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
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

        this.state.status ? fire.database().goOnline() :
        fire.database().goOffline()    
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
            </div>
        );
    }
}

export default App;
