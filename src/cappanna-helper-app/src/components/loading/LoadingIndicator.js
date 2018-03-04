import "./LoadingIndicator.css";
import Dialog from "material-ui/Dialog";
import CircularProgress from "material-ui/CircularProgress";
import React, { Component } from "react";
import { connect } from "react-redux";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "center"
};

const descriptionStyle = {
  marginTop: "20px"
};

class LoadingIndicator extends Component {
  render() {
    return (
      <Dialog
        modal={true}
        open={this.props.loading}
        className="LoadingIndicator-horizontal-centered"
      >
        <div style={containerStyle}>
          <CircularProgress size={60} thickness={7} color="rgb(0, 0, 128)" />
          <div style={descriptionStyle}>
            {this.props.description || "Attendere..."}
          </div>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return { loading: state.api.loading, description: state.api.description };
};

export default connect(mapStateToProps)(LoadingIndicator);