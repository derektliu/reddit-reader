import React, {Component} from 'react';
import NavBar from './NavBar';
import EntryList from './EntryList';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      default: []
    };

    this.getSubreddit();
  }

  getSubreddit() {
    console.log('inside getSubreddit');
    fetch(`http://www.reddit.com/r/aww/hot.json`)
      .then(res => res.json())
      .then(body => this.setState({ default: body.data.children }))
      .catch(err => console.log('error', err));
  }

  render() {
    return (
      <div className='App'>
        Reddit Reader
        <NavBar />
        <EntryList entries={this.state.default} />
      </div>
    );
  }
}
