const special = {
	"backgroundColor": "gc"
}

const variable = [
  "color",
  "backgroundColor",
  "borderColor",
]

function prop(p) {
	if (special[p]) return special[p];
	return p.toString().replace(/([A-Z])/g, ' $1').split(' ').map(w => w.charAt(0).toLowerCase()).join("")
}

function key(k) {
  const splitKey = k.toString().match(/([\d\.]+|[^\d\.]+)/g);
  return (splitKey[0] !== 0 ? splitKey[0].replace(/^0\./, '.') : "") +
    (splitKey[1] ? splitKey[1].charAt(0) : "");
}

module.exports = function(style) {
  const keys = Object.keys(style);

  if (keys.length === 0) {
    return "";
  }

  const classes = [];

  Object.keys(style).forEach(d => {

		if (typeof style[d] === 'object') {
		  Object.keys(style[d]).forEach(e => {
				if (variable.indexOf(d) !== -1 ) {
			    return classes.push(`${prop(d)}-${style[d]}`);
				}

		    return classes.push(`${prop(e)}-${key(style[d][e])}:h`);
			})

			return classes
		}

		if (variable.indexOf(d) !== -1 ) {
	    return classes.push(`${prop(d)}-${style[d]}`);
		}

    return classes.push(`${prop(d)}-${key(style[d])}`);
  });

  return classes.join(' ').trim();
};
