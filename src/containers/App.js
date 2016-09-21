import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import NavLink from '../components/NavLink';

class App extends Component {
  componentWillMount() {
    const { location } = this.props;
    this.fetchData(location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.fetchData(nextProps.location.pathname);
    }
  }

  render() {
    return (
      <NavLink to="/" onlyActiveOnIndex>{ this.props.title }</NavLink>
    );
  }

  fetchData(pathname) {
    const { actions } = this.props;
    actions.fetchData(pathname);
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return { title: state.title };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
