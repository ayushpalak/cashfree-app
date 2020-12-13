/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/action";
import Button from "@material-ui/core/Button";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/prop-types
      localDashboard: this.props.dashboard
    };
  }
  render() {
    return (
      <div>
        home {this.props.dashboard}
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            this.props.dispatch({ type: actions.UPDATE_DASHBOARD });
          }}
        >
          Click me{" "}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { dashboard } = state;
  return { ...dashboard };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     // dispatching plain actions
//     increment: () => dispatch({ type: "INCREMENT" }),
//     decrement: () => dispatch({ type: "DECREMENT" }),
//     reset: () => dispatch({ type: "RESET" })
//   };
// };
export default connect(mapStateToProps)(Home);
