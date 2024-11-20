import React, { useRef, useState } from "react";
import { styled } from "@mui/system";
import { Box, Button, Card, CardContent, CardMedia, Typography, IconButton, Snackbar, Alert } from "@mui/material";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { uploadClothImage } from "api/transactions/upload";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const UploadContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "32px",
  minHeight: "60vh"
}));

const UploadCard = styled(Card)({
  width: "100%",
  maxWidth: "500px",
  borderRadius: "16px",
  boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
  position: "relative"
});

const UploadArea = styled(Box)({
  border: "2px dashed #ccc",
  borderRadius: "8px",
  padding: "30px",
  textAlign: "center",
  cursor: "pointer",
  marginBottom: "20px",
  transition: "border 0.3s ease-in-out",
  "&:hover": {
    border: "2px dashed #1976d2"
  }
});

const PreviewImage = styled(CardMedia)({
  height: "300px",
  objectFit: "contain",
  borderRadius: "8px"
});

const RemoveButton = styled(IconButton)({
  position: "absolute",
  top: "8px",
  right: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)"
  }
});

const toastOptions = {
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const toastId = useRef(null);

  const notifyToast = () => {
    toastId.current = toast("Uploading Image...");
  }

  const dismissToast = () => {
    toast.dismiss(toastId.current);
  }

  const handleImageUpload = async () => {
    notifyToast();

    handleRemoveImage();

    const { imageURL, result, error } = await uploadClothImage(selectedImage);

    dismissToast();

    if (error) {
      toast.error("Static Error Message", toastOptions);
    }

    if (result) {
      if (result.score == 0) {
        toast.warning('Uploaded Pic cannot be classified as any cloth item', toastOptions);
      }
      else toast.success('Uploaded Image is a: ' + result.item, toastOptions);
    }
  }

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl("");
  };

  return (
    <>
      <ToastContainer />
      {/* <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={0}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
      <UploadContainer>
        <UploadCard>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
              Upload Image
            </Typography>

            {!selectedImage ? (
              <UploadArea
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById("imageInput").click()}
              >
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: "none" }}
                />
                <UploadOutlined style={{ fontSize: '2.5rem', color: '#08c' }} />
                <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
                  Drag and drop an image here or click to browse
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Supported formats: JPG, JPEG, PNG
                </Typography>
              </UploadArea>
            ) : (
              <Box sx={{ position: "relative", mb: 2 }}>
                <PreviewImage
                  component="img"
                  image={previewUrl}
                  alt="Preview"
                  title="Preview"
                />
                <RemoveButton
                  onClick={handleRemoveImage}
                  size="small"
                  aria-label="Remove image"
                >
                  <CloseCircleOutlined />
                </RemoveButton>
              </Box>
            )}

            {selectedImage && (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  File name: {selectedImage.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  File size: {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleImageUpload}
                >
                  Upload Image
                </Button>
              </Box>
            )}
          </CardContent>
        </UploadCard>
      </UploadContainer>
      {/* <Alert
        // onClose={handleCloseSnackbar}
        variant="outlined"
        severity="success"
        color="info"
        sx={{fontSize: "1rem" }}
      >
        The Uploaded Image Was A: 
      </Alert> */}
    </>
  );
};

export default ImageUpload;
