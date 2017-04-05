const special = {
  backgroundColor: "gc"
};

const variable = ["color", "backgroundColor", "borderColor"];

module.exports = function(style) {
  const keys = Object.keys(style);

  const selector = (p, k, suffix = "", combinator = "-") =>
    `${p}${combinator}${k}${suffix}`;

  const prop = p => // assumes string (add flow)
    special[p]
      ? special[p]
      : p
          .replace(/([A-Z])/g, " $1")
          .split(" ")
          .map(w => w.charAt(0).toLowerCase())
          .join("");

  const key = k => {
    // assumes string (add flow)
    const matches = k.match(/([\d\.]+|[^\d\.]+)/g);
    const remove0 = str => str.replace(/^0\./, ".");
    const firstChar = str => str.charAt(0);

    if (matches.length > 1) {
      return `${remove0(matches[0])}${firstChar(matches[1])}`;
    }

    if (variable.indexOf(matches[0]) === -1) {
      return `${remove0(matches[0])}`;
    }

    return `${firstChar(remove0(matches[0]))}`;
  };

  const processObject = ([p, k]) => {
    return Object.entries(k).map(e => selector(prop(e[0]), key(e[1]), p));
  };

  // TODO: this could be made recursive
  const classes = Object.entries(style).map(e => {
    if (typeof e[1] !== "object") {
      return selector(prop(e[0]), key(e[1].toString()));
    }

    return processObject(e);
  });

  return classes.join(" ").trim();
};
