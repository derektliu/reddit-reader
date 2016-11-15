import React, {Component} from 'react';

export default class Entry extends Component {

  render() {
    return (
      <div className='entry'>
        <div><a href={this.props.content.url}>{this.props.content.title}</a> Posted By: {this.props.content.author}</div>
      </div>
    );
  }
}
