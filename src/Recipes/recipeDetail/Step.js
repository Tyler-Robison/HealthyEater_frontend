

const Step = ({ step }) => {

    const displayItems = (step) => {
        if (step.length === 0) return 'None'

        const itemArr = step.map(item => {
            return item.name
        })
        return itemArr.join(', ')
    }

    return (
        <div className='step-div'>

            <p className='step-number'><b>{step.number}</b></p>
            <p>{step.step}</p>

            <p><b>Equipment Used:</b> {displayItems(step.equipment)} </p>
            <p><b>Ingredients Used:</b> {displayItems(step.ingredients)} </p>

        </div>
    )
}

export default Step;