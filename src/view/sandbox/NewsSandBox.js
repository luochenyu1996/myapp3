/*
* 新闻沙箱页面
* */
import SideMenu from "../../component/sidebox/SideMenu";
import TopHeader from "../../component/sidebox/TopHeader";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./home/Home";
import UserList from "./user-manage/UserList";
import RoleList from "./right-magnage/RoleList";
import RightList from "./right-magnage/RightList";
import NoPermission from "./nopermissoiion/NoPermission";
// antd
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";

//css
import  './NewsSandBox.css'

export default function NewsSandBox() {
    console.log("路由测试")

    return (
        <Layout>
            <SideMenu/>
            <Layout className="site-layout">
                <TopHeader/>
                <Content  className="site-layout-background"  style={{margin:'24px 16px',padding:24,minHeight:280}}>
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/user-manage/list" element={<UserList/>}/>
                        <Route path="/right-manage/role/list" element={<RoleList/>}/>
                        <Route path="/right-manage/right/list" element={<RightList/>}/>
                        {/*redirect 没有加上exact 是模糊匹配*/}
                        <Route from="/" to="/home" exact/>
                        <Route paht="/"  element={<Navigate to="/home" replace/>  } />
                        {/* todo 路由匹配规则*/}
                        {/*<Route path="*" element={<NoPermission/>}/>*/}
                    </Routes>
                </Content>
            </Layout>

        </Layout>
    )
}
