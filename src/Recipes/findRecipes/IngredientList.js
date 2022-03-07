

const IngredientList = ({ ingredientsList, setIngredientsList }) => {

    const removeIngredient = (ingredient) => {
        const filteredList = ingredientsList.filter(i => i !== ingredient);
        setIngredientsList(filteredList);
    }

    return (
        <div>
            {ingredientsList.map((ingredient, idx) => {
                return <div key={idx}>
                    {`${ingredient} `}
                    <button className="delete-btn" onClick={() => removeIngredient(ingredient)}>X</button>
                </div>
            })}
        </div>
    )
}

export default IngredientList;