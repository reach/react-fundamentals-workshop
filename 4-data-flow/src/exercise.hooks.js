////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Flow data up from `Tabs` to let the `App` know what is the active tab.
// - Pass that data down to Flag to display the proper flag
////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import ReactDOM from "react-dom";

let styles = {};

let countries = [
  {
    id: "usa",
    name: "USA",
    description: "Land of the Free, Home of the brave"
  },
  {
    id: "brazil",
    name: "Brazil",
    description: "Sunshine, beaches, and Carnival"
  },
  {
    id: "russia",
    name: "Russia",
    description: "World Cup 2018!"
  }
];

function App() {
  return (
    <div>
      <Tabs data={countries} />
      <Flag country="usa" />
    </div>
  );
}

const FLAGS = {
  usa: require("./flags/usa.png"),
  russia: require("./flags/russia.png"),
  brazil: require("./flags/brazil.png")
};

function Flag({ country }) {
  return (
    <img
      style={{ position: "fixed", top: 20, right: 20 }}
      width="100"
      alt={`Flag of ${country}`}
      src={FLAGS[country]}
    />
  );
}

function Tabs({ data }) {
  let [activeIndex, setActiveIndex] = useState(0);
  return (
    <div>
      {data.map((tab, index) => {
        let isActive = index === activeIndex;
        return (
          <button
            onClick={() => {
              setActiveIndex(index);
            }}
            style={
              isActive ? styles.activeTab : styles.tab
            }
          >
            {tab.name}
          </button>
        );
      })}

      <div style={styles.panel}>
        {data[activeIndex].description}
      </div>
    </div>
  );
}

styles.tab = {
  display: "inline-block",
  padding: 10,
  margin: 10,
  border: "none",
  font: "inherit",
  borderBottom: "4px solid",
  borderBottomColor: "#ccc",
  cursor: "pointer"
};

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: "#000"
};

styles.panel = {
  padding: 10
};

ReactDOM.render(<App />, document.getElementById("root"));
