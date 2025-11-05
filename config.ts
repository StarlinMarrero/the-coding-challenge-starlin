// Shared configuration for frontend and backend

declare const process: {
  env: {
    BACKEND_PORT?: string;
    BACKEND_URL?: string;
  };
};

export const BACKEND_PORT: number = process.env.BACKEND_PORT 
  ? parseInt(process.env.BACKEND_PORT, 10) 
  : 3000;

export const BACKEND_URL: string = process.env.BACKEND_URL 
  ? process.env.BACKEND_URL 
  : `http://localhost:${BACKEND_PORT}`;

