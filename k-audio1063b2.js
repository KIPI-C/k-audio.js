/**
 * Created by KIPI-C on 2017/6/26.
 */
var kaplayer=0;
var csstext=".kc-body{display:inline-block;height:32px;margin:1px 5px;}" +
    ".k-body{width:100% !important;height:32px;border-radius:5px;background-color:deepskyblue;overflow:hidden;position:relative;cursor:default;top:0;left:0;}" +
    ".kc-pauselog,.kc-playlog{display:block;margin:1px;width:30px;height:30px;border-radius:90px;background-size:100%;cursor:pointer;position:relative;top:0;left:0;}" +
    ".kc-rangebody{display:block;height:100%;left:32px;top:-5px;position:relative;}" +
    ".kc-rangeli{display:block;margin-bottom:1px;width:100%;height:4px;background-color:rgba(0,0,0,.1)}" +
    ".kc-rangep{width:4px;height:4px;background-color:#fff;cursor:pointer}" +
    ".kc-soundbody{width:30%;height:100%;background-color:#00bfff}" +
    ".kc-soundbody{position:absolute;top:0;z-index:1;transition:left .9s ease}" +
    ".kc-nosoundicon,.kc-sound0icon,.kc-sound1icon,.kc-sound2icon,.kc-sound3icon,.kc-soundicon{display:block;margin:1px 0;width:30px;height:30px;border-radius:90px;cursor:pointer}" +
    ".kc-nosoundicon,.kc-sound0icon,.kc-sound1icon,.kc-sound2icon,.kc-sound3icon{position:absolute;z-index:2;background-size:100%;top:0}" +
    ".kc-soundli{display:block;margin-bottom:13px;margin-left:2px;height:20%;background-color:rgba(0,0,0,.1);position:absolute;top:13px;left:30px;}" +
    ".kc-soundp{position:relative;bottom:25%;width:6px;height:180%;background-color:#fff;cursor:pointer}" +
    ".kc-infbody{color:#fff;display:block;padding-top:8px;width:4pc;height:100%;text-align:center;font-weight:700;font-size:12.8px;cursor:default;position:relative;top:-64px;}" +
    ".kc-lrctable{display:table;height:75%;font-weight:400;font-size:x-small;color:#fff;position:absolute;top:0px;left:32px;}" +
    ".kc-lrcbody{display:table-cell;overflow:hidden;vertical-align:middle;text-align:center;max-height:25px;}" +
    "#kc-lrcfilebox{display:none}";
     document.head.innerHTML="<style>"+csstext+"</style><!--↑↑ BY k-audio.js ↑↑-->"+document.head.innerHTML;

