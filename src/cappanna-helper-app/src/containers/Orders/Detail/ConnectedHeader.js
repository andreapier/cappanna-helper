import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "components/Orders/Detail/Header";
import { printRequested, editOrder, deleteOrder, closeOrder, calculate } from "actions";
import history from "./../../../history";
import calculateOrderTotalPrice from "utils/calculateOrderTotalPrice";

class ConnectedHeader extends Component {
    render() {
        return (
            <Header
                order={this.props.order}
                editOrder={this.props.editOrder}
                goToCalc={this.props.goToCalc}
                printRequested={this.props.isAdmin ? this.props.printRequested : undefined}
                deleteOrder={this.props.isAdmin ? this.props.deleteOrder : undefined}
                closeOrder={this.props.canCloseOrders ? this.props.closeOrder : undefined}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const result = {
        order: {
            id: 0,
            totalPrice: 0,
            chTable: "",
            customer: "",
            seats: 0,
            status: 0,
            details: []
        },
        isAdmin: state.user.roles.some((r) => r === "admin"),
        canCloseOrders: state.user.roles.some((r) => r === "admin" || r === "dome")
    };

    if (state.selectedOrder) {
        result.order.id = state.selectedOrder.id;
        result.order.totalPrice = calculateOrderTotalPrice(state.selectedOrder);
        result.order.chTable = state.selectedOrder.chTable;
        result.order.customer = state.selectedOrder.customer;
        result.order.seats = state.selectedOrder.seats;
        result.order.status = state.selectedOrder.status;
        result.order.notes = state.selectedOrder.notes;
        result.order.details = state.selectedOrder.details
            .map((e) => {
                return {
                    id: e.id,
                    quantity: e.quantity,
                    itemId: e.item.id
                };
            })
            .concat(
                state.menuDetails
                    .filter((d) => !state.selectedOrder.details.find((e) => e.itemId === d.id))
                    .map((e) => {
                        return {
                            id: 0,
                            quantity: 0,
                            itemId: e.id
                        };
                    })
            );
    }

    return result;
};

const mapDispatchToProps = (dispatch) => {
    return {
        printRequested: (orderId) => dispatch(printRequested(orderId)),
        editOrder: (order) => {
            dispatch(editOrder(order));
            history.push(`/order/${order.id}/edit`);
        },
        deleteOrder: (orderId) => dispatch(deleteOrder(orderId)),
        closeOrder: (orderId) => dispatch(closeOrder(orderId)),
        goToCalc: (order) => {
            dispatch(
                calculate({
                    amount: order.totalPrice,
                    paidAmount: order.totalPrice,
                    seats: order.seats
                })
            );
            history.push("/calc");
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader);
