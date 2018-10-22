import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Messages.css';

const socket = io.connect('http://localhost:4000')

export default class Messages extends Component {
    constructor(props) {
        super(props);


        this.state= {
            userId: null,
            messages: [],
            userInput: ''
        }
    }


    componentDidMount() {
        
        socket.on('message dispatched', this.updateMessages);
        socket.on('welcome', this.setUserId);
        axios.get('/test').then(res => {
            console.log(res);
        })
    }

    handleInput(e) {
        this.setState({userInput: e.target.value})
    }

    sendMessage() {
       this.setState({messages: [...this.state.messages, {message: this.state.userInput}]})
    }
    
    render() {
        console.log(this.state.messages)
        const{ messages, userInput, userId } = this.state;
        console.log(messages)
        const messagesToDisplay = messages.map((e, i) => {
            const styles =
                e.user === userId
                ? { alignSelf: 'flex-end', backgroundColor: '#2d96fb', color: 'white'}
                : { alignSelf: 'flex-end', backgroundColor: '#e5e6ea'}
            return(
                <p key={i} style={styles}>
                    {e.message}
                </p>
            )
        });

        return(
        <div className="Messages">
            <div className="messages">{messagesToDisplay}</div>
            <div className="input">
                <input value={userInput} onChange={(e) => this.handleInput(e)} onKeyPress={this.handleEnter} />
                <button onClick={e => this.sendMessage()}>Send</button>
            </div>
         </div>
        )
    }
}