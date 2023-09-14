import React, { Component } from "react";
import Body from "components/Orders/Detail/Body";
import { connect } from "react-redux";
import { loadSelectedOrderRequested, loadMenuDetailsRequested } from "actions";
import { withRouter } from "react-router-dom";
import buildFilledOrderDetails from "utils/buildFilledOrderDetails";

class ConnectedBody extends Component {
    componentDidMount() {
        if (this.props.needsMenuDetailsLoading) {
            this.props.loadMenuDetailsRequested();
        }
        this.props.loadSelectedOrderRequested();
    }

    render() {
        if (this.props.needsMenuDetailsLoading) {
            return null;
        }

        return <Body dishList={this.props.dishList} notes={this.props.notes} />;
    }
}

const mapStateToProps = (state) => {
    const needsMenuDetailsLoading = state.menuDetails.length === 0;

    return {
        dishList: state.selectedOrder && !needsMenuDetailsLoading ? buildFilledOrderDetails(state.selectedOrder.details, state.menuDetails) : [],
        notes: state.selectedOrder ? state.selectedOrder.notes || "" : "",
        needsMenuDetailsLoading
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadSelectedOrderRequested: () => dispatch(loadSelectedOrderRequested(ownProps.match.params.id)),
        loadMenuDetailsRequested: () => dispatch(loadMenuDetailsRequested())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedBody));
