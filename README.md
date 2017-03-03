
iterateTest.js -- David Millet

Useful for iterating over test code with more than one set of inputs.

Ex:

	var tests = iterateTest(
		{
			lowNumbers: { a: 1, b: 10 },
			highNumbers: { a: 20, b: 5 },
			sameNumbers: function() { var vals = { a: 44 }; vals.b = vals.a; return vals; }
		},
		function testMultiply(v) {
			if (multiply(v.a, v.b) !== v.a * v.b) {
				throw new Error('nope');
			}
		}
	);

	tests();

With BDD:

	describe('multiply', iterateTest(
		{
			lowNumbers: { a: 1, b: 10 },
			highNumbers: { a: 20, b: 5 },
			sameNumbers: function() { var vals = { a: 44 }; vals.b = vals.a; return vals; }
		},
		function(vals, setName) {
			it('multiplies ' vals.a + ' and ' + vals.b + ' together', function () {
				expect(multiply(vals.a, vals.b)).to.equal(vals.a * vals.b);
			}
		}
	);

Configure output:

	iterateTest.config(
		{
			echo: function(values, setName) { console.log('iterating with values', setName, JSON.stringify(values)); }
		}
	);
