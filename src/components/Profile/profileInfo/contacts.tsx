import React from 'react'
import { contactsType } from '../../../Redux/profileReduser';
interface Props  {
    contacts:contactsType | null
    isOur: boolean
    setHideContacts: () => void
}
const Contacts: React.FC<Props> = ({ contacts, isOur, setHideContacts}: Props) => {
    return (
        <> 
            
            {contacts != null &&
              
                Object.keys(contacts)
                    .map((c: string) => <div>
                    <span>{c}: </span><span>{
                    contacts[c]|| "Не указан"}</span>
                </div>)}
            <button onClick={setHideContacts}>Закрыть</button>
            {isOur && <button>Редактировать</button>}
        </>
    )
}

export default Contacts;