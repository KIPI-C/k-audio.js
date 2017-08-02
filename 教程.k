<h3>k-audio.js教程</h3>
            <p>欢迎使用k-audio.js,这是我们的官方教程</p>
            <p>介绍：这是一个风格清新，操作简单，支持<mark>歌词播放</mark>，您的H5网页音乐播放必备神器。</p>
            <p>怎么使用：在你的网页下方输入代码：</p>
            <code>
&lt;script&gt;
var a=new kac([element]audio,[string||nuber]width,[url]lrc);
&lt;/script&gt;
          </code>
          <p>
            其中：<mark>audio</mark>是指需要控制的audio元素，</p>
            <p><mark>width</mark>是指宽，</p>
            <p><mark>lrc</mark>是lrc的链接</p>
            <h5>举个例子：</h5>
            <code>
            var a=new kac(document.getElementById("audio"),320,"lrcfile.lrc")
            </code>
