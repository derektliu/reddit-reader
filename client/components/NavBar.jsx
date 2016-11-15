import React, {Component} from 'react';
import SubredditList from './SubredditList';

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.add(this.state.value);
    this.setState({
      value: ''
    });
  }

  render() {
    return (
      <div className='navbar'>
        <form onSubmit={this.handleSubmit}>
          Add Subreddit:
          <input
            type='text'
            placeholder='Subreddit Name'
            value={this.state.value}
            onChange={this.handleChange}
            />
          <input type="submit" value="Add"/>
          </form>
          <br/>
        <SubredditList list={this.props.subreddits} remove={this.props.remove}/>
      </div>
    );
  }
}
