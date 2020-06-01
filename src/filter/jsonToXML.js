Vue.filter('jsonToXML', function (value) {

	var a = JSON.parse(value);
	var c = document.createElement('root');

	var t = function (v) {
		return {}.toString.call(v).split(' ')[1].slice(0, -1).toLowerCase();
	};

	var f = function (f, c, a, s) {

		c.setAttribute('type', t(a));

		if (t(a) != 'array' && t(a) != 'object') {

			if (t(a) != 'null') {

				c.appendChild(document.createTextNode(a));

			}

		} else {

			for (var k in a) {

				var v = a[k];

				if (k == '__type' && t(a) == 'object') {

					c.setAttribute('__type', v);

				} else {

					if (t(v) == 'object') {

						var ch = c.appendChild(document.createElementNS(null, s ? 'item' : k));
						f(f, ch, v);

					} else if (t(v) == 'array') {

						var ch1 = c.appendChild(document.createElementNS(null, s ? 'item' : k));
						f(f, ch1, v, true);

					} else {

						var va = document.createElementNS(null, s ? 'item' : k);

						if (t(v) != 'null') {

							va.appendChild(document.createTextNode(v));

						}

						var ch2 = c.appendChild(va);
						ch2.setAttribute('type', t(v));

					}

				}

			}

		}

	};

	f(f, c, a, t(a) == 'array');

	return c.outerHTML;

});
