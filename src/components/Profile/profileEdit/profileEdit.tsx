import React  from "react";
import { useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { contactsType, profileType,  thunkCreatorProfileInfo } from "../../../Redux/profileReduser";
import { error } from "../../../Redux/selectors/error";
import { profile } from "../../../Redux/selectors/profile";
import { ThunkAppDispatch } from "../../../Redux/storeRedux";
import Loading from "../../common/loading/loading";
import Notification from "../../common/notification/notification";
import './profileSave.css'
type Props = {
    save: boolean
    errorSending: string | null
    
    profil: profileType |  undefined;
    
}


const Edit: React.FC = () => {
    
   
    const profil = useSelector(profile.getProfile) as profileType
    const errorSending = useSelector(error.sendingError)

    let [save, setSave] = useState(false) 
    let dispatch: ThunkAppDispatch = useDispatch()
    let infoSubmit = (formData: Info) => {
       
        dispatch(thunkCreatorProfileInfo(formData)).then((response) => {
            if (response !== undefined){
            if (response.resultCode === 0) {
                setSave(true)
            }
        }
    }
        )
    }
  
 
    return (
       
            <FormInfoRedux 
            initialValues={profil as Partial<FormProps>}
            onSubmit={infoSubmit}
            errorSending={errorSending}
            save={save as boolean} profil={profil} />
       
    )
}

export type Info = {
    fullName: string |null
    lookingForAJob: boolean
    aboutMe: string | null
    lookingForAJobDescription: string | null
    contacts: contactsType | null
    
    
}
type FormProps = {
    profil: profileType
    initialValues?: Partial<Info> | undefined | null
    infoSubmite: (formData: Info) => void
    fullName: string 
    lookingForAJob: boolean 
    aboutMe: string 
    lookingForAJobDescription: string 
    contacts: contactsType
   
}
let FormInfo: React.FC<InjectedFormProps<FormProps, Props> &Props> = (props: Props, { handleSubmit, error}) => {
    
    const profil = useSelector(profile.getProfile)
    const contacts = useSelector(profile.getContacts)

if(profil !== null){
    return (
        <form onSubmit={handleSubmit}>
            {props.save && <div className="save">Информация сохранена</div>}
            {!props.save && props.errorSending &&
              <Notification>{props.errorSending}</Notification>
            }
            <div>
                <label>fullName:</label>
                <Field component={"input"}
                    placeholder="fullName"
                    name="fullName"
                    type={"text"} />
            </div>
            <div>
                <label>lookingForAJob:</label>
                <Field component={"input"}
                    type={"checkbox"}
                    name="lookingForAJob" />
            </div>
            <div>
                <label>aboutMe:</label>
                <Field component={"input"}
                    type={"text"}
                    placeholder="aboutMe"
                    name="aboutMe" />
            </div>
            <div>
                <label>lookingForAJobDescription:</label>
                <Field component={"input"}
                    type={"text"}
                    placeholder="lookingForAJobDescription"
                    name="lookingForAJobDescription" />
            </div>
            
            {contacts !== null &&
            Object.keys(contacts).map((c: string) => {
          
                return <div>
                    <span>{c}</span>
                    <Field key={
                        c}
                        component={"input"}
                        type={"text"}
                        placeholder={c}
                        name={'contacts.' + c} />
                </div>}
          
            
            )}     
            {error && <span>{error}</span>}

            <button>Сохранить</button>
        </form>
    )
                    }else{
                        return <Loading />
                    }
}
let FormInfoRedux = reduxForm<FormProps,Props>({ form: "info" })(FormInfo) 


export default Edit as unknown as React.ComponentType 
