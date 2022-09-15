import {Layout, Menu} from 'antd';
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams,useMatch,useRoutes,useSearchParams} from 'react-router-dom'
import axios from "axios";
import './index.css'

// todo 图标的引入
import {AppstoreOutlined, ContainerOutlined, DesktopOutlined, PieChartOutlined,} from '@ant-design/icons';
import {keyboard} from "@testing-library/user-event/dist/keyboard";
import {replaceBehavior} from "@testing-library/user-event/dist/keyboard/plugins";


const {Header, Sider, Content} = Layout;
export default function SideMenu() {

    const [collapsed, setCollapsed] = useState(false);
    const [menu, setMenu] = useState([])
    const navigate = useNavigate();
    //
    console.log("输出测试")
    // var useParams1 = useParams();
    // var location1 = useLocation();
    var navigateFunction = useNavigate();
    console.log(navigateFunction)

    console.log("输出测试")


    // 进行数据请求
    useEffect(() => {
        axios.get("https://3eb13b15-6b17-438d-9792-a9e4b7489bf5.mock.pstmn.io/sidemenu").then((res) => {
            setMenu(res.data)
        })
    }, [])


    //这个函数唯一的作用其实就是把数据封装 成对象
    function getItem(i_label, i_key, i_icon, i_children) {
        // console.log(i_label, i_key, i_icon, i_children)
        if (!i_children) {
            return {
                key: i_key,
                label: i_label,
                icon: i_icon,
            }
        }
        return {
            key: i_key,
            label: i_label,
            icon: i_icon,
            children: i_children.map(index => getItem(index.title, index.key, index.icon, index.children))
        }
    }

    // 对getItem函数进一步封装, 把请求数据封装成antd接收的对象
    function listObj(lists) {
        return lists.map(index => getItem(index.title, index.key, index.icon, index.children))
    }


    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div style={{display: "flex", height: "100%", flexDirection: "column"}}>

                <div className="logo">新闻发布管理系统</div>

                <div style={{flex: 1, overflow: "auto"}}>

                    <Menu defaultSelectedKeys={['/user-manage']}
                          defaultOpenKeys={['']}
                          mode="inline"
                          theme="dark"
                          onClick={(item) => {
                              navigate(item.key)
                          }}
                          items={listObj(menu)}
                    />
                </div>

            </div>


        </Sider>
    )
}
// //高阶组件拿到低阶组件生成高阶组件  从而让低阶组件拿到props
// export default useNavigate(SideMenu)
