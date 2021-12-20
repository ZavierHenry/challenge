import { MDBBtn, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { capitalize } from "./utils";

export default function RecipeDetails({recipe, onClick}) {

    return (
        <section>
            <section className="h3" style={{margin: "2vh 7vh"}}>{capitalize(recipe.name)}</section>
            <section>Ingredients</section>
            <MDBListGroup style={{minWidth: "30vh"}}>
                {recipe.ingredients.map(ingredient => <MDBListGroupItem key={ingredient.id}>{ingredient.name}</MDBListGroupItem>)}
            </MDBListGroup>
            <MDBBtn onClick={onClick}>Add Ingredients</MDBBtn>
            <header style={{margin: "7vh 0 5vh 0"}} className="h2">Directions</header>
            <section>{recipe.directions}</section>
            
        </section>
    )

}