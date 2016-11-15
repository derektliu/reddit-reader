import React, {Component} from 'react';
import NavBar from './NavBar';
import EntryList from './EntryList';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      entries: [],
      subreddits: {}
    };

    this.addSubreddit = this.addSubreddit.bind(this);
    this.removeSubreddit = this.removeSubreddit.bind(this)
  }

  componentWillMount () {
    this.getAllEntries();
  }

  getAllEntries() {
    if (Object.keys(this.state.subreddits).length === 0) {
      // if subreddit list is empty, grab data from Front Page
      this.getSubreddit(`https://www.reddit.com/.json`);
    } else {
      // grab data from list of subreddits
      this.getAllSubreddits();
    }
  }

  getAllSubreddit() {
    console.log('inside getSubreddit')
  }

  getSubreddit(url) {
    fetch(url)
    .then(res => res.json())
    .then(body => {
      var subreddits = {};
      body.data.children.forEach(post => {
        subreddits[post.data.subreddit] = post.data.subreddit;
      });
      this.setState({
        entries: body.data.children,
        subreddits: subreddits
      })
    })
    .catch(err => console.log('error', err));
  }

  addSubreddit(title) {
    fetch(`http://www.reddit.com/r/${title}/hot.json`)
    .then(res => res.json())
    .then(body => {
      console.log(body.data.children)
    })
    .catch(err => console.log('error', err));
  }

  removeSubreddit(title) {
    delete this.state.subreddits[title];
    this.setState({
      entries: this.state.entries.filter( ({data}) => data.subreddit !== title ),
      subreddits: this.state.subreddits
    });
  }

  render() {
    return (
      <div className='App'>
        <h1>Reddit Reader</h1>
        <NavBar subreddits={this.state.subreddits} add={this.addSubreddit} remove={this.removeSubreddit}/>
        <EntryList entries={this.state.entries} />
      </div>
    );
  }
}
