import {Layout, Menu} from 'antd';
import React, {useEffect, useState} from 'react';
import {Route, useNavigate,} from 'react-router-dom'
import axios from "axios";
import './index.css'


// todo 图标的引入
import {AppstoreOutlined, ContainerOutlined, DesktopOutlined, PieChartOutlined,} from '@ant-design/icons';
import {keyboard} from "@testing-library/user-event/dist/keyboard";
import {replaceBehavior} from "@testing-library/user-event/dist/keyboard/plugins";
import UserList from "../../view/sandbox/user-manage/UserList";
import RoleList from "../../view/sandbox/right-magnage/RoleList";
import RightList from "../../view/sandbox/right-magnage/RightList";

const {Sider} = Layout;


//  后端没有处理头像对对应的数据关系，由前端进行处理
const iconList = {
    //
    "/home": <DesktopOutlined/>,

    "/user-manage": <DesktopOutlined/>,
    "/user-manage/list": <DesktopOutlined/>,
    "/user-manage/delete": <DesktopOutlined/>,
    "/user-manage/update": <DesktopOutlined/>,
    "/user-manage/add": <DesktopOutlined/>,

    "/right-manage": <DesktopOutlined/>,
    "/right-manage/role/list": <DesktopOutlined/>,
    "/right-manage/right/list": <DesktopOutlined/>
}


export default function SideMenu() {

    const [collapsed, setCollapsed] = useState(false);
    const [menu, setMenu] = useState([])
    const navigate = useNavigate();

    // 进行数据请求
    useEffect(() => {
        axios.get("https://3eb13b15-6b17-438d-9792-a9e4b7489bf5.mock.pstmn.io/sidemenu").then((res) => {
            setMenu(res.data)
            console.log(res.data)
        })
    }, [])


    //检测返回回来的权限字段。说明： 有些菜单 没有权限字符串  那么这个时候默认为显示
    function checkPermission(pagePermission) {
        if (pagePermission === undefined) {
            return true
        }
        if (pagePermission == 0) {
            return false
        }
        return true
    }

    //这个函数唯一的作用其实就是把数据封装 成对象
    function getItem(i_label, i_key, i_icon, i_children, i_pagepermission) {
        // 在后端返回的数据中 可能存在 children:[] 的情况，这种情况会导致 没有子菜单的时候也会产生折叠标签
        //  i_children.length===0 这个 判断解决了这个问题
        if (checkPermission(i_pagepermission) && ( !i_children || i_children.length===0)) {
            return {
                key: i_key,
                label: i_label,
                icon: i_icon,
            }
        }
        if (checkPermission(i_pagepermission) && i_children)
            return {
                key: i_key,
                label: i_label,
                icon: i_icon,
                children: i_children.map(index => getItem(index.title, index.key, iconList[index.key] , index.children))
            }
    }

    // 对getItem函数进一步封装, 把请求数据封装成antd接收的对象
    function listObj(lists) {
        return lists.map(index => {
                return getItem(index.title, index.key, iconList[index.key] , index.children, index.pagepermisson)
            }
        )
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
