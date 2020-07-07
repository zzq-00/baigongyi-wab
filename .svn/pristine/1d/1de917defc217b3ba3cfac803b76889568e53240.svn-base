
/*
* 封装吸顶函数，需结合css实现。
*/
function ceiling(obj) {
  var ot = obj.offsetTop;
  document.onscroll = function () {
    var st = document.body.scrollTop || document.documentElement.scrollTop;
    /*
    * 在这里给obj添加一个自定义属性。className可能会影响原有的class
    */
    obj.setAttribute("data-fixed", st >= ot ? "fixed" : "");
  }
}
export { ceiling }
