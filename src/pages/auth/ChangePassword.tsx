import { BaseSyntheticEvent, useState } from "react";
import { TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useChangeUserPasswordMutation } from "../../services/userAuthApi";
import { getToken } from "../../services/localStorageService";

const ResetPassword = () => {
    const [serverError, setServerError] = useState<any>({});
    const [serverMsg, setServerMsg] = useState<any>({});
    // named the returning result of hook as "changeUserPassword"
    const [changeUserPassword] = useChangeUserPasswordMutation();
    const { access_token } = getToken();

    const handleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        // this email can be target by the "name" property of html/jsx element.
        const actualData = {
            password: data.get("password"),
            password2: data.get("password2"),
        };
        const res: any = await changeUserPassword({ actualData, access_token });
        if (res.error) {
            setServerMsg({});
            setServerError(res.error.data.errors);
        }
        if (res.data) {
            console.log(res.data);
            // empty server msg obj if previously have from the above code of token in setServerError(res.error.data.errors), so it cannot still display the old msg if we get any non field msg..
            // similarly we can empty the received server obj of server msg in above for setServerError
            setServerError({});
            setServerMsg(res.data);
            // reset our form
            (
                document.getElementById(
                    "password-change-form"
                ) as HTMLFormElement
            ).reset();
        }
    };
    // Getting User Data from Redux Store
    const myData = useSelector((state: RootState) => state.user);
    console.log("Change Password Page", myData.email, myData.name);
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
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    maxWidth: 600,
                    mx: 4,
                }}
            >
                <h1>Change Password</h1>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                    id="password-change-form"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        label="New Password"
                        type="password"
                        autoFocus
                    />
                    {serverError.password ? (
                        <Typography
                            style={{
                                fontSize: 12,
                                color: "red",
                                paddingLeft: 10,
                            }}
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
                        label="New Confirm Password"
                        type="password"
                        autoFocus
                    />
                    <Box textAlign="center">
                        <Button
                            sx={{ mt: 3, mb: 2, px: 5 }}
                            type="submit"
                            variant="contained"
                        >
                            Update
                        </Button>
                    </Box>
                    {/* server error for non fields */}
                    {serverError.non_field_errors ? (
                        <Alert severity="error">
                            {serverError.non_field_errors[0]}
                        </Alert>
                    ) : (
                        ""
                    )}
                    {/* server msgs */}
                    {serverMsg.msg ? (
                        <Alert severity="success">{serverMsg.msg}</Alert>
                    ) : (
                        ""
                    )}
                </Box>
            </Box>
        </>
    );
};

export default ResetPassword;
