const esmRequire = require("esm")(module);
const getMatchingInitial = esmRequire("./getMatchingInitial.js").default;

describe("getMatchingInitial", () => {
  let swedishLetters = Array.from("abcdefghijklmnopqrstuvwxyzåäö");
  let englishLetters = Array.from("abcdefghijklmnopqrstuvwxyz");
  let arabicLetters = Array.from("ابتثجحخدذرزسشصضطظعغفقكلمنهوي");
  it("should return the first matching initial", () => {
    expect(getMatchingInitial("sv", swedishLetters, "à")).toEqual("a");
    expect(getMatchingInitial("sv", swedishLetters, "ü")).toEqual("y");
    expect(getMatchingInitial("sv", swedishLetters, "Åsa")).toEqual("å");
    expect(getMatchingInitial("sv", swedishLetters, "”Åsa”")).toEqual("å");
    expect(getMatchingInitial("en", swedishLetters, "5ive")).toEqual("");
    expect(getMatchingInitial("en", englishLetters, "Åsa")).toEqual("a");
    expect(getMatchingInitial("en", englishLetters, "“Åsa”")).toEqual("a");
    expect(getMatchingInitial("ar", arabicLetters, "Åsa")).toEqual("");
    expect(getMatchingInitial("ar", arabicLetters, "كتب")).toEqual("ك");
    expect(getMatchingInitial("sv", swedishLetters, "كتب")).toEqual("");
  });
});
