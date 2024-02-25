import React, { useState } from 'react';

const SubredditForm = ({ onSubredditChange }) => {
    const [subreddit, setSubreddit] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubredditChange(subreddit);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="subredditInput">Enter a subreddit name: </label>
        <input
          id="subredditInput"
          type="text"
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
          placeholder="e.g.: funny"
          required
        />
        <button type="submit">Fetch Posts</button>

      </form>
    );
  };
  
  export default SubredditForm;