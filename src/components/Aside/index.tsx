import React from 'react'

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp
} from 'react-icons/md'

import logoImg from '../../assets/logo.svg'

import { 
    Container,
    Header,
    LogImg,
    Title,
    MenuContainer,
    MenuItemLink
} from './styles'

const Aside: React.FC = () => {
    return (
        <Container>
            <Header>
                <LogImg src={logoImg} alt="Logo My Wallet" />
                <Title>My Wallet</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href='/dashboard'>
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href='/list/entry-balance'>
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink href='/list/exist-balance'>
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>

                <MenuItemLink href='#'>
                    <MdExitToApp />
                    Sair
                </MenuItemLink>
            </MenuContainer>
        </Container>
    );
}

export default Aside