import React, {Component} from 'react';
import Entry from './Entry'

export default class EntryList extends Component {

  render() {
    var entries = [];

    this.props.entries.forEach( entry => {
      entries.push(<Entry content={entry.data} key={entry.data.id}/>)
    });
    return (
      <div className='entrylist'>
        {entries}
      </div>
    );
  }
}

EntryList.propTypes = {
  entries: React.PropTypes.array.isRequired
};
