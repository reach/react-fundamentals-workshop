import React from "react";
import ReactDOM from "react-dom";

class Forms extends React.Component {
  render() {
    return (
      <div>
        <h1>Forms</h1>
        <form>
          <input type="text" />
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <Forms />,
  document.getElementById("root")
);
