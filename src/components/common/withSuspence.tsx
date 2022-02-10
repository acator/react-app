import React, { Suspense } from 'react'
import Loading from './loading/loading'

 export function  withSuspense<WCP>(Component: React.ComponentType<WCP>){
     return (props: WCP)=> {
         <Suspense fallback={<Loading />}>
                <Component {...props}/>
            </Suspense>
 }
}
