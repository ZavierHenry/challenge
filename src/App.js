import logo from './logo.svg';
import './App.css';
import RecipeForm from './RecipeForm';
import { useState } from 'react/cjs/react.development';
import { useEffect } from 'react';

import RecipePage from './RecipePage';
import SearchPage from './SearchPage';
import AddIngredients from './AddIngredients';


const baseURL = "https://sandbox-zavier-dev-challenge-developer-edition.cs18.force.com/services/apexrest/cookbook"

function App() {

  const [page, setPage] = useState({
    currentPage: 'home',
    recipes: [],
    search: {
      term: "",
      type: 'name',
      results: []
    },
    selectedRecipeId: '',
  })

  useEffect(() => {
    async function fetchRecipes() {
      const recipes = await fetch(`${baseURL}/searchRecipes?searchTerm=`).then(resp => resp.json())
      const selectedRecipeId = recipes.length > 0 ? recipes[0].id : ''
      setPage(page => ({...page, recipes, selectedRecipeId}))
    }
    fetchRecipes()
  }, [])

  async function onAddRecipe(e) {
    e.preventDefault()

    const name = e.target.elements.recipeName.value
    const directions = e.target.elements.directions.value

    const { id } = await fetch(`${baseURL}/createRecipe`, {
      method: 'POST',
      body: JSON.stringify({name, directions})
    }).then(resp => resp.json())

    setPage(page => {
      return {
        ...page,
        currentPage: 'home',
        recipes: [...page.recipes, {id, name, directions, ingredients: []}]
      }
    })
  }

  async function onSearch(e) {
    e.preventDefault()

    const searchTerm = e.target.elements.searchTerm.value
    const type = e.target.elements.searchType.value
    const url = new URL(type == 'name' ? `${baseURL}/searchRecipes` : type == 'ingredient' ? `${baseURL}/searchIngredients` : baseURL)
    url.search = new URLSearchParams({searchTerm})

    const results = await fetch(url).then(resp => resp.json())

    setPage(page => {
      return {
        ...page,
        currentPage: 'search',
        search: {
          ...page.search,
          type,
          term: searchTerm,
          results
        }
      }
    })
  }

  function switchCurrentPage(pageType) {
    setPage(page => ({...page, currentPage: pageType}))
  }

  async function onAddIngredient(e) {
    e.preventDefault()

    const ingredient = e.target.elements.ingredient.value
    const recipeId = page.recipes[0].id

    const ingredientId = await fetch(`${baseURL}/addIngredient`, {
      method: "POST",
      body: JSON.stringify({recipeId, name: ingredient})
    }).then(resp => resp.json())

    setPage(page => {
      return {
        ...page,
        recipes: page.recipes.map(recipe => {
          return recipe.id == page.selectedRecipeId ? ({...recipe, ingredients: [...recipe.ingredients, {id: ingredientId, name: ingredient}]}) : recipe
        })
      }
    })

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
      <RecipePage recipes={page.recipes}/>
      <RecipeForm style={{padding: "10vh 0vh"}} onSubmit={onAddRecipe} />
      <SearchPage search={page.search} onSearch={onSearch} />
      { page.recipes.length > 0 && <AddIngredients recipe={page.recipes.find(x => x.id == page.selectedRecipeId)} onSubmit={onAddIngredient} /> }
    </div>
  );
}

export default App;
