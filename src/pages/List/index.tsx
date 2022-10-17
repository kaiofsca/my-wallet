import React, { useMemo, useState, useEffect } from 'react' // usememo memoriza valores

import Selectinput from '../../components/Selectinput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import ContentHeader from '../../components/ContentHeader';

import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses'
import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import { Container, Content, Filters } from './styles';

interface IRouteParams {
    match: {
        params: {
            type: string
        }
    }
}

interface IData {
    id: string
    description: string
    amountFormatted: string
    frequency: string
    dateFormatted: string
    tagColor: string
}

const List: React.FC<IRouteParams> = ({ match }) => {

    const [data, setData] = useState<IData[]>([]) // primeiro guarda e dps atualiza o estado
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1)
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual']) // começa com os dois ligados 

    const movimentType  = match.params.type;

    const pageData = useMemo(() => {
        return movimentType === 'entry-balance' ?
        {
            title:'Entradas',
            lineColor: '#4e41f0',
            data: gains
        }
        :
        {
            title:'Saídas',
            lineColor: '#e44c4e',
            data: expenses
        }
        
    },[movimentType]);

    const years = useMemo(() => {
        let uniqueYears: number[] = []

        pageData.data.forEach(item => {
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

    },[pageData.data])

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return{
                value: index + 1,
                label: month,
            }
        })

    },[])

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency)

        if(alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(item => item !== frequency)
            setFrequencyFilterSelected(filtered)
        } else {
            setFrequencyFilterSelected((prev) => [...prev, frequency])
        }
    }

    const handleMonthSelected = (month: string) => {
        try{
            const parseMonth = Number(month)
            setMonthSelected(parseMonth)
        }
        catch(error) {
            throw new Error('invalid month value. Is accept 0 - 24.')
        }
    }

    const handleYearSelected = (year: string) => {
        try{
            const parseYear = Number(year)
            setYearSelected(parseYear)
        }
        catch(error) {
            throw new Error('invalid year value. Is integer: number')
        }
    }

    useEffect(() => {

        const filteredData = pageData.data.filter(item => {
            const date = new Date(item.date)
            const month = date.getMonth() + 1
            const year = date.getFullYear()

            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency)    
        })     

        const formattedData = filteredData.map(item => {

            return {
                id: String(new Date().getTime()) + item.amount,
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4e41f0' : '#e44c4e'
            }

        })

        setData(formattedData)
    },[pageData.data, monthSelected, yearSelected, data.length, frequencyFilterSelected])
    
    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <Selectinput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <Selectinput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>

            <Filters>
                <button 
                    type='button'
                    className={`tag-filter tag-filter-recurrent
                    ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>

                <button 
                    type='button'
                    className={`tag-filter tag-filter-eventual
                    ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('eventual')}
                >
                    Eventuais
                </button>
            </Filters>

            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard 
                        key={item.id}
                        tagColor={item.tagColor}
                        title={item.description}
                        subtitle={item.dateFormatted}
                        amount={item.amountFormatted}
                        />
                    ))
                }
            </Content>
        </Container>
    );
}

export default List