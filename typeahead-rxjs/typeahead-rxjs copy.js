
var paintStars = function(stars){
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#ffffff";
	stars.forEach(function(star){
		ctx.fillRect(star.x, star.y, star.size, star.size);
	});
};

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

document.body.appendChild(canvas);


var windowResizeStream = Rx.Observable
	.fromEvent($(window), 'resize')
	.debounce(50)
	.map(function(resizeEvt) {
		return {
			width: resizeEvt.target.innerWidth,
			height: resizeEvt.target.innerHeight
		};
	})
	.startWith(
		{
			"width": window.innerWidth, 
			"height": window.innerHeight
		}
	);
	
windowResizeStream.subscribe(function(screenDimensions){
	canvas.height = screenDimensions.height;
	canvas.width = screenDimensions.width;
});



var SPEED = 40;
var STAR_NUMBER = 250;
var starStream = Rx.Observable
	.range(1, STAR_NUMBER)
	.map(function(){
		return {
			"x": parseInt(Math.random() * canvas.width),
			"y": parseInt(Math.random() * canvas.height),
			"size": Math.random() * 3 + 1
		}
	})
	.toArray()
	.flatMap(function(starArray){
		return Rx.Observable.interval(SPEED).map(function(){
			starArray.forEach(function(star){
				if(star.y >= canvas.height){
					star.y = 0;
					star.x = parseInt(Math.random() * canvas.width);
					star.y = parseInt(Math.random() * canvas.height / 4);
				}
				else {
					star.y += 3;
				}
			});
			return starArray;
		});
	})
	.subscribe(function(starArray){
		paintStars(starArray);
	});

