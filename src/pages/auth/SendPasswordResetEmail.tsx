import React, { BaseSyntheticEvent, useState } from "react";
import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useSendPasswordResetEmailMutation } from "../../services/userAuthApi";

const SendPasswordResetEmail = () => {
    const [serverError, setServerError] = useState<any>({});
    const [serverMsg, setServerMsg] = useState<any>({});
    const [sendPasswordResetEmail, { isLoading }] =
        useSendPasswordResetEmailMutation();

    const handleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const actualData = {
            email: data.get("email"),
        };
        const res: any = await sendPasswordResetEmail(actualData);
        if (res.error) {
            console.log(typeof res.error.data.errors);
            console.log(res.error.data.errors);
            setServerMsg({});
            setServerError(res.error.data.errors);
        }
        if (res.data) {
            console.log(typeof res.data);
            console.log(res.data);
            setServerError({});
            setServerMsg(res.data);
            (
                document.getElementById(
                    "password-reset-email-form"
                ) as HTMLFormElement
            ).reset();
        }
    };
    return (
        <>
            <Grid container justifyContent="center">
                <h1>Password Reset</h1>
                <Grid item sm={6} xs={12}>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1 }}
                        id="password-reset-email-form"
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
                                style={{
                                    fontSize: 12,
                                    color: "red",
                                    paddingLeft: 10,
                                }}
                            >
                                {serverError.email[0]}
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
                                Send
                            </Button>
                        </Box>
                        {/* by default this severity set to success */}
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

export default SendPasswordResetEmail;
