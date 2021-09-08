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
import {setCurrentUser} from './redux/User/user.actions';
import {useDispatch,useSelector} from 'react-redux';
import WithAuth from './hoc/withAuth';

const mapToState=({user})=>({
  currentUser:user.currentUser
});
function App() {

 
  
  const dispatch=useDispatch();
  const {currentUser}=useSelector(mapToState);
  
 useEffect(()=>{ 
    const authListener=auth.onAuthStateChanged(
      async (userAuth)=>{
        //console.log("userauth",userAuth);
        if(userAuth){
          const userRef=await handleUserProfile(userAuth);
          userRef.onSnapshot(snapshot => {
            dispatch(setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            }));
 
          });
          
        }else{
          dispatch(setCurrentUser(userAuth));
 
          
        }
        
        
      }
    );
    return ()=>authListener();
  
    },[]);
   
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={(props)=>{
          return(
          <HomePageLayout currentUser={currentUser}>
            <HomePage/>
          </HomePageLayout>
          );}}/>
        <Route path="/registration" render={()=>
          (
            <MainLayout currentUser={currentUser}>
              <Registration/>
            </MainLayout>
          )

        }/>
        <Route path="/login" render={()=>{
          return (
          
            <MainLayout currentUser={currentUser}>
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

      </Switch>
        
    </div>
  );
}

export default App;
