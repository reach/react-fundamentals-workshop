import React from "react";
import StatelessContentToggle from "./StatelessContentToggle";

class ContentToggle extends React.Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <StatelessContentToggle
        {...this.props}
        isOpen={this.state.isOpen}
        onToggle={isOpen => this.setState({ isOpen })}
      />
    );
  }
}

export default ContentToggle;
