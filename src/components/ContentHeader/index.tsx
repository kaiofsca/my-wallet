import React from 'react'

import { 
    Container,
    TitleContainer,
    Controllers,
} from './styles'

const ContentHeader: React.FC = () => {
    return (
        <Container>
            <TitleContainer>
                <h1>Título</h1>
            </TitleContainer>
            <Controllers>
                <button type='button'>Botão 1</button>
                <button type='button'>Botão 2</button>
            </Controllers>
        </Container>
    );
}

export default ContentHeader