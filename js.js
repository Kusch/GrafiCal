var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var posx = 0;
var posy = 0;
var gr_h = 80; 
var gr_start_x = 0;
var gr_start_y = 80;
	
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
function generate_gr()
{
	var gr_month = 0;
	var gr_height = 70;
	var gr_points = gr_month + ',' + gr_height;
	var gr_svg2 = '" style="fill: #9AE307;stroke:black;stroke-width:3"/></svg> ';
	
	//CLEAR timeline
	$('#div_generate').empty();

	//timeline
	var start_year = 1998;
	var end_year = 2012;
	var anz_jahre = end_year - start_year;
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
	
		if (x == 12){ 
			x = 0;
			start_year++;
			generate_line(cx, gr_height, "#FFA406", ary_month[x], start_year);}
		else {
			generate_line(cx, gr_height, "#8ABDD1", ary_month[x]);}

		x++;
		cx = cx + 40;
	};

	//get_dots

	var events = [	{TITLE:"Axelschweiss", DATE:"01.01.1970", DURATION:"2", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR:"yellow"},
					{TITLE:"Axelschweiss", DATE:"01.01.1970", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR:"blue"},
					{TITLE:"Axelschweiss", DATE:"01.01.1970", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR:"green"},
					{TITLE:"Kinderlehmung", DATE:"01.02.1970", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR: "red"},
					{TITLE:"Aids", DATE:"01.04.1970", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR: "blue"},
					{TITLE:"Aids2", DATE:"01.05.1970", REMARK:"Aids2? Hackts?.", COLOR: "pink"},
					{TITLE:"Aids2", DATE:"01.05.1970", DURATION:"2",REMARK:"Aids2? Hackts?.", COLOR: "yellow"},
					{TITLE:"Aids2", DATE:"01.05.1970", DURATION:"2", REMARK:"Aids2? Hackts?.", COLOR: "yellow"},
					{TITLE:"Aids2", DATE:"01.05.1970", REMARK:"Aids2? Hackts?.", COLOR: "pink"},
					{TITLE:"Aids2", DATE:"01.05.1970", DURATION:"6", REMARK:"Aids2? Hackts?.", COLOR: "yellow"},
					{TITLE:"Aids2", DATE:"01.05.1970", REMARK:"Aids2? Hackts?.", COLOR: "green"},
					{TITLE:"Kätzli", DATE:"01.08.1970", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR: "yellowgreen"},
					{TITLE:"Kätzli", DATE:"01.08.1970", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR: "yellowgreen"},
					{TITLE:"Kätzli", DATE:"01.08.1970", DURATION:"12", REMARK:"It is a long established fact that a reader will be distracted by the readable content.", COLOR: "yellowgreen"}
					];
	
	var dot_month;
	var arydate;

	for (var i = 0; i < events.length; i++) {
		arydate = events[i].DATE.split(".");
		dot_month = ((arydate[1]*40)-20);

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
}

		generate_dot(dot_month, gr_height, events[i].TITLE, events[i].COLOR, events[i].DATE, events[i].REMARK, events[i].DURATION);
		
		pos_reserved.push({"X":dot_month,"Y":gr_height});

		console.log(pos_reserved);
		gr_height = 70;
	};

	//dots
	//generate_dot(20, gr_height, "hello", "yellow");
	//generate_dot(60, gr_height, "my name is dot", "yellow");
	/*generate_dot(60, 55, "mine is not", "orange");
	generate_dot(100, gr_height, "okchey", "yellowgreen");
	generate_dot(140, gr_height, "hurz war hier", "red");
	generate_dot(140, 85, "hoi zämme", "yellow");
	generate_dot(180, gr_height, "hello", "yellow");
	generate_dot(180, 85, "my name is dot", "yellow");
	generate_dot(180, 55, "mine is not", "yellow");
	generate_dot(220, gr_height, "okchey", "yellow");
	generate_dot(260, gr_height, "hurz war hier", "yellow");
	generate_dot(300, gr_height, "hoi zämme", "yellow");
	generate_dot(300, 85, "hoi zämme", "yellow");
	generate_dot(340, 85, "final", "blue");*/
}
function generate_dot(cx, cy, title, ccolor, date, remarks, duration)
{
	var dot_duration = 1;
	if(duration != undefined){dot_duration =duration;}
	var html1 ='<svg onclick="get_info(\'' + title+ '\',\'' + date + '\',\'' + remarks + '\');" class="svg" title="'+ title +'" style="position: absolute;">'
	var html2 = '<circle cx="'+ cx +'" cy="'+ cy+'" r="5" stroke="#000" stroke-width="1" fill="'+ccolor+'" /></svg>';
	var html3 =  '<rect x="'+ (cx - 20) +'" y="'+ cy +'" width="'+(dot_duration*40)+'" height="10" style="fill:'+ccolor+';stroke:#000;stroke-width:2;fill-opacity:1;stroke-opacity:0.5" /></svg> '
	var html = html1 + html3;
	$('#svg2').append(html);
	//alert(title);
}
function generate_line(cx, cy, ccolor, month, year){
	var html1 =' <svg height="210" class=""><line x1="'+cx+'" y1="40" x2="'+cx+'" y2="200" style="stroke:'+ccolor+';stroke-width:2" /> ';
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
	console.log(info);
}