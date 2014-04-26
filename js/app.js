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

	$(".toggle-apps,.add-shortcut").click(function(){
		$(".container").toggleClass("left");
	});
	$(".apps li").click(function(){
		$(".container").toggleClass("right");
	});

	var getFavicon = function(link){
		return "http://fvicon.com/"+link+"?canAudit=false&format=png&filter=apple-touch-icon";
	};
	
	var getMailCount = function() {
		$.ajax({
			url: "https://mail.google.com/mail/feed/atom",
			dataType: "xml",
			complete: function(data) {
				var newMailCount=data.responseText.split("<fullcount>")[1].split("</fullcount>")[0];
				$(".mail-count").text(newMailCount);
			}
		});
	}
	getMailCount();

	$(".gmail").click(function(){
		location.href = "https://mail.google.com";
	})

	var loadShortcuts = function(){
		if(chrome && chrome.storage && chrome.storage.sync) {
			chrome.storage.sync.get("shortcuts", function(data) {
		    console.log(data);
		  });
		}
	}

	var getDribbbleShots = function() {
		$.ajax({
			dataType: "jsonp",
			url: "https://api.dribbble.com/shots/popular?per_page=5",
			complete: function(result){
				var shots = result.responseJSON.shots;
				for(i in shots){
					$(".dribbble-shots").append("<li>" + shots[i].title + "</li>");
				}
			}
		});
	}

	getDribbbleShots();	

	$(".container").click(function(e){
		if($(".container").position().left>0)
			$(".container").removeClass("left");
		else if($(".container").position().left<0)
				$(".container").removeClass("right");
	});
	
	$(".toggle-apps").click(function(){
		$(".left-tab").removeClass("active");
		$(".tab-applist").addClass("active");
	});

	$(".add-shortcut").click(function(){
		$(".left-tab").removeClass("active");
		$(".tab-add").addClass("active");
	});
	$('#addBookmark').click(function(){
		var url=($("#url").val());
		var title=($("#title").val());
		var arr1,arr2;
		chrome.storage.sync.get("url", function(data) {
			arr1=(data.url).split("|");
			arr1.push(url);
			chrome.storage.sync.set({"url": arr1.join("|")});
		});
		chrome.storage.sync.get("title", function(data) {
			arr2=(data.title).split("|");
			arr2.push(title);
			chrome.storage.sync.set({"title": arr2.join("|")});
		});
		
		console.log("added to bookmark");
	});
	updateTimeString();
	setInterval(updateTimeString,1000);
	updateDateString();
})();