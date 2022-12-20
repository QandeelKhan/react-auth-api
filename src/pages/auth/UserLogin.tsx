import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import {
    TextField,
    Button,
    Box,
    Alert,
    Typography,
    CircularProgress,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../services/userAuthApi";
import { getToken, storeToken } from "../../services/localStorageService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../features/authSlice";

const UserLogin = () => {
    const [serverError, setServerError] = useState<any>({});
    const navigate = useNavigate();
    // our redux rtk generated hook, gives us a function we named as "loginUser"(anything) and other obj's from hook.
    const [loginUser, { isLoading }] = useLoginUserMutation();
    // dispatching our redux token state,and set our token as state in our redux store
    const dispatch = useDispatch();
    const handleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        // this email can be target by the "name" property of html/jsx element.
        const actualData = {
            email: data.get("email"),
            password: data.get("password"),
        };
        // in loginUser we send our data as "actualData" to server
        const res: any = await loginUser(actualData);
        if (res.error) {
            // console.log(res.error.data.errors);
            // console.log(typeof res.error.data.errors);
            setServerError(res.error.data.errors);
        }
        if (res.data) {
            // console.log(typeof res.data);
            // on login the token in response from server, in res.data.
            // we store response token using "LocalStorageService.ts" file
            // console.log(res.data);
            // res.data.token give us obj of 2 tokens "access" and refresh
            storeToken(res.data.token);
            // from above line we set token and get it for setting as redux state and access from anywhere in app
            let { access_token } = getToken();
            dispatch(setUserToken({ access_token: access_token }));

            navigate("/dashboard");
        }
    };
    // useEffeft: to solve our problem of hiding/disabling "/login" "/registration" routes/components until we
    // have access_token.
    let { access_token } = getToken();
    useEffect(() => {
        dispatch(setUserToken({ access_token: access_token }));
        // access_token and dispatch as dependencies array so that logic will
        // work until we have token(user logged in)
    }, [access_token, dispatch]);
    return (
        <>
            {/* {serverError.name ? console.log(serverError.name[0]) : ""}
            {serverError.email ? console.log(serverError.email[0]) : ""}
            {serverError.password ? console.log(serverError.password[0]) : ""}
            {serverError.password2 ? console.log(serverError.password2[0]) : ""}
        {serverError.tc ? console.log(serverError.tc[0]) : ""} */}
            {/* for non fields errors */}
            {/* {serverError.non_field_errors
                ? console.log(serverError.non_field_errors[0])
                : ""} */}
            <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                id="login-form"
                onSubmit={handleSubmit}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    autoFocus
                />
                {serverError.email ? (
                    <Typography
                        style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                    >
                        {serverError.email[0]}
                    </Typography>
                ) : (
                    ""
                )}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    autoFocus
                />
                {serverError.password ? (
                    <Typography
                        style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                    >
                        {serverError.password[0]}
                    </Typography>
                ) : (
                    ""
                )}
                <Box textAlign="center">
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Button
                            sx={{ mt: 3, mb: 2, px: 5 }}
                            type="submit"
                            variant="contained"
                        >
                            Login
                        </Button>
                    )}
                </Box>
                <NavLink to="/sendpasswordresetemail">
                    Forgot Password ?
                </NavLink>
                {serverError.non_field_errors ? (
                    <Alert severity="error">
                        {serverError.non_field_errors[0]}
                    </Alert>
                ) : (
                    ""
                )}
            </Box>
        </>
    );
};

export default UserLogin;
