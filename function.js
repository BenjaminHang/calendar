/*创建select的函数*/
function createOption(select_id,option_value){
	var chyear=document.getElementById(select_id);
		var option=document.createElement('option');
		option.value=option_value;
		var txt=document.createTextNode(option_value);
		option.appendChild(txt);
		chyear.appendChild(option);
}

function createSelect(){
		createOption("chooseyear",now_time.getFullYear());
		for(var i=1901;i<2101;i++){
			createOption("chooseyear",i);
		}
		createOption("choosemonth",now_time.getMonth()+1)
		for(var i=1;i<=12;i++){
			createOption("choosemonth",i);
		}
	}
/*删除select的函数*/
	function deletSelect(){
		var delet_year_select=document.getElementById("chooseyear");
		delet_year_select.options.length=0;
		var delet_month_select=document.getElementById("choosemonth");
		delet_month_select.options.length=0;
	}

function getSeason(month){
if(month>2&month<6){
    return "Spring"; 
}else{
	if(month>5&month<9){
		return "Summer";
	}else{
		if(month>8&month<12){
			return "Autumn";
		}else{
			return "Winter";
		}
	}
}
}


function changeImg(season){
	var img=document.getElementById("season");
	img.setAttribute("src","img/"+season+".jpg");
}

/*回到今天按钮函数*/
function reset(){
	deletTable();
	addDate(now_time.getFullYear(),now_time.getMonth()+1);
	deletSelect();
	createSelect();
	changeImg(getSeason(now_time.getMonth()+1));
}
/*删除table的函数*/
function deletTable(){
	var delet_table=document.getElementById("calendar_date");
var table_child=delet_table.rows;
var row_number=table_child.length;
for(;row_number>0;row_number--){
	delet_table.removeChild(table_child[row_number-1]);
	
}
}

/*触发select更新table执行的函数*/
function changecalendar(year,month){

deletTable();
var year_id=document.getElementById(year);
var month_id=document.getElementById(month);
var	g_year=year_id.options[year_id.options.selectedIndex].value;
var g_month=month_id.options[month_id.options.selectedIndex].value;
changeImg(getSeason(g_month));
addDate(g_year,g_month);
}

/*开始计算，更新table*/
function addDate(g_year,g_month){
	var diff_day,this_month_day,last_month_day;
    var createdate=document.getElementById("calendar_date");
    this_month_day=caculateMonthDay(g_month,g_year);
    var all_day,left_day;
    diff_day=sumDay(g_year,g_month)%7;
	if(diff_day<5){
		all_day=this_month_day+diff_day+2;
	}else{
		all_day=this_month_day-7+diff_day+2;
	}
	if(all_day%7==0){
		left_day=all_day%7;
	}else{
		left_day=7-all_day%7;
	}
	
	for(var i=0;i<(all_day+left_day)/7;i++){
		var trNode=document.createElement("tr"); 
		for(var j=0;j<7;j++){
			var tdNode=document.createElement("td");
			var span1=document.createElement("span");
			var span2=document.createElement("span");
			span1.appendChild(document.createTextNode(solarInf(g_year,g_month,i,j)[2]));
			tdNode.appendChild(span1);
			span1.setAttribute("style","font-size:18px;font-weight:bold;")
			tdNode.appendChild(document.createElement('br'));
			span2.appendChild(document.createTextNode(addInfo(g_year,g_month,i,j)));
			span2.setAttribute("style","font-size:5px;");
		    tdNode.appendChild(span2);
		    if(j==0||j==6){
		    	tdNode.setAttribute("class","wenkend");
		    }
		    tdNode.setAttribute("style","white-space:nowrap;text-overflow:ellipsis;overflow:hidden;");
		trNode.appendChild(tdNode);

	}createdate.appendChild(trNode);
}
}
function solarInf(solar_year,solar_month,row,column){
	var diff_day,this_month_day,last_month_day;
    this_month_day=caculateMonthDay(solar_month,solar_year);
    last_month_day=caculateMonthDay(solar_month-1,solar_year); 
    var all_day,left_day;
    diff_day=sumDay(solar_year,solar_month)%7;
	if(diff_day<5){
		all_day=this_month_day+diff_day+2;
	}else{
		all_day=this_month_day-7+diff_day+2;
	}
	if(all_day%7==0){
		left_day=all_day%7;
	}else{
		left_day=7-all_day%7;
	}

	if(diff_day<5){
		log_judge=diff_day+2;
	}else{
		log_judge=diff_day+2-7;
	}

	if(row*7+column<log_judge){
		if(solar_month==1){
			return [solar_year-1,12,last_month_day-log_judge+column+1];
		}else{
			return [solar_year,solar_month-1,last_month_day-log_judge+column+1];
		}				 
	}else{
		if((row*7+column+1)>all_day){
			if(solar_month==12){
				return [solar_year+1,solar_month=1,row*7+column+1-all_day];
			}else{
				return [solar_year,solar_month+1,row*7+column+1-all_day];
			}				 
		}else{
			return [solar_year,solar_month,row*7+column-log_judge+1];		 
		}
	}
			
}

