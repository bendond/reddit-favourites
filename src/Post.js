import React from 'react';

const Post = ({ post, onToggleFavourite }) => {
  const isFavourited = isFavourite(post); // Function to check if the post is favorited

  return (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>Score: {post.score}</p>
      <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
        Go to comments
      </a>
      <br></br>
      <button onClick={() => onToggleFavourite(post)}>
        {isFavourited ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

// Helper function to check if a post is in favorites
const isFavourite = (post) => {
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  return favourites.some(favourite => favourite.id === post.id);
};

export default Post;