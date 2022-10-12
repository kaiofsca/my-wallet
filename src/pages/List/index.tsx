import React, { useMemo } from 'react' // usememo memoriza valores

import Selectinput from '../../components/Selectinput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import ContentHeader from '../../components/ContentHeader';

import { Container, Content, Filters } from './styles';

interface IRouteParams {
    match: {
        params: {
            type: string
        }
    }
}

const List: React.FC<IRouteParams> = ({ match }) => {

    const { type } = match.params

    const title = useMemo(() => {
        return type === 'entry-balance' ? 'Entradas' : 'Saídas'
    },[type])

    const lineColor = useMemo(() => {
        return type === 'entry-balance' ? '#f7931b' : '#e44c4e'
    },[type])

    const months = [
        {value: 10, label: 'Outubro'},
        {value: 11, label: 'Novembro'},
        {value: 'Yasmin', label: 'Dezembro'}
    ]
    
    const years = [
        {value: 2022, label: 2022},
        {value: 2021, label: 2021},
        {value: 2020, label: 2020}
    ]
    
    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
                <Selectinput options={months}/>
                <Selectinput options={years}/>
            </ContentHeader>

            <Filters>
                <button 
                type='button'
                className='tag-filter tag-filter-recurrent'
                >
                    Recorrentes
                </button>

                <button 
                type='button'
                className='tag-filter tag-filter-eventual'
                >
                    Eventuais
                </button>
            </Filters>

            <Content>
                <HistoryFinanceCard 
                    tagColor='#e44c4e'
                    title='Conta de Luz'
                    subtitle='11/10/2022'
                    amount='R$ 130,00'
                />
            </Content>
        </Container>
    );
}

export default List