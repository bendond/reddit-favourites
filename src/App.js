import logo from './logo.svg';
import './App.css';
import SubredditForm from './SubredditForm';
import Post from './Post';
import React, { useState } from 'react';

function App() {
  

  //variables
  const [currentSubreddit, setCurrentSubreddit] = useState('');
  const [posts, setPosts] = useState([]);
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || []);
  const [showFavourites, setShowFavourites] = useState(false);


  const handleSubredditChange = async (subreddit) => {
    setCurrentSubreddit(subreddit);
    // Fetch the posts from the subreddit
    const fetchedPosts = await fetchSubredditPosts(subreddit);
    setPosts(fetchedPosts);
  };

  const toggleShowFavourites = () => {
    setShowFavourites(!showFavourites);
  };

  const addToFavourites = (post) => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    if (!favourites.some(favorite => favorite.id === post.id)) {
      const newFavourites = [...favourites, post];
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
      setFavourites(newFavourites); 
    }
  };
  
  // Function to remove a post from favorites
  const removeFromFavourites = (post) => {
    let favouites = JSON.parse(localStorage.getItem('favourites')) || [];
    const newFavourites = favourites.filter(favorite => favorite.id !== post.id);
    localStorage.setItem('favourites', JSON.stringify(newFavourites));
    // If you're using a state to track favorites, update it here
    setFavourites(newFavourites);
  };

  // Helper function to check if a post is in favorites
  const isFavourite = (post) => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    return favourites.some(favorite => favorite.id === post.id);
  };

  const onToggleFavourite = (post) => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    if (isFavourite(post)) {
      removeFromFavourites(post);
    } else {
      addToFavourites(post);
    }
  };
  return (
    <div>
      <h1 className="Title">Fetch top subreddit Posts</h1>
      <SubredditForm onSubredditChange={handleSubredditChange} />
      <button onClick={toggleShowFavourites}>
        {showFavourites ? 'Hide Favourites' : 'Show Favourites'}
      </button>
      <div>
        {showFavourites ? (
          <FavouritesList favourites={favourites} onRemoveFavorite={removeFromFavourites} />
        ) : (
          posts.map((post) => (
            <Post key={post.id} post={post} onToggleFavourite={onToggleFavourite} />
          ))
        )}
      </div>
    </div>
  );
};

const FavouritesList = ({ favourites, onRemoveFavorite }) => {
  return (
    <div>
      {favourites.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>Score:{post.score}
          <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
        Go to comments
      </a></p>
          <button onClick={() => onRemoveFavorite(post)}>Remove from Favourites</button>
        </div>
      ))}
    </div>
  );
};



const fetchSubredditPosts = async (subreddit) => {
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json.data.children.map((post) => post.data);
  } catch (error) {
    console.error("Could not fetch posts: ", error);
    return [];
  }
};

export default App;
