import React, { Component } from 'react';
import NavLink from '../components/NavLink';

class App extends Component {
  render() {
    return (
      <NavLink to="/" onlyActiveOnIndex>Hello World!</NavLink>
    );
  }
}

export default App;