function kac(audio,width,lrc) {
    kaplayer++;
    jready();
    var kxmlhttp,lrcfiletext;

//------------测试版1.0.6.3 build 2-----------------
    //-------------------下列函数来自网络-------------------
    function getMousePos(event){
        var xx;var e = event || window.event;var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft; xx = e.pageX || e.clientX + scrollX;return xx;
    }
    function getElementLeft(element){
        var actualLeft = element.offsetLeft;var current = element.offsetParent;while (current !== null){actualLeft += current.offsetLeft;current = current.offsetParent;}return actualLeft;
    }
    function GetCurrentStyle (obj, prop) {
        if (obj.currentStyle) {
            return obj.currentStyle[prop];
        }
        else if (window.getComputedStyle) {
            prop=prop.replace (/([A-Z])/g, "-$1");
            prop=prop.toLowerCase ();
            return document.defaultView.getComputedStyle (obj,null)[prop];
        }
    }
    function loadXMLDoc(url)
    {
        if (window.XMLHttpRequest||XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            kxmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            kxmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        kxmlhttp.open("GET",url,true);
        kxmlhttp.send();
        $(document).ready(function () {
            lrcfiletext=kxmlhttp.responseText;
        });

    }

    //----------------end--------------------------

    /*主函数*/


    function jready() {
        if(window.jQuery||jQuery||$()){ka(audio,width,lrc);}
        else{console.warn("没有检测到jQuery服务！");}
    }
    function ka(audio,width,lrc){
        if(width===null||width===""||width===" "||width===undefined){width=320;}else{width=parseInt(width)}
        if(lrc===null||lrc===""||lrc===" "||lrc===undefined){lrc=false;}
        audio.id="kc"+kaplayer;
        var cx=audio;
    /*-------------MAIN--------------*/
        var kbody,bloc,play,pause,rangep,rangeli,rangebody,cnt,cat,rangepl,soundbody,soundicon,soundbodyleft,soundpl,sound0icon,sound1icon,sound2icon,sound3icon,nosound,v,vv,soundli,soundp,infbody,lrcbody,lrcfilebox,lrctext,lrcli,lrclong,x,xx,xxx,ar,ti,timetoupmin,timetoups,timetoupms,lrctable,upt,lrcnuber,lrccc,infonuber=0,$$$show=false;
        var $play=false;var lrcarray=[],lrcpart=[],timetouptime=[];
        var down=false;var down1=false;
        $("#kc"+kaplayer).wrap(function(){
            return "<div class='kc-body' id='kc-body"+kaplayer+"'></div>"
        });
        bloc=audio.parentNode;
        bloc.style.width=width+"px";
        kbody=bloc.appendChild(document.createElement("div"));
        kbody.className="k-body";
        kbody.id="k-body"+kaplayer;
        audio.controls=false;
        allready();
        if (cx.getAttribute("audoplay")){
            document.ready(function () {
                play.click();
            });
        }
        function allready() {
            playready();
            pauseready();
            rangeready();
            soundready();
            infready();
            lrcready();
            whencx();
            whenend();
            whenrangeli();
            whensound();
        }
        function playready() {
            play=kbody.appendChild(document.createElement("canvas"));
            play.setAttribute("width","60");
            play.setAttribute("height","60");
            var ctx=play.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(20,15);
            ctx.lineTo(20,45);
            ctx.lineTo(45,30);
            ctx.lineTo(20,15);
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(30,30,29,0,Math.PI*2,true);
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "#fff";
            ctx.stroke();
            ctx.closePath();
            play.className="kc-playlog";
            play.addEventListener("click",function(){cx.play();$$hide("play");$$show("pause");$play=true;});
        }
        function pauseready() {
            pause=kbody.appendChild(document.createElement("canvas"));
            pause.className="kc-pauselog";
            pause.setAttribute("width","60");
            pause.setAttribute("height","60");
            var ctx=pause.getContext("2d");
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.fillRect(19, 17.5, 7.5, 25);
            ctx.fillRect(34, 17.5, 7.5, 25);
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(30,30,29,0,Math.PI*2,true);
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "#fff";
            ctx.stroke();
            ctx.closePath();
            pause.addEventListener("click",function (){cx.pause();$$hide("pause");$$show("play");$play=!1;});
            $$hide("pause");
        }
        function rangeready() {
            rangebody = kbody.appendChild(document.createElement("div"));
            rangebody.className = "kc-rangebody";
            rangebody.style.width=parseInt(width-128)+"px";
            rangeli = rangebody.appendChild(document.createElement("div"));
            rangeli.className = "kc-rangeli";
            rangep = rangeli.appendChild(document.createElement("div"));
            rangep.className = "kc-rangep";
            rangep.setAttribute("draggable","false");
            cnt = cx.currentTime;

        }
        function soundready() {
            soundbody=kbody.appendChild(document.createElement("div"));
            soundbody.className="kc-soundbody";
            soundbody.style.left=(width-31)+"px";
            soundbodyleft=soundbody.style.left;
            soundicon=soundbody.appendChild(document.createElement("canvas"));
            soundicon.className="kc-soundicon";
            soundicon.setAttribute("width","60");
            soundicon.setAttribute("height","60");
            var ctx=soundicon.getContext("2d");
            ctx.beginPath();
            ctx.arc(30,30,29,0,Math.PI*2);
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "#fff";
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle="#fff";
            ctx.fillRect(11.5,22.5,6,15);
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(17.5,22.5);
            ctx.lineTo(17.5,37.5);
            ctx.lineTo(26.5,43.5);
            ctx.lineTo(26.5,16.5);
            ctx.lineTo(17.5,22.5);
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.closePath();
            sound0icon=soundbody.appendChild(document.createElement("canvas"));
            sound0icon.className="kc-sound0icon";
            sound1icon=soundbody.appendChild(document.createElement("canvas"));
            sound1icon.className="kc-sound1icon";
            sound1icon.setAttribute("width","60");
            sound1icon.setAttribute("height","60");
            ctx=sound1icon.getContext("2d");
            ctx.beginPath();
            ctx.arc(27.2,30,6,3.14/2*3+0.5,3.14/2-0.5);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#fff";
            ctx.stroke();
            ctx.closePath();
            sound2icon=soundbody.appendChild(document.createElement("canvas"));
            sound2icon.className="kc-sound2icon";
            sound2icon.setAttribute("width","60");
            sound2icon.setAttribute("height","60");
            ctx=sound2icon.getContext("2d");
            ctx.beginPath();
            ctx.arc(27.2,30,6,3.14/2*3+0.5,3.14/2-0.5);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#fff";
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(30,30,10,3.14/2*3+0.5,3.14/2-0.5);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#fff";
            ctx.stroke();
            ctx.closePath();
            sound3icon=soundbody.appendChild(document.createElement("canvas"));
            sound3icon.className="kc-sound3icon";
            sound3icon.setAttribute("width","60");
            sound3icon.setAttribute("height","60");
            ctx=sound3icon.getContext("2d");
            ctx.beginPath();
            ctx.arc(27.2,30,6,3.14/2*3+0.5,3.14/2-0.5);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#fff";
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(30,30,10,3.14/2*3+0.5,3.14/2-0.5);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#fff";
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(33,30,14,3.14/2*3+0.5,3.14/2-0.5);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#fff";
            ctx.stroke();
            ctx.closePath();
            nosound=soundbody.appendChild(document.createElement("canvas"));
            nosound.className="kc-nosoundicon";
            nosound.setAttribute("width","60");
            nosound.setAttribute("height","60");
            ctx=nosound.getContext("2d");
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.rotate(Math.PI/180*42);
            ctx.fillRect(48.5,-19,5,28);
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.rotate(Math.PI/180*97);
            ctx.fillRect(-13,-63,5,28);
            ctx.closePath();
            soundli=soundbody.appendChild(document.createElement("div"));
            soundli.className="kc-soundli";
            soundli.style.width=60+"px";
            soundp=soundli.appendChild(document.createElement("div"));
            soundp.className="kc-soundp";
            soundp.setAttribute("draggable","false");
            soundpl=GetCurrentStyle(soundli,"width");
            soundpl.toString();
            soundpl.replace("px","");
            soundpl=parseInt(soundpl);
            soundp.setAttribute("style","margin-left:"+54+"px;");
            $$hide("nosound");
            $$hide("sound0icon");
            $$hide("sound1icon");
            $$hide("sound2icon");
            cx.volume=1;
        }
        function infready() {
            infbody=kbody.appendChild(document.createElement("div"));
            infbody.className="kc-infbody";
            infbody.innerHTML="00:00";
            infbody.style.left=parseInt(width-128)+30+"px"
        }
        function lrcready() {
            lrctable=kbody.appendChild(document.createElement("table"));
            lrctable.className="kc-lrctable";
            lrctable.style.width=(width-128)+"px";
            lrcbody=lrctable.appendChild(document.createElement("td"));
            lrcbody.className="kc-lrcbody";
            lrcfilebox=lrcbody.appendChild(document.createElement("div"));
            lrcfilebox.className="kc-lrcfilebox";
            lrcfilebox.id="kc-lrcfilebox"+kaplayer;

            if(lrc){
                 {loadXMLDoc(lrc);
                    $(document).ready(function(){
                        lrctext=lrcfiletext;

                    lrctext.toString();
                    lrctext=lrctext.replace(/\n/g,"");

                    while(lrcli!==-1){
                    lrcli=lrctext.indexOf("[",lrcli+1);
                    lrcarray.push(lrcli);
                    }
                    lrclong=lrcarray.push()-1;
                    x=0;xx=0;
                    while(x!==lrclong){
                        if(x===0){xx=0}else{xx=lrcarray[x];}
                        if (x===lrclong-1){
                            lrcpart[x]=lrctext.slice(xx,lrctext.length);
                        }else{lrcpart[x]=lrctext.slice(xx,lrcarray[x+1]);}
                        x++;
                    }
                    x=0;xx=0;xxx=0;

                        x=0;xx=0;
                        while(x!==lrclong){
                            xx=lrcpart[x].substr(1,2);
                            switch (xx){
                                case "ar"||"AR":ar=lrcpart[x].slice(4,lrcpart[x].lastIndexOf("]"));infonuber++;break;
                                case "ti"||"TI":ti=lrcpart[x].slice(4,lrcpart[x].lastIndexOf("]"));infonuber++;break;
                                case "al"||"AL":infonuber++;break;
                                case null:infonuber++;break;
                                case undefined:infonuber++;break;
                                case "  ":infonuber++;break;
                                case " ":infonuber++;break;
                                default:timetoupmin=xx;timetoups=String().concat(lrcpart[x].charAt(4),lrcpart[x].charAt(5));
                                    if(lrcpart[x].charAt(6)===":"||lrcpart[x].charAt(6)==="."){timetoupms=String().concat(lrcpart[x].charAt(7),lrcpart[x].charAt(8))}
                                    timetoupmin=parseInt(timetoupmin*60000);timetoups=parseInt(timetoups*1000);timetoupms=parseInt(timetoupms);

                                    timetouptime[xxx]=(timetoupmin+timetoups+timetoupms);
                                    lrcpart[x]=lrcpart[x].slice(10,lrcpart[x].length);
                                    xxx++;
                                    break;
                            }
                            x++;
                        }
                        if (ar===undefined&&ti===undefined&&lrc===undefined){ar="k-audio.js";lrcbody.style.fontWeight="bolder";lrcbody.style.fontSize="14px";}
                        if (ar&&ti){ar=ar+" - "}
                        if (ar===undefined){ar="";}
                        if (ti===undefined){ti=""}
                        lrcbody.innerHTML=ar+ti;
                            x=0;
                            timetouptime.pop();
                            lrccc=-1;
                            setInterval(function () {
                                var ct=cx.currentTime;
                                var $time=Math.round(ct*1000);
                                function checktime($$$$) {
                                    return $$$$<=$time;
                                }
                                upt=timetouptime.filter(checktime);
                                lrcnuber=upt.length;
                                if (lrcnuber>0){
                                    if (lrccc!==lrcnuber){lrccc=lrcnuber;lrcbody.innerHTML=lrcpart[lrccc-1+infonuber];}}
                            },3);

                    })}

            }
        }

        function whencx() {
            $(document).ready(function () {
                cx.addEventListener("abort",function () {
                    lrcbody.innerHTML=("加载错误，浏览器已经放弃了加载");
                });
                cx.addEventListener("error",function () {
                    lrcbody.innerHTML=("加载时出现错误");
                });
            });
            cx.addEventListener("timeupdate", function (){
                cnt = cx.currentTime;
                cat=cx.duration;
                rangepl=$(".kc-rangeli").css("width");
                rangepl.toString();
                rangepl.replace("px","");
                rangepl=parseInt(rangepl);
                var hour=Math.floor(cnt/3600);
                var min=Math.floor(cnt/60-(Math.round(cnt/3600)*60));
                var second=Math.round(cnt-(Math.floor(cnt/60)*60));
                if(hour===0){hour="";}else{hour=hour+":";hour.toString();if(hour.length<2){hour="0"+hour;}}
                min=min.toString();second=second.toString();
                if(min.length<2){min="0"+min;}
                min=min+":";
                if(second.length<2){second="0"+second;}
                if (down===false){
                    infbody.innerHTML=hour+min+second;
                    rangep.setAttribute("style","margin-left:"+Math.round(cnt/cat*(rangepl-4))+"px;");
                }

            });



        }
        function whenrangeli() {
            var p;
            rangeli.addEventListener("click",function () {
                down=true;
            });
            rangeli.addEventListener("click",function () {
                var mouseX=getMousePos();
                var rangezb=getElementLeft(rangeli);
                var rangex=mouseX-rangezb;
                rangepl=$(".kc-rangeli").css("width");
                rangepl.toString();
                rangepl.replace("px","");
                rangepl=parseInt(rangepl);
                p=rangex/rangepl;
                cnt = cx.currentTime;
                cat = cx.duration;
                cx.currentTime=cat*p;
                down=false;
            });
            rangeli.addEventListener("mouseup",function () {
                down=false;
            });
            rangep.addEventListener("mouseout",function () {
                down=false;
            });
            rangep.addEventListener("mousemove",function () {
                if (down===true){
                    var mouseX=getMousePos();
                    var rangezb=getElementLeft(rangeli);
                    var rangex=mouseX-rangezb;
                    rangepl=$(".kc-rangeli").css("width");
                    rangepl.toString();
                    rangepl.replace("px","");
                    rangepl=parseInt(rangepl);
                    p=rangex/rangepl;
                    rangep.setAttribute("style","margin-left:"+Math.round(p*(rangepl-4))+"px;")
                }
            });
        }
        function whensound() {
            soundbody.addEventListener("click",function () {
                soundbody.style.left=parseInt(width-96)+"px";
                $$$show=true;
            });
            soundbody.addEventListener("mouseover",function () {
                soundbody.style.left=parseInt(width-96)+"px";
                $$$show=true;
                });
            soundbody.addEventListener("mouseout",function () {
                soundbody.style.left=soundbodyleft;
                $$$show=false;
            });
            if ($$$show){
            sound0icon.addEventListener("click",function () {
                $$hide("sound0icon");
                $$show("nosound");
                vv=0;
                v=cx.volume;
                cx.muted=true;

            });
            sound1icon.addEventListener("click",function () {
                $$hide("sound1icon");
                $$show("nosound");
                vv=1;
                v=cx.volume;
                cx.muted=true;
            });
            sound2icon.addEventListener("click",function () {
                $$hide("sound2icon");
                $$show("nosound");
                vv=2;
                v=cx.volume;
                cx.muted=true;
            });
            sound3icon.addEventListener("click",function () {
                $$hide("sound3icon");
                $$show("nosound");
                vv=3;
                v=cx.volume;
                cx.muted=true;
            });
            nosound.addEventListener("click",function () {
                $$hide("nosound");
                cx.muted=false;
                switch(vv){
                    case 0:$$show("sound0icon");break;
                    case 1:$$show("sound1icon");break;
                    case 2:$$show("sound2icon");break;
                    case 3:$$show("sound3icon");break;
                }
            });}
            soundp.addEventListener("mousedown",function () {
                down1=true;
            });
            soundp.addEventListener("mousemove",function () {
                if(down1===true){
                    var mouseX=getMousePos();
                    var soundzb=getElementLeft(soundli);
                    var soundx=mouseX-soundzb;
                    soundpl=$(".kc-soundli").css("width");
                    soundpl.toString();
                    soundpl.replace("px","");
                    soundpl=parseInt(soundpl);
                    var ppp=soundx*100/soundpl/100;
                    if (ppp>1||ppp<0){ppp=1;}
                    soundp.setAttribute("style","margin-left:"+(soundpl-6)*ppp+"px;");
                }
            });
            soundli.addEventListener("mouseup",function () {
                cx.muted=false;
            });
            soundp.addEventListener("mouseup",function () {
                down1=false;
                cx.muted=false;
            });
            soundp.addEventListener("mouseout",function () {
                down1=false;
            });
            soundli.addEventListener("click",function () {
                var mouseX=getMousePos();
                var soundzb=getElementLeft(soundli);
                var soundx=mouseX-soundzb;
                soundpl=$(".kc-soundli").css("width");
                soundpl.toString();
                soundpl.replace("px","");
                soundpl=parseInt(soundpl);
                var ppp=soundx*100/soundpl/100;
                if (ppp>1||ppp<0){ppp=1;}
                soundp.setAttribute("style","margin-left:"+(soundpl-6)*ppp+"px;");
                cx.volume=ppp;
                if (ppp===0){$$show("sound0icon");$$hide("sound1icon");$$hide("sound2icon");$$hide("sound3icon");$$hide("nosound");}
                if (ppp>0&&ppp<=0.33){$$show("sound1icon");$$hide("sound0icon");$$hide("sound2icon");$$hide("sound3icon");$$hide("nosound");}
                if (ppp>0.33&&ppp<=0.66){$$show("sound2icon");$$hide("sound0icon");$$hide("sound1icon");$$hide("sound3icon");$$hide("nosound");}
                if (ppp>0.66&&ppp<=1){$$show("sound3icon");$$hide("sound0icon");$$hide("sound2icon");$$hide("sound1icon");$$hide("nosound");}
            })
        }

        function whenend() {
            cx.addEventListener("ended",function(){
                $$hide("pause");
                $$show("play");
                $play=!1;
                rangep.setAttribute("style","margin-left:"+0+"px;");
                infbody.innerHTML="00:00";
            })
        }
        function $$hide(a) {
            eval(a+".style.display=\"none\";")
        }
        function $$show(a) {
            eval(a+".style.display=\"block\";")
        }
//sub

        return cx;
/* end */
}
}
