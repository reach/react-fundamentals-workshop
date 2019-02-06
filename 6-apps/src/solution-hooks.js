////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// 1. If you don't have a github account, go get one at https://github.com
//
// 2. Log in and display your username in the top of the app where it says "Hello"
//    - you'll want a loading state while the app is logging in
//    - show a loading message while the app logs in
//    - show the app when you're logged in
//    - watch your popup blocker, it might block the login
//
// 3. Subscribe to the messages and display the total count in the top right where
//    it says "# messages: 3"
//    - do this after you've logged in
//
// 4. Render the messages
//    - note they are grouped by author, so if a single author sends multiple
//      messages in a row the avatar is only displayed once. To simplify this step,
//      don't worry about message grouping yet, you can use this markup for every
//      message and do grouping later:
//
//      ```
//      <li className="message-group">
//        <div className="message-group-avatar">
//          <img alt="user avatar" src="https://placekitten.com/200/200"/>
//        </div>
//        <ol className="messages">
//          <li className="message">[Message Content Here]</li>
//        </ol>
//      </li>
//      ```
//
// 5. Post a message
//     - There are two ways to get the value, you can either get the value from
//       the input with a ref, or you can keep what the user types in state and
//       use that, it's up to you.
//     - Use `sendMessage(user, inputValue)` to post the message, you should see
//       it show up immediately in the message list. NOTE: You may have to scroll
//       down to see it!
//     - Clear the input value, this will be different depending on if you used
//       state or a ref to get the input's value.
//
// 6. Automatically scroll the messages down when new messages come in
//    - You'll need a lifecycle hook, which one if you need it every time the
//      component updates?
//    - You'll need a ref to the DOM node to be able to scroll it down. To scroll
//      a DOM node all the way down use: `element.scrollTop = element.scrollHeight`
//    - You can do this all in the `Chat` component, or you could create a new
//      component named something like `ScrollManager`.
//
// 7. BONUS: Don't scroll the page down if the user was scrolled up
//    - You'll need to use `getSnapshotBeforeUpdate` to find out where the scroll
//      position is before you update. If it's at the bottom, then after the update
//      you will scroll, if it's not at the bottom, then don't scroll.
//    - Alternatively, you could add an `onScroll` to the element and keep the
//      scroll position in state, then check that. Either way works fine.
//
// 8. Group the messages by author
//    - Notice whne somebody posts multiple messages their avatar shows up with
//      ever message. There are a few ways to do this, but the easiest way to do
//      it with the markup we've provided is to transform the array into an array
//      of arrays. Each child array is a group of messages from the same author.
//      Something like: `[ [message, message, message], [message], [messsage, message] ]`
//
// 9. Got extra time? Here are a few more things to do get more practice:
//    - Highlight messages from you to make them easy to find
//    - Highlight messages that mention you by your GitHub username
//    - Create a filter that lets you filter messages in the chat by sender or content
//    - Add a log out button
////////////////////////////////////////////////////////////////////////////////
import React, {
  useEffect,
  useState,
  useRef
} from "react";
import { render } from "react-dom";
import {
  login,
  sendMessage,
  subscribeToMessages
} from "./utils";
import "./index";

/*
Here's how to use the ChatUtils:

login((error, user) => {
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

function AutoScroller(props) {
  const scrollerRef = useRef();
  const autoScrollingRef = useRef(true);

  function scrollToBottom() {
    const scroller = scrollerRef.current;
    if (scroller && autoScrollingRef.current === true) {
      scroller.scrollTop = scroller.scrollHeight;
    }
  }

  useEffect(scrollToBottom);

  function handleScroll(event) {
    const scroller = event.target;
    const distanceToBottom =
      scroller.scrollHeight -
      (scroller.scrollTop + scroller.offsetHeight);
    autoScrollingRef.current = distanceToBottom < 10;
  }

  return (
    <div
      {...props}
      onScroll={handleScroll}
      ref={scrollerRef}
    />
  );
}

function Chat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    login((error, user) => {
      setUser(user);
    });
  }, []);

  useEffect(
    () => {
      if (user) {
        subscribeToMessages(messages => {
          setMessages(messages);
        });
      }
    },
    [user]
  );

  const groupedMessages = messages.reduce(
    (memo, message) => {
      const lastGroup = memo[memo.length - 1];

      if (lastGroup && lastGroup[0].uid === message.uid) {
        // Same speaker
        lastGroup.push(message);
      } else {
        // new speaker
        memo.push([message]);
      }

      return memo;
    },
    []
  );

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(user, inputRef.current.value);
    event.target.reset(); // reset the form
  }

  const inputRef = useRef();

  return !user ? (
    <div>Loading...</div>
  ) : (
    <div className="chat">
      <header className="chat-header">
        <h1 className="chat-title">
          Welcome {user.displayName}
        </h1>
        <p className="chat-message-count">
          # messages: {messages.length}
        </p>
      </header>
      <AutoScroller className="messages">
        <ol className="message-groups">
          {groupedMessages.map((group, index) => (
            <li className="message-group" key={index}>
              <div className="message-group-avatar">
                <img
                  alt="user avatar"
                  src={group[0].photoURL}
                />
              </div>
              <ol className="messages">
                {group.map((message, index) => (
                  <li className="message" key={index}>
                    {message.text}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </AutoScroller>
      <form
        className="new-message-form"
        onSubmit={handleSubmit}
      >
        <div className="new-message">
          <input
            type="text"
            placeholder="say something..."
            ref={inputRef}
          />
        </div>
      </form>
    </div>
  );
}

render(<Chat />, document.getElementById("root"));
