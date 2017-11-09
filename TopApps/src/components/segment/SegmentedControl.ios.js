import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SegmentedControlIOS } from 'react-native';

const SegmentedControl = ({ selectedIndex, onChange }) => (
    <SegmentedControlIOS style={{ marginLeft: 30, marginRight: 30 }}
        values={['Paid', 'Free', 'Top Grossing']}
        selectedIndex={0}
        onChange={(event) => {
            this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex });
        }}
    />
);

SegmentedControl.propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    selectedIndex: 0,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({ type: 'Logout' }),
    loginScreen: () =>
        dispatch(NavigationActions.navigate({ routeName: 'Login' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);