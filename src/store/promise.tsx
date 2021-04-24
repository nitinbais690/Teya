function warn(error :any) {
  // console.error(error.message || error);
  throw error; // To let the caller handle the rejection
}

export default () => {
  return (dispatch :any) => {
    return (action: any) => {
      if (typeof action.then === 'function') {
        return action.then(dispatch, warn).catch(warn);
      }
      return dispatch(action);
    };
  };
};
