import React, {Component} from 'react';
import { connect } from 'react-redux';
import WaitDialog from 'components/WaitDialog';

class ConnectedWaitDialog extends Component {
    render() {
        return <WaitDialog {...this.props} />;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.api.loading
    };
};

export default connect(mapStateToProps)(ConnectedWaitDialog);