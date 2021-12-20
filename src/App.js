import logo from './logo.svg';
import './App.css';
import RecipeForm from './RecipeForm';
import { useState } from 'react/cjs/react.development';
import { useEffect } from 'react';

import RecipePage from './RecipePage';
import SearchPage from './SearchPage';
import AddIngredients from './AddIngredients';
import SearchBar from './SearchBar';
import BackButton from './BackButton';

import { MDBBtn, MDBContainer, MDBIcon, MDBNavbar } from 'mdb-react-ui-kit';
import RecipeDetails from './RecipeDetails';

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
    undoStack: [],
  })

  useEffect(() => {
    async function fetchRecipes() {
      const recipes = await fetch(`${baseURL}/searchRecipes?searchTerm=`).then(resp => resp.json())
      setPage(page => ({...page, recipes}))
    }
    fetchRecipes()
  }, [])

  function gotoPreviousPage() {
    setPage(page => {
      return {
        ...page.undoStack.slice(-1)[0].state,
        recipes: page.recipes
      }
    })
  }

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
        recipes: [{id, name, directions, ingredients: []}, ...page.recipes],
        undoStack: []
      }
    })
  }

  async function onSearch(e) {
    e.preventDefault()

    const searchTerm = e.target.elements.searchTerm.value
    const type = e.target.elements.searchType.value
    const url = new URL(type === 'name' ? `${baseURL}/searchRecipes` : type === 'ingredient' ? `${baseURL}/searchIngredients` : baseURL)
    url.search = new URLSearchParams({searchTerm})

    const results = await fetch(url).then(resp => resp.json())

    setPage(page => {
      return {
        ...page,
        currentPage: 'search',
        previousPage: page.currentPage,
        search: {
          ...page.search,
          type,
          term: searchTerm,
          results
        },
        undoStack: [...page.undoStack, {state: { ...page } }]
      }
    })
  }

  function onRecipeClick(e) {
    const selectedRecipeId = e.currentTarget.getAttribute('data-index')
    setPage(page => {
      return {
        ...page,
        currentPage: 'recipeDetails',
        selectedRecipeId,
        undoStack: [...page.undoStack, {state: { ...page }}]
      }
    })
  }

  function switchCurrentPage(pageType) {
    setPage(page => {
      return {
        ...page,
        currentPage: pageType,
        undoStack: pageType === 'home' ? [] : [...page.undoStack, { state: {...page}}]
      }
    })
  }

  async function onAddIngredient(e) {
    e.preventDefault()

    const ingredient = e.target.elements.ingredient.value
    const recipeId = page.selectedRecipeId

    const { id: ingredientId } = await fetch(`${baseURL}/addIngredient`, {
      method: "POST",
      body: JSON.stringify({recipeId, name: ingredient})
    }).then(resp => resp.json())

    setPage(page => {
      return {
        ...page,
        recipes: page.recipes.map(recipe => {
          return recipe.id === page.selectedRecipeId ? ({...recipe, ingredients: [...recipe.ingredients, {id: ingredientId, name: ingredient}]}) : recipe
        })
      }
    })

  }

  function PageContent(props) {
    const { page } = props

    switch (page.currentPage) {
      case 'home':
        return (
          <RecipePage recipes={page.recipes} onClick={onRecipeClick} />
        )
      case 'recipeDetails':
        return (
          <RecipeDetails recipe={page.recipes.find(x => x.id === page.selectedRecipeId)} onClick={() => switchCurrentPage('addIngredients')}/>
        )
      case 'addRecipe':
        return (
          <RecipeForm style={{padding: "10vh 0vh"}} onSubmit={onAddRecipe} onCancel={gotoPreviousPage}/>
        )
      case 'addIngredients':
        return (
          <AddIngredients recipe={page.recipes.find(x => x.id === page.selectedRecipeId)} onSubmit={onAddIngredient} />
        )
      case 'search':
        return (
          <SearchPage recipes={page.recipes} search={page.search} onClick={onRecipeClick} />
        )
      default:
        return PageContent({...props, page: { ...props.page, currentPage: 'home'}})
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} onClick={() => switchCurrentPage('home')} className="App-logo" alt="logo" />
        
      </header>
      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          <BackButton visible={page.undoStack.length > 0} onBack={gotoPreviousPage}></BackButton>
          <SearchBar onSubmit={onSearch}></SearchBar>
        </MDBContainer>
      </MDBNavbar>
      <PageContent page={page} />
      { page.currentPage !== 'addRecipe' && 
        <MDBBtn floating tag='a' color='dark' size="lg" style={{right: 20, bottom: 20, position: 'fixed'}} onClick={() => switchCurrentPage('addRecipe')}>
          <MDBIcon fas={true} size='fa-lg' icon='plus'></MDBIcon>
        </MDBBtn> 
      }
    </div>
  );
}

export default App;
