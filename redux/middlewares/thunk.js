function thunk(store) {
  return function (next) {
    return function (action) {
      console.info("thunk middleware");
      next(action);
    };
  };
}
