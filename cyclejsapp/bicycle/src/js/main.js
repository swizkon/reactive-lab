import { Observable as $ } from 'rx';
import { Subject } from 'rx';
import { div, br, label, input, p, h1 } from '@cycle/dom';
import { Input, KeyUp } from './helpers';



var arrowKeys = (k) => k.keyCode === 38 || k.keyCode === 40;

var numbers = (t) => !isNaN(t);

export default ({ DOM }) => {


	let heightInput$ = Input(DOM.select('#Height'))
						.filter(numbers)
						.map(x => x >= 0 ? x : 0);

	let heightUpDownKey$ = KeyUp(DOM.select('#Height'))
						.filter(arrowKeys)
						.map(k => Math.floor(k.target.value) + ((k.keyCode === 38) ? 1 : -1));

	let height$ = $.merge(heightInput$,heightUpDownKey$).startWith(174);
	
	// height$.subscribe(x => console.log(x));

	let weightInput$ = Input(DOM.select('#Weight'))
					.filter(numbers)
					.map(x => x >= 0 ? x : 0);

	let weightUpDownKey$ = KeyUp(DOM.select('#Weight'))
					.filter(arrowKeys)
					.map(k => Math.floor(k.target.value) + ((k.keyCode === 38) ? 1 : -1));
	
	let weight$ = $.merge(weightInput$,weightUpDownKey$).startWith(65);

	// let weight$ = Input(DOM.select('#Weight'))
	//				.startWith((100 - Math.random() * 35).toFixed(0));

	let bmi$ = $.combineLatest(
		height$, weight$,
		(h, w) => (w / (h / 100) ** 2).toFixed(2)
	);
	//.debounce(250);

	return {
		DOM: $.combineLatest(height$, weight$, bmi$, (h, w, bmi) =>
			div('.p2.measure', [
				label({ htmlFor: 'Height' }, 'Height (cm): '),
				input('#Height', { value: h}),
				br(),
				label({ htmlFor: 'Weight', id:' weightlabel'}, 'Weight (kg): '),
				input('#Weight', { value: w}),
				br(),
				h1('BMI: ' + bmi),
				p(' at ' + new Date().toString())
			])
		)
	};
}
