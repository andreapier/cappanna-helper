import Snackbar from 'material-ui/Snackbar';
import React, { Component } from "react";
import { connect } from "react-redux";

class ErrorSnackBar extends Component {
    render() {
        if (this.props.error) {
            return (<Snackbar message={this.props.error} autoHideDuration={5000} open={true} style={{textAlign: "center", fontWeight: "bold" }} />);
        } else {return null;}
    }
}

const mapStateToProps = state => {
    return { error: state.error };
};

export default connect(mapStateToProps)(ErrorSnackBar);
