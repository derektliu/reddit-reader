import React, {Component} from 'react';
import Subreddit from './Subreddit'

export default class SubredditList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    var list = [];

    for (let sub in this.props.list) {
      list.push(<Subreddit title={sub} key={sub} remove={this.props.remove} />)
    }

    return (
      <div className='subredditlist'>
        Subreddit List (click to remove):
        <div> { list } </div>
      </div>
    );
  }
}
