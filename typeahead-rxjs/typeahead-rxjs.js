
var homogenizeTitle = function(str){
	return str.toLowerCase();
};


var RxFromEvent = Rx.Observable.fromEvent;

var typeaheadSelect = RxFromEvent($('#title'), 'typeahead:select')
	.map(function(t){
		return homogenizeTitle('typeahead:select ' + t.target.value);
	});

var titleChange = RxFromEvent($('#title'), 'change')
	.map(function(t){
		return homogenizeTitle('change ' + t.target.value);
	});

var titleKeyup = RxFromEvent($('#title'), 'keyup')
	.map(function(t){
		return homogenizeTitle('change ' + t.target.value);
	});


var submit$ = RxFromEvent($('#title'), 'keyup')
	.filter(function(e){
		// console.loge;
		return e && e.keyCode && e.keyCode === 13;
	})
	.map(function(t) {
		return "submit at " + new Date();
	});

	submit$.subscribe(function(next){
		console.log("submit$");
		console.log(next);
	});

var titleEvent$ = Rx.Observable
					.merge(typeaheadSelect, titleChange, titleKeyup)
					.debounce(250)
					.distinctUntilChanged();

titleEvent$.subscribe(function(next){
	console.log("titleEvent$");
	console.log(next);
	$('#debugger').prepend('<p>CHANGE <b>' + next + '</b> at ' + new Date() + '</p>');
});

/*
var starStream = Rx.Observable
	.fromEvent($('#title'), 'keyup') 
	// .pluck()
	.map(function(t){
		// console.log(t);
		console.log(t.target);
		return homogenizeTitle(t.target.value); //t.target.value + ' g';
	}).
	debounce(250).
	distinctUntilChanged().
	subscribe(function(starArray){
		$('#debugger').prepend('<p>KEYUP <b>' + starArray + '</b> at ' + new Date() + '</p>');
	});
*/

	
	var bestPictures = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace,
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: 'history.json',
  	  remote: {
   		  url: 'history.json'
	  }
	});

	$('#prefetch .typeahead').typeahead(null,
	{
	  name: 'bestPictures',
		display: 'title',
	  source: bestPictures
	});
	/*{
	  hint: true,
	  highlight: true,
	  minLength: 1
	}*/