import React, {useState} from "react";
import {Header} from "antd/es/layout/layout";
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined,} from '@ant-design/icons';
import {Avatar, Dropdown, Menu} from "antd";
import { SmileOutlined } from '@ant-design/icons';
export default function TopHeader() {
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                            超级管理员
                        </a>
                    ),
                    disabled:  false,
                },
                {
                    key: '2',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                            退出
                        </a>
                    ),

                    disabled: false,
                    danger:true,
                },
            ]}
        />
    );

    const [collapsed, setCollapsed] = useState(false);
    const changeCollapsed  = ()=> {
        setCollapsed(!collapsed)
    }
    return (
        <Header className="site-layout-background" style={{padding: '0  16px'}}>
            {
                collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}/> : <MenuFoldOutlined onClick={changeCollapsed}/>
            }
            {/*浮动之后不会独占一行*/}
            <div style={{float: "right"}}>
                <span> 欢迎admin回来 </span>
                <Dropdown overlay={menu}>
                    <Avatar size="large" icon={<UserOutlined />} />
                    {/*<span>*/}
                    {/*    hover me*/}
                    {/*</span>*/}
                </Dropdown>
            </div>
        </Header>
    )
}
