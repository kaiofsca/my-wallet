import React from 'react'

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp
} from 'react-icons/md'

import logoImg from '../../assets/logo.svg'
import { useAuth } from '../../hooks/auth'

import { 
    Container,
    Header,
    LogImg,
    Title,
    MenuContainer,
    MenuItemLink,
    MenuItemButton
} from './styles'

const Aside: React.FC = () => {
    const { signOut } = useAuth();

    return (
        <Container>
            <Header>
                <LogImg src={logoImg} alt="Logo My Wallet" />
                <Title>My Wallet</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href='/'>
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

                <MenuItemButton onClick={signOut}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>
            </MenuContainer>
        </Container>
    );
}

export default Aside