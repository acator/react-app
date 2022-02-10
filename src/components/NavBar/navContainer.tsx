import React from "react"
import { Link, NavLink, useRouteMatch } from "react-router-dom"
import { thunkCreatorLogOut } from "../../Redux/isAuthReducer"
import './navbar.css'
import { Menu } from 'antd'
import { Button } from "antd/lib/radio"
import { useDispatch, useSelector } from "react-redux"
import { isAuth } from "../../Redux/selectors/isAuth"


const NavBar: React.FC = ( ) => {
    const dispatch = useDispatch()
    const auth = useSelector(isAuth.getIsAuth)
    const { SubMenu } = Menu;
  

    return (
        <>
           
            <SubMenu key="sub1"  title="My Profile">
                <Menu.Item key="1"><Link to={`/profile`}>Profile</Link></Menu.Item>
                <Menu.Item key="2"><Link to={`/all_users`}>Users</Link></Menu.Item>
                <Menu.Item key="3"><Link to={`/messages`}>Messages</Link></Menu.Item>
                {!auth && 
                <Menu.Item key="4"><Link to={'/login'}>Login</Link></Menu.Item> 
                }
                {auth && 
                    <Button onClick={() => dispatch(thunkCreatorLogOut())}>Logout</Button>
                }
            </SubMenu>
           
           
        </>
    )
}

export default  NavBar;