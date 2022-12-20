import { BaseSyntheticEvent, useState } from "react";
import {
    TextField,
    Button,
    Box,
    Checkbox,
    FormControlLabel,
    Typography,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../services/userAuthApi";
import { storeToken } from "../../services/localStorageService";

// const serverErrorInterface = {
//     name: String,
//     email: String,
//     password: String,
//     password2: String,
//     tc: Boolean,
// };

const Registration = () => {
    // getting errors from server
    const [serverError, setServerError] = useState<any>({});
    const navigate = useNavigate();
    // the work of redux: with hook "userRegisterUserMutation" we get some extra awesome properties in an obj
    // i.e isLoading, isFetching, is error etc and get a method "registerUser" and we can call this method
    // to send our data, rather then hook..
    // const data = useRegisterUserMutation();
    // console.log(data);
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const handleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        // this email can be target by the "name" property of html/jsx element.
        const actualData = {
            name: data.get("name"),
            email: data.get("email"),
            password: data.get("password"),
            password2: data.get("password2"),
            tc: data.get("tc"),
        };

        // calling the "registerUser" by await and give it the data of frontend, this data will go to
        // the "userAuthApi" slice in the "user" obj we send to backend.
        // this res contain the response of server i.e error/success.
        const res: any = await registerUser(actualData);
        // console.log(res);
        // here we define if the response of the server is "data" or the "error"
        if (res.error) {
            // console.log(res.error.data.errors);
            // console.log(typeof res.error.data.errors);
            setServerError(res.error.data.errors);
        }
        if (res.data) {
            console.log(typeof res.data);
            console.log(res.data);
            storeToken(res.data.token);
            navigate("/dashboard");
        }
    };
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
                id="registration-form"
                onSubmit={handleSubmit}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    autoFocus
                />
                {serverError.name ? (
                    <Typography
                        style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                    >
                        {serverError.name[0]}
                    </Typography>
                ) : (
                    ""
                )}
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password2"
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    autoFocus
                />
                {serverError.password2 ? (
                    <Typography
                        style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                    >
                        {serverError.password2[0]}
                    </Typography>
                ) : (
                    ""
                )}
                <FormControlLabel
                    control={
                        <Checkbox
                            value={true}
                            color="primary"
                            name="tc"
                            id="tc"
                        />
                    }
                    label="I agree to term and conditions "
                />
                {serverError.tc ? (
                    <span
                        style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                    >
                        {serverError.tc[0]}
                    </span>
                ) : (
                    ""
                )}
                <Box textAlign="center">
                    <Button
                        sx={{ mt: 3, mb: 2, px: 5 }}
                        type="submit"
                        variant="contained"
                    >
                        Join
                    </Button>
                </Box>
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

export default Registration;
