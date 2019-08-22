import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadSettingsListRequested,
  resetOrder,
  setSettingValue
} from "actions";
import { List } from "@material-ui/core";
import Setting from "components/Settings";

class ConnectedSettings extends Component {
  componentDidMount() {
    this.props.loadSettingsListRequested();
  }

  render() {
    return (
      <List>
        {this.props.settings.map(o => (
          <Setting
            setting={o}
            key={o.id}
            setSettingValue={this.props.setSettingValue}
          />
        ))}
      </List>
    );
  }

  componentWillUnmount() {
    this.props.resetOrder();
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSettingsListRequested: () => dispatch(loadSettingsListRequested()),
    resetOrder: () => dispatch(resetOrder()),
    setSettingValue: (id, value) => dispatch(setSettingValue(id, value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSettings);
