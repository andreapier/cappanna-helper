import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ConnectedMenuItemDetail from "containers/Orders/New/ConnectedMenuItemDetail";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  root: {
    flexGrow: 1
  }
};

class DishList extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{this.props.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              {this.props.details.map(i => (
                <ConnectedMenuItemDetail
                  key={i.id}
                  itemId={i.id}
                />
              ))}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {    
    return false
  }
};

DishList.propTypes = {
  group: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    details: state.menuDetails.items.filter(e => e.group === ownProps.group)
  };
};

export default connect(mapStateToProps)(withStyles(styles)(DishList));
