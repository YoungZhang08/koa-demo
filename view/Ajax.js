(function() {
    // 定义构造函数
    function Ajax(obj) { // 传入方式默认为对象
        // 整理参数
        this.url = obj.url;
        this.data = obj.data || '';
        this.method = obj.method || 'GET'; // 请求方式可以为GET也可以为POST,但是默认为GET
        this.dataType = obj.dataType || (obj.dataType).toUpperCase(); // 返回值类型可为XML/json/jsonp三种
        this.async = obj.async || true; // 默认为异步请求
        this.success = obj.success;
        this.error = obj.error;
        this.xml = null;
        this.init();
    }

    // 重写原型就会断掉构造函数与原型之间的链，所以构造函数中的属性和方法在新的原型中将不可使用
    Ajax.prototype = {
        // 下面这句就相当于手动将构造函数与构造函数的原型对象连接起来，因为constructor是原型中的固有属性
        constructor: Ajax,
        init: function() {
            this.createXml();
        },
        // 新建XMLHttpRequest对象
        createXml: function() {
            if (window.XMLHttpRequest) {
                // W3C标准
                this.xml = new XMLHttpRequest();
            } else {
                // IE标准
                this.xml = new ActiveXObject("Microsoft.XMLHTTP");
            }
            this.spliceParams();
            if (this.dataType == 'json') {
                this.dataTypeJson();
            } else if (this.dataType == 'jsonp') {
                this.dataTypeJsonp();
            }
        },
        // 参数拼装,最终将参数数组赋给this.data
        spliceParams: function() {
            var arr = [];
            if (typeof this.data === 'object') {
                for (var param in this.data) {
                    arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(this.data[param]));
                }
                arr = arr.join('&'); // 将拼接成功的字符串数组继续赋给arr数组
            }
            this.data = arr;
            // console.log(arr);
        },
        // 请求方式为GET/POST时,接收服务器不同的响应
        // XMLHttpRequest 对象有三个重要的属性：
        // 1.Onreadystatechange
        // 存储函数(或函数名),每当readyState 属性改变时,就会调用该函数。
        // 2.readyState
        // 存有XMLHttpRequest 的状态信息,从 0 到 4 发生变化。
        // - 0: 请求未初始化
        // - 1: 服务器连接已建立
        // - 2: 请求已接收
        // - 3: 请求处理中
        // - 4: 请求已完成,且响应已就绪
        // 3.Status（HTTP状态码）

        // 每当 readyState 改变时,就会触发 onreadystatechange 事件。
        // 在onreadystatechange 事件中,我们规定当服务器响应已做好被处理的准备时所执行的任务。
        // 当readyState 等于 4 且 status 为 2字头或 304 时,表示响应已就绪：

        // 当服务端的返回值类型为json时
        dataTypeJson: function() {
            // this.url = this.url;
            var callback = function() {
                if (this.xml == 200) {
                    // 请求成功则返回服务器的响应数据
                    this.success(this.xml.responseText);
                } else {
                    // 失败则返回状态码
                    this.error(this.xml.status);
                }
            };

            if (this.async) {
                this.xml.onreadystatechange = function() {
                    if (this.xml.readyState == 4) {
                        // 请求完成则执行回调函数作相应的处理
                        callback();
                    }
                };
            }

            this.xml.open(this.method, this.url, this.async);

            if (this.method == 'GET') {
                // 如果是get方法，需要把data中的数据转化作为url传递给服务器
                this.url = this.url + '&' + this.data;
                this.xml.send(null); // get方式填null
            } else if (this.method == 'POST') {
                // 如果是post，需要在头中添加content-type说明
                this.xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                this.xml.send(this.data); // post方式将数据放在send()方法里
            }

            if (!this.xml.async) {
                callback();
            }
        },

        // 当服务端的返回值类型为jsonp时
        dataTypeJsonp: function() {
            var head = document.querySelector('head'); // querySelector()方法接收一个CSS选择符,返回与该模式匹配的第一个元素
            var that = this; // 在这更改this赋值给that是因为为this的指向是根据执行上下文来决定的，如果这里继续用this，但是你在调用success的部分的this不一定会指向外层的构造函数，所以用that来保存上层作用域
            var script = document.createElement('script'); // 创建script标签
            script.type = "text/javascript";
            var callbackName = 'callback' + new Date().getTime(); // 生成唯一回调函数名
            callbackName.replace('.', ''); // 回调函数名不能有.
            script.src = this.url + '?' + this.data + '&callback=' + callbackName;
            head.appendChild(script); // 插入script标签作为head的最后一个子元素

            // 定义回调函数
            window[callbackName] = function(data) {
                that.success(data);
                // console.log(this);           
                // undefined,指向window
                // console.log(that);           
                // Ajax
                head.removeChild(script); // 清除用过的script标签
            };
        },
    };

    window.Ajax = function(data) {
        return new Ajax(data);
    };

})();