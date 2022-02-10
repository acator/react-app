import React from 'react'
import { useDispatch } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { actionsProfile } from '../../../Redux/profileReduser';

type Form={
    textPost: string 
}
type TypePost = {
    setText: (text: Form) => void
}
const FormMessage: React.FC<InjectedFormProps<Form, TypePost> & TypePost> = (props) => {
    return (
        <form className="creator_posts"
            onSubmit={props.handleSubmit}>
            <Field component={"textarea"}
                name="textPost" />
            <button>Отправить</button>
        </form>
    )
}

const CreatePost: React.FC = () => {
    const dispatch = useDispatch()
    const setText = (formData: Form) => {
        dispatch(actionsProfile.setTextPost(formData.textPost))
        formData.textPost = ""
    }
    return (
        <div className="createPosts">
            <h3>Создать пост</h3>
            <div >
                <ReduxFormPost onSubmit={setText} setText={setText}  />
            </div>
        </div>
    )

   
}
let ReduxFormPost = reduxForm<Form, TypePost>({ form: 'profile' })(FormMessage)
export default CreatePost;