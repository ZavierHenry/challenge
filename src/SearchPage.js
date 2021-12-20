import RecipeCard from "./RecipeCard"
import { capitalize } from "./utils"


export default function SearchPage({recipes, search, onClick}) {
    
    const styling = {
        display: 'grid',
        gridTemplateColumns: 'auto',
        gap: "10vh 10vh"
    }

    let searchLayout = null

    switch (search.type) {
        case 'name':

            searchLayout = (
                <div style={{...styling, padding: "10vh"}}>
                    {recipes.filter(recipe => search.results.some(result => result.id === recipe.id)).map(recipe => {
                        return (
                            <RecipeCard key={recipe.id} data-index={recipe.id} recipe={recipe} onClick={onClick} term={search.term} highlightType={search.type}></RecipeCard>
                        )
                    })}
                </div>
            )
            break
        case 'ingredient':
            searchLayout = search.results.map(result => {
                return (
                    <>
                        <section style={{...styling, paddingTop: "10vh"}} className="h3" key={result.id}>{result.name}</section>
                        <div style={{...styling, padding: "10vh"}}>
                            {recipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.id === result.id)).map(recipe => {
                                return (
                                    <RecipeCard key={recipe.id} data-index={recipe.id} recipe={recipe} onClick={onClick} term={search.term} highlightType={search.type}></RecipeCard>
                                )
                            })}
                        </div>
                    </>
                )
            })
            break
        default:
            searchLayout = null
    }

    return (
        <>
            <section className="h2">{`${capitalize(search.type)} results for "${search.term}"`}</section>
            {search.results.length > 0 ? searchLayout : <section style={{padding: "10vh"}}>No search results were found</section>}
        </>
    )
}