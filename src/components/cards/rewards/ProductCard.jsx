import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Skeleton,
    Snackbar,
    Alert,
    styled
} from "@mui/material";
import { ShoppingOutlined } from "@ant-design/icons";
import { redeemReward } from "api/rewards/redeemReward";

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    margin: "16px",
    transition: "all 0.3s ease-in-out",
    background: "linear-gradient(to bottom right, #ffffff, #f8f9fa)",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 12px 20px rgba(0,0,0,0.1)"
    }
}));

const ProductImage = styled(CardMedia)({
    height: 250,
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
        transform: "scale(1.05)"
    }
});

const ActionButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
        background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
        transform: "scale(1.02)"
    }
}));

const ProductCard = ({ productData, userEP }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const redeemRewardItem = async (rewardItemId) => {
        const {redeemRewardItem, error} = await redeemReward(rewardItemId);

        window.location.href = "/";

        setOpenSnackbar(true);
    }

    const handleRedeemReward = (event) => {
        
        redeemRewardItem(event.target.id);

    };

    const handleImageError = () => {
        setError(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh"}}>
            <StyledCard sx = {{minWidth: "100%"}}>
                {error ? (
                    <Box
                        sx={{
                            height: 250,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "#f5f5f5"
                        }}
                    >
                        <Typography variant="body1" color="text.secondary">
                            Image not available
                        </Typography>
                    </Box>
                ) : loading ? (
                    <Skeleton variant="rectangular" height={250} animation="wave" />
                ) : (
                    <ProductImage
                        component="img"
                        image={productData.image}
                        alt={productData.name}
                        onError={handleImageError}
                        loading="lazy"
                    />
                )}
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h3"
                        component="div"
                        sx={{
                            fontWeight: "bold",
                            color: "#2c3e50"
                        }}
                    >
                        {productData.name}
                    </Typography>
                    <Typography
                        variant="h4"
                        color="primary"
                        sx={{ my: 1, fontWeight: "600" }}
                    >
                        EP. {productData.cost}
                    </Typography>
                    <ActionButton
                        id={productData._id}
                        fullWidth
                        startIcon={<ShoppingOutlined />}
                        onClick={handleRedeemReward}
                        disabled={loading || productData.cost > userEP}
                        sx={{ fontWeight: "bold" }}
                    >
                        {loading ? "Redeeming..." : "Redeem"}
                    </ActionButton>
                </CardContent>
            </StyledCard>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Reward Redeemed successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ProductCard;