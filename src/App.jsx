import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Splash from "./pages/Splash";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import SetupPin from "./pages/SetupPin";
import EnterPin from "./pages/EnterPin";
import ChooseCurrency from "./pages/ChooseCurrency";
import TellUsAboutYou from "./pages/TellUsAboutYou";
import OnboardingSuccess from "./pages/OnboardingSuccess";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import BudgetOverview from "./pages/BudgetOverview";
import BudgetIncome from "./pages/BudgetIncome";
import BudgetPriority from "./pages/BudgetPriority";
import Analytics from "./pages/Analytics";
import SavingsGoals from "./pages/SavingsGoals";
import WeeklyReview from "./pages/WeeklyReview";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import PersonalInformation from "./pages/PersonalInformation";
import AddSavingsGoal from "./pages/AddSavingsGoal";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/setup-pin" element={<SetupPin />} />
        <Route path="/enter-pin" element={<EnterPin />} />
        <Route path="/choose-currency" element={<ChooseCurrency />} />
        <Route path="/about-you" element={<TellUsAboutYou />} />
        <Route path="/onboarding-success" element={<OnboardingSuccess />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-expense"
          element={
            <ProtectedRoute>
              <AddExpense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budget"
          element={
            <ProtectedRoute>
              <BudgetOverview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budget/setup"
          element={
            <ProtectedRoute>
              <BudgetIncome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budget/setup/priority"
          element={
            <ProtectedRoute>
              <BudgetPriority />
            </ProtectedRoute>
          }
        />
        <Route
          path="/savings"
          element={
            <ProtectedRoute>
              <SavingsGoals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weekly-review"
          element={
            <ProtectedRoute>
              <WeeklyReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
  path="/personal-information"
  element={
    <ProtectedRoute>
      <PersonalInformation />
    </ProtectedRoute>
  }
/>
        <Route
          path="/savings/new"
          element={
            <ProtectedRoute>
              <AddSavingsGoal />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