function judgeNextMonth(lunar_year,lunar_month){
    var next_month=[];
	var lunar_inf=getLunarYearInfo(lunar_year);
	if(lunar_month<100){
		if(lunar_month==lunar_inf[13]){
			next_month[0]=lunar_year;
			next_month[1]=lunar_month+100;
		}else{
			if(lunar_month==12){
				next_month[0]=lunar_year+1;
				next_month[1]=1;
			}else{
				next_month[0]=lunar_year;
				next_month[1]=lunar_month+1;
			}
		}
	}else{
		if(lunar_month==112){
			next_month[0]=lunar_year+1;
			next_month[1]=1;
		}else{
			next_month[0]=lunar_year;
			next_month[1]=lunar_month-100+1;
		}
	}
	return next_month;
}

function judgeLastMonth(lunar_year,lunar_month){
	var last_month=[];
	var lunar_inf=getLunarYearInfo(lunar_year);
	if(lunar_month<100){
		if(lunar_month==1){
			last_month[0]=lunar_year-1;
			if(getLunarYearInfo(lunar_year-1)[13]==12){
    			last_month[1]=112;
    		}else{
    			last_month[1]=12;
    		}
		}else{
			last_month[0]=lunar_year;
			if(lunar_month-1==lunar_inf[13]){
				last_month[1]=lunar_month-1+100;
			}else{
				last_month[1]=lunar_month-1;
			}
		}
	}else{
		last_month[0]=lunar_year;
		last_month[1]=lunar_month-100;
	}
	return last_month;
}

function caculateLunarMonthDay(lunar_year,lunar_month){
    var lunar_inf=getLunarYearInfo(lunar_year);
    if(lunar_month>100){
    	return lunar_inf[0]-0+29;
    }else{
    	return lunar_inf[lunar_month]-0+29;
    }
}

function solarTranLunar(solar_year,solar_month,row,column){
	var diff_day,this_month_day,last_month_day,next_month_day;
	var lunar_YMD=getLunarY_M_D(sumDay(solar_year,solar_month));
	var lunar_inf=getLunarYearInfo(lunar_YMD[0]);
	var last_month=[],next_month=[],this_month=[],nextnext_month=[];
	this_month[0]=lunar_YMD[0];
	this_month[1]=lunar_YMD[1];
	this_month_day=caculateLunarMonthDay(this_month[0],this_month[1]);
	last_month=judgeLastMonth(lunar_YMD[0],lunar_YMD[1]);
	last_month_day=caculateLunarMonthDay(last_month[0],last_month[1]);
	next_month=judgeNextMonth(lunar_YMD[0],lunar_YMD[1]);
    next_month_day=caculateLunarMonthDay(next_month[0],next_month[1]);
    nextnext_month=judgeNextMonth(next_month[0],next_month[1]);


    var front_day,middle_day,behind_day;
    var this_solarmonth_day=caculateMonthDay(solar_month,solar_year);
    var last_solarmonth_day=caculateMonthDay(solar_month-1,solar_year); 
    var all_day,left_day,sum_day;
    diff_day=sumDay(solar_year,solar_month)%7;
    if(diff_day<5){
		all_day=this_solarmonth_day+diff_day+2;
	}else{
		all_day=this_solarmonth_day-7+diff_day+2;
	}
	if(all_day%7==0){
		left_day=all_day%7;
	}else{
		left_day=7-all_day%7;
	}
    sum_day=all_day+left_day;
    var log_judge;
    if(diff_day<5){
    	log_judge=diff_day+2;
    }else{
    	log_judge=diff_day+2-7;
    }
	if(lunar_YMD[2]>log_judge){
			front_day=this_month_day-lunar_YMD[2]+1+log_judge;

			if(row*7+column<front_day){
				return [this_month[0],this_month[1],this_month_day-front_day+row*7+column+1];
			}
			if(front_day+next_month_day>sum_day){
				middle_day=sum_day-front_day;
				behind_day=0;
				if(row*7+column+1>front_day){
					return [next_month[0],next_month[1],row*7+column+1-front_day];
				}
			}else{
                middle_day=next_month_day;
				behind_day=sum_day-front_day-middle_day;
				if(row*7+column+1>front_day&row*7+column<front_day+middle_day){
					return [next_month[0],next_month[1],row*7+column+1-front_day];
				}

				if(row*7+column+1>front_day+middle_day){
					return [nextnext_month[0],nextnext_month[1],row*7+column+1-front_day-middle_day];
				}
			}
		}else{
			front_day=log_judge-lunar_YMD[2]+1;
			if(row*7+column<front_day){
				return [last_month[0],last_month[1],last_month_day-front_day+row*7+column+1];
			}
			if(front_day+this_month_day>sum_day){
				middle_day=sum_day-front_day;
				behind_day=0;
				if(row*7+column+1>front_day){
					return [this_month[0],this_month[1],row*7+column+1-front_day];
				}
			}else{
				middle_day=this_month_day;
				behind_day=sum_day-front_day-middle_day;
				if(row*7+column+1>front_day&row*7+column<front_day+middle_day){
					return [this_month[0],this_month[1],row*7+column+1-front_day];
				}
				if(row*7+column+1>front_day+middle_day){
					return [next_month[0],next_month[1],row*7+column+1-front_day-middle_day];
				}
			}
		}
}


