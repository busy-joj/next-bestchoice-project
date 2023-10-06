import style from '@/app/styles/RoomCata.module.scss'
import BedType from '@/app/components/catagory_component/BedType'
import DateChoice from '@/app/components/catagory_component/DateChoice'
import Personnel from '@/app/components/catagory_component/Personnel'
import Price from '@/app/components/catagory_component/Price'
import CheckList from '@/app/components/catagory_component/CheckList'
import SelectBox from '@/app/components/select/SelectBox'
import ButtonDefault from '@/app/components/btns/ButtonDefault'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
interface RoomCataProps {
    categoryId: number
}
export default function RoomCata(props: RoomCataProps) {
    const { categoryId } = props

    const info = [
        {
            isTitle: false,
            title: '',

            isGrid: false,
        },
        {
            isTitle: true,
            title: '호텔 유형',

            isGrid: false,
        },
        {
            isTitle: true,
            title: '이색 테마',

            isGrid: true,
        },
    ]

    const list1 = [
        {
            id: 'motel1',
            title: '5성급',
        },
        {
            id: 'motel2',
            title: '4성급',
        },
        {
            id: 'motel3',
            title: '3성급',
        },
        {
            id: 'motel4',
            title: '2성급',
        },
    ]
    const list2 = [
        {
            id: 'motel5',
            title: '무인텔',
        },
        {
            id: 'motel6',
            title: '파티룸',
        },
        {
            id: 'motel7',
            title: '거울룸',
        },
        {
            id: 'motel8',
            title: '복층룸',
        },
        {
            id: 'motel9',
            title: '공주룸',
        },
    ]
    const list3 = [
        {
            id: '10',
            condition: 'detailOpt',
            value: 'fitness',
            title: '피트니스',
        },
        {
            id: '11',
            condition: 'detailOpt',
            value: 'spa',
            title: '스파',
        },
        {
            id: '12',
            condition: 'detailOpt',
            value: 'pool',
            title: '수영장',
        },
        {
            id: '13',
            condition: 'detailOpt',
            value: 'discount',
            title: '50% 할인',
        },
    ]

    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        console.log(categoryId)
        const getKeyword = async () => {
            const res = await fetch(`/api/keyword?categoryId=${categoryId}`)
            const data = await res.json() // 데이터 비동기 추출
            console.log(data) // 추출된 데이터 출력
        }
        getKeyword()
    }, [])

    const handleAddQuery = (e) => {
        const target = e.target
        const queryName = target.name
        const queryValue = target.value
        const params = new URLSearchParams(window.location.search)
        if (target.checked) {
            params.append(queryName, queryValue)
        } else {
            params.delete(queryName)
        }
        router.push(`${pathname}?${params.toString()}`)
    }
    const handleResetQuery = () => {
        router.push(`${pathname}`)
    }
    return (
        <>
            <main className={style.background}>
                <div className={`${style.roomFilter}`}>
                    <h3>날짜</h3>
                    <DateChoice />
                </div>
                <div className={`${style.roomFilter} ${style.region}`}>
                    <h3>지역</h3>
                    <SelectBox />
                </div>
                <div className={`${style.roomFilter} ${style.set}`}>
                    <h3>상세조건</h3>
                    <ButtonDefault style="sub" onClick={handleResetQuery}>
                        초기화
                    </ButtonDefault>
                    <ButtonDefault>적용</ButtonDefault>
                </div>
                <div className={`${style.roomFilter}`}>
                    <CheckList
                        info={info[0]}
                        list={list3}
                        onChange={handleAddQuery}
                    />
                </div>
                <div className={`${style.roomFilter} ${style.cntPeople}`}>
                    <h3>인원</h3>
                    <Personnel />
                </div>
                <div className={`${style.roomFilter}`}>
                    <Price />
                </div>
                <div className={`${style.roomFilter}`}>
                    <h3>베드타입</h3>
                    <BedType />
                </div>
                <div className={`${style.roomFilter}`}>
                    <CheckList
                        info={info[1]}
                        list={list1}
                        onChange={handleAddQuery}
                    />
                </div>
                <div className={`${style.roomFilter}`}>
                    <CheckList
                        info={info[2]}
                        list={list2}
                        onChange={handleAddQuery}
                    />
                </div>
            </main>
        </>
    )
}
