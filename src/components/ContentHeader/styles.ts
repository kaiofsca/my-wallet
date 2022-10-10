import styled from "styled-components";

export const Container = styled.div`
    width: 100%; // 100% da largura

    display: flex;
    justify-content: space-between;

    margin-bottom: 25px;

`

export const TitleContainer = styled.div`

    > h1 {
        color: ${props => props.theme.colors.white};

        &::after {
            content: '';
            display: block; // relembrando - com o block a gnt consegue usar os elementos de altura e largura
            width: 55px;
            border-bottom: 10px solid ${props => props.theme.colors.warning};;
        }
    }

`

export const Controllers = styled.div``