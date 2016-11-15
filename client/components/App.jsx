import React from 'react';

export default class App extends React.Component {
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
      .then(body => console.log('body', body.data.children))
      .catch(err => console.log('error', err));
  }

  render() {
    return (
      <div className='App'>
        Reddit Reader
      </div>
    );
  }
}
