
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml* package-lock.json* yarn.lock* ./
RUN if [ -f package-lock.json ]; then npm ci;     elif [ -f yarn.lock ]; then yarn --frozen-lockfile;     elif [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm i --frozen-lockfile;     else npm i; fi
COPY . .
RUN npm run build || true
EXPOSE 8080
CMD [ "npm", "run", "dev" ]
