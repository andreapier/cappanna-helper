import React, { Component } from "react";
import { connect } from "react-redux";
import { loadSettingsListRequested, invalidateSettingsList, setSettingValue } from "actions";
import List from "@material-ui/core/List";
import Setting from "components/Settings";

class ConnectedSettings extends Component {
  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.loadSettingsListRequested();
    }
  }

  render() {
    return <List>{this.props.settings.map(o => <Setting setting={o} key={o.id} setSettingValue={this.props.setSettingValue} />)}</List>;
  }

  componentWillUnmount() {
    if (this.props.loaded) {
      this.props.invalidateSettingsList();
    }
  }
}

const mapStateToProps = state => {
  return {
    shouldLoad: !state.settings.loading && !state.settings.loaded,
    settings: state.settings.items,
    loaded: state.settings.loaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSettingsListRequested: () => dispatch(loadSettingsListRequested()),
    invalidateSettingsList: () => dispatch(invalidateSettingsList()),
    setSettingValue: (id, value) => dispatch(setSettingValue(id, value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSettings);
