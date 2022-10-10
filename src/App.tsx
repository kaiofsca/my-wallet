import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'

import Layout from './components/Layout'
import DashBoard from './pages/DashBoard'
import dark from './styles/themes/dark'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={dark}>
        <GlobalStyles />
        <Layout>
          <DashBoard />
        </Layout>
    </ThemeProvider>
  )
}

export default App
