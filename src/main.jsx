import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { BudgetProvider } from './context/BudgetContext.jsx'
import { ExpenseProvider } from './context/ExpenseContext.jsx'
import { SavingsProvider } from './context/SavingsContext.jsx'
import { NotificationsProvider } from './context/NotificationsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <BudgetProvider>
          <ExpenseProvider>
            <SavingsProvider>
              <NotificationsProvider>
                <App />
              </NotificationsProvider>
            </SavingsProvider>
          </ExpenseProvider>
        </BudgetProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
)