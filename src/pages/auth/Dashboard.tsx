import { useEffect, useState } from "react";
import { Button, Grid, CssBaseline, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import { getToken, removeToken } from "../../services/localStorageService";
import { useDispatch } from "react-redux";
import { unSetUserToken } from "../../features/authSlice";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";
import { setUserInfo, unSetUserInfo } from "../../features/userSlice";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    interface userDataInterface {
        name: String;
        email: String;
    }
    interface serverDataInterface {
        data: { name: String; email: String };
        isSuccess: Boolean;
    }

    // this hook gives data and some other features, this access_token will goto userAuthApi and we get response
    // data of server in our "data" property in hook, then we use "data" wherever in ui's.
    const { access_token, refresh_token } = getToken();

    console.log(`Bearer ${access_token}`);

    const { data, isSuccess } = useGetLoggedUserQuery<any>({
        access_token: access_token,
        refresh_token: refresh_token,
    });
    console.log("My user data", data);

    const [userData, setUserData] = useState<userDataInterface>({
        email: "",
        name: "",
    });

    // store user data in local state
    useEffect(() => {
        if (data && isSuccess) {
            setUserData({
                email: data.email,
                name: data.name,
            });
        }
    }, [data, isSuccess]);

    // Store User Data in Redux Store (name/email)
    useEffect(() => {
        if (data && isSuccess) {
            dispatch(
                setUserInfo({
                    email: data.email,
                    name: data.name,
                })
            );
        }
    }, [data, isSuccess, dispatch]);

    // on logout, unset data in store,unset token in store.remove token from browser
    const handleLogout = () => {
        dispatch(unSetUserInfo({ name: "", email: "" }));
        dispatch(unSetUserToken({ access_token: null }));
        removeToken();
        navigate("/login");
    };
    return (
        <>
            <CssBaseline />
            <Grid container>
                <Grid
                    item
                    sm={4}
                    sx={{ backgroundColor: "gray", p: 5, color: "white" }}
                >
                    <h1>Dashboard</h1>
                    <Typography variant="h5">
                        Email: {userData.email}
                    </Typography>
                    <Typography variant="h6">Name: {userData.name}</Typography>
                    <Button
                        variant="contained"
                        color="warning"
                        size="large"
                        onClick={handleLogout}
                        sx={{ mt: 1 }}
                    >
                        Logout
                    </Button>
                </Grid>
                <Grid item sm={8}>
                    <ChangePassword />
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;
