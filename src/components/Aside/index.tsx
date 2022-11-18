import React, { useState } from 'react'

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp,
    MdClose,
    MdMenu,
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
    MenuItemButton,
    ToogleMenu
} from './styles'

const Aside: React.FC = () => {
    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false)

    const { signOut } = useAuth();

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened)
    }

    return (
        <Container menuIsOpen={toggleMenuIsOpened}>
            <Header>
                <ToogleMenu onClick={handleToggleMenu}>
                    { toggleMenuIsOpened ? <MdClose /> : <MdMenu /> }
                </ToogleMenu>    

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