import { MDBRadio, MDBValidation } from "mdb-react-ui-kit";

export default function SearchBar({onSubmit}) {
    return (
        <form className="d-flex input-group w-auto" onSubmit={onSubmit} novalidate>
            <input type="search" name="searchTerm" id="searchTerm" aria-label="Search" required></input>
            <input type="submit" name="submit" value="Search"></input>
            <MDBRadio style={{marginLeft: "5vh"}} label="Name" name="searchType" value="name" inline defaultChecked></MDBRadio>
            <MDBRadio label="Ingredient" name="searchType" value="ingredient" inline></MDBRadio>
        </form>
    )
}