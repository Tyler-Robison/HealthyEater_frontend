import './IngredientList.css'

const IngredientList = ({ ingredientsList, setIngredientsList }) => {

    const removeIngredient = (ingredient) => {
        const filteredList = ingredientsList.filter(i => i !== ingredient);
        setIngredientsList(filteredList);
    }

    return (
        <div className="IngredientList">
            {ingredientsList.map((ingredient, idx) => {
                return <div className="IngredientList-div" key={idx}>
                    {`${ingredient} `}
                    <button className="delete-btn" onClick={() => removeIngredient(ingredient)}>X</button>
                </div>
            })}
        </div>
    )
}

export default IngredientList;