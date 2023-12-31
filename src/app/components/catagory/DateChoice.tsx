'use client'

import { useEffect, useState } from 'react'
import style from '@/app/styles/RoomCata.module.scss'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'

export default function DateChoice() {
    useEffect(() => {
        const today = new Date()
        const tomorrow = new Date(today)
        setDateRange([today, new Date(tomorrow.setDate(today.getDate() + 1))])
    }, [])

    const [dateRange, setDateRange] = useState([])
    // state 대신 useref 활용하기 (재렌더링방지)
    const [startDate, endDate] = dateRange

    const calculateDateDifference = () => {
        if (startDate && endDate) {
            const timeDifference = endDate.getTime() - startDate.getTime()
            const dayDifference = Math.ceil(
                timeDifference / (1000 * 60 * 60 * 24),
            )
            return dayDifference
        }
        return null
    }

    return (
        <div className={style.calendarChoiceBox}>
            {startDate && endDate && (
                <span className={style.night}>
                    {' '}
                    · {calculateDateDifference()}박
                </span>
            )}

            <label htmlFor="Date" className={style.calendarButton}>
                <div className={style.calendarButtonBox}>
                    <DatePicker
                        id="Date"
                        className={style.datePicker}
                        calendarClassName={style.calenderWrapper}
                        selectsRange={true}
                        startDate={startDate}
                        locale={ko}
                        dateFormat="MM.dd"
                        endDate={endDate}
                        minDate={new Date()}
                        onChange={(update) => {
                            setDateRange(update)
                        }}
                    />
                </div>
            </label>
        </div>
    )
}
