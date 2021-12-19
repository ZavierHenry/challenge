import SearchBar from "./SearchBar"

export default function SearchPage({search, onSearch}) {

    if (search.type == "name") {
        return (
            <div>
                <p>{`Name results for ${search.term}:`}</p>
                {search.results.map(result => {
                    return (
                        <ul key={result.id}>
                            <li>{result.name}</li>
                        </ul>
                    )
                })}
                <SearchBar onSubmit={onSearch}></SearchBar>
            </div>
        )

    } else if (search.type == "ingredient") {

        return (
            <div>
                <p>{`Ingredient results for ${search.term}:`}</p>
                {search.results.map(result => {
                    return (
                        <ul key={result.id}>
                            <li>{result.name}</li>
                            <ul>
                            {result.recipes.map(recipe => <li key={recipe.id}>{recipe.name}</li>)}
                            </ul>
                        </ul>
                    )
                })}
                <SearchBar onSubmit={onSearch}></SearchBar>
            </div>
        )

    } else {
        return null
    }

}