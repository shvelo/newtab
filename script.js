$( document ).ready(function() {
    function updateDateString(){
		var d=new Date();
		var weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
		var weekName = weekday[d.getDay()];
		var monthName = monthNames[d.getMonth()];
		var monthDate=d.getDate();
		var year=d.getFullYear();
		$(".date").text(monthDate+" "+monthName+" "+year);
	}
	function updateTimeString(){
		var nowDate=new Date();
		var hours=nowDate.getHours();
		var minutes=nowDate.getMinutes();
		minutes=minutes>9 ? minutes : "0"+minutes;
		hours=hours>9 ? hours : "0"+hours;
		$(".clock").text(hours+":"+minutes);
	}
	window.setInterval(function(){
		updateTimeString();},1000);
	updateDateString();
});