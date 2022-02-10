import React from "react"
import "./users.css"
import Pagination from "./pagination"

import { useSelector } from "react-redux"
import { users } from "../../Redux/selectors/users"
import { error } from "../../Redux/selectors/error"
import { Col, Row } from "antd"
interface Props {
   setUser: (pageNumber: number | null) => void
   children: React.ReactNode
   
}
const Users = React.memo(({  setUser, children}: Props) => {
    const totalCount = useSelector(users.getTotalCount)
    const count = useSelector(users.getCount)
    return (
        <div className='users'>
           
             <Pagination totalCount={totalCount}
                setUser={setUser}
                count={count} /> 
           
                <Row gutter={16}>
                
                {children}
             
                </Row>
            
        </div>
    )
     
   
})

export default Users;