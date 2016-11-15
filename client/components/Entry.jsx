import React, {Component} from 'react';

export default class Entry extends Component {

  render() {
    return (
      <div className='entry'>
        <h2>{this.props.content.title}</h2>
        <div>By: {this.props.content.author}</div>
        <div><a href={this.props.content.url}>URL</a></div>
      </div>
    );
  }
}
