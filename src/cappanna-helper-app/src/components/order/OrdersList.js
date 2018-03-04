import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader } from 'material-ui/Card';
import { loadOrderRequested, loadOrdersListRequested, resetOrder, loadMenuDetailsRequested } from './../../actions';
import IconButton from 'material-ui/IconButton';
import ContentAdd from "material-ui/svg-icons/content/add";
import ActionDone from "material-ui/svg-icons/action/done";
import ActionSchedule from "material-ui/svg-icons/action/schedule";
import AvPlayArrow from "material-ui/svg-icons/av/play-arrow";
import NavigationRefresh from "material-ui/svg-icons/navigation/refresh";
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { green500 } from 'material-ui/styles/colors';
import ActionList from "material-ui/svg-icons/action/list";

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: "column"
};

class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.renderOrder = this.renderOrder.bind(this);
    this.goToNewOrder = this.goToNewOrder.bind(this);
  }

  goToNewOrder() {
    this.props.resetOrder();
    this.props.history.push('/order/new');
  }

  renderStatus(status) {
    switch(status) {
      case 1:
        return <ActionSchedule />;

      case 2:
        return <AvPlayArrow />;

      case 3:
        return <ActionDone color={green500}/>;

      default:
        return null;
    }
  }

  renderOrder(order) {
    return (
      <Card onClick={() => this.props.loadOrderRequested(order.id)} key={order.id} style={{minWidth: '350px'}}>
        <CardHeader title={`Ordine N° ${order.id} (Tav. ${order.chTable})`}>
          {this.renderStatus(order.status)}
          <div>
            Cameriere: {order.createdById}
          </div>
        </CardHeader>
      </Card>
    );
  }

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <IconButton onClick={this.goToNewOrder}>
              <ContentAdd />
            </IconButton>
            <IconButton onClick={() => this.props.loadOrdersListRequested()}>
              <NavigationRefresh />
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton onClick={() => this.props.loadMenuDetailsRequested()}>
              <ActionList />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <div style={containerStyle}>
          {this.props.orders.map(this.renderOrder)}
        </div>
      </div>);
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadOrderRequested: orderId => dispatch(loadOrderRequested(orderId)),
    loadOrdersListRequested: () => dispatch(loadOrdersListRequested()),
    resetOrder: () => dispatch(resetOrder()),
    loadMenuDetailsRequested: () => dispatch(loadMenuDetailsRequested())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);