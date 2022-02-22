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
                <Menu.Item key="1"> <NavLink className={isActive =>
                    "nav-link" + (!isActive ? " unselected" : "")
                } activeClassName="selected" to={`/profile`}> Profile</NavLink></Menu.Item>
                <Menu.Item key="2"><NavLink className={isActive =>
                    "nav-link" + (!isActive ? " unselected" : "")}
                    to={`/all_users`}>Users</NavLink></Menu.Item>
                <Menu.Item key="3"><NavLink className={isActive =>
                    "nav-link" + (!isActive ? " unselected" : "")
                } to={`/messages`}>Messages</NavLink></Menu.Item>
                {!auth && 
                    <Menu.Item key="4"><NavLink className={isActive =>
                        "nav-link" + (!isActive ? " unselected" : "")
                    } to={'/login'}>Login</NavLink></Menu.Item> 
                }
                {auth && 
                    <Button onClick={() => dispatch(thunkCreatorLogOut())}>Logout</Button>
                }
            </SubMenu>
           
           
        </>
    )
}

export default  NavBar;