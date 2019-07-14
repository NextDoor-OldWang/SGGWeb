import React,{Component} from 'react';
import {Button,message} from 'antd'
import {BrowserRouter,HashRouter,Switch,Route} from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';
export default class App extends Component{
    handleClick = () =>{
        message.success('ok');
    }
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/admin' component={Admin}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