/*判断本月几天*/
function caculateMonthDay(month,year){
	if(month==2&intercalaryYear(year)){
		return solar_month_day[1]+1;
	}else{
		if(month==0){
			return solar_month_day[11];
		}else{
			return solar_month_day[month-1];
		}
	}
}
/*判断本年是否为闰年*/
function intercalaryYear(year){
	if(year%400==0){
		return true;
	}else{
		if(year%4==0&year%100!=0)
			return true;
		else{
			return false;
		}
	}

}
/*日期与星期几关联*/
function sumDay(g_year,g_month){
	var sum_day=0;
	for(var j=1;j<g_month;j++){
		if(j==2&intercalaryYear(g_year)){
			sum_day=sum_day+solar_month_day[j-1]+1;
		}else{
			sum_day+=solar_month_day[j-1];
		}
	}
	for(var i=1901;i<g_year;i++){
		if(intercalaryYear(i)){
			sum_day+=366;
		}else{
			sum_day+=365;
		}
	}
	return sum_day;
}
function getLunarY_M_D(sum_day) {
	var inf=[];
	var lunar_Y_M_D=[];
	var sum_lunar_day=49;//1901.01.01阴历与1901.01.01阳历差
	var lunar_year=1900;
	var lunar_month;
	var lastdata;//记录sum_lunar_day上个状态数据
	while(sum_lunar_day<=sum_day){
		lunar_year++;
		lastdata=sum_lunar_day;
		sum_lunar_day+=sumLunarYearDay(lunar_year);
        
	}
	lunar_Y_M_D[0]=lunar_year;//得到year


	inf=getLunarYearInfo(lunar_Y_M_D[0]);
	if(lunar_year==1900){
		sum_lunar_day=19;//1901.01.01阳历与1900.12.01阴历差
		lunar_month=11;
	}else{
		sum_lunar_day=lastdata;
		lunar_month=0;
	}
		while(sum_lunar_day<=sum_day){
			if(inf[13]!=lunar_month||lunar_month==0){
				if(lunar_month>100){
					lunar_month=lunar_month-100;
				}
				lunar_month++;
				lastdata=sum_lunar_day;
			    if(inf[lunar_month]==0){
				   sum_lunar_day+=29;
			    }else{
				   sum_lunar_day+=30;
			    }
			}else{
				lunar_month=lunar_month+100;//标记闰月
				lastdata=sum_lunar_day;
				if(inf[0]==0){
				   sum_lunar_day+=29;
			    }else{
				   sum_lunar_day+=30;
			    }
			}
		}
		lunar_Y_M_D[1]=lunar_month;//得到month
	    if(lunar_Y_M_D[0]==1900&lunar_Y_M_D[1]==11){
	    	lunar_Y_M_D[2]=11;
	    }else{
	    	lunar_Y_M_D[2]=sum_day-lastdata+1;
	    }
	 
	return lunar_Y_M_D;//lunar_year_month_date	
}

