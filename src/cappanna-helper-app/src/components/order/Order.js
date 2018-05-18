import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardText } from "@material-ui/core/Card";
import ActionPrint from "@material-ui/icons/Print";
import {
  printRequested,
  loadOrderRequested,
  setOrderStatusRequested
} from "actions/index";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import NavigationRefresh from "@material-ui/icons/Refresh";
//import DropDownMenu from "@material-ui/core/DropDownMenu";
import { MenuItem } from "@material-ui/core/Menu";
import ActionDone from "@material-ui/icons/Done";
import ActionSchedule from "@material-ui/icons/Schedule";
import AvPlayArrow from "@material-ui/icons/PlayArrow";
import NavigationCancel from "@material-ui/icons/Cancel";
import TextField from "@material-ui/core/TextField";
import AmountFormat from "components/AmountFormat";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};
const textBigStyle = {
  fontSize: "24px",
  marginTop: "10px",
  marginBottom: "10px"
};

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = { confirmPrint: false };
    this.handleChange = this.handleChange.bind(this);
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
    const totalPrice = this.props.order.details.reduce(
      (a, b) => a + b.item.price * b.quantity,
      0
    );

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={`Ordine N° ${this.props.order.id}`} />
            <ToolbarSeparator />
          </ToolbarGroup>
          <ToolbarGroup firstChild>
            {/* <DropDownMenu value={this.props.order.status} onChange={this.handleChange}>
              <MenuItem value={1} primaryText="Inviato" leftIcon={this.renderStatus(1)} disabled={this.props.order.status === 1}/>
              <MenuItem value={2} primaryText="In corso" leftIcon={this.renderStatus(2)} disabled={this.props.order.status === 2} />
              <MenuItem value={3} primaryText="Completato" leftIcon={this.renderStatus(3)} disabled={this.props.order.status === 3} />
            </DropDownMenu> */}
            <IconButton onClick={() => this.setState({ confirmPrint: true })}>
              <ActionPrint />
            </IconButton>
            <IconButton
              onClick={() => this.props.loadOrderRequested(this.props.order.id)}
            >
              <NavigationRefresh />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>

        <div style={containerStyle}>
          <div style={textBigStyle}>Tavolo: {this.props.order.chTable}</div>
          <div style={textBigStyle}>N° coperti: {this.props.order.seats}</div>
          <div style={textBigStyle}>{this.formatPrice(totalPrice)}</div>
        </div>

        <Card>
          <table
            style={{
              width: "100%",
              paddingTop: "10px"
            }}
          >
            <thead style={{ textAlign: "left" }}>
              <tr>
                <th>Nome</th>
                <th>Prezzo</th>
                <th>Qta</th>
                <th>Tot</th>
              </tr>
            </thead>
            <tbody>
              {this.props.order.details.map(d => (
                <tr key={d.id}>
                  <td>{d.item.name}</td>
                  <td>
                    <AmountFormat amount={d.item.price} />
                  </td>
                  <td>{d.quantity}</td>
                  <td>
                    <AmountFormat amount={d.item.price * d.quantity} />
                  </td>
                </tr>
              ))}
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
              multiLine={true}
              rows={4}
              rowsMax={10}
              value={this.props.order.notes || ""}
            />
          </CardText>
        </Card>

        <Dialog modal={true} open={this.state.confirmPrint}>
          <div>
            <div style={{ textAlign: "center" }}>
              Sei sicuro di voler ristampare l'ordine?
            </div>
            <div
              style={{
                ...containerStyle,
                paddingTop: "10px"
              }}
            >
              <Button
                variant="raised"
                label="Conferma"
                onClick={() => this.sendOrder()}
                primary={true}
                icon={<ActionDone />}
              />
              <Button
                variant="raised"
                label="Annulla"
                onClick={() => this.setState({ confirmPrint: false })}
                icon={<NavigationCancel />}
              />
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
    setOrderStatusRequested: (orderId, status) =>
      dispatch(setOrderStatusRequested(orderId, status))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
