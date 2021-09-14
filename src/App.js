import React,{useEffect} from 'react';
import './default.scss';

//pages
import HomePage from './pages/HomePage';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';

import Login from './pages/Login';
import Recovery from './pages/Recovery';
//layouts
import MainLayout from './layouts/MainLayout';
import HomePageLayout from './layouts/HomePageLayout';

import {Route,Switch,Redirect} from 'react-router-dom';
import {auth,handleUserProfile} from './firebase/utils';
import {checkUserSession, setCurrentUser} from './redux/User/user.actions';
import {useDispatch,useSelector} from 'react-redux';
import WithAuth from './hoc/withAuth';
import {onCheckUserSession} from './redux/rootSaga';
import Admin from './pages/Admin';
import WithAdminAuth from './hoc/withAdminAuth';
import AdminToolbar from './components/AdminToolbar';

const mapToState=({user})=>({
  currentUser:user.currentUser
});
function App() {

 
  
  const dispatch=useDispatch();
  
  useEffect(()=>{
    dispatch(checkUserSession());
  },[])
  return (
    <div className="App">
      
      <Switch>
        <Route exact path="/" render={(props)=>{
          return(
          <HomePageLayout>
            <HomePage/>
          </HomePageLayout>
          );}}/>
        <Route path="/registration" render={()=>
          (
            <MainLayout>
              <Registration/>
            </MainLayout>
          )

        }/>
        <Route path="/login" render={()=>{
          return (
          
            <MainLayout>
              <Login/>
            </MainLayout>);
          
          
        }}/>

        <Route path="/recovery" render={()=>{
          return (
            
            <MainLayout>
              <Recovery/>
            </MainLayout>);
          
          
        }}/>
        <Route path="/dashboard" render={()=>{
          return (
            <WithAuth>
              <MainLayout>
                <Dashboard/>
              </MainLayout>
            </WithAuth>
            );
          
          
        }}/>

      <Route path="/admin" render={()=>{
          return (
            <WithAdminAuth>
              <MainLayout>
                <Admin/>
              </MainLayout>
            </WithAdminAuth>
            
            );
          
          
        }}/>

      </Switch>
        
    </div>
  );
}

export default App;
