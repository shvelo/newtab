(function(){
  var updateDateString = function() {
		var d = new Date();
		var weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
		var monthNames = [ "Jan", "Feb", "Mar", "Apr", 
		"May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
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

	var getTrending = function() {
		var date = new Date();
		var month = date.getMonth();
		var day = date.getDate();
		if(month < 10) month = "0" + month;
		if(day < 10) day = "0" + day;
		var d = date.getFullYear() + "-" + month + "-" + day;
		$.ajax({
	url: "https://api.github.com/search/repositories?sort=stars&order=desc&per_page=5&q=pushed:"+ d,
			dataType: "jsonp",
			complete: function(data) {
				var items = data.responseJSON.data.items;
				for(i in items) {
					$(".github-repos").append("<li>"+ items[i].name +"</li>")
				}
			}
		})
	}

	getTrending();

	$(".toggle-apps").click(function(){
		$(".container").toggleClass("left");
	});

	$(".apps li").click(function(){
		$(".container").toggleClass("right");
	});

	$(".container").click(function(e){
		if($(".container").position().left>0)
			$(".container").toggleClass("left");
		else if($(".container").position().left<0)
				$(".container").toggleClass("right");
		
	});
	
	updateTimeString();
	setInterval(updateTimeString,1000);
	updateDateString();
})();