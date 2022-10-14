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
    dataFormatted: string
    tagColor: string
}

const List: React.FC<IRouteParams> = ({ match }) => {

    const [data, setData] = useState<IData[]>([]) // primeiro guarda e dps atualiza o estado
    const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1))
    const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()))
    const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual']) // começa com os dois ligados 

    const { type } = match.params

    const title = useMemo(() => {
        return type === 'entry-balance' ? 'Entradas' : 'Saídas'
    },[type])

    const lineColor = useMemo(() => {
        return type === 'entry-balance' ? '#f7931b' : '#e44c4e'
    },[type])

    const listData = useMemo(() => {
        return type === 'entry-balance' ? gains : expenses
    },[type])

    const years = useMemo(() => {
        let uniqueYears: number[] = []

        listData.forEach(item => {
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

    },[listData])

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return{
                value: index + 1,
                label: month,
            }
        })

    },[])

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = selectedFrequency.findIndex(item => item === frequency)

        if(alreadySelected >= 0) {
            const filtered = selectedFrequency.filter(item => item !== frequency)
            setSelectedFrequency(filtered)
        } else {
            setSelectedFrequency((prev) => [...prev, frequency])
        }
    }

    useEffect(() => {

        const filteredData = listData.filter(item => {
            const date = new Date(item.date)
            const month = String(date.getMonth() + 1)
            const year = String(date.getFullYear())

            return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency)    
        })     

        const formattedData = filteredData.map(item => {

            return {
                id: String(new Date().getTime()) + item.amount,
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dataFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4e41f0' : '#e44c4e'
            }

        })

        setData(formattedData)
    },[listData, monthSelected, yearSelected, data.length, selectedFrequency])
    
    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
                <Selectinput options={months} onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <Selectinput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>

            <Filters>
                <button 
                    type='button'
                    className={`tag-filter tag-filter-recurrent
                    ${selectedFrequency.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>

                <button 
                    type='button'
                    className={`tag-filter tag-filter-eventual
                    ${selectedFrequency.includes('eventual') && 'tag-actived'}`}
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
                        subtitle={item.dataFormatted}
                        amount={item.amountFormatted}
                        />
                    ))
                }
            </Content>
        </Container>
    );
}

export default List