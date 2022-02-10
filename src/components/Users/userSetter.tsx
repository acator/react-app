import React from 'react'
import { userInfo } from '../../Redux/usersReduser'
import BlockUsers from './BlockUsers'
import { useSelector } from 'react-redux'
import { users } from '../../Redux/selectors/users'

type OurProps = {
    peoples: Array<userInfo> | null
}
const UsersSetter: React.FC<OurProps> = ({ peoples }: OurProps ) => {
    const following = useSelector(users.getFollowing)
    return (
    <>{
        peoples === null ? <div>Пользователи не пришли</div> :
    
         peoples!.map((u) => <BlockUsers name={u.name}
            following={following}
            follow={u.followed}
            id={u.id}
            photo={u.photos.large}
            key={u.id} />
      )
    }
      
    
        </>
      )
}
export default UsersSetter
