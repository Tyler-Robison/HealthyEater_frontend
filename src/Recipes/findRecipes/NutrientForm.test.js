import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import NutrientForm from './NutrientForm';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext'

// using listState to set 
const DummyComponent = () => {
    const [fat, setFat] = useState(null)
    const [satFat, setSatFat] = useState(null)
    const [calories, setCalories] = useState(null)
    const [carbs, setCarbs] = useState(null)
    const [sugar, setSugar] = useState(null)
    const [sodium, setSodium] = useState(null)
    const [cholesterol, setCholesterol] = useState(null)
    const [protein, setProtein] = useState(null)

    return (
        <NutrientForm
            setFat={setFat}
            setSatFat={setSatFat}
            setSugar={setSugar}
            setSodium={setSodium}
            setCholesterol={setCholesterol}
            setCalories={setCalories}
            setCarbs={setCarbs}
            setProtein={setProtein}
        />
    )
}

it("renders without crashing", function () {
    <MemoryRouter>
        <ContextProvider >
            <DummyComponent />
        </ContextProvider>
    </MemoryRouter>
});


it("matches snapshot", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <DummyComponent />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});