import { MDBInputGroupElement, MDBContainer, MDBRow, MDBInputGroup, MDBValidation } from "mdb-react-ui-kit";

export default function AddIngredients({recipe, onSubmit}) {

    return (
        <MDBContainer>
            <MDBRow md="6">
                <section className="h3 text-center mb-4">{`Recipe: ${recipe.name}`}</section>
                <ul style={{listStyleType: "none"}}>
                    {recipe.ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)}
                </ul>
                {recipe.ingredients.length === 0 && <div>This recipe does not yet have any ingredients</div>}
                <MDBValidation onSubmit={onSubmit} novalidate>
                    <label htmlFor="newIngredient" className="form-label">New Ingredient</label>
                    <MDBInputGroup className='mb-3'>
                        <MDBInputGroupElement className="form-control" style={{width: "80%"}} type="text" id="newIngredient" name="ingredient" required></MDBInputGroupElement>
                        <MDBInputGroupElement className="form-control" type="submit" name="submit" value="Add"></MDBInputGroupElement>
                    </MDBInputGroup>
                </MDBValidation>
                <header className="h2">Directions</header>
                <section>{recipe.directions}</section>
            </MDBRow>
        </MDBContainer>
    )
}