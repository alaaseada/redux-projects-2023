const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().users.user.token}`,
    },
  };
};

export default authHeader;
