////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you
//
// Need some ideas?
//
// - Cause the message list to automatically scroll as new
//   messages come in
// - Highlight messages from you to make them easy to find
// - Highlight messages that mention you by your GitHub username
// - Group subsequent messages from the same sender
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import { render } from "react-dom";
import {
  login,
  sendMessage,
  subscribeToMessages
} from "./utils";
import "./index";

/*
Here's how to use the ChatUtils:

login((error, auth) => {
  // hopefully the error is `null` and you have a auth.github object
})

sendMessage(user, 'hello, this is a message')

const unsubscribe = subscribeToMessages(messages => {
  // here are your messages as an array, it will be called
  // every time the messages change
})

unsubscribe() // stop listening for new messages

The world is your oyster!
*/

class ScrollHandler extends React.Component {
  getSnapshotBeforeUpdate() {
    const {
      clientHeight,
      scrollTop,
      scrollHeight
    } = this.node;
    const partialPixelBuffer = 10;
    const scrolledUp =
      clientHeight + scrollTop <
      scrollHeight - partialPixelBuffer;
    return scrolledUp;
  }

  componentDidUpdate(prevProps, prevState, scrolledUp) {
    if (!scrolledUp) {
      this.node.scrollTop = this.node.scrollHeight;
    }
  }

  render() {
    return (
      <div {...this.props} ref={n => (this.node = n)} />
    );
  }
}

class Chat extends React.Component {
  state = {
    auth: null,
    messages: []
  };

  componentDidMount() {
    login((error, auth) => {
      this.setState({ auth });

      subscribeToMessages(messages => {
        this.setState({ messages });
      });
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const { auth } = this.state;
    const messageText = this.messageInput.value;

    if (/\S/.test(messageText)) {
      sendMessage(auth, messageText);
      event.target.reset();
    }
  };

  render() {
    const { auth, messages } = this.state;

    if (auth == null) return <p>Loading...</p>;

    const messageGroups = messages.reduce(
      (groups, message) => {
        const prevGroup =
          groups.length && groups[groups.length - 1];

        if (prevGroup && prevGroup[0].uid === message.uid) {
          prevGroup.push(message);
        } else {
          groups.push([message]);
        }

        return groups;
      },
      []
    );

    return (
      <div className="chat">
        <header className="chat-header">
          <h1 className="chat-title">Chat app!</h1>
          <p className="chat-message-count">
            # messages: {messages.length}
          </p>
        </header>
        <ScrollHandler className="messages">
          <ol className="message-groups">
            {messageGroups.map((messages, index) => (
              <li key={index} className="message-group">
                <div className="message-group-avatar">
                  <img
                    alt="user avatar"
                    src={messages[0].photoURL}
                  />
                </div>
                <ol className="messages">
                  {messages.map((message, index) => (
                    <li key={index} className="message">
                      {message.text}
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </ScrollHandler>
        <form
          className="new-message-form"
          onSubmit={this.handleSubmit}
        >
          <div className="new-message">
            <input
              ref={node => (this.messageInput = node)}
              type="text"
              placeholder="say something..."
            />
          </div>
        </form>
      </div>
    );
  }
}

render(<Chat />, document.getElementById("root"));
