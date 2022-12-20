import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/auth/Dashboard";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { RootState } from "./app/store";

function App() {
    const { access_token } = useSelector((state: RootState) => state.auth);
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="contact" element={<Contact />} />
                        <Route
                            path="login"
                            element={
                                !access_token ? (
                                    <LoginReg />
                                ) : (
                                    <Navigate to="/dashboard" />
                                )
                            }
                        />
                        <Route
                            path="sendpasswordresetemail"
                            element={<SendPasswordResetEmail />}
                        />
                        <Route
                            path="api/user/reset/:id/:token"
                            element={<ResetPassword />}
                        />
                        {/* when we have backend we write it for a dynamic token value like below */}
                        {/* <Route
                            path="reset/:token"
                            element={<ResetPassword />}
                        /> */}
                    </Route>
                    <Route
                        path="/dashboard"
                        element={
                            access_token ? (
                                <Dashboard />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="*"
                        element={<h1>Error 404 Page not found !!</h1>}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
