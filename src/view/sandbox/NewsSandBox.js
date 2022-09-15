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

    return (
        <Layout>
            <SideMenu/>
            <Layout className="site-layout">
                <TopHeader/>
                <Content  className="site-layout-background"  style={{margin:'24px 16px',padding:24,minHeight:280}}>
                    <Routes>
                        <Route path="/home" component={Home}/>
                        <Route path="/user-manage/list" component={UserList}/>
                        <Route path="/right-manage/role/list" component={RoleList}/>
                        <Route path="/right-manage/right/list" component={RightList}/>
                        {/*redirect 没有加上exact 是模糊匹配*/}
                        <Route from="/" to="/home" exact/>
                        <Route paht="/"  element={<Navigate to="/home" replace/>  } />
                        <Route path="*" component={NoPermission}/>
                    </Routes>
                </Content>
            </Layout>

        </Layout>
    )
}
