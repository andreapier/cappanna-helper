import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader } from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import ContentAdd from "@material-ui/icons/Add";
import ActionDone from "@material-ui/icons/Done";
import ActionSchedule from "@material-ui/icons/Schedule";
import AvPlayArrow from "@material-ui/icons/PlayArrow";
import NavigationRefresh from "@material-ui/icons/Refresh";
import Toolbar from "@material-ui/core/Toolbar";
import ActionList from "@material-ui/icons/List";
import { withStyles } from "@material-ui/core";
import { flex } from "variables/styles";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column"
};

class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderStatus(status) {
    switch (status) {
      case 1:
        return <ActionSchedule />;

      case 2:
        return <AvPlayArrow />;

      case 3:
        return <ActionDone />;

      default:
        return null;
    }
  }

  renderOrder(order) {
    return (
      <Card
        onClick={() => this.props.loadOrderRequested(order.id)}
        key={order.id}
        style={{ minWidth: "350px" }}
      >
        <CardHeader title={`Ordine N° ${order.id} (Tav. ${order.chTable})`}>
          {this.renderStatus(order.status)}
          <div>Cameriere: {order.createdById}</div>
        </CardHeader>
      </Card>
    );
  }

  render() {
    return (
      <div>
        <div className={this.props.classes.root}>
          <Toolbar>
            <IconButton onClick={this.props.goToNewOrder}>
              <ContentAdd />
            </IconButton>
            <IconButton onClick={this.props.loadOrdersListRequested}>
              <NavigationRefresh />
            </IconButton>
            <span className={this.props.classes.flex} />
            <IconButton onClick={this.props.loadMenuDetailsRequested}>
              <ActionList />
            </IconButton>
          </Toolbar>
        </div>
        <div style={containerStyle}>
          {this.props.orders.map(this.renderOrder)}
        </div>
      </div>
    );
  }
}

OrdersList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(flex)(OrdersList);
