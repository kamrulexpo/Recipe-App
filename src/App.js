import React,{useEff, useState, useEffect} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = "cee024c9";
  const APP_KEY = "e7264734ca91876dd9bfe3379416b400";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState('chicken');

  useEffect( () => {
    getRecipes();
    console.log('let face data ');
  }, [query]);

  const getRecipes = async () => {
    const exemple_req = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(exemple_req);
    const data = await response.json();
    console.log(data.hits);

    setRecipes(data.hits)
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);

    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text"
         value={search} onChange={updateSearch}/>
        <button 
        type="submit" className="search-button">
          Search
          </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories = {recipe.recipe.calories} 
          image={recipe.recipe.image} 
          ingredients={recipe.recipe.ingredients}/>
        ))}
      </div>
    </div>
  );
}

export default App;
