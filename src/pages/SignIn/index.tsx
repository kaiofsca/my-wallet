import React from 'react'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { 
    Container,
    Logo,
    Form,
    FormTitle,
} from './styles'

const SignIn: React.FC = () => {
    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="My Wallet" />
                <h2> My Wallet </h2>
            </Logo>

            <Form onSubmit={() => {}}>
                <FormTitle> Login </FormTitle>
                
                <Input 
                    type="email"
                    required
                    placeholder='E-mail'
                />
                <Input 
                    type="password"
                    required
                    placeholder='Password'
                />

                <Button type='submit'> Acessar </Button>
            </Form>
        </Container>
    );
}

export default SignIn