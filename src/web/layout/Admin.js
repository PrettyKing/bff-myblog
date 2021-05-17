import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import "../style/adminIndex.less";
import { Route, Switch } from "react-router-dom";
import MenuPage from "../pages/Menu";
import ArticleList from "../pages/ArticleList"
import ArticleAdd from "../pages/ArticleAdd"
import LeavingAMessage from '../pages/LeavingAMessage'

const { Content, Footer, Sider, Header } = Layout;
const { SubMenu } = Menu;

function AdminIndex (props) {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const handleClickArticle = e => {
        console.log(props);
        if (e.key === "addArticle") {
            props.history.push("/admin/add");
        } else {
            props.history.push("/admin/list");
        }
    };

    const handleClickToDoList = () => {
        props.history.push("/admin");
    };
    const handleClickLeavingMessage = () => {
        props.history.push("/admin/leaving");
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item key="1" onClick={handleClickToDoList} icon={<UserOutlined />}>工作台</Menu.Item>
                    <SubMenu
                        icon={<DesktopOutlined />}
                        key="sub1"
                        onClick={handleClickArticle}
                        title={<span>文章管理</span>}
                    >
                        <Menu.Item key="addArticle" icon={<PieChartOutlined />}>添加文章</Menu.Item>
                        <Menu.Item key="articleList" icon={<FileOutlined />}>文章列表</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" onClick={handleClickLeavingMessage} icon={<TeamOutlined />}>留言管理</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                {/* <Header style={{ background: "#fff", padding: 0 }} /> */}
                <Content style={{ margin: "0 16px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: "#fff", minHeight: 850 }}>
                        <div>
                            <Route path="/admin/" exact component={MenuPage} />
                            <Route path="/admin/list" exact component={ArticleList} />
                            <Route path="/admin/add" exact component={ArticleAdd} />
                            <Route path="/admin/add/:id" exact component={ArticleAdd} />
                            <Route path="/admin/leaving" exact component={LeavingAMessage} />
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>faithcal.com</Footer>
            </Layout>
        </Layout>
    );
}

export default AdminIndex;
