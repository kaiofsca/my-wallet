import React, { useState, useMemo } from 'react'

import ContentHeader from '../../components/ContentHeader';
import Selectinput from '../../components/Selectinput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';


import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'
import listOfMonths from '../../utils/months';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import embarrassedImg from '../../assets/embarrassed.png';



import  { 
    Container,
    Content, 
} from './styles'

const DashBoard: React.FC = () => {
    const [dMonthSelected, setDMonthSelected] = useState<number>(new Date().getMonth() + 1)
    const [dYearSelected, setDYearSelected] = useState<number>(new Date().getFullYear())

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

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if( month === dMonthSelected && year === dYearSelected ) {
                try {
                    total += Number(item.amount)
                } 
                catch {
                    throw new Error('Invalid amount! Amount must be a number.')
                }
            }
        })

        return total
    },[dMonthSelected, dYearSelected]);

    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if( month === dMonthSelected && year === dYearSelected ) {
                try {
                    total += Number(item.amount)
                } 
                catch {
                    throw new Error('Invalid amount! Amount must be a number.')
                }
            }
        })

        return total
    },[dMonthSelected, dYearSelected]);

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses
    },[totalGains, totalExpenses]);

    const message = useMemo(() => {
        if(totalBalance < 0) {
            return {
                title:"Que Triste!",
                description:'Sua carteira esta negativa neste mês!',
                footerText:'Verfique seus gastos e corte os desnecessários.',
                icon: sadImg
            }
        }
        else if(totalBalance === 0) {
            return {
                title:"Ufaa!",
                description:'Sua carteira quase ficou no negativo! tenha mais cuidado.',
                footerText:'Não deixe isso se repetir no próximo mês! Poupe mais dinheiro.',
                icon: embarrassedImg
            }
        }
        else {
            return {
                title: 'Muito bem!',
                description: 'Sua carteira esta positiva!',
                footerText: 'Continue assim. Considere investir o seu saldo',
                icon: happyImg
            }
        }
    },[totalBalance])

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses

        const percentGains = (totalGains / total) * 100
        const percentExpenses = (totalExpenses / total) * 100

        const data = [
            {
                name: "Entradas",
                value: totalGains,
                percent: Number(percentGains.toFixed(1)),
                color: "#e44c4e"
            },

            {
                name: "Saídas",
                value: totalExpenses,
                percent: Number(percentExpenses.toFixed(1)),
                color: "#f7931b"
            }
        ]

        return data;
        

    },[totalGains, totalExpenses])

    const historyData = useMemo(() => {
        return listOfMonths.map((_, month) => {

            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date)
                const gainMonth = date.getMonth()
                const gainYear = date.getFullYear()

                if(gainMonth === month && gainYear === dYearSelected) {
                    try{
                        amountEntry += Number(gain.amount)
                    } catch {
                        throw new Error('amountEntry is invalid. amountEntry must be valid number.')
                    }
                }
            });

            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date)
                const expenseMonth = date.getMonth()
                const expenseYear = date.getFullYear()

                if(expenseMonth === month && expenseYear === dYearSelected) {
                    try{
                        amountOutput += Number(expense.amount)
                    } catch {
                        throw new Error('amountOutput is invalid. amountOutput must be valid number.')
                    }
                }
            });

            return {
                monthNumer: month,
                month: listOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutput
            }

        })
    },[dYearSelected])

    const handleMonthSelected = (month: string) => {
        try{
            const parseMonth = Number(month)
            setDMonthSelected(parseMonth)
        }
        catch {
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

            <Content>

                <WalletBox 
                    title='saldo'
                    color='#4e41f0'
                    amount={totalBalance}
                    footerLabel='atualizado com base nas entradas e saídas'
                    icon='dollar'
                />

                <WalletBox 
                    title='entradas'
                    color='#f7931b'
                    amount={totalGains}
                    footerLabel='atualizado com base nas entradas e saídas'
                    icon='arrowUp'
                />

                <WalletBox 
                    title='saídas'
                    color='#e44c4e'
                    amount={totalExpenses}
                    footerLabel='atualizado com base nas entradas e saídas'
                    icon='arrowDown'
                />

                <MessageBox 
                    {... message}
                />

                <PieChartBox data={relationExpensesVersusGains} />

                <HistoryBox 
                    data={historyData}
                    lineColorAmountEntry="#f7931b"
                    lineColorAmountOutput="#e44c4e"
                />

            </Content>

        </Container>
    );
}

export default DashBoard

// fc é componente funcional, DAshBoarad é uma pagina de componente funcional