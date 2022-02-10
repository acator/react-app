import React from 'react'
import { AboutMeType } from '../../../Redux/profileReduser'
import { value } from '../../common/typeValue'
type Props = {
    aboutMe: AboutMeType |null
    setHideAboutMe: () => void

}
const AboutMe: React.FC<Props> = ({ aboutMe, setHideAboutMe}) => {
    
    return (
        <div>
            {aboutMe != null &&
               
                Object.keys(aboutMe )
                .map((e: string) => {
                    return <div>
                        <span> {e}:</span>
                        <span>{
                            value(aboutMe[e]  )}</span>
                    </div>
                })}
            <button onClick={setHideAboutMe}>Закрыть</button>
        </div>
    )
}

export  default AboutMe