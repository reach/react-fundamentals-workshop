import React from "react";
import ContentToggle from "./ContentToggle";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Testing!</h1>
        <ContentToggle summary="AYYY">
          <p>YOOO</p>
        </ContentToggle>
      </div>
    );
  }
}

export default App;
