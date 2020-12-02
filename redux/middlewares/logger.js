function logger(store) {
  return function (next) {
    // 最内层的函数才是中间件函数,外层2个函数都是为了接收函数的
    return function (action) {
      console.info("logger middleware");
      next(action);
    };
  };
}
