# Use official Node.js LTS image
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the app port (change if your app uses a different one)
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
