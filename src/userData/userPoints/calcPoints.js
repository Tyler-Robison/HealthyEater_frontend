
/** Weight Watchers 2018 points calculation method */
const calculatePoints = (gender, age, height, weight, PAL) => {
    const genderAdjust = (gender === 'male' ? 8 : 2)

    let ageAdjust;
    if (age <= 26) ageAdjust = 4
    if (age >= 27 && age <= 37) ageAdjust = 3
    if (age >= 38 && age <= 47) ageAdjust = 2
    if (age >= 48 && age <= 58) ageAdjust = 1
    if (age > 58) ageAdjust = 0

    const weightAdjust = Math.floor(weight / 10);

    let heightAdjust;
    if (height < 62) heightAdjust = 0;
    if (height >= 62 && height <= 70) heightAdjust = 1
    if (height > 70) heightAdjust = 2

    const allowance = genderAdjust + ageAdjust + weightAdjust + heightAdjust + PAL
    return allowance
}

export default calculatePoints;