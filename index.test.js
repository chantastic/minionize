const m = require("./");

test("takes an object, returns a string", () => {
  expect(m({})).toBe("");
});

test("returns minion-style classes for basic declarations", () => {
  expect(m({ margin: "1rem" })).toBe("m-1r");
  expect(m({ margin: 0 })).toBe("m-0");
  expect(m({ padding: "12px" })).toBe("p-12p");
  expect(m({ padding: 0 })).toBe("p-0");
  expect(m({ order: 1 })).toBe("o-1");
  expect(m({ opacity: 1 })).toBe("o-1");
  expect(m({ opacity: 0 })).toBe("o-0");
  expect(m({ opacity: 0.5 })).toBe("o-.5");
  expect(m({ opacity: 0.5 })).toBe("o-.5");
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
