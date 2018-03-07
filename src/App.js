import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fire from './fire'

const title = fire.database().ref('Title')

class App extends Component {
    constructor() {
        super()
        this.state = {
            title: 'Welcome'
        }

        this.handleSubmit = this.handleSubmit.bind(this)
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
            </div>
        );
    }
}

export default App;
