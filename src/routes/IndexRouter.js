//路由文件
import React from "react";
import {HashRouter,  Route, Switch, Redirect} from "react-router-dom";
import Login from "../view/login/Login";
import NewsSandBox from "../view/sandbox/NewsSandBox";


export default   function  IndexRouter() {
    return(
        <HashRouter>

            <Switch>
                <Route path='/login'  component={Login}/>
                {/*<Route path='/' component={NewsSandBox}/>*/}
                {/*没有token 则进行重定向*/}
                <Route path='/' render={()=>
                     localStorage.getItem("token")? <NewsSandBox/>:<Redirect to={"/login"}/>
                }/>
            </Switch>

        </HashRouter>
    )


}
