

export default function SearchBar({onSubmit}) {
    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="searchTerm" id="searchTerm"></input>
            <input type="submit" name="submit"></input>
            <br></br>
            <label htmlFor="searchTypeName">Name</label>
            <input type="radio" id="searchTypeName" name="searchType" value="name" defaultChecked={true}></input>
            <label htmlFor="searchTypeIngredient">Ingredient</label>
            <input style={{paddingLeft: "20vh"}} type="radio" id="searchTypeIngredient" name="searchType" value="ingredient"></input>
        </form>
    )
}