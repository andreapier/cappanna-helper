import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "components/Table";
import { loadMenuDetailsRequested } from "actions";

class MenuTable extends Component {
    componentWillMount() {
        this.props.loadMenuDetailsRequested();
    }

    render() {
        return (
            <Table
                tableHeaderColor="primary"
                tableHead={["Id", "Prezzo", "Nome", "Gruppo"]}
                {...this.props}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        tableData: state.menuDetails
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMenuDetailsRequested: () => dispatch(loadMenuDetailsRequested())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuTable);
