# 1. Use official Node.js base image
FROM node:18-alpine

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package.json and package-lock.json / yarn.lock
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the entire project into the container
COPY . .

# 6. Build the Next.js app
RUN npm run build

# 7. Expose port (default for Next.js)
EXPOSE 3000

# 8. Start the Next.js production server
CMD ["npm", "start"]
