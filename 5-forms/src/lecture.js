import React, { useState } from "react";
import ReactDOM from "react-dom";

function Forms() {
  const [name, setName] = useState("Ryan");

  return (
    <div>
      <h1>Forms</h1>
      <form>
        <p>
          Controlled
          <br />
          <input
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
          />
          <button onClick={() => setName("Michael")}>
            Set to Michael
          </button>
        </p>
        <p>
          Uncontrolled
          <br />
          <input
            type="text"
            defaultValue="Burrito"
            onChange={event => console.log(event.target.value)}
          />
        </p>
      </form>
    </div>
  );
}

ReactDOM.render(
  <Forms />,
  document.getElementById("root")
);
