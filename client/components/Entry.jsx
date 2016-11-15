import React, {Component} from 'react';

const Entry = ({content}) => {

  return (
    <div className='entry'>
      <div><a href={content.url}>{content.title}</a></div>
      <div>Posted By: {content.author} on /r/{content.subreddit}</div>
    </div>
  );
}

export default Entry;
