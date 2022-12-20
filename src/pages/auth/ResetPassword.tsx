import { BaseSyntheticEvent, FC, useState } from "react";
import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/userAuthApi";

const ResetPassword: FC<any> = () => {
    const [serverError, setServerError] = useState<any>({});
    const [serverMsg, setServerMsg] = useState<any>({});
    const [resetPassword] = useResetPasswordMutation();
    const { id, token } = useParams();
    const navigate = useNavigate();

    // useCookies(): this use cookie we can use to set a cookie value on the basis of response from server
    // if the response is 401 unauthorized,we can set this cookie value as "loggedOut" etc and give to our
    // state etc to get new accessToken from refreshToken and more..

    const handleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const actualData = {
            password: data.get("password"),
            password2: data.get("password2"),
        };
        const res: any = await resetPassword({ actualData, id, token });
        if (res.error) {
            setServerMsg({});
            setServerError(res.error.data.errors);
        }
        if (res.data) {
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
            // navigate user to login if work done successfully
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }
    };
    return (
        <>
            <Grid container justifyContent="center">
                <Grid item sm={6} xs={12}>
                    <h1>Reset Password</h1>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1 }}
                        id="password-reset-form"
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
                        {serverError.password2 ? (
                            <Typography
                                style={{
                                    fontSize: 12,
                                    color: "red",
                                    paddingLeft: 10,
                                }}
                            >
                                {serverError.password2[0]}
                            </Typography>
                        ) : (
                            ""
                        )}
                        <Box textAlign="center">
                            <Button
                                sx={{ mt: 3, mb: 2, px: 5 }}
                                type="submit"
                                variant="contained"
                            >
                                Save
                            </Button>
                        </Box>
                        {/* by default this severity set to success */}
                        {/* server msgs */}
                        {serverMsg.msg ? (
                            <Alert severity="success">{serverMsg.msg}</Alert>
                        ) : (
                            ""
                        )}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default ResetPassword;
