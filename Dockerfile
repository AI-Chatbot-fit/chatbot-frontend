# Sử dụng node image chính thức
FROM node:20-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build ứng dụng
RUN npm run build

# Expose port 5174
EXPOSE 5174

# Chạy ứng dụng
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5174"] 