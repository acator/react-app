import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { users } from '../../Redux/selectors/users';
interface Props{
    totalCount: number | null
    count: number
    setUser: (pageNumber: number | null) => void
}
const Pagination = ({ totalCount, count, setUser}:Props) => {

    let page: Array<number> = [];
    let [number, setNumber] = useState(1)
    const pageNumber = useSelector(users.getPageNumber)
    if (totalCount !== null){
    let pagesNumber: number = Math.ceil(totalCount / count);
    for (let i = 1; i <= pagesNumber; i++) {
        page.push(i)
    }
    let blockCount: number = pagesNumber / 10;
    let leftEdge: number = (number - 1) * 10 + 1;
    let rightEdge:number = number * 10
    
    return(
        <div className="indicator_button">{number > 1 &&

            <button onClick={() => { setNumber(number - 1) }}>Назад</button>
        }
            {page.filter((e: number) => e >= leftEdge && e <= rightEdge)
                .map((p: any) => {
                    return <span className={pageNumber === p ? "totalPage" : "page"}
                        onClick={() => { setUser(p) }}
                        key={p.id} >{p}</span>
                })}
            {number < blockCount &&
                <button onClick={() => { setNumber(number + 1) }}>Вперед</button>
            }
        </div>
    )
        }else {

            return <>Пользователи не подгружены </>
        }
}
export default Pagination 