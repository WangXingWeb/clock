/*Created by WangXing on 2016/10/30.*/

function drawClock(domId) {
    /*获取对象，获得取值*/
    var dom = document.getElementById(domId);
    var ctx = dom.getContext("2d");
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var r = width / 2;
    /*比例值*/
    /*确保不同大小的clock都能完美显示*/
    var rem = width / 300;

    draw();
    setInterval(draw, 1000);

    /*画背景*/
    function drawBackground() {
        //记录初始状态
        ctx.save();
        //移动到圆心
        ctx.translate(r, r);
        ctx.beginPath();
        ctx.lineWidth = 10 * rem;
        //画圆，(0,0)为圆心，半径为r减去线宽的一半(否则画出的圆会超出container)，
        ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
        ctx.stroke();

        var numbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
        ctx.font = 20 * rem + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        /*画出12个数字刻度*/
        for (var i = 0; i < numbers.length; i++) {
            var rad = ((2 * Math.PI) / 12) * i;
            var x = Math.cos(rad) * (r - 40 * rem);
            var y = Math.sin(rad) * (r - 40 * rem);
            //使用canvas的fillText方法画出数字
            ctx.fillText(numbers[i], x, y);
        }
        /*画出分针对应的60个点*/
        for (var i = 0; i < 60; i++) {
            var rad = ((2 * Math.PI) / 60) * i;
            var x = Math.cos(rad) * (r - 20 * rem);
            var y = Math.sin(rad) * (r - 20 * rem);
            ctx.beginPath();
            if (i % 5 === 0) {
                ctx.fillStyle = "#000";
                ctx.arc(x, y, 4 * rem, 0, 2 * Math.PI, false);
            } else {
                ctx.fillStyle = "#ccc";
                ctx.arc(x, y, 3 * rem, 0, 2 * Math.PI, false);
            }
            ctx.fill();
        }
    }

    /*画时针*/
    function drawHour(hour, minute) {
        /*每次画前要将原始状态保存一次，因为会用到旋转，移动等方法会改变坐标的起始状态*/
        ctx.save();
        ctx.beginPath();
        var rad = ((2 * Math.PI) / 12) * hour;
        var mrad = ((2 * Math.PI) / 60 / 12) * minute;
        //使用canvas的rotate方法旋转到对应的角度
        ctx.rotate(rad + mrad);
        ctx.lineWidth = 6 * rem;
        ctx.lineCap = "round";
        ctx.moveTo(0, 10 * rem);
        ctx.lineTo(0, -r / 2);
        ctx.stroke();
        //使用restore方法将画之前的状态恢复
        ctx.restore();
    }
    /*画分针*/
    function drawMinute(minute) {
        ctx.save();
        ctx.beginPath();
        var rad = ((2 * Math.PI) / 60) * minute;
        ctx.rotate(rad);
        ctx.lineWidth = 4 * rem;
        ctx.lineCap = "round";
        ctx.moveTo(0, 10 * rem);
        ctx.lineTo(0, -r + 43 * rem);
        ctx.stroke();
        ctx.restore();
    }
    /*画秒针*/
    function drawSecond(second) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#c14543";
        var rad = ((2 * Math.PI) / 60) * second;
        ctx.rotate(rad);
        ctx.moveTo(-2 * rem, 20 * rem);
        ctx.lineTo(2 * rem, 20 * rem);
        ctx.lineTo(1 * rem, -r + 27 * rem);
        ctx.lineTo(-1 * rem, -r + 27 * rem);
        ctx.fill();
        ctx.restore();
    }
    /*画中心原点*/
    function drawDot() {
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.arc(0, 0, 2 * rem, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    function draw() {
        //用canvas的clearRect方法清空上一次所画的内容
        ctx.clearRect(0, 0, width, height);
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        drawBackground();
        drawHour(hour, minute);
        drawMinute(minute);
        drawSecond(second);
        drawDot();
        ctx.restore();
    }
}
