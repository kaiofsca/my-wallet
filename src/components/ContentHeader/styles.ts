import styled from "styled-components";

interface ITitleContainer {
    lineColor: string
}

export const Container = styled.div`
    width: 100%; // 100% da largura

    display: flex;
    justify-content: space-between;

    margin-bottom: 25px;

    @media(max-width: 320px) {
        flex-direction: column;
    }

`

export const TitleContainer = styled.div<ITitleContainer>`

    > h1 {
        color: ${props => props.theme.colors.white};

        &::after {
            content: '';
            display: block; // relembrando - com o block a gnt consegue usar os elementos de altura e largura
            width: 55px;
            border-bottom: 10px solid ${props => props.lineColor};
        }
    }

    @media(max-width: 420px) {
        > h1 {
            font-size: 25px;

            &::after {
            content: '';
            display: block; // relembrando - com o block a gnt consegue usar os elementos de altura e largura
            width: 55px;
            border-bottom: 5px solid ${props => props.lineColor};
        }
        }
    }

`

export const Controllers = styled.div`
    display: flex;
    
    @media(max-width: 320px) {
        width: 100%;
        justify-content: space-around;
        margin-top: 20px;
    }
`