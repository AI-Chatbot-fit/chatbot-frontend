# Sử dụng node image chính thức
FROM node:20-alpine

# Cài đặt các package cần thiết
RUN apk add --no-cache libc6-compat

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt dependencies với cache layer
RUN npm ci --only=production && \
    npm cache clean --force

# Copy toàn bộ source code
COPY . .

# Expose port 5174
EXPOSE 5174

# Chạy ứng dụng
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5174"] 