(function(){
  var updateDateString = function() {
		var d = new Date();
		var weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
		var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
		var weekName = weekdays[d.getDay()];
		var monthName = monthNames[d.getMonth()];
		var monthDate = d.getDate();
		var year = d.getFullYear();
		$(".date").text(weekName + " " + monthDate+" "+monthName+" "+year);
	}

	var updateTimeString = function(){
		var nowDate=new Date();
		var hours=nowDate.getHours();
		var minutes=nowDate.getMinutes();
		minutes=minutes>9 ? minutes : "0"+minutes;
		hours=hours>9 ? hours : "0"+hours;
		$(".clock").text(hours+":"+minutes);
	}

	$(".toggle-apps").click(function(){
		$(".container").toggleClass("left");
	});

	$(".apps li").click(function(){
		$(".container").toggleClass("right");
	});

	updateTimeString();
	setInterval(updateTimeString,1000);
	updateDateString();
})();