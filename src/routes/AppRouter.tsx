import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardHome } from "@/pages/dashboard/DashboardHome";
import { MyCoursesPage } from "@/pages/dashboard/MyCoursesPage";
import { SchedulePage } from "@/pages/dashboard/SchedulePage";
import { HomeworkPage } from "@/pages/dashboard/HomeworkPage";
import { MessagesPage } from "@/pages/dashboard/MessagesPage";
import { SettingsPage } from "@/pages/dashboard/SettingsPage";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<DashboardHome />} />
                        <Route path="courses" element={<MyCoursesPage />} />
                        <Route path="schedule" element={<SchedulePage />} />
                        <Route path="homework" element={<HomeworkPage />} />
                        <Route path="messages" element={<MessagesPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
