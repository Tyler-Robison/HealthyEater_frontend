import React from "react";
import './NutrientTable.css'

const NutrientTable = ({nutritionDetail}) =>{
    
    return (
        <table className='nutrition-table' >
        <thead>
            <tr>
                <th>Nutrient</th>
                <th>Amount</th>
                <th>Daily Need (%)</th>
            </tr>
        </thead>
        <tbody>
    {nutritionDetail.map((nutrient, idx) => {
            return <tr key={idx}>
                <td>{nutrient.title}</td>
                <td>{nutrient.amount}</td>
                <td>{nutrient.percentOfDailyNeeds}</td>
                </tr>
        })}
        </tbody>
    </table>
    )
}

export default NutrientTable;