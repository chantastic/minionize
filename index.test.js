const m = require("./");

test("takes an object, returns a string", () => {
  expect(m({})).toBe("");
});

test("returns minion-style classes for basic declarations", () => {
  expect(m({ margin: "1rem" })).toBe("m-1r");
  expect(m({ margin: "0.5rem" })).toBe("m-.5r");
  expect(m({ margin: 0 })).toBe("m-0");
  expect(m({ padding: "12px" })).toBe("p-12p");
  expect(m({ padding: 0 })).toBe("p-0");
  expect(m({ order: 1 })).toBe("o-1");
  expect(m({ opacity: 1 })).toBe("o-1");
  expect(m({ opacity: 0 })).toBe("o-0");
  expect(m({ opacity: 0.5 })).toBe("o-.5");
  expect(m({ opacity: 0.5 })).toBe("o-.5");
});

test("multiple properties", () => {
  const subject = {
    margin: "1rem",
    padding: ".5rem",
    borderWidth: "1px",
    borderColor: "red",
    width: "100%",
    ":h": { backgroundColor: "blue" },
    "@mn": { width: "25%" },
    "@sm": { width: "50%" },
    "@lg": { width: "100%" },
    children: {
      padding: "1rem",
      margin: ".5rem",
      borderBottomWidth: "1px"
    }
  };
  expect(m(subject)).toBe(
    "m-1r p-.5r bw-1p bc-red w-100% gc-blue:h w-25%@mn w-50%@sm w-100%@lg p_1r m_.5r bbw_1p"
  );
});

test("works with cameled props", () => {
  expect(m({ borderRightWidth: "1rem" })).toBe("brw-1r");
  expect(m({ borderRightWidth: 0 })).toBe("brw-0");
  expect(m({ borderRightWidth: ".5rem" })).toBe("brw-.5r");
  expect(m({ borderTopRightWidth: "1em" })).toBe("btrw-1e");
});

test("handles special naming cases", () => {
  expect(m({ backgroundColor: "red" })).toBe("gc-red");
  expect(m({ borderColor: "blue" })).toBe("bc-blue");
  expect(m({ color: "pink" })).toBe("c-pink");
});

test("handles suffixes", () => {
  expect(m({ ":h": { backgroundColor: "red" } })).toBe("gc-red:h");
  expect(m({ ":h": { opacity: ".5" } })).toBe("o-.5:h");
  expect(m({ "@mn": { backgroundColor: "red" } })).toBe("gc-red@mn");
  expect(m({ "@xs": { backgroundColor: "red" } })).toBe("gc-red@xs");
  expect(m({ "@sm": { backgroundColor: "red" } })).toBe("gc-red@sm");
  expect(m({ "@md": { backgroundColor: "red" } })).toBe("gc-red@md");
  expect(m({ "@lg": { backgroundColor: "red" } })).toBe("gc-red@lg");
  expect(m({ "@xl": { backgroundColor: "red" } })).toBe("gc-red@xl");
  expect(m({ "@420p": { backgroundColor: "red" } })).toBe("gc-red@420p");
  expect(m({ "@768p": { backgroundColor: "red" } })).toBe("gc-red@768p");
  expect(m({ "@30e": { backgroundColor: "red" } })).toBe("gc-red@30e");
  expect(m({ "@print": { backgroundColor: "red" } })).toBe("gc-red@print");
});

test("handles other supported suffixes", () => {
  expect(m({ ":^h": { backgroundColor: "red" } })).toBe("gc-red:^h");
  expect(m({ ":a": { backgroundColor: "red" } })).toBe("gc-red:a");
  expect(m({ ":fc": { backgroundColor: "red" } })).toBe("gc-red:fc");
  expect(m({ ":lc": { backgroundColor: "red" } })).toBe("gc-red:lc");
  expect(m({ ":b": { backgroundColor: "red" } })).toBe("gc-red:b");
  expect(m({ ":n(even)": { backgroundColor: "red" } })).toBe("gc-red:n(even)");
  expect(m({ ":n(odd)": { backgroundColor: "red" } })).toBe("gc-red:n(odd)");
  expect(m({ "@!md": { width: "25%" } })).toBe("w-25%@!md");
  expect(m({ "@=md": { width: "25%" } })).toBe("w-25%@=md");
  expect(m({ "@!=md": { width: "25%" } })).toBe("w-25%@!=md");
});

test("handles !important", () => {
  expect(m({ backgroundColor: "red !important" })).toBe("gc-red!");
  expect(m({ margin: "1rem !important" })).toBe("m-1r!");
  expect(m({ padding: ".5rem !important" })).toBe("p-.5r!");
  // not sure if i want to support this with the other matchers
  // ! should not be used with mqs
  // expect(m({ "@sm": { padding: ".5rem !important" }})).toBe("p-.5r!");
});

test("handles !important", () => {
  expect(m({ children: { padding: "1rem" } })).toBe("p_1r");
  expect(m({ children: { margin: ".5rem" } })).toBe("m_.5r");
  expect(m({ children: { color: "red" } })).toBe("c_red");
  expect(m({ children: { color: "red !important" } })).toBe("c_red!");
});

/* TODO
 * negative values { order: -1 } => o-n1
 * verbose
 * special-cases:
   * order
   * max-height
   * max-width
   * min-height
   * min-width
	 * animation-delay
   * animation-direction
   * animation-duration
   * transition-duration
	 * transition-delay
 * just have a test case for all of them...
 */
