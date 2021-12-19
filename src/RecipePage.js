export default function RecipePage({recipes}) {
    
    return (
        <div style={{display: "flex", justifyContent: "space-around"}}>
            {recipes.map(recipe => {
                return (
                    <div key={recipe.id}>{recipe.name}</div>
                )
            })}
        </div>
    )
}

