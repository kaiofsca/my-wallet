import React, { useState, useMemo } from 'react'

import ContentHeader from '../../components/ContentHeader';
import Selectinput from '../../components/Selectinput';

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'
import listOfMonths from '../../utils/months';

import  { Container } from './styles'

const DashBoard: React.FC = () => {
    const [dMonthSelected, setDMonthSelected] = useState<number>(new Date().getMonth() + 1)
    const [dYearSelected, setDYearSelected] = useState<number>(new Date().getFullYear())

    const options = [
        {value: 'Kaio', label: 'Kaio'},
        {value: 'Sofia', label: 'Sofia'},
        {value: 'Yasmin', label: 'Yasmin'}
    ]

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date)
            const year = date.getFullYear()

            if(!uniqueYears.includes(year)) {
                uniqueYears.push(year)
            }
        })

        return uniqueYears.map(year => {
            return{
                value: year,
                label: year,
            }
        })

    },[])

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return{
                value: index + 1,
                label: month,
            }
        })

    },[])

    const handleMonthSelected = (month: string) => {
        try{
            const parseMonth = Number(month)
            setDMonthSelected(parseMonth)
        }
        catch(error) {
            throw new Error('invalid month value. Is accept 0 - 24.')
        }
    }

    const handleYearSelected = (year: string) => {
        try{
            const parseYear = Number(year)
            setDYearSelected(parseYear)
        }
        catch(error) {
            throw new Error('invalid year value. Is integer: number')
        }
    }

    return (
        <Container>
            <ContentHeader title='Dashboard' lineColor='#f7931b'>
                <Selectinput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={dMonthSelected}/>
                <Selectinput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={dYearSelected}/>
            </ContentHeader>
        </Container>
    );
}

export default DashBoard

// fc é componente funcional, DAshBoarad é uma pagina de componente funcional