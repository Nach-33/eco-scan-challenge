import React, { useState } from "react";
import { Box, Button, CircularProgress, styled } from "@mui/material";
import { Link } from "react-router-dom";

const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: "1rem",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)"
    },
    "&:focus": {
        outline: "none",
        boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)"
    },
    "@media (max-width: 600px)": {
        width: "100%",
        margin: "8px 0"
    }
}));

const Login = () => {
    const [loading, setLoading] = useState({
        login: false,
        register: false
    });

    const handleButtonClick = (type) => {
        setLoading({ ...loading, [type]: true });
        setTimeout(() => {
            setLoading({ ...loading, [type]: false });
        }, 2000);
    };

    return (
            <Link to="/auth/login">
                <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick("login")}
                    disabled={loading.login}
                    aria-label="Login to your account"
                >
                    {loading.login ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        "Login"
                    )}
                </StyledButton>
            </Link>
    );
};

export default Login;