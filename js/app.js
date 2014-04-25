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

	var getApps = function() {
		if(chrome && chrome.management) {
			chrome.management.getAll(function(extensions) {
				for(i in extensions) {
					if(extensions[i].enabled && (extensions[i].type == "hosted_app" || 
					extensions[i].type == "packaged_app" || extensions[i].type == "legacy_packaged_app")) {
						var name = extensions[i].name;
						var id = extensions[i].id;
						var icon = extensions[i].icons[extensions[i].icons.length -1];

						$(".app-list").append("<li data-id='"+id+"'><img src='"+icon.url+"'>"
							+"<span>"+name+"</span></li>");
					}
				}
			});
			$(".app-list").on("click", "li", function(e) {
				e.preventDefault();
				var id = $(this).data("id");
				chrome.management.launchApp(id);
			});
		}
	}

	getApps();

	getTrending();

	$(".toggle-apps").click(function(){
		$(".container").toggleClass("left");
	});
	$(".apps li").click(function(){
		$(".container").toggleClass("right");
	});
	$("#add").click(function(){
		var link="http://www.stackoverflow.com";
		var imageLink="https://www.google.com/s2/favicons?domain="+ link;
		$(".left-container").html("<img width='48' src='"+imageLink+"'>");
	});

	$(".container").click(function(e){
		if($(".container").position().left>0)
			$(".container").removeClass("left");
		else if($(".container").position().left<0)
				$(".container").removeClass("right");
		
	});
	
	updateTimeString();
	setInterval(updateTimeString,1000);
	updateDateString();
})();