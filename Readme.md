
# 🌍 EcoScan - Clothing Carbon Footprint Scanner

## 📜 Overview
EcoScan is a web application designed to help users understand the environmental impact of their clothing. By uploading images of clothing items, users can see estimated carbon scores, earn eco-reward points, and redeem sustainability-focused offers. This project demonstrates a full-stack solution for a green initiative product.

## 🔧 Tech Stack
- **Frontend**: React
- **Backend**: Nodejs with Expressjs
- **Image Recognition**: Hugging Face Xenova Transformer

---

## 🚀 Setup Instructions

1. **Clone the Repository**  
   First, clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/Nach-33/eco-scan-challenge.git
   cd eco-scan-challenge
   ```

2. **Install Dependencies**  
   Run the following commands depending on your tech stack:
   ```bash
   npm install         # for frontend dependencies
   pip install -r requirements.txt   # if using Python for backend dependencies
   ```

3. **Setup Environment Variables and Secret Files**
   1. Create .env file in backend and provide your environment variables.
   ```env
      PORT = 4000
      API_URI = http://localhost:4000/api
      FRONTEND_URI = http://localhost:3000
      USER_AUTH_REDIRECT_URI = http://localhost:4000/api/user/auth/redirect
      MONGO_URI = [YOUR MONGODB CONNECTION URI STRING]
      OAUTH_CLIENT_ID = [YOUR GOOGLE CLOUD CONSOLE PROJECT OAUTH_CLIENT_ID]
      OAUTH_CLIENT_SECRET = [YOUR GOOGLE CLOUD CONSOLE PROJECT OAUTH_CLIENT_SECRET]
      JWT_SECRET = [YOUR JWT_SECRET]
      FIREBASE_STORAGE_BUCKET = [YOUR FIREBASE_STORAGE_BUCKET_URI]
   ```

   2. Add firebase-adminsdk.json downloaded from your firebase cloud console storage settings in backend root directory.

   3. Create .env file in frontend and provide your environment variables.
   ```env
      VITE_APP_VERSION=v1.0.0
      GENERATE_SOURCEMAP=false

      ## Backend API URL
      PUBLIC_URL = https://mantisdashboard.io/
      VITE_APP_BASE_NAME = /
      VITE_APP_BACKEND_URI = http://localhost:4000/api
      VITE_APP_FRONTEND_URI = http://localhost:3000/
   ```

3. **Run the Application**
   - **Backend**: Start the backend server:
     ```bash
     npm start
     ```
   - **Frontend**: Start the frontend application:
     ```bash
     npm run start
     ```
---
<!-- 
## 🌱 Carbon Score Assumptions

To calculate the environmental impact of each clothing item, we have assigned approximate carbon scores based on item type. These scores are stored in an in-memory dictionary for quick access.

| 👕 Item       | 🌍 Estimated Carbon Score (kg CO₂) |
|--------------|------------------------------------|
| T-shirt      | 5                                  |
| Jeans        | 10                                 |
| Jacket       | 15                                 |
| Shoes        | 8                                  |

---

## 🌟 Product & Technical Enhancements

In this section, suggest possible improvements that could make **EcoScan** a more effective and scalable solution.

1. **Scaling**: 🌐 Describe how the backend could be optimized for a large user base, using techniques like caching or database integration.
2. **Enhanced Eco-Score Model**: 📊 Outline ways to make carbon scoring more accurate by considering factors like materials, brand data, or garment condition.
3. **User Experience Improvements**: ✨ Suggest UI/UX features that provide more insights or interactive elements for users, like sustainability comparisons.
4. **API Integrations**: 🔌 Describe possible integrations with external carbon data sources for real-time accuracy.

---

## 📲 Deployment

If deployed, include a link here to access the live version of **EcoScan**.

- **URL**: [Insert deployment link here if deployed]

---

### Thank you for building a greener future with EcoScan! 🌍💚 -->
