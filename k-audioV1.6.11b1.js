/**
 * Created by KIPI-C on 2017/6/26.
 */
var kaudio={
    version:"1.0.6.11 build1",
    author:"KIPI-C"
};
var kaplayer=0;
var csstext=".kc-body{display:inline-block;height:32px;margin:1px 5px;}" +
    ".k-body{width:100% !important;height:100% !important;border-radius:5px;background-color:#0cf;overflow:hidden;position:relative;cursor:default;top:0;left:0;}" +
    ".kc-pauselog,.kc-playlog{display:block;width:30px;height:30px;border-radius:90px;background-size:100%;cursor:pointer;position:relative;top:0;left:0;}" +
    ".kc-rangebody{display:block;height:100%;top:-6px;position:relative;}" +
    ".kc-rangeli{display:block;margin-bottom:1px;width:100%;height:4px;background-color:rgba(0,0,0,.1)}" +
    ".kc-rangep{width:4px;height:4px;background-color:#fff;cursor:pointer}" +
    ".kc-rangeloadli{background-color:rgba(255,255,255,.4);position:absolute;top:0;left:0;cursor:pointer}" +
    ".kc-soundbody{position:absolute;top:0;z-index:1;transition:left .9s ease;height:100%;background-color:#0cf;}" +
    ".kc-nosoundicon,.kc-sound0icon,.kc-sound1icon,.kc-sound2icon,.kc-sound3icon,.kc-soundicon{display:block;margin:1px 0;width:30px;height:30px;border-radius:90px;cursor:pointer}" +
    ".kc-nosoundicon,.kc-sound0icon,.kc-sound1icon,.kc-sound2icon,.kc-sound3icon{position:absolute;z-index:2;background-size:100%;top:0}" +
    ".kc-soundli{display:block;margin-bottom:13px;margin-left:2px;height:20%;background-color:rgba(0,0,0,.1);position:absolute;}" +
    ".kc-soundp{position:relative;bottom:25%;height:180%;background-color:#fff;cursor:pointer}" +
    ".kc-infbody{color:#fff;display:block;padding-top:8px;height:100%;text-align:center;font-weight:700;font-size:13px;cursor:default;position:relative;}" +
    ".kc-lrctable{display:table;font-weight:400;color:#fff;position:absolute;top:0;left:32px;padding:0}" +
    ".kc-lrcbody{display:table-cell;overflow:hidden;vertical-align:middle;text-align:center;line-height:80%}" +
    "#kc-lrcfilebox{display:none}";
     document.head.innerHTML='<!--k-audio.js style--><style>'+csstext+"</style><!--/k-audio.js style-->"+document.head.innerHTML;