function getLunarYearInfo(lunar_year){
	var inf=[];
	var binary_year=lunar_calendar[lunar_year-1900].toString(2).split("");
	while(binary_year.length<17){
		binary_year.unshift(0);
	}
    var high_order=binary_year.slice(0,1);
    var middle_order=binary_year.slice(1,13);
    var low_order=binary_year.slice(13);
    inf[0]=high_order[0];
    for(var i=0;i<12;i++){
    	inf[i+1]=middle_order[i];
    }
    inf[13]=parseInt(low_order.join(''),2);
    return inf;
}

function sumLunarYearDay(lunar_year){
    var sum_year=0;
    var inf=[];
    inf=getLunarYearInfo(lunar_year);
    for(var i=1;i<13;i++){
        if(inf[i]==0){
    		sum_year+=29;
    	}else{
    		sum_year+=30;
    	}
    }
    if(inf[13]!=0){
    	if(inf[0]==0){
    		sum_year+=29;
    	}else{
    		sum_year+=30;
    	}
    }
	return sum_year;
}
/*阴历表示*/
function lunarNum(lunar_month,lunar_day){
	var head_W;
	if(lunar_month>100){
		head_W="闰";
		lunar_month=lunar_month-100;
	}else{
		head_W="";
	}
	if(lunar_day==1){
		if(lunar_month==1){
		return head_W+"正月";}
		if(lunar_month==11){
			return head_W+"冬月";
		}
		if(lunar_month==12){
			return head_W+"腊月";
		}
		return head_W+num_name[lunar_month-1]+"月";
	}else{
		if(lunar_day<11){
			return "初"+num_name[lunar_day-1];
		}if(lunar_day>10&lunar_day<20){
			return "十"+num_name[lunar_day-11];
		}if(lunar_day==20){
			return "二十";
		}if(lunar_day>20&lunar_day<30){
			return "廿"+num_name[lunar_day-21];
		}if(lunar_day==30){
			return "三十";
		}
		
	}
}
/*阴历节日*/
function lunarFestival(lunar_year,lunar_month,lunar_day){
	if(lunar_month==12){
		if(getLunarYearInfo(lunar_year)[12]==lunar_day-29){
			return "除夕";
		}
	}
	return lunar_festival[lunar_month+"-"+lunar_day];
}
/*阳历节日*/
function solarFestival(solar_year,solar_month,solar_day){
	return solar_festival[solar_month+"-"+solar_day];
}
/*由阳历确定阴历日期*/
/*24节气判断*/
function getSolarTerm(solar_year,solar_month,solar_day){
	var n;
	var sub_str=parseInt('0x'+solar_term[solar_year-1900].substr((solar_month-1)/2*5,5)).toString();
	var sub_sub_str=[2];
	if(solar_month%2){
		sub_sub_str[0]=sub_str.substr(0,1);
		sub_sub_str[1]=sub_str.substr(1,2);
	}else{
		sub_sub_str[0]=sub_str.substr(3,1);
		sub_sub_str[1]=sub_str.substr(4,2);
	}
	if(sub_sub_str[0]==solar_day){
		return solar_term_name[solar_month*2-2];
	}
	if(sub_sub_str[1]==solar_day){
		return solar_term_name[solar_month*2-1];
	}
	return 0;
}
/*得到关于日期额外信息：阴历、节日、节气*/
function addInfo(solar_year,solar_month,row,column){
	var lunar=solarTranLunar(solar_year,solar_month,row,column);
	var solar=solarInf(solar_year,solar_month,row,column);
	if(getSolarTerm(solar[0],solar[1],solar[2]))
		return getSolarTerm(solar[0],solar[1],solar[2]);
	if(lunarFestival(lunar[0],lunar[1],lunar[2])){
		return lunarFestival(lunar[0],lunar[1],lunar[2]);
	}
	if(solarFestival(solar[0],solar[1],solar[2])){
		return solarFestival(solar[0],solar[1],solar[2]);
	}
	return lunarNum(lunar[1],lunar[2]);
}
	

