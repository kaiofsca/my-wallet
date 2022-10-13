import React from 'react'

import ContentHeader from '../../components/ContentHeader';
import Selectinput from '../../components/Selectinput';

import { Container } from './styles';

const DashBoard: React.FC = () => {

    const options = [
        {value: 'Kaio', label: 'Kaio'},
        {value: 'Sofia', label: 'Sofia'},
        {value: 'Yasmin', label: 'Yasmin'}
    ]

    return (
        <Container>
            <ContentHeader title='Dashboard' lineColor='#f7931b'>
                <Selectinput options={options} onChange={() => {}}/>
            </ContentHeader>
        </Container>
    );
}

export default DashBoard

// fc é componente funcional, DAshBoarad é uma pagina de componente funcional