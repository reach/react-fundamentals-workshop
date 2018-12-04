import React, { useState, useEffect } from "react";

function App() {
  let [completed, setCompleted] = useState(0);
  let [todos, setTodos] = useState([
    "Wake up",
    "Eat a taco",
    "Avoid twitter"
  ]);

  let incomplete = todos.length - completed;

  return (
    <div className="app">
      <h1>Todos ({incomplete})</h1>

      <form
        onSubmit={event => {
          let todo = event.target.elements[0].value;
          event.preventDefault();
          event.target.reset();
          setTodos(todos.concat([todo]));
        }}
      >
        <input type="text" />{" "}
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li>
            <label>
              <input
                type="checkbox"
                onChange={event => {
                  let checked = event.target.checked;
                  setCompleted(
                    checked
                      ? completed + 1
                      : completed - 1
                  );
                }}
              />{" "}
              {todo}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
