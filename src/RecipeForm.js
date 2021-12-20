import { MDBBtn, MDBContainer, MDBIcon, MDBRow, MDBValidation, MDBInput } from "mdb-react-ui-kit";


export default function RecipeForm({onSubmit, onCancel}) {

    return (
        <MDBContainer>
            <MDBRow md="6">
                <MDBValidation onSubmit={onSubmit} novalidate>
                    <p className="h4 text-center mb-4">Add New Recipe</p>
                    <MDBInput label="Recipe Name" name="recipeName" id="recipeName" placeholder="Please give your recipe a name..." required></MDBInput>
                    <br></br>
                    <label htmlFor="directions" className="gray-text">Directions</label>
                    <textarea className="form-control" id="directions" name="directions"></textarea>
                    <br></br>
                    <MDBBtn tag='a' outline rounded onClick={onCancel} color='none' style={{color: 'red', margin: "0 10vh"}}>
                        <MDBIcon fas icon='times' size='lg'></MDBIcon>
                    </MDBBtn>
                    <MDBBtn tag='button' outline rounded type="submit" color='none' style={{color: 'green', margin: "0 10vh"}}>
                        <MDBIcon fas icon='check' size='lg'></MDBIcon>
                    </MDBBtn>
                </MDBValidation>
            </MDBRow>
        </MDBContainer>
    )

}