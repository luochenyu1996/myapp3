//路由文件
import React from "react";
import {HashRouter, Route, Navigate, Routes} from "react-router-dom";
import Login from "../view/login/Login";
import NewsSandBox from "../view/sandbox/NewsSandBox";



export default function IndexRouter() {


    return (
        <HashRouter>

            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/' element={localStorage.getItem("token") ? <NewsSandBox/> : <Navigate to='/login' replace />}/>
            </Routes>

        </HashRouter>
    )
}
