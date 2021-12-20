import RecipeCard from "./RecipeCard"

export default function RecipePage({recipes, onClick}) {

    const styling = {
        display: 'grid',
        gridTemplateColumns: 'auto',
        gap: "10vh 10vh"
    }

    if (recipes.length > 0) {

        return (
            <div style={{...styling, padding: "10vh"}}>
                {recipes.map(recipe => {
                    return (
                        <RecipeCard key={recipe.id} data-index={recipe.id} recipe={recipe} onClick={onClick}></RecipeCard>
                    )
                })}
            </div>
        )

    } else {

        return (
            <section style={{padding: "10vh"}}>You have not added any recipes yet. Click the add button on the bottom right to start</section>
        )
    }
    
    
}

