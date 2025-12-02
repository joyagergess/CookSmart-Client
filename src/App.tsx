import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateHousehold from "./pages/CreateHouseHold";
import JoinHousehold from "./pages/JoinHouseHold";
import ProtectedRoute from "./routes/ProtectedRoute";
import Pantry from "./pages/Pantry";
import Recipe from "./pages/Recipe";
import MealPlanPage from "./pages/MealPLanPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import ExpensesPage from "./pages/ExpensesPage";
import AIAssistant from "./pages/AIAssistant";

export default function App() {
  return (
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/Createhousehold" element={<ProtectedRoute><CreateHousehold /></ProtectedRoute>} />
        <Route path="/JoinHousehold" element={<ProtectedRoute><JoinHousehold /></ProtectedRoute>} />
        <Route path="/pantry" element={<ProtectedRoute><Pantry /></ProtectedRoute>} />
        <Route path="/recipes" element={<ProtectedRoute><Recipe /></ProtectedRoute>} />
        <Route path="/meal" element={<ProtectedRoute><MealPlanPage/></ProtectedRoute>} />
        <Route path="/shoppingList" element={<ProtectedRoute><ShoppingListPage/></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute><ExpensesPage/></ProtectedRoute>} />
        <Route path="/AI" element={<ProtectedRoute><AIAssistant/></ProtectedRoute>} />


      </Routes>
  );
}
