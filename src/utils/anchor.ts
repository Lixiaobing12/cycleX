export const animationToAnchor = (startNum: number, stopNum: number) => {
  var nowNum = startNum + stopNum / (startNum + 10) + 20; // 步进为10

  if (nowNum > stopNum) {
    nowNum = stopNum;
  }

  // 缓动方法
  window.requestAnimationFrame(function () {
    document.documentElement.scrollTop = nowNum; // 当前示例页面，滚动条在body，所以滚动body
    // 滚动到预定位置则结束
    if (nowNum == stopNum) {
      return;
    }
    animationToAnchor(nowNum, stopNum); // 只要还符合缓动条件，则递归调用
  });
};

export const utilAnchor = (id: string = "fund") => {
  setTimeout(() => {
    const fund_top = document.getElementById(id)!.getBoundingClientRect().top;
    const screenTop = document.documentElement.scrollTop;
    animationToAnchor(screenTop, fund_top + screenTop);
  }, 100);
};
