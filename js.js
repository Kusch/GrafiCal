var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var posx = 0;
var posy = 0;
var gr_h = 80; 
var gr_start_x = 0;
var gr_start_y = 80;

var cnt_scroll = 1;

	$(document).keydown(function(e) {
  	if(e.keyCode == 38) { // top
  		cnt_scroll = cnt_scroll + 0.2;
   	 	generate_gr(cnt_scroll);
	}
  	if(e.keyCode == 40) { // bottom
  		cnt_scroll = cnt_scroll - 0.2;
  	  	generate_gr(cnt_scroll);
	}
});




function test1(){
	
	var gr_days = $('#input_days').val();
		ctx.beginPath();

		for (var i = 0; i < 1; i++) {
			ctx.strokeStyle="#000";
			ctx.moveTo(gr_start_x, gr_start_y);
			ctx.lineTo((gr_start_x + 5), gr_h);
			ctx.lineTo((gr_start_x + 10), 60);
			ctx.moveTo((gr_start_x + 10), 60);
			ctx.lineTo((gr_start_x + 15), gr_h);

			gr_start_x = gr_start_x + 15;
		}
		ctx.stroke();
}
function clear1(){
	//Clear
	ctx.clearRect(0, 0, c.width, c.height);
	//Resett
	posy = 0;
	posx = 0;
	ctx.moveTo(posx, posy);
}
var pos_reserved = [];//{"X": 20, "Y": 80}
var events = [];
var myevents = [];
function generate_gr(zoom)
{
	var event_height;//SIZE OF THE RECTANGLES

	//events
	myevents = [	{TITLE:"Prostatakrebs1", DATE:"1969.05.01", DURATION:"2", REMARK:"It is a long established fact that a reader will be distracted by the readable content.It is a long established fact that a reader will be distracted by the readable content.", COLOR:"yellow"},
					{TITLE:"Prostatakrebs", DATE:"1969.01.01", DURATION:"2", REMARK:"It is a long established fact that a reader will be distracted by the readable content.It is a long established fact that a reader will be distracted by the readable content.", COLOR:"yellow"},
					{TITLE:"Axelschweiss", DATE:"1969.02.02",DURATION:"9", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR:"yellowgreen"},
					{TITLE:"Axelschweiss", DATE:"1969.03.04", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR:"green"},
					{TITLE:"Kinderlehmung", DATE:"1969.03.08", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR: "red"},
					{TITLE:"Aids", DATE:"1969.03.01", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR: "blue"},
					{TITLE:"Aids2", DATE:"1969.03.10", REMARK:"Hola Senor", COLOR: "pink"},
					{TITLE:"Aids3", DATE:"1969.03.29", DURATION:"2",REMARK:"Hola Senor", COLOR: "yellow"},
					{TITLE:"Aids4", DATE:"1969.03.01", REMARK:"Hola Senor", COLOR: "pink"},
					{TITLE:"Aids5", DATE:"1969.03.01", DURATION:"6", REMARK:"Hola Senor", COLOR: "yellow"},
					{TITLE:"Aids_Naja_das_wars", DATE:"1969.04.01", REMARK:"Aids2? Hackts?.", COLOR: "green"},
					{TITLE:"STEFAN", DATE:"1969.03.23", REMARK:"TEST STEFAN.",DURATION:"2", COLOR: "black"},
					{TITLE:"Kätzli", DATE:"1969.03.01", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR: "yellowgreen"},
					{TITLE:"Büsi", DATE:"1969.03.01", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR: "yellowgreen"},
					{TITLE:"Prostatakrebs", DATE:"1970.03.01", DURATION:"2", REMARK:"It is a long established fact that a reader will be distracted by the readable content.It is a long established fact that a reader will be distracted by the readable content.", COLOR:"yellow"},	
					{TITLE:"Z Basel a mim Rhy, jo do wetti si...", DATE:"1971.05.01", DURATION:"4", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR: "yellowgreen"}
					];

	//sort events
	custom_sort();
	function custom_sort() {
		asc = true;
   			events = myevents.sort(function(a, b) {
			if (asc) return (a['DATE'] > b['DATE']) ? 1 : ((a['DATE'] < b['DATE']) ? -1 : 0);
				else return (b['DATE'] > a['DATE']) ? 1 : ((b['DATE'] < a['DATE']) ? -1 : 0);
			});
	}

	if (zoom == undefined){ zoom = 1; }




 	//gets event_height
 	if(events.length >= 20){ event_height = 5*zoom;}
 	else if(events.length >= 15){ event_height = 6*zoom;}
 	else if (events.length > 10){ event_height = 8*zoom;}
 	else if (events.length >= 5){ event_height = 15*zoom;}

	var gr_month = 0;
	var gr_height = -event_height;//70;
	var gr_points = gr_month + ',' + gr_height;
	var gr_svg2 = '" style="fill: #9AE307;stroke:black;stroke-width:3"/></svg> ';
	
	//CLEAR timeline
	$('#div_generate').empty();

	//timeline
	var st_yr = events[0].DATE.split(".");
	var ed_yr = events[events.length - 1].DATE.split(".");

	var start_year = st_yr[0];//1969;
	var mystart_year = start_year;
	var end_year = ed_yr[0];//1973;
	var anz_jahre = (end_year - start_year)+1;
	var anz_monate = anz_jahre * 12;
	var timeline_length = anz_monate*40 + 'px';
	var gr_svg1 = '<svg style="height: 150px;position: absolute;width:'+timeline_length+';" id="svg2" style="position: absolute;"><polyline points="';
	
	for (var i = 0; i < anz_monate; i++) {
		gr_month = gr_month + 40;
		gr_points += ' '+gr_month+ ','+ (gr_height);
	}

	var html = gr_svg1 + gr_points + gr_svg2;
	$('#div_generate').append(html);

	//month lines
	var ary_month = ["Jan", "Feb", "März", "April", "Mai", "Juni", "Juli", "Aug", "Sep", "Okt", "Nov", "Dez"];

	var cx = 0;
	var x = 0;
	for (var i = 0; i < anz_monate; i++) {
	
		if (ary_month[x] == "Dez"){ 
			
			mystart_year++;
			generate_line(cx, gr_height, "#8ABDD1", ary_month[x]);
			x = -1;
			}
		else if (ary_month[x] == "Jan" ){
			generate_line(cx, gr_height, "#FFA406", ary_month[x], mystart_year);}
		 
		else {
			generate_line(cx, gr_height, "#8ABDD1", ary_month[x]);}

		x++;
		cx = cx + 40;
	};

	//get_dots
	
	var dot_month;
	var dot_day;
	var arydate;

	for (var i = 0; i < events.length; i++) {
		arydate = events[i].DATE.split(".");
dot_day = arydate[2]/1;
		dot_month = ((arydate[1]*40)-20)+(dot_day-1);
		
		dot_year = (arydate[0]-start_year);
/*
		for(var d = 0; d < pos_reserved.length; d++) {

    		if (pos_reserved[d].Y == gr_height && pos_reserved[d].X == dot_month) {
    			gr_height = 55;
	
    			for(var s = 0; s < pos_reserved.length; s++) {
    				if (pos_reserved[s].Y == 40 && pos_reserved[s].X == dot_month) {
    				gr_height = 25;
    				}
    				else if (pos_reserved[s].Y == 100 && pos_reserved[s].X == dot_month) {
    				gr_height = 40;
    				}
    				else if (pos_reserved[s].Y == 85 && pos_reserved[s].X == dot_month) {
    				gr_height = 100;
    				}
    				else if (pos_reserved[s].Y == 55 && pos_reserved[s].X == dot_month) {
    				gr_height = 85;
    				}
    				else{}
    			}
  			}
			else if (pos_reserved[d].Y != gr_height && pos_reserved[d].X != dot_month) {
				gr_height = 70;
			}
			else{
			}
}*/
gr_height = gr_height + event_height;// TESTING
//if (gr_height == 110){gr_height = 0;}


		generate_dot((dot_month+(dot_year*(40*12))), gr_height, events[i].TITLE, events[i].COLOR, events[i].DATE, events[i].REMARK, events[i].DURATION, event_height, 5);
		
		pos_reserved.push({"X":dot_month,"Y":gr_height});

		//console.log(pos_reserved);
		
	};

}
function generate_dot(cx, cy, title, ccolor, date, remarks, duration, cfont, csize)
{
	var dot_duration = 1;
	
	if(duration != undefined){dot_duration = duration;}
	
	var html1 ='<svg onclick="get_info(\'' + title+ '\',\'' + date + '\',\'' + remarks + '\');" onmouseover="get_eventinfo(\'' + title+ '\',\'' + remarks + '\',\'' + ccolor + '\',\'' + date + '\',\'' + dot_duration + '\');" class="svg" title="'+ title +'" style="position: absolute;">'
	var html2 = '<circle cx="'+ cx +'" cy="'+ (cy+ 3)+'" r="'+(cfont/1.8)+'" stroke="#000" stroke-width="1" fill="'+ccolor+'" /></svg>';
	var html3 =  '<rect x="'+ (cx - 20) +'" y="'+ cy +'" width="'+(dot_duration*40)+'" height="'+cfont+'" style="fill:'+ccolor+';stroke:#000;stroke-width:2;fill-opacity:1;stroke-opacity:0.5" /></svg> '
	var html = html1 + html3;
if (duration == undefined){html = html1 + html2;} //for line and dots
	$('#svg2').append(html);
	//alert(title);
}
function get_eventinfo(title, remarks, ccolor, date, duration){
	//alert(title + " / " + remarks +" / "+ ccolor);
	var html1 = '<span>Titel:<br></span><span style="color:'+ccolor+';text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">'+title+'</span><br>';
	var html2 =	'<span style="font-size: 13px;">Datum: '+ date+'</span><br><span style="font-size: 13px;">Dauer (in Monaten): '+ duration+'</span>';
	var html3 = '<span>Info:<br>"'+remarks+'"</span>';

	$('#div_eventinfo').css("outline", "5px solid "+ccolor);

	$('#div_eventinfo').empty().append(html1 + html2+ '<div id="div_eventremarks">' + html3 + '</div>');

}
function generate_line(cx, cy, ccolor, month, year){
	var html1 =' <svg height="210" class=""><line x1="'+cx+'" y1="0" x2="'+cx+'" y2="200" style="stroke:'+ccolor+';stroke-width:2" /> ';
	var html2 = '<text x="'+(cx + 10)+'" y="125" font-family="sans-serif" font-size="8px" fill="#000">'+month+'</text>'
	var html3;
	if (year != undefined){
		html3 = '<text x="'+(cx + 10)+'" y="140" font-family="sans-serif" font-size="9px" fill="#000">'+year+'</text></svg>';
		//alert(year);
	}

	var html = html1 + html2 + html3;
	$('#svg2').append(html);
}

function get_info(info, date, remarks){
	alert("Befund: "+info+ "\n Datum: "+ date + "\n Bemerkungen: "+remarks );
	//console.log(info);
}