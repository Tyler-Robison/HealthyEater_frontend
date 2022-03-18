
/** Step components are items in the StepsList component
 * 
 * Each step contains a step number, instructions and equipment/ingredients needed*/
const Step = ({ step }) => {
    const displayItems = (step) => {
        if (step.length === 0) return 'None'

        const itemArr = step.map(item => item.name)
        return itemArr.join(', ')
    }

    return (
        <div className='step-div col-10'>

            <p className='step-number'><b>{step.number}</b></p>
            <p>{step.step}</p>

            <p><b>Equipment Used:</b> {displayItems(step.equipment)} </p>
            <p><b>Ingredients Used:</b> {displayItems(step.ingredients)} </p>

        </div>
    )
}

export default Step;