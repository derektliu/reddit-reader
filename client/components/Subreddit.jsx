import React, {Component} from 'react';

const Subreddit = ({title, remove}) => {
  return (
    <span className='subreddit' onClick={() => remove(title)}> {title} </span>
  );
}

export default Subreddit;
