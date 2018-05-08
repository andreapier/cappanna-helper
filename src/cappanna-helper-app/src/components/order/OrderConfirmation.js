import React, { Component } from "react";
import { Card, CardHeader, CardText } from "material-ui/Card";
import Button from "material-ui/Button";
import { connect } from "react-redux";
import { sendOrder, setOrderNotes } from "actions";
import ActionDone from "@material-ui/icons/Done";
import EditorModeEdit from "@material-ui/icons/ModeEdit";
import { TextField } from "redux-form-material-ui";
import { Field, reduxForm } from "redux-form";
import AmountFormat from "components/AmountFormat";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};
const buttonContainerStyle = {
  ...containerStyle,
  padding: "5px"
};

const innerContainerStyle = {
  ...containerStyle,
  justifyContent: "flex-end"
};

const innerItemStyle = {
  minWidth: "50px",
  textAlign: "center"
};

const innerItemStyle20px = {
  ...innerItemStyle,
  minWidth: "20px"
};

class OrderConfirmation extends Component {
  constructor(props) {
    super(props);
    this.handleNotesChange = this.handleNotesChange.bind(this);
  }

  handleNotesChange(e) {
    this.props.setOrderNotes(e.target.value);
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <div style={containerStyle}>
            <div>
              Tav: {this.props.order.header.chTable}
              {this.props.order.header.tableCategory
                ? "\\" + this.props.order.header.tableCategory
                : ""}
            </div>
            <div>N° coperti: {this.props.order.header.seats}</div>
            <div>
              Tot: <AmountFormat amount={this.props.order.header.totalPrice} />
            </div>
          </div>
        </CardHeader>
        <CardText>
          <Card>
            <CardText>
              <div style={containerStyle}>
                <div>Nome</div>
                <div style={innerContainerStyle}>
                  <div style={innerItemStyle}>Prezzo</div>
                  <div style={innerItemStyle20px}>Qta</div>
                  <div style={innerItemStyle}>Tot</div>
                </div>
              </div>
            </CardText>
          </Card>
          {this.props.order.details.filter(d => d.quantity > 0).map(d => (
            <Card key={d.id}>
              <CardText>
                <div style={containerStyle}>
                  <div>{d.name}</div>
                  <div style={innerContainerStyle}>
                    <div style={innerItemStyle}>
                      <AmountFormat amount={d.price} />
                    </div>
                    <div style={innerItemStyle20px}>{d.quantity}</div>
                    <div style={innerItemStyle20px}>
                      <AmountFormat amount={d.price * d.quantity} />
                    </div>
                  </div>
                </div>
              </CardText>
            </Card>
          ))}
          <form>
            <Card initiallyExpanded={true}>
              <CardHeader
                title="Note"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true} style={{ paddingTop: "0px" }}>
                <Field
                  component={TextField}
                  name="notes"
                  floatingLabelText="Inserire le note dell'ordine"
                  multiLine={true}
                  rows={4}
                  rowsMax={10}
                  fullWidth={true}
                  onBlur={this.handleNotesChange}
                  style={{ marginTop: "0px" }}
                />
              </CardText>
            </Card>
          </form>
        </CardText>
        <div style={buttonContainerStyle}>
          <Button
            variant="raised"
            label="Modifica"
            onClick={this.props.history.goBack}
            icon={<EditorModeEdit />}
          />
          <Button
            variant="raised"
            label="Conferma"
            onClick={() =>
              this.props.sendOrder(this.props.order, this.props.user)
            }
            primary={true}
            icon={<ActionDone />}
          />
        </div>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.newOrder,
    user: state.user,
    initialValues: { notes: state.newOrder.header.notes }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOrderNotes: notes => dispatch(setOrderNotes(notes)),
    sendOrder: (order, user) => dispatch(sendOrder(order, user))
  };
};

OrderConfirmation = reduxForm({
  form: "orderNotes",
  enableReinitialize: true
})(OrderConfirmation);

OrderConfirmation = connect(mapStateToProps, mapDispatchToProps)(
  OrderConfirmation
);

export default OrderConfirmation;
