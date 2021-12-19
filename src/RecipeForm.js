

export default function RecipeForm({onSubmit}) {

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="recipeName">Recipe Name</label>
            <input type="text" id="recipeName" name="recipeName" placeholder="Give your recipe a name..."></input>
            <br/>
            <label htmlFor="directions">Directions</label>
            <textarea id="directions" name="directions"></textarea>
            <br></br>
            <input type="button" id="cancel" name="cancel" value="Cancel"></input>
            <input type="submit" id="submit" name="submit" value="Add"></input>
        </form>
    )

}