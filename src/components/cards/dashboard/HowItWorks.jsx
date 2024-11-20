import React from "react";
import { Box, Card, CardContent, Typography, Grid, styled } from "@mui/material";
import { FaRocket, FaUserPlus, FaClipboardCheck, FaCheckCircle } from "react-icons/fa";

const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    borderRadius: 16,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    position: "relative",
    transition: "transform 0.3s ease",
    "&:hover": {
        transform: "translateY(-5px)"
    }
}));

const steps = [
    {
        id: 1,
        title: "Sign Up",
        description: "Create your account in less than 1 minute and get started with our platform",
        icon: FaUserPlus
    },
    {
        id: 2,
        title: "Snap-n-Upload",
        description: "Simply upload a photo of your clothing item",
        icon: FaClipboardCheck
    },
    {
        id: 3,
        title: "Earn Eco-Rewards",
        description: "Our AI instantly calculates the carbon footprint of your cloths and provides you rewards in form of EP currency. Accumulate EP points for every eco-friendly choice",
        icon: FaRocket
    },
    {
        id: 4,
        title: "Redeem Exciting Rewards",
        description: "Use your points to shop sustainable products",
        icon: FaCheckCircle
    }
];

const HowItWorksCard = () => {
    return (
        <Box sx={{ margin: "auto", p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", color: "#1976d2", mb: 4 }}>
                How It Works
            </Typography>

            <Grid container spacing={3}>
                {steps.map((step, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <StyledCard>
                            <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                {React.createElement(step.icon, {
                                    size: 48,
                                    color: "#2196f3",
                                    style: { marginBottom: 16 }
                                })}
                                <Typography variant="h5" gutterBottom sx={{ color: "#333" }}>
                                    {step.title}
                                </Typography>
                                <Typography variant="body1" sx={{ textAlign: "center", color: "#666" }}>
                                    {step.description}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h4" sx={{ textAlign: "center", color: "#1976d2", mt: 2 }}>
                By Nachiket Dodia
            </Typography>
        </Box>
    );
};

export default HowItWorksCard;