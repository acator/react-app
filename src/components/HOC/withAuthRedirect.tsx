import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Switch } from 'react-router-dom'
import { isAuth } from '../../Redux/selectors/isAuth'





 function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>  ){
     const HightOrderComponent: React.ComponentType= ( props ) => {
         let auth = useSelector(isAuth.getIsAuth)
         if (!auth) {
                
                return <Redirect to="/login" />
            } else {

                return <Component  {...props as WCP} />
            }
        

    }

   
    return HightOrderComponent
}
export default withAuthRedirect 