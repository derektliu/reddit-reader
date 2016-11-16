import React, {Component} from 'react';

const Entry = ({content}) => {

  return (
    <div className='entry'>
      <br/>
      <img src={content.thumbnail}/>
      <div><a className='title' href={content.url}>{content.title}</a> ({content.domain})</div>
      <div> {content.score} Points | By: {content.author} on /r/{content.subreddit} | <a href={`https://www.reddit.com${content.permalink}`}>{content.num_comments} Comments</a>
      </div>
    </div>
  );
}

export default Entry;
