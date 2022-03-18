import './IngredientList.css'
/** IngredientList (component) displays the contents of ingredientsList (state) in a form that is visible to users
 * 
 * items on the list can be removed by clicking on the red 'X'
 * 
 * Contents on ingredientsList (state) are sent to the back-end /recipes/complex when user clicks "Get Recipes" button
  */
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