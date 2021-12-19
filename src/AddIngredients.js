


export default function AddIngredients({recipe, onSubmit}) {

    return (
        <div>
            <p>{`Recipe: ${recipe.name}`}</p>
            <ul>
                {recipe.ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)}
            </ul>
            {recipe.ingredients.length == 0 && <div>This recipe does not yet have any ingredients</div>}
            <form onSubmit={onSubmit}>
                <label htmlFor="newIngredient">New Ingredient</label>
                <input type="text" id="newIngredient" name="ingredient"></input>
                <input type="submit" name="submit" value="Add"></input>
            </form>
        </div>
    )
}