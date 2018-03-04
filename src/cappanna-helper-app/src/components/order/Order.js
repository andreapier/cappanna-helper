import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { padLeft } from "./../../utils/string";
import ActionPrint from "material-ui/svg-icons/action/print";
import { printRequested, loadOrderRequested, setOrderStatusRequested } from "./../../actions/index";
import Dialog from "material-ui/Dialog";
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import NavigationRefresh from "material-ui/svg-icons/navigation/refresh";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ActionDone from "material-ui/svg-icons/action/done";
import ActionSchedule from "material-ui/svg-icons/action/schedule";
import AvPlayArrow from "material-ui/svg-icons/av/play-arrow";
import { green500 } from 'material-ui/styles/colors';
import NavigationCancel from "material-ui/svg-icons/navigation/cancel";
import TextField from 'material-ui/TextField';

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};
const textBigStyle = {
  fontSize:'24px',
  marginTop: '10px',
  marginBottom: '10px'
};

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = { confirmPrint: false };
    this.handleChange = this.handleChange.bind(this);
  }
  
  renderStatus(status) {
    switch(status) {
      case 1:
        return (<ActionSchedule />);

      case 2:
        return (<AvPlayArrow />);

      case 3:
        return (<ActionDone color={green500}/>);

      default:
        return null;
    }
  }

  formatPrice(price) {
    return "€ " + padLeft(price.toFixed(2), " ", 5);
  }

  showPrintConfirmation() {
    this.setState({ confirmPrint: true });
  }

  sendOrder() {
    this.setState({ confirmPrint: false });
    this.props.printRequested(this.props.order.id);
  }

  handleChange(e, k, value) {
    this.props.setOrderStatusRequested(this.props.order.id, value);
  }

  render() {
    const totalPrice = this.props.order.details.reduce((a, b) => a + (b.item.price * b.quantity), 0);

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={`Ordine N° ${this.props.order.id}`} />
          <ToolbarSeparator />
          </ToolbarGroup>
          <ToolbarGroup firstChild={true}>
            <DropDownMenu value={this.props.order.status} onChange={this.handleChange}>
              <MenuItem value={1} primaryText="Inviato" leftIcon={this.renderStatus(1)} disabled={this.props.order.status === 1}/>
              <MenuItem value={2} primaryText="In corso" leftIcon={this.renderStatus(2)} disabled={this.props.order.status === 2} />
              <MenuItem value={3} primaryText="Completato" leftIcon={this.renderStatus(3)} disabled={this.props.order.status === 3} />
            </DropDownMenu>
            <IconButton onClick={() => this.setState({ confirmPrint: true })}>
              <ActionPrint />
            </IconButton>
            <IconButton onClick={() => this.props.loadOrderRequested(this.props.order.id)}>
              <NavigationRefresh />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>

        <div style={containerStyle}>
          <div style={textBigStyle}>
            Tavolo: {this.props.order.chTable}
          </div>
          <div style={textBigStyle}>
            N° coperti: {this.props.order.seats}
          </div>
          <div style={textBigStyle}>
            {this.formatPrice(totalPrice)}
          </div>
        </div>

        <Card>
          <table style={{
            width: '100%',
            paddingTop: '10px'
            }}>
            <thead  style={{textAlign: 'left'}}>
              <tr>
                <th>Nome</th>
                <th>Prezzo</th>
                <th>Qta</th>
                <th>Tot</th>
              </tr>
            </thead>
            <tbody>
              {this.props.order.details.map(d =>
                <tr key={d.id}>
                  <td>{d.item.name}</td>
                  <td>{this.formatPrice(d.item.price)}</td>
                  <td>{d.quantity}</td>
                  <td>{this.formatPrice(d.item.price * d.quantity)}</td>
                </tr>)}
            </tbody>
          </table>
        </Card>

        <Card>
          <CardHeader
            title="Note"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <TextField
              hintText="Note"
              multiLine={true} rows={4} rowsMax={10}
              value={this.props.order.notes || ''}
            />
          </CardText>
        </Card>

        <Dialog modal={true} open={this.state.confirmPrint}>
          <div>
            <div style={{ textAlign: 'center' }}>Sei sicuro di voler ristampare l'ordine?</div>
            <div style={{
              ...containerStyle,
              paddingTop: '10px'
              }}>
              <RaisedButton label="Conferma" onClick={() => this.sendOrder()} primary={true} icon={<ActionDone color={green500} />} />
              <RaisedButton label="Annulla" onClick={() => this.setState({ confirmPrint: false })} icon={<NavigationCancel />} />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.orders.selected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    printRequested: orderId => dispatch(printRequested(orderId)),
    loadOrderRequested: orderId => dispatch(loadOrderRequested(orderId)),
    setOrderStatusRequested: (orderId, status) => dispatch(setOrderStatusRequested(orderId, status))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);