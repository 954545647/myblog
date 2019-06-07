const user = {
  state:{
    token: '',
    currentView:'UserCenter',  //当前组件
    username:'',
  },
  mutations:{
    Login(state,newToken){
      sessionStorage.setItem("token", newToken);
      state.token = newToken;
    },
    Logout(state,newToken){
      sessionStorage.removeItem("token", newToken);
      state.token = newToken;
    },
    changeView(state,newView){
      state.currentView = newView;
    },
    setUserName(state,newName){
      state.username = newName;
    }
  }
}
export default user;