import calculatePoints from "./calcPoints";

test("calcPoints outputs correct points", function () {
    const output1 = calculatePoints('female', 44, 52, 160, 6);
    const output2 = calculatePoints('male', 17, 70, 200, 2);

    expect(output1).toEqual(26);
    expect(output2).toEqual(35);
});