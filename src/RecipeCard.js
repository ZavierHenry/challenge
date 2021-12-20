import Card from "react-bootstrap/Card";


function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}


function splitChildren(children, term) {
    const pattern = new RegExp(Array.from(term, d => `[${d.toLowerCase()}${d.toUpperCase()}]`).join(''))

    const words = children.split(pattern)
    return Array.from({length: words.length * 2 - 1}, (_, i) => {
        return i === 0 ? capitalize(words[Math.floor(i/2)]) : i % 2 === 0 ? words[Math.floor(i / 2)] : <span key={i} style={{backgroundColor: 'yellow'}}>{i === 1 && words[0] === '' ? capitalize(term) : term}</span>
    })
}

function HighlightedTitle({children, term, isHighlighted}) {

    return (
        <Card.Title>{isHighlighted ? splitChildren(children, term) : capitalize(children)}</Card.Title>
    )
}

function HighlightedIngredients({children, term, isHighlighted}) {
    const stem = children.join(', ')
    const text = ["Ingredients: "].concat(isHighlighted ? splitChildren(stem, term) : stem === "" ? ["None"] : [stem])

    return (
        <Card.Body>{text}</Card.Body>
    )
}



export default function RecipeCard({recipe, onClick, term, highlightType}) {

    const {id, name, ingredients, directions} = recipe

    return (
        <Card onClick={onClick} data-index={id}>
        <HighlightedTitle term={term} isHighlighted={highlightType === 'name'}>{name}</HighlightedTitle>
            <HighlightedIngredients term={term} isHighlighted={highlightType === 'ingredient'}>{ingredients.map(x => x.name)}</HighlightedIngredients>
            <Card.Body style={{margin: "5vh"}}>{`Directions: ${directions.length > 50 ? directions.slice(0, 50) + "..." : directions}`}</Card.Body>
        </Card>
    )
}