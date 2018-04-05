import React, {Component} from 'react';
import { connect } from 'react-redux';
import ErrorSnackbar from 'components/Snackbar/ErrorSnackbar';

class ConnectedErrorSnackbar extends Component {
    render() {
        if (!this.props.message) {
            return null;
        }
        
        return <ErrorSnackbar {...this.props} />;
    }
}

const mapStateToProps = state => {
    return {
        message: state.error
    };
};

export default connect(mapStateToProps)(ConnectedErrorSnackbar);