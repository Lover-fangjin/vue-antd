
/**
 * 自定事件（全局）
 * @author hejin 2019-03-27
 */
export function eventTarget(){
    this.handlers={};
    this.constructor=eventTarget;
    this.addHandler=function(type,handler){
        if(typeof this.handlers[type]=='undefined'){
            this.handlers[type]=new Array();
        }
        this.handlers[type].push(handler);
    };
    this.removeHandler=function(type,handler){
        if(this.handlers[type] instanceof Array){
            let handlers=this.handlers[type];
            for(let i=0,len=handlers.length;i<len;i++){
                if(handlers[i]==handler){
                    handlers.splice(i,1);
                    break;
                }
            }
        }
    };
    this.trigger=function(event){
        if(!event.target){
            event.target=this;
        }
        if(this.handlers[event.type] instanceof Array){
            let handlers=this.handlers[event.type];
            for(let i=0,len=handlers.length;i<len;i++){
                handlers[i](event);
            }
        }
    }
}
/**
 * 生成唯一GUID方法
 * @example
 {
    Vue.prototype.guid = new GUID();
    this.guid.newGUID();
 }
 */
export function GUID() {
    this.date = new Date();   /* 判断是否初始化过，如果初始化过以下代码，则以下代码将不再执行，实际中只执行一次 */
    if (typeof this.newGUID != 'function') {   /* 生成GUID码 */
        GUID.prototype.newGUID = function () {
            this.date = new Date(); let guidStr = '';
            let sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16);
            let sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16);
            for (let i = 0; i < 9; i++) {
                guidStr += Math.floor(Math.random() * 16).toString(16);
            }
            guidStr += sexadecimalDate;
            guidStr += sexadecimalTime;
            while (guidStr.length < 32) {
                guidStr += Math.floor(Math.random() * 16).toString(16);
            }
            return this.formatGUID(guidStr);
        }
        /* * 功能：获取当前日期的GUID格式，即8位数的日期：19700101 * 返回值：返回GUID日期格式的字条串 */
        GUID.prototype.getGUIDDate = function () {
            return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date.getDay());
        }
        /* * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933 * 返回值：返回GUID日期格式的字条串 */
        GUID.prototype.getGUIDTime = function () {
            return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(this.date.getSeconds()) + this.addZero(parseInt(this.date.getMilliseconds() / 10));
        }
        /* * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现 * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串 * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串 */
        GUID.prototype.addZero = function (num) {
            if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
                return '0' + Math.floor(num);
            } else {
                return num.toString();
            }
        }
        /*  * 功能：将y进制的数值，转换为x进制的数值 * 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10 * 返回值：返回转换后的字符串 */
        GUID.prototype.hexadecimal = function (num, x, y) {
            if (y != undefined) { return parseInt(num.toString(), y).toString(x); }
            else { return parseInt(num.toString()).toString(x); }
        }
        /* * 功能：格式化32位的字符串为GUID模式的字符串 * 参数：第1个参数表示32位的字符串 * 返回值：标准GUID格式的字符串 */
        GUID.prototype.formatGUID = function (guidStr) {
            var str1 = guidStr.slice(0, 8) + '-', str2 = guidStr.slice(8, 12) + '-', str3 = guidStr.slice(12, 16) + '-', str4 = guidStr.slice(16, 20) + '-', str5 = guidStr.slice(20);
            return str1 + str2 + str3 + str4 + str5;
        }
    }
}


export let tooltip = {
    nameOverlay: undefined,
    show: value => {
        let me = this;
        if(me.nameOverlay === undefined) {
            me.nameOverlay = document.createElement('div');
            $('#tip').append(me.nameOverlay);
            me.nameOverlay.className = 'backdrop';
            me.nameOverlay.style.display = 'none';
            me.nameOverlay.style.position = 'absolute';
            me.nameOverlay.style.top = '0';
            me.nameOverlay.style.left = '0';
            me.nameOverlay.style.color = '#fff';
            me.nameOverlay.style['pointer-events'] = 'none';
            me.nameOverlay.style.padding = '4px';
            me.nameOverlay.style.backgroundColor = '#00000050';
        }

        let str=`<p> ${ value } </p>`;
        $(".backdrop").html(str);
        $('.'+me.nameOverlay.getAttribute('class')).show();
        me.nameOverlay.style.display = 'block';
        
        document.addEventListener("mousemove", e => {
            me.nameOverlay.style.top = e.clientY - 20 + 'px';
            me.nameOverlay.style.left = e.clientX + 10 + 'px'; 
        });
        // document.onmousedown( e => {
        //     debugger
        //     me.nameOverlay.hide();
        // });
        // document.addEventListener("mouseup", e => {
        //     debugger
        //     me.nameOverlay.show();
        // });
    },
    clear: () => {
        let me = this;
        
        if($('.'+me.nameOverlay.getAttribute('class')) == "backdrop")
        {
            $('.'+me.nameOverlay.getAttribute('class')).remove(); 
        }
        $('.'+ me.nameOverlay.getAttribute('class')).hide();
    }
}

/**
 * 鼠标跟随提示
 * @param { 提示内容 } value 
 */
let tooltipf = value => {
    document.onmousemove = e => {
        // 获取拖拽元素的位置
        let left = e.clientX;
        let top = e.clientY;
        
        this.positionX = e.clientX;
        this.positionY = e.clientY;
        // 把拖拽元素 放到 当前的位置
        if (left <= 0) {
            left = 0;
        } else if ( left >= 3840 - odiv.offsetWidth ) {
            //document.documentElement.clientWidth 屏幕的可视宽度
            left = 3840 - odiv.offsetWidth;
        }
        // } else if ( left >= document.documentElement.clientWidth - odiv.offsetWidth ) {
        //     //document.documentElement.clientWidth 屏幕的可视宽度
        //     left = document.documentElement.clientWidth - odiv.offsetWidth;
        // }

        if (top <= 0) {
            top = 0;
        } else if ( top >= document.documentElement.clientHeight - 50 ) {
            // document.documentElement.clientHeight 屏幕的可视高度
            top = document.documentElement.clientHeight - 50;
        }
        // } else if ( top >= document.documentElement.clientHeight - odiv.offsetHeight ) {
        //     // document.documentElement.clientHeight 屏幕的可视高度
        //     top = document.documentElement.clientHeight - odiv.offsetHeight;
        // }
        odiv.style.left = left + "px";
        odiv.style.top = top + "px";
    };
    // 为了防止 火狐浏览器 拖拽阴影问题
    document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
    };
}

export let screen = {
    full: () => {
        var element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    },
    exitFull() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}