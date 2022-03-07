import Step from "./Step";

const StepsList = ({ recipeDetail }) => {

    if (recipeDetail.analyzedInstructions.length === 0) {
        // API sometimes returns recipes that don't have steps
        return <h3>Sorry, that recipe doesn't exist anymore</h3>
    }

    return (
        <div>
            {recipeDetail.analyzedInstructions[0].steps.map(step => {
                return <Step key={step.number} step={step} />
            })}
        </div>
    )
}

export default StepsList;