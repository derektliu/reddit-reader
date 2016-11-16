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
    this.removeSubreddit = this.removeSubreddit.bind(this);
    this.updateEntries = this.updateEntries.bind(this);
    this.clearSubreddits = this.clearSubreddits.bind(this);
  }

  componentWillMount () {
    this.getFrontPage((subreddits) => {
      this.setState({ subreddits });
      this.updateEntries();
    });
  }

  // initiate async call to API for all subreddits on the frontpage
  getFrontPage(cb) {
    fetch(`https://www.reddit.com/.json`)
    .then(res => res.json())
    .then(body => {
      let subreddits = {};
      body.data.children.forEach(post => {
        subreddits[post.data.subreddit] = post.data.subreddit;
      });
      cb(subreddits);
    })
    .catch(err => console.log('error', err));
  }

  // Update all Entries when all Promises return, then sort entries
  updateEntries() {
    this.getAllSubreddits(entries => this.sortEntries(entries));
  }

  // Sort entries by score (upvotes - downvotes), then update Client
  sortEntries(entries) {
    this.setState({
      entries: entries.sort((a, b) => b.data.score - a.data.score)
    });
  }

  // Iterate through list of subreddits and asynchronously grab all 'What's Hot' entries from each subreddit
  getAllSubreddits(cb) {
    let entries = [];
    let promises = [];
    for (let key in this.state.subreddits) {
      promises.push(fetch(`https://www.reddit.com/r/${key}/hot.json`)
      .then(res => res.json())
      .then(body => entries = entries.concat(body.data.children)));
    }
    Promise.all(promises).then(() => cb(entries));
  }

  // grab 'What's Hot' entries from a single subreddit
  getSubreddit(title) {
    fetch(`https://www.reddit.com/r/${title}/hot.json`)
    .then(res => res.json())
    .then(body => this.sortEntries(this.state.entries.concat(body.data.children)))
    .catch(err => console.log('error', err));
  }

  // add new subreddit title to list of subreddits and initiate call to API for entries
  addSubreddit(title) {
    this.state.subreddits[title] = title;
    this.setState({
      subreddits: this.state.subreddits
    })
    this.getSubreddit(title);
  }

  removeSubreddit(title) {
    delete this.state.subreddits[title];
    this.state.entries
    this.setState({
      entries: this.state.entries.filter( entry => entry.data.subreddit !== title ),
      subreddits: this.state.subreddits
    });
  }

  clearSubreddits() {
    this.setState({
      entries: [],
      subreddits: {}
    });
  }

  render() {
    return (
      <div className='App'>
        <h1>Reddit Reader</h1>
        <button onClick={this.updateEntries}>Update Entries</button>
        <button onClick={this.clearSubreddits}>Clear Subreddits</button>
        <NavBar subreddits={this.state.subreddits} add={this.addSubreddit} remove={this.removeSubreddit}/>
        <EntryList entries={this.state.entries} />
      </div>
    );
  }
}