function kac(audio,width,height,lrc,translation){
    if(width===null||width===""||width===" "||width===undefined){width=320;}else{width=parseInt(width)}
    if(height===null||height===""||height===" "||height===undefined){height=32;}else{height=parseInt(height)}
    if (width<height*10){
        width=height+10;
    }var hh=height-32;
    kaplayer++;
    var kbody,bloc,lrcbody,lrctext,lrcbody2,lrcli,lrclong,x,xx,xxx,ar,ti,al,timetoupmin,timetoups,timetoupms,upt,lrcnuber,lrccc,infonuber=0,kap=kaplayer;
    var play,pause,rangep,rangeli,rangeloadli,rangebody,cnt,cat,rangepl,soundbody,soundicon,soundbodyleft,soundpl,sound0icon,sound1icon,sound2icon,sound3icon,nosound,v,vv,soundli,soundp,infbody,lrcfilebox,lrctable,$$$show=false;
    var pl,konname,konpart,konfor=[],kontype=[],kontext=[],loadfirst=false,lrcbodytext,kontexttype=[],
    lrcarray=[],lrcpart=[],timetouptime=[],lrcpart2=[];
    var $play=false;cx=audio;
    var down=false;var down1=false;
    this.preload=function (a) {
        cx.preload=a;
    };
    this.version=function () {
        return "1.0.6.11 build 1"
    };
    this.author=function () {
        return "KIPI-C"
    };
    this.style=function(color){
        color=color.toString();
        soundbody.style.backgroundColor=color;
        kbody.style.backgroundColor=color;
        if(color==="black"||color==="#fff"||color==="#ffffff"){
            rangeli.style.background="rgba(254,254,254,.3)";
            soundli.style.background="rgba(254,254,254,.3)";
        }else {
            rangeli.style.background="rgba(0,0,0,.1)";
            soundli.style.background="rgba(0,0,0,.1)";
        }
        return color
    };
    this.width=function (w) {
        setwh(w)
    };
    this.height=function (h) {
        setwh("",h)
    };
    this.play=function () {
        cx.play();
        $play=true;
        $$hide("play");
        $$show("pause");
    };
    this.pause=function () {
        cx.pause();
        $play=false;
        $$hide("pause");
        $$show("play");
    };
    this.speed=function (a) {
        cx.playbackRate=a;
        return a
    };
    this.load=function () {
        cx.load();
    };
    this.stop=function () {
        cx.currentTime=cx.duration;
    };
    this.currentTime=function (a) {
        try{
        if (a){cx.currentTime=a;}}
        catch (e){return !1}
    };
    this.loadkbag=function (a) {
        $.get(a,function (b,x) {
            c(b,x);
            function c(b,x) {
                if (x==="success"){
                    b=b.replace(/\n/g,"");
                    b=b.replace(/ /g,"");
                    pl=b.indexOf("{");
                    konname=b.slice(0,pl);
                    if (konname==="main") {
                        b = b.slice(pl + 1, b.length - 2);
                        konpart = b.split(",");
                        x = 0;
                        while (x < konpart.length) {
                            var kp = konpart[x];
                            var a = kp.indexOf(":");
                            var b = kp.indexOf("[");
                            konfor[x] = kp.slice(1, a);
                            kontype[x] = kp.slice(a + 1, b);
                            kontext[x] = kp.slice(b+1, kp.length - 1);
                            var c=kontext[x].indexOf("\"");
                            var d=kontext[x].indexOf("\"",c);
                            var f=kontext[x].indexOf("@");
                            if (c>=0&&d>=0){kontexttype[x]="String"}
                            if (c<0){kontexttype[x]="Nuber"}
                            if (f===0){kontexttype[x]="Class"}
                            x++;
                        }
                        x=0;
                        while (x<konpart.length){
                            var aa=true,bb=true;
                            var dg="document.getElementById('";
                            var dg2="')";
                            switch (konfor[x]){
                                case "kbody":konfor[x]="ka-body"+kap;break;
                                case "soundbody":konfor[x]="ka-soundbody"+kap;break;
                                case "lrcbody":konfor[x]="ka-lrcbody"+kap;break;
                                case "allsoundicon":konfor[x]="ka-soundicon"+kap;break;

                                default:aa=false;break;
                            }
                            switch (kontype[x]){
                                case "bgcolor":kontype[x]=".style.backgroundColor";break;
                                case "text":kontype[x]=".innerHTML";break;
                                case "bgimage":kontype[x]=".style.backgroundImage";break;
                                default:bb=false;break;
                            }
                            switch(kontext[x]){
                                default:break;
                            }
                            if (aa&&bb&&kontext[x]){
                                    eval(dg+konfor[x]+dg2+kontype[x]+"="+"\'"+kontext[x]+"\'");
                            }
                            if(konfor[x]==="ka-lrcbody"+kap&&kontype[x]===".innerHTML"){
                                loadfirst=true;lrcbodytext=kontext[x];
                            }
                            x++;
                        }
                    }
                }
            else {
                    console.warn("加载pkg失败")
                }
            }
        })

    };
    this.info=function () {
        return {"ar":ar, "ti":ti, "al":al}
     };
    var cx=audio;

    jready();

//------------测试版1.0.6.11 build 1-----------------
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
    function lrcread(lrc){
        $.get(lrc,function (r) {
            aa(r);});
        function aa(t) {
    if(lrc){
        {
            $(document).ready(function () {
                lrctext=t.replace(/\n/g,"").replace(/\r/g,"");
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
                        case "ar":ar=lrcpart[x].slice(4,lrcpart[x].lastIndexOf("]"));infonuber++;break;
                        case "ti":ti=lrcpart[x].slice(4,lrcpart[x].lastIndexOf("]"));infonuber++;break;
                        case "al":al=lrcpart[x].slice(4,lrcpart[x].lastIndexOf("]"));infonuber++;break;
                        case null:infonuber++;break;
                        case undefined:break;
                        case "  ":infonuber++;break;
                        case " ":infonuber++;break;
                        default:timetoupmin=xx;timetoups=String().concat(lrcpart[x].charAt(4),lrcpart[x].charAt(5));
                            if(lrcpart[x].charAt(6)===":"||lrcpart[x].charAt(6)==="."){timetoupms=String().concat(lrcpart[x].charAt(7),lrcpart[x].charAt(8))}
                            timetoupmin=parseInt(timetoupmin*60000);timetoups=parseInt(timetoups*1000);timetoupms=parseInt(timetoupms);
                            timetouptime[xxx]=(timetoupmin+timetoups+timetoupms);
                            lrcpart[x]=lrcpart[x].slice(10,lrcpart[x].length);
                            if (lrcpart[x].indexOf("|")>=0){
                            lrcpart2[x]=lrcpart[x].slice(lrcpart[x].indexOf("|")+1,lrcpart[x].length);
                            lrcpart[x]=lrcpart[x].slice(0,lrcpart[x].indexOf("|"));}
                            xxx++;
                            break;
                    }
                    x++;
                }
                if (!ar&&!ti){ar="k-audio.js";lrcbody.style.fontSize=18+"px";}else {
                if (ar&&ti){ar=ar+" - "}
                if (ar===undefined){ar="";}
                if (ti===undefined){ti=""}
                lrcbody.innerHTML=ar+ti;}
                if (loadfirst){lrcbody.innerHTML=lrcbodytext;}
                x=0;
                lrccc=-1;
                setInterval(function () {
                    var ct=cx.currentTime;
                    var $time=Math.round(ct*1000);
                    function checktime($$$$) {
                        return $$$$<$time;
                    }
                    upt=timetouptime.filter(checktime);
                    lrcnuber=upt.length;
                    if (lrcnuber>0){
                        if (lrccc!==lrcnuber){lrcbody.style.fontSize=9+hh/4+"px";lrccc=lrcnuber;lrcbody.innerHTML=lrcpart[lrccc+infonuber-1];
                        if (translation){
                        lrcbody2.innerHTML=lrcpart2[lrccc+infonuber-1];}}}
                },1);

            })}

    }}
}
    //----------------end--------------------------

    /*主函数*/


    function jready() {
        if(window.jQuery||$()){kacc(audio,lrc,width,height);}
        else{console.warn("没有检测到jQuery服务！");}
    }
    function kacc(audio,lrc,width,height){

        audio.id="kac"+kaplayer;
    /*-------------MAIN--------------*/

        $("#kac"+kaplayer).wrap(function(){
            return "<div class='kc-body' id='kc-body"+kaplayer+"'></div>"
        });
        bloc=audio.parentNode;
        kbody=bloc.appendChild(document.createElement("div"));
        kbody.className="k-body";
        kbody.id="ka-body"+kaplayer;
        audio.controls=false;
        allready();
        if (cx.autoplay){
            cx.play();
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
            setwh(width,height);
        }
        function playready() {
            play=kbody.appendChild(document.createElement("canvas"));
            play.setAttribute("width","60");
            play.setAttribute("height","60");
            canvasauto(play);
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
            canvasround(ctx);
            play.className="kc-playlog";
            play.addEventListener("click",function(){cx.play();$$hide("play");$$show("pause");$play=true;});
        }
        function pauseready() {
            pause=kbody.appendChild(document.createElement("canvas"));
            pause.className="kc-pauselog";
            pause.setAttribute("width","60");
            pause.setAttribute("height","60");
            canvasauto(pause);
            var ctx=pause.getContext("2d");
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.fillRect(19, 17.5, 7.5, 25);
            ctx.fillRect(34, 17.5, 7.5, 25);
            ctx.closePath();
            canvasround(ctx);
            pause.addEventListener("click",function (){cx.pause();$$hide("pause");$$show("play");$play=!1;});
            $$hide("pause");
        }
        function rangeready() {
            rangebody = kbody.appendChild(document.createElement("div"));
            rangebody.className = "kc-rangebody";
            rangebody.style.width=parseInt(width-height*4)+"px";
            rangebody.style.left=height+"px";
            rangeli = rangebody.appendChild(document.createElement("div"));
            rangeli.className = "kc-rangeli";
            rangeloadli = rangeli.appendChild(document.createElement("div"));
            rangeloadli.className = "kc-rangeloadli";
            rangep = rangeli.appendChild(document.createElement("div"));
            rangep.className = "kc-rangep";
            rangep.setAttribute("draggable","false");
            cnt = cx.currentTime;

        }
        function soundready() {
            soundbody=kbody.appendChild(document.createElement("div"));
            soundbody.className="kc-soundbody";
            soundbody.id="ka-soundbody"+kaplayer;
            soundbody.style.left=(width-height)+"px";
            soundbody.style.width=width-(32+hh)-(width-height*4)+"px";
            soundbodyleft=soundbody.style.left;
            soundicon=soundbody.appendChild(document.createElement("canvas"));
            soundicon.className="kc-soundicon";
            soundicon.id="ka-soundicon"+kaplayer;
            soundicon.setAttribute("width","60");
            soundicon.setAttribute("height","60");
            canvasauto(soundicon);
            var ctx=soundicon.getContext("2d");
            canvasround(ctx);
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
            canvasauto(sound0icon);
            sound1icon=soundbody.appendChild(document.createElement("canvas"));
            sound1icon.className="kc-sound1icon";
            canvasauto(sound1icon);
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
            canvasauto(sound2icon);
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
            canvasauto(sound3icon);
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
            canvasauto(nosound);
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
            soundli.style.width=width-(32+hh)*2-(width-height*4)-(width/60)+"px";
            soundli.style.top=0.4*height+"px";
            soundli.style.left=0.97*height+"px";
            soundp=soundli.appendChild(document.createElement("div"));
            soundp.className="kc-soundp";
            soundp.style.width=(((width/70))+"px");
            soundp.setAttribute("draggable","false");
            soundpl=GetCurrentStyle(soundli,"width");
            soundpl=parseInt(soundpl);
            soundp.style.marginLeft=width-(32+hh)*2-(width-height*4)-(width/45)+"px";
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
            infbody.style.left=parseInt(width-height*3)+"px";
            infbody.style.width=4+hh/9+"pc";
            infbody.style.top=-(height*2.3)+hh*.6+10+"px";
            infbody.style.fontSize=14+hh/3+"px"
        }
        function lrcready() {
            lrctable=kbody.appendChild(document.createElement("table"));
            lrctable.className="kc-lrctable";
            lrctable.style.left=height+"px";
            lrctable.style.width=(width-height*4)+"px";
            lrctable.style.height=height-8+"px";
            lrctable.style.fontSize=8+hh/9+"px";
            lrcbody=lrctable.appendChild(document.createElement("tr")).appendChild(document.createElement("td"));
            lrcbody.className="kc-lrcbody";
            lrcbody.id="ka-lrcbody"+kaplayer;
            lrcbody2=lrctable.appendChild(document.createElement("tr")).appendChild(document.createElement("td"));
            lrcbody2.className="kc-lrcbody";
            lrcbody2.id="ka-lrcbody2"+kaplayer;
            lrcfilebox=lrcbody.appendChild(document.createElement("div"));
            lrcfilebox.className="kc-lrcfilebox";
            lrcfilebox.id="kc-lrcfilebox"+kaplayer;
            lrcread(lrc);
        }

        function canvasround(ctx) {
            ctx.beginPath();
            ctx.arc(30,30,29,0,Math.PI*2);
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "#fff";
            ctx.stroke();
            ctx.closePath();
        }
//sub

        return cx;
/* end */
}
    function canvasauto(ee) {
        ee.style.width=30+hh+"px";
        ee.style.height=30+hh+"px";
        ee.style.margin=1+"px";
    }
    function setwh(w,h) {
        if(w===null||w===""||w===" "||w===undefined){w=width;}else{w=parseInt(w)}
        if(h===null||h===""||h===" "||h===undefined){h=height;}else{h=parseInt(h)}
        if (h*10>width){
            width=w=h*10;
        }if (w<h*10){
        w=h*10;
        }
        width=w;
        height=h;
        hh=height-32;
        bloc.style.width=w+"px";
        bloc.style.height=h+"px";
        canvasauto(play);
        canvasauto(pause);
        canvasauto(soundicon);
        canvasauto(sound0icon);
        canvasauto(sound1icon);
        canvasauto(sound1icon);
        canvasauto(sound2icon);
        canvasauto(sound3icon);
        canvasauto(nosound);
        rangebody.style.width=parseInt(width-height*4)+"px";
        rangebody.style.left=height+"px";
        soundbody.style.left=(width-height)+"px";
        soundbody.style.width=width-(32+hh)-(width-height*4)+"px";
        soundbodyleft=soundbody.style.left;
        soundli.style.width=width-(32+hh)*2-(width-height*4)-(width/60)+"px";
        soundli.style.top=0.4*height+"px";
        soundli.style.left=0.97*height+"px";
        soundp.style.width=(((width/70))+"px");
        soundp.setAttribute("draggable","false");
        soundpl=GetCurrentStyle(soundli,"width");
        soundpl=parseInt(soundpl);
        soundp.style.marginLeft=width-(32+hh)*2-(width-height*4)-(width/45)+"px";
        infbody.style.left=parseInt(width-height*3)+"px";
        infbody.style.width=4+hh/9+"pc";
        infbody.style.top=-(height*2.3)+hh*.6+10+"px";
        infbody.style.fontSize=14+hh/3+"px";
        lrctable.style.left=height+"px";
        lrctable.style.width=(width-height*4)+"px";
        lrctable.style.height=height-8+"px";
        lrctable.style.fontSize=10+hh/9+"px";
    }
    function whencx() {
        $(document).ready(function () {
            cx.addEventListener("abort",function () {
                lrcbody.innerHTML=("加载错误，浏览器已经放弃了加载!");
                console.warn("加载错误，浏览器已经放弃了加载");
                rangeli.style.backgroundColor="rgba(0, 0, 0, .3)";
            });

            cx.addEventListener("stalled",function () {
                lrcbody.innerHTML=("加载失败，找不到该文件!");
                console.warn("加载失败，找不到该文件");
                rangeli.style.backgroundColor="rgba(0, 0, 0, .3)";
            });
            cx.addEventListener("error",function () {
                lrcbody.innerHTML=("加载时出现错误!");
                rangeli.style.backgroundColor="rgba(0, 0, 0, .3)";
                console.warn("加载时出现错误")
            });
        });
        cx.addEventListener("play",function () {
            $$hide("play");$$show("pause");$play=true;
        });
        cx.addEventListener("emptied",function () {
            lrcbody.innerHTML="k-audio.js";
        });
        cx.addEventListener("pause",function () {
            cx.pause();$$hide("pause");$$show("play");$play=!1;
        });
        cx.addEventListener("volumechange",function () {
            soundp.style.marginLeft=(soundpl-6+width/130)*cx.volume+"px";
        });
        cx.addEventListener("waiting",function () {
            rangeli.style.backgroundColor="rgba(255,255,100,.2)"
        });
        cx.addEventListener("timeupdate", function (){
            rangeli.style.backgroundColor="rgba(0,0,0,.1)";
            cnt = cx.currentTime;
            cat=cx.duration;
            rangepl=GetCurrentStyle(rangeli,"width");
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
            rangeloadli.style.width=(cx.buffered.end(0)/cat)*rangepl+"px";
            rangeloadli.style.height=GetCurrentStyle(rangeli,"height")
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
            rangepl=GetCurrentStyle(rangeli,"width");
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
                rangepl=GetCurrentStyle(rangeli,"width");
                rangepl.toString();
                rangepl.replace("px","");
                rangepl=parseInt(rangepl);
                p=rangex/rangepl;
                rangep.setAttribute("style","margin-left:"+Math.round(p*(rangepl-4))+"px;")
            }
        });
    }
    function whensound() {
        infbody.addEventListener("click",function () {
            soundbody.style.left=parseInt(width*.7)+"px";
            $$$show=true;
        });
        infbody.addEventListener("mouseout",function () {
            soundbody.style.left=soundbodyleft;
            $$$show=true;
        });
        soundbody.addEventListener("mouseover",function () {
            soundbody.style.left=parseInt(width-height*4+32+hh)+"px";
            $$$show=true;
        });
        soundbody.addEventListener("mouseout",function () {
            soundbody.style.left=soundbodyleft;
            $$$show=false;
        });
        sound0icon.addEventListener("click",function () {
            if ($$$show){
                $$hide("sound0icon");
                $$show("nosound");
                vv=0;
                v=cx.volume;
                cx.muted=true;
            }});
        sound1icon.addEventListener("click",function () {
            if ($$$show) {
                $$hide("sound1icon");
                $$show("nosound");
                vv = 1;
                v = cx.volume;
                cx.muted = true;
            }});
        sound2icon.addEventListener("click",function () {
            if ($$$show) {
                $$hide("sound2icon");
                $$show("nosound");
                vv = 2;
                v = cx.volume;
                cx.muted = true;
            }});
        sound3icon.addEventListener("click",function () {
            if ($$$show) {
                $$hide("sound3icon");
                $$show("nosound");
                vv = 3;
                v = cx.volume;
                cx.muted = true;
            }});
        nosound.addEventListener("click",function () {
            if ($$$show) {
                $$hide("nosound");
                cx.muted = false;
                switch (vv) {
                    case 0:
                        $$show("sound0icon");
                        break;
                    case 1:
                        $$show("sound1icon");
                        break;
                    case 2:
                        $$show("sound2icon");
                        break;
                    case 3:
                        $$show("sound3icon");
                        break;
                }
            }});
        soundp.addEventListener("mousedown",function () {
            down1=true;
        });
        soundp.addEventListener("mousemove",function () {
            if(down1===true){
                var mouseX=getMousePos();
                var soundzb=getElementLeft(soundli);
                var soundx=mouseX-soundzb;
                soundpl=GetCurrentStyle(soundli,"width");
                soundpl.toString();
                soundpl.replace("px","");
                soundpl=parseInt(soundpl);
                var ppp=soundx*100/soundpl/100;
                if (ppp>1||ppp<0){ppp=1;}
                soundp.style.marginLeft=(soundpl-6+width/130)*ppp+"px";
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
            soundpl=GetCurrentStyle(soundli,"width");
            soundpl.toString();
            soundpl.replace("px","");
            soundpl=parseInt(soundpl);
            var ppp=soundx*100/soundpl/100;
            if (ppp>1||ppp<0){ppp=1;}
            soundp.style.marginLeft=(soundpl-6+width/130)*ppp+"px";
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
            lrcbody.innerHTML=ar+ti;
        })
    }
function $$hide(a) {
        eval(a+".style.display=\"none\";")
    }
    function $$show(a) {
        eval(a+".style.display=\"block\";")
    }

}
