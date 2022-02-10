import React, { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';

import './App.css';
import Error from './components/common/Error/error';
import Loading from './components/common/loading/loading';
import Login from './components/Login/Login';
import { Layout, Menu, Breadcrumb, Space, } from 'antd';
import MessagesContainerConnect from './components/Messages/messagesContainer';
import NavBar from './components/NavBar/NavBar';
import HightComponentProfile from './components/Profile/ProfileContainer';
import {  thunkCreatorAuthMe } from './Redux/isAuthReducer';
import Edit from './components/Profile/profileEdit/profileEdit';
import { isAuth } from './Redux/selectors/isAuth';
import UsersContainerConnect from './components/Users/UsersContainer';
import {  LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import { error } from './Redux/selectors/error';
import { Route, Switch } from 'react-router-dom';







const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const App: React.FC  = () => {
 const  dispatch = useDispatch()
 const initial = useSelector(isAuth.getInitial)
  const errorLoading = useSelector(error.errorLoadingPage)
   useEffect(() => {
    dispatch(thunkCreatorAuthMe())
   }, [])
 

  

 

    if (!initial) {
      return <div><Loading /></div>
    } 
    if (errorLoading){
      return <Error globalError = {errorLoading}/>
    }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}  >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
        
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background" >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
           <NavBar />
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2" >
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          ><Space style={{ zIndex: 0}}>
            <Switch>
                <Route exact path="/"> <HightComponentProfile /></Route>
                <Route path="/login" ><Login /> </Route> 
                <Route path="/profile/:userId?"> <HightComponentProfile /></Route> 
                <Route path={`/messages`}> <MessagesContainerConnect /></Route> 
                <Route path={`/edit`}> <Edit /></Route> 
                <Route path={`/all_users`} > <UsersContainerConnect /></Route> 
                <Route path={`*`} > <Error /></Route> 

            </Switch>
          </Space>
          </Content>
        </Layout>
      </Layout>
    </Layout>
      
    )
  
}



export default  App 
