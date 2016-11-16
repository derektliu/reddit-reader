import React, {Component} from 'react';

const Entry = ({content}) => {

  var isUrl = (s) => {
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   return regexp.test(s);
 }

  if (content.thumbnail.indexOf('http') === -1) {
    content.thumbnail = 'https://apprecs.org/ios/images/app-icons/256/25/923394341.jpg';
  }

  return (
    <div className='entry'>
      <br/>
      <img className='thumbnail' src={content.thumbnail}  style={{
        'float':'left',
        'width': '40px',
        'height':'40px',
        'padding': '5px',
      }}/>
      <div><a className='title' href={content.url}>{content.title}</a> ({content.domain})</div>
      <div> {content.score} Points | By: {content.author} on /r/{content.subreddit} | <a href={`https://www.reddit.com${content.permalink}`}>{content.num_comments} Comments</a>
      </div>
    </div>
  );
}

export default Entry;
