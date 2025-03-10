# Sử dụng node image chính thức
FROM node:20-alpine

# Cài đặt các package cần thiết
RUN apk add --no-cache libc6-compat

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt tất cả dependencies (bao gồm devDependencies)
RUN npm install

# Copy toàn bộ source code
COPY . .

# Expose port 5174
EXPOSE 5174

# Chạy ứng dụng
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5174"] 