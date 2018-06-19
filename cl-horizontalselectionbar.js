define(["jquery","underscore","qlik","translator","qvangular","angular","./properties","./initialproperties","client.utils/state","general.utils/responsive-state","./lib/js/extensionUtils","./lib/js/moment","./lib/js/daterangepicker","general.models/library/dimension","text!./lib/css/style.css","text!./lib/css/daterangepicker.css","text!./lib/partials/template.html","./lib/js/clTouch","./lib/js/onLastRepeatDirective","client.services/export-dialog/export-dialog"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){"use strict";function r(a){var b=25568,c=86400,d=(a-b)*c;return d}function s(a){var b=l().utcOffset();return b===-0?a.subtract(1,"d"):b>=0?a.subtract(b,"m"):a.add(b,"m")}function t(a,b,c){return c?l.unix(r(a)).utc().format(b):s(l.unix(r(a)).utc()).format(b)}function u(a,c,d){var e;return a&&(e=b.isNumber(Number(a))&&Number(a)<1e5?t(a,c,d):d?l.utc(a,c,!1).format(c):l(a,c,!1).format(c)),e}var v=e.getService("$q"),w=window.location.pathname.substr(0,window.location.pathname.toLowerCase().lastIndexOf("/sense/app/"));return w&&"/"!==w.substr(0,1)&&(w="/"+w),o=o.replace(new RegExp("__VirtualProxyPrefix__","g"),w),k.addStyleToHeader(o),k.addStyleToHeader(p),{definition:g,initialProperties:h,thinHeader:!0,snapshot:{canTakeSnapshot:!0},support:{"export":!0,exportData:!1},resize:function(a,b){this.paint(a,b)},paint:function(b,c){var d=c.qInfo.qId,e=this;a(".qv-card"&&!c.showTitles)?a(".qv-object-cl-horizontalselectionbar").find("header.thin").addClass("no-title"):a(".qv-object-cl-horizontalselectionbar").find("header.thin").removeClass("no-title"),this.$scope.props=c.props,this.$scope.qId=c.qInfo.qId,void 0!==c.props.canTakeSnapshot&&(this.$scope.$parent.ext.snapshot.canTakeSnapshot=c.props.canTakeSnapshot),void 0===c.props.canMaximize||c.props.canMaximize?a('div[tid="'+d+'"] .qv-object-cl-horizontalselectionbar .lui-icon--expand').css("display","inherit"):a('div[tid="'+d+'"] .qv-object-cl-horizontalselectionbar .lui-icon--expand').css("display","none");var f=function(){var b=v.defer();return setTimeout(function(){return a("[id^=daterangepicker-container-"+d+"]").children(".daterangepicker").hide(),b.resolve()},500),b.promise};this.$scope.backendApi.isSnapshot&&f();var g=v.defer();return e.$scope.paintPromise=g,e.$scope.paintPromise.promise},template:q,controller:["$scope","$element","$timeout","$window",function(g,h,k,m){g.enigmaModel=g.component.model.hasOwnProperty("enigmaModel")?g.component.model.enigmaModel:g.component.model,g.options={},g.qId=-1;var o,p=c.currApp(g.$parent);o=p&&p.model&&p.model.layout&&p.model.layout.qLocaleInfo?p.model.layout.qLocaleInfo:{qCalendarStrings:{qDayNames:["må","ti","on","to","fr","lö","sö"],qMonthNames:["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]},qFirstWeekDay:0,qCollation:"sv-SE",qDateFmt:"YYYY-MM-DD"};var q=b.clone(o.qCalendarStrings.qDayNames);q.unshift(q.pop());var r=(o.qFirstWeekDay+1)%7;g.format={CollationLocale:o.qCollation,DateFormat:o.qDateFmt,MonthNames:o.qCalendarStrings.qMonthNames,FirstWeekDay:r,DayNames:q},g.selections={field:"",swipe_idx_min:-1,swipe_idx_max:-1,values_to_select:[],selectionMode:""};var s=l.localeData();l.updateLocale(s._abbr,{week:{dow:g.format.FirstWeekDay,doy:s._week.doy}});var t=function(){a("[id^=daterangepicker-container-"+g.qId+"]").remove()},v=function(){a("[id^=daterangepicker-container-"+g.qId+"]").children(".daterangepicker").hide()};j.ViewChanged.bind(v),g.$on("$destroy",function(){t()}),g.$on("onRepeatLast",function(){t(),b.each(g.fields,function(c){if("DATERANGE"===c.type){var e="daterangepicker-container-"+g.qId+"-"+c.id,f="daterange-"+g.qId+"-"+c.id;0===a("#"+e).length&&a("body").append('<div id="'+e+'" class="bootstrap-horizontalselectionbar" style="position: absolute"></div>');var h=c.dateToday,i=function(a,b){g.selectDateFromAndTo(c.field,a.format(g.format.DateFormat),b.format(g.format.DateFormat),!0)},j={showDropdowns:!1,singleDatePicker:c.singleDatePicker,locale:{format:g.format.DateFormat,firstDay:g.format.FirstWeekDay,monthNames:g.format.MonthNames,daysOfWeek:g.format.DayNames,applyLabel:d.get("Common.Apply"),cancelLabel:d.get("Common.Cancel"),customRangeLabel:c.customRangeLabel},alwaysShowCalendars:c.alwaysShowCalendars,parentEl:"#"+e};null!=c.dateStart&&null!=c.dateEnd&&(j.startDate=c.dateStart,j.endDate=c.dateEnd),null!=c.dateMin&&null!=c.dateMax&&(j.minDate=c.dateMin,j.maxDate=c.dateMax),c.dateRanges&&(j.ranges={},b.each(c.dateRanges,function(a){var b=l(h).endOf("month").format(g.format.DateFormat)===l(h).format(g.format.DateFormat);switch(a.value){case"TODAY":j.ranges[a.label]=[l(h),l(h)];break;case"YESTERDAY":j.ranges[a.label]=[l(h).subtract(1,"days"),l(h).subtract(1,"days")];break;case"LAST07DAYS":j.ranges[a.label]=[l(h).subtract(6,"days"),l(h)];break;case"LAST14DAYS":j.ranges[a.label]=[l(h).subtract(13,"days"),l(h)];break;case"LAST28DAYS":j.ranges[a.label]=[l(h).subtract(27,"days"),l(h)];break;case"LAST30DAYS":j.ranges[a.label]=[l(h).subtract(29,"days"),l(h)];break;case"LAST60DAYS":j.ranges[a.label]=[l(h).subtract(59,"days"),l(h)];break;case"LAST90DAYS":j.ranges[a.label]=[l(h).subtract(89,"days"),l(h)];break;case"THISWEEK":j.ranges[a.label]=[l(h).startOf("week"),l(h).endOf("week")];break;case"LASTWEEK":j.ranges[a.label]=[l(h).subtract(1,"week").startOf("week"),l(h).subtract(1,"week").endOf("week")];break;case"THISMONTH":j.ranges[a.label]=[l(h).startOf("month"),l(h).endOf("month")];break;case"LASTMONTH":j.ranges[a.label]=[l(h).subtract(1,"month").startOf("month"),l(h).subtract(1,"month").endOf("month")];break;case"THISQUARTER":j.ranges[a.label]=[l(h).startOf("quarter"),l(h).endOf("quarter")];break;case"LASTQUARTER":j.ranges[a.label]=[l(h).subtract(1,"quarter").startOf("quarter"),l(h).subtract(1,"quarter").endOf("quarter")];break;case"THISYEAR":j.ranges[a.label]=[l(h).startOf("year"),l(h).endOf("year")];break;case"LASTYEAR":j.ranges[a.label]=[l(h).subtract(1,"year").startOf("year"),l(h).subtract(1,"year").endOf("year")];break;case"WTD":j.ranges[a.label]=[l(h).startOf("week"),l(h)];break;case"MTD":j.ranges[a.label]=[l(h).startOf("month"),l(h)];break;case"QTD":j.ranges[a.label]=[l(h).startOf("quarter"),l(h)];break;case"YTD":j.ranges[a.label]=[l(h).startOf("year"),l(h)];break;case"R11":j.ranges[a.label]=[l(h).subtract(10,"month"),l(h)];break;case"R11FM":j.ranges[a.label]=b?[l(h).subtract(10,"month").startOf("month"),l(h).endOf("month")]:[l(h).subtract(11,"month").startOf("month"),l(h).subtract(1,"month").endOf("month")];break;case"R12":j.ranges[a.label]=[l(h).subtract(11,"month"),l(h)];break;case"R12FM":j.ranges[a.label]=b?[l(h).subtract(11,"month").startOf("month"),l(h).endOf("month")]:[l(h).subtract(12,"month").startOf("month"),l(h).subtract(1,"month").endOf("month")]}})),a("#"+f).daterangepicker(j,i),a("#"+e+" div").first().css("display","inline-flex")}}),g.paintPromise.resolve()}),g.resolutionBreakpoint={width:1024,height:35,xsmallheight:30,hideLabelHeight:30},g.fields=[],g.variables=[],g.willApplyInitSelections=!1,g.initSelectionsApplied=!1,g.sessionStorageId=g.$parent.layout.qExtendsId?g.$parent.layout.qExtendsId:g.$parent.layout.qInfo.qId,g.getSizeMode=function(){var b="TOP"===g.layout.props.alignLabel&&g.showLabels()?a(h).height()-10:a(h).height();return a(document).width()<=g.resolutionBreakpoint.width||b<=g.resolutionBreakpoint.height?b<=g.resolutionBreakpoint.xsmallheight?"X-SMALL":"SMALL":""},g.showLabels=function(){return a(h).height()<=g.resolutionBreakpoint.hideLabelHeight&&"TOP"===g.layout.props.alignLabel?!1:g.options.showLabels},g.getClass=function(){var a=[];return j.isSmallDevice||a.push("cl-desktop-container"),i.isInAnalysisMode()||a.push("no-interactions"),g.props&&g.props.floatMode&&a.push(g.props.floatMode),a},g.getCell=function(){const b=a(h).parents(".qv-gridcell")[0],c=f.element(b).scope();return c&&c.cell?c.cell:{style:{}}},g.cell=g.getCell(),g.updateCellStyle=function(){function a(a){g.cell.style=g.cell.style?b.extend(g.cell.style,a):a}j.isSmallDevice&&k(function(){var b=h.find(".cl-inner-container"),c=b.height()+30+"px",d={height:c};a(d)},0)},g.$watch("cell.style",function(){g.updateCellStyle()}),g.$watchCollection("layout.kfLists",function(a){g.setFields(a),g.initSelectionsApplied||g.setInitSelections()}),g.$watch(function(){return h.find(".cl-inner-container").height()},function(){g.updateCellStyle()});var x=f.element(m);x.bind("resize",function(){k()}),g.setFields=function(c){var d=[],e=!1;b.each(c,function(c,f){e=c.showLabels?!0:e;var h=c.showLabels?c.label:"",i=c.qListObject.qDataPages[0]?c.qListObject.qDataPages[0].qMatrix:[];switch(c.listType){case"FIELD":d.push({field:c.qListObject.qDimensionInfo.qGroupFieldDefs[0],type:c.listType,id:f,visible:c.listVisible,initSelection:c.initSelection,initSelectionSeparator:c.initSelectionSeparatorComma?",":c.initSelectionSeparator,label:h,data:i});break;case"VARIABLE":for(var j=c.variableValues?a.map(c.variableValues.split(","),a.trim):[],k=[],m=0;m<j.length;m++)k.push({value:j[m]});d.push({variable:c.variable,variableValue:c.variableValue,id:f,type:c.listType,visible:c.listVisible,initSelection:c.initSelection,label:h,data:k});break;case"FLAG":var n=[];b.each(i,function(a){var b=a[0].qText.replace(" ","-"),c=a;c.icon=w+"/Extensions/cl-HorizontalSelectionBar/lib/images/flags/"+b+".png",n.push(c)}),d.push({field:c.qListObject.qDimensionInfo.qGroupFieldDefs[0],type:c.listType,id:f,visible:c.listVisible,initSelection:c.initSelection,initSelectionSeparator:c.initSelectionSeparatorComma?",":c.initSelectionSeparator,label:h,data:n});break;case"DATERANGE":var o="",q=null,r=null,s=g.format.DateFormat,t="DEFAULT"===c.date.displayFormat?s:c.date.displayFormat,v=u(c.date.rangeMin,s,!0),x=u(c.date.rangeMax,s,!0),z=u(c.date.singleDate?c.date.initSelection:c.date.initSelectionFrom,s),A=u(c.date.singleDate?c.date.initSelection:c.date.initSelectionTo,s),B=isNaN(Number(c.date.today))?u(c.date.today,s,!0):l(),C=c.date.useDateRanges&&!c.date.singleDate?c.date.dateRanges:null,D=c.date.useDateRanges||c.date.singleDate?c.date.alwaysShowCalenders:!0,E=c.date.customRangeLabel,F=!1,G=c.date.singleDate;c.qListObject.qDimensionInfo.qStateCounts.qSelected>0?(c.qListObject.qDimensionInfo.qStateCounts.qSelected<c.date.max-c.date.min+1&&(F=!0),q=u(c.date.min,s),r=u(c.date.max,s),o=G?u(c.date.min,t):u(c.date.min,t)+" - "+u(c.date.max,t)):o=G?c.date.singleDefaultText:c.date.defaultText,d.push({field:c.qListObject.qDimensionInfo.qGroupFieldDefs[0],type:c.listType,id:f,visible:c.listVisible,dateFromInitSelection:z,dateToInitSelection:A,dateFormat:s,displayDateFormat:t,displayText:o,isNotARange:F,dateStart:q,dateEnd:r,dateToday:B,dateMin:v,dateMax:x,label:h,dateRanges:C,alwaysShowCalendars:D,customRangeLabel:E,data:i,singleDatePicker:G});break;case"BUTTON":"LINK"===c.buttonType?d.push({field:c.qListObject.qDimensionInfo.qGroupFieldDefs[0],buttonName:c.labelButton?c.labelButton:c.qListObject.qDimensionInfo.qGroupFieldDefs[0],url:c.linkURL,openType:c.linkOpenType,useButtonToCopyLink:c.useButtonToCopyLink,expressionNew:c.calcTest,listType:c.listType,type:c.buttonType,clickType:0!==c.buttonCalculationCondition?"active":"inactive",visible:!0,id:f,label:h,data:c.qListObject.qDimensionInfo.qGroupFieldDefs[0]}):"EXPORT"===c.buttonType?d.push({field:c.qListObject.qDimensionInfo.qGroupFieldDefs[0],buttonName:c.labelButton?c.labelButton:c.qListObject.qDimensionInfo.qGroupFieldDefs[0],listType:c.listType,exportId:c.exportId,type:c.buttonType,clickType:0!==c.buttonCalculationCondition?"active":"inactive",visible:!0,id:f,label:h,data:c.qListObject.qDimensionInfo.qGroupFieldDefs[0]}):"COPY"===c.buttonType&&(d.push({field:c.qListObject.qDimensionInfo.qGroupFieldDefs[0],buttonName:c.labelButton?c.labelButton:c.qListObject.qDimensionInfo.qGroupFieldDefs[0],listType:c.listType,exportId:c.exportId,type:c.buttonType,clickType:0!==c.buttonCalculationCondition?"active":"inactive",visible:!0,id:f,label:h,data:c.qListObject.qDimensionInfo.qGroupFieldDefs[0]}),g.backendApi.isSnapshot||"undefined"!=typeof g.currentSelectionsObject||p.createGenericObject({sse_reply:{qStringExpression:"=GetCurrentSelections(']/select/','/[','];[', 99) & ']'"}},function(a){p.getObject(null,a.qInfo.qId).then(function(a){g.currentSelectionsObject=a,a.Validated.bind(y)})}))}}),g.options.showLabels=e,g.fields=d},g.exportData=function(a,b){"active"===b&&p.getObject(null,a).then(function(a){e.getService("$exportDialog").show(a)})},g.selectValue=function(a,b,c,d){a.ctrlKey?g.selectFieldValues(b,[g.getValue(c)],!1):g.selectFieldValues(b,[g.getValue(c)],d)},g.selectElemNo=function(a,b,c,d){a.ctrlKey?g.selectElemNos(b,[c],!1,!1):g.selectElemNos(b,[c],d,!1)},g.selectElemNos=function(a,b,c){var d="/kfLists/"+a+"/qListObjectDef";g.enigmaModel.selectListObjectValues(d,b,c,!1)};var y=function(){};g.$on("$destroy",function(){g.currentSelectionsObject&&p.destroySessionObject(g.currentSelectionsObject.layout.qInfo.qId)}),g.buttonAction=function(b){if("LINK"===b.type&&"active"===b.clickType)g.activateLink(b.url,b.openType,b.clickType);else if("COPY"===b.type&&"active"===b.clickType){var c=window.location.href+"/options/clearselections/select/"+g.currentSelectionsObject.layout.sse_reply+"/";a("<input>").val(c).appendTo("body").select(),document.execCommand("copy"),a("<input>").remove()}else"EXPORT"===b.type&&"active"===b.clickType&&g.exportData(b.exportId,b.clickType)},g.activateLink=function(a,b,c){var d=a;"active"===c&&("NEWWINDOW"===b?window.open(d):"SAMETAB"===b&&window.open(d,"_self"))},g.selectDateFromAndTo=function(a,b,c,d){a="="===a.substring(0,1)?a.substring(1,a.length):a,p.field(a).selectMatch(">="+b+"<="+c,d).then(function(){})},g.selectFieldValues=function(a,c,d){a="="===a.substring(0,1)?a.substring(1,a.length):a;var e=[];b.each(c,function(a){e.push(JSON.parse(a))}),p.field(a).selectValues(e,d)["catch"](function(a){})},g.setVariable=function(a,b){p.variable.setStringValue(a,b).then(function(){})},g.getValue=function(a){return JSON.stringify(isNaN(a.qNum)?{qText:a.qText}:a.qNum)},g.showField=function(a){return a.visible?"BUTTON"===a.listType?!0:b.isEmpty(a.data)?!1:!0:!1},g.changeAlternativeDimensions=function(a,b,c,d){p.getObject(d).then(function(d){var e=[{qOp:"replace",qPath:"qHyperCubeDef/qDimensions/0",qValue:JSON.stringify(b)},{qOp:"replace",qPath:"qHyperCubeDef/qLayoutExclude/qHyperCubeDef/qDimensions/"+c,qValue:JSON.stringify(a)}];d.clearSoftPatches(),d.applyPatches(e,!0)})},g.prepareAlternativeDimension=function(a){var d=c.navigation.getCurrentSheetId();p.getObject(d.sheetId).then(function(c){var d=[];b.each(c.layout.cells,function(a){"linechart"===a.type&&d.push(a.name)}),b.each(d,function(c){p.getObjectProperties(c).then(function(d){p.getObject(c).then(function(e){if(e.clearSoftPatches(),d.properties.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qDimensions&&d.properties.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qDimensions.length>0){var f=d.properties.qHyperCubeDef.qDimensions[0];b.each(d.properties.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qDimensions,function(b,d){b.qLibraryId?n.getProperties(b.qLibraryId).then(function(e){a===e.properties.qDim.title&&g.changeAlternativeDimensions(f,b,d,c)}):b.qDef.qFieldLabels[0]===a&&g.changeAlternativeDimensions(f,b,d,c)})}})})})})},g.checkInitSelections=function(){var a=JSON.parse(sessionStorage.getItem(g.sessionStorageId)),b=a?a.selectionApplied:!1;b&&"ON_SHEET"!==g.layout.props.initSelectionMode||(g.willApplyInitSelections=!0)},g.setInitSelections=function(){if(g.willApplyInitSelections){b.each(g.fields,function(a){if("VARIABLE"!==a.type&&"DATERANGE"!==a.type&&"LINK"!==a.type&&""!==a.initSelection){var c=["=","<",">"];if(c.indexOf(a.initSelection.substring(0,1))>-1)p.field(a.field).clear(),p.field(a.field).selectMatch(a.initSelection);else{var d=[],e=a.initSelection.split(a.initSelectionSeparator?a.initSelectionSeparator:";");b.each(e,function(a){d.push(isNaN(a)?'{"qText": "'+a+'"}':a)}),g.selectFieldValues(a.field,d,!1)}}"VARIABLE"===a.type&&""!==a.initSelection&&g.setVariable(a.variable,a.initSelection),"DATERANGE"===a.type&&""!==a.dateFromInitSelection&&""!==a.dateToInitSelection&&g.selectDateFromAndTo(a.field,a.dateFromInitSelection,a.dateToInitSelection,!1)});var a={selectionApplied:!0};sessionStorage.setItem(g.sessionStorageId,JSON.stringify(a))}g.initSelectionsApplied=!0,g.willApplyInitSelections=!1},g.checkInitSelections(),g.onActivate=function(){},g.onSwipeStart=function(b){var c=a(b.target),d=a(b.target).index(),e=c.attr("field");g.selections.swipe_idx_min=d,g.selections.swipe_idx_max=d,g.selections.field=e;var f=parseInt(c.attr("datavalue"));g.selections.selectionsMode=!c.hasClass("S"),"undefined"!=typeof f&&(g.selections.selectionsMode?(g.selections.values_to_select.push(f),c.removeClass("A X O"),c.addClass("S")):(g.selections.values_to_select.push(f),c.removeClass("S"),c.addClass("X")))},g.onSwipeUpdate=function(b){var c=a(b.originalEvent.target),d=c.attr("field");if(d===g.selections.field){var e=a(b.originalEvent.target).index(),f=g.selections.swipe_idx_min>e||g.selections.swipe_idx_max<e;if(f){g.selections.swipe_idx_min=g.selections.swipe_idx_min>e?e:g.selections.swipe_idx_min,g.selections.swipe_idx_max=g.selections.swipe_idx_max<e?e:g.selections.swipe_idx_max;var h=a(b.originalEvent.target.parentElement.children);h.slice(g.selections.swipe_idx_min,g.selections.swipe_idx_max+1).each(function(){var b=this;if(g.selections.selectionsMode){if(!a(b).hasClass("S")){var c=parseInt(a(b).attr("datavalue"));-1===g.selections.values_to_select.indexOf(c)&&"undefined"!=typeof c&&(g.selections.values_to_select.push(c),a(b).removeClass("A X O"),a(b).addClass("S"))}}else if(a(b).hasClass("S")){var d=parseInt(a(b).attr("datavalue"));-1===g.selections.values_to_select.indexOf(d)&&"undefined"!=typeof d&&(g.selections.values_to_select.push(d),a(b).removeClass("S"),a(b).addClass("X"))}})}}},g.onSwipeCancel=function(){},g.onSwipe=function(){g.selections.swipe_idx_min=-1,g.selections.swipe_idx_max=-1,g.selections.values_to_select!==[]&&(g.selectElemNos(g.selections.field,g.selections.values_to_select,!0),g.selections.values_to_select=[]),g.selections.field=""}}]}});