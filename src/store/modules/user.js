const user = {
  state:{
    token: ''
  },
  mutations:{
    Login(state,newToken){
      sessionStorage.setItem("token", newToken);
      state.token = newToken;
    },
    Logout(state,newToken){
      sessionStorage.removeItem("token", newToken);
      state.token = newToken;
    }
  }
}
export default user;