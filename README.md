# 📊 The Coding Challenge

Welcome to The Coding Challenge! This project provides a full-stack application template with Express.js backend and React frontend, built with **TypeScript**, to help you build a comprehensive portfolio view.

## 🎯 Challenge Overview

Your goal is to create a **Portfolio View** that displays the following information for each asset:

- **Assets** - The name/symbol of the asset
- **Quantity** - The number of shares/units held
- **Cost Basis** - The total cost of acquiring the position
- **Unrealized P/L** - The current profit or loss (in dollars)
- **Unrealized P/L %** - The current profit or loss (as a percentage)

### 📡 Available API Endpoints

The backend provides three endpoints to help you build your portfolio:

| Endpoint                 | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| `/api/historical-orders` | Historical order data (closed orders) with execution details |
| `/api/open-orders`       | Currently open orders and non-closed positions               |
| `/api/live-prices`       | Randomized Mocked price data ((+/- 20%))                     |

These endpoints contain all the information you need to calculate positions, cost basis, and unrealized gains/losses. Note that the historical-orders API shows closed orders, while the open orders API shows non-closed orders.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation & Setup

1. **Install dependencies** (from the root directory):

   ```bash
   npm run install:all
   ```

2. **Start the application**:

   ```bash
   npm run start
   ```

   This command will start both the backend server and frontend development server concurrently.

3. **Access the application**:
   - Frontend: `http://localhost:5173` (or the port shown in your terminal)
   - Backend API: `http://localhost:3000` (or configured port)

## 🛠️ Development Guidelines

### Using AI/Coding Tools

You are **encouraged** to use any coding assistant, AI tools, or IDE features to help you complete this challenge. This includes:

- ✅ ChatGPT, Claude, Gemini, GitHub Copilot, Cursor, etc.
- ✅ Stack Overflow, documentation references
- ✅ Any libraries or frameworks that help you build the solution

### 📝 Documentation Requirement

**Important**: Please document all prompts you used to create your solution. Include:

- The prompts you entered into AI tools
- Which tools you used
- Any key decisions or approaches you took

This helps us understand your problem-solving process and how you leverage modern development tools.

## ✨ Bonus Feature

You are allowed to add **up to 3 additional features** to your portfolio view. How would you enhance the portfolio view?

### Bonus Feature Documentation

When you add your bonus feature, please include:

1. **What feature you chose** and a brief description
2. **Why you chose this feature** - explain the value it adds
3. **The prompt(s) you used** to create it

## 📁 Project Structure

```
express-template/
├── backend/          # Express.js API server (TypeScript)
│   ├── server.ts     # Main server file with API endpoints
│   ├── types.ts      # TypeScript type definitions
│   ├── tsconfig.json # TypeScript configuration
│   └── package.json
├── frontend/         # React + Vite frontend (TypeScript)
│   ├── src/
│   │   ├── App.tsx          # Main app component with routing
│   │   ├── Index.tsx          # Portfolio view component (starting point)
│   │   ├── Welcome.tsx       # Welcome page component
│   │   ├── ApiViewer.tsx    # API viewer page (/api/viewer)
│   │   ├── ReadmeViewer.tsx # README viewer page (/readme)
│   │   ├── types.ts          # TypeScript type definitions
│   │   ├── ...
│   ├── public/
│   │   └── README.md        # README file served as static asset
│   ├── tsconfig.json        # TypeScript configuration
│   ├── tsconfig.node.json   # TypeScript config for Node tooling
│   └── package.json
├── config.ts         # Shared configuration (TypeScript)
└── package.json      # Root package.json with start scripts
```

### 🎯 Visible Pages

The application includes the following routes:

- **Home Page** (`/`) - Automatically redirects to `/welcome`
- **Welcome Page** (`/welcome`) - Welcome page
- **API Viewer** (`/api/viewer`) - Displays historical-orders (closed), open orders (non-closed), and live prices
- **README Viewer** (`/readme`) - Renders the README.md content in a styled container

## 🎨 Design Inspiration

The application currently includes a modern, clean design.

**You are encouraged (but not required) to choose your own components and design system** for your portfolio view.

Feel free to:

- Use the existing design system as a starting point
- Create your own unique design system from scratch
- Use any UI component library or framework you prefer.
- Build custom components that best showcase your portfolio view

The goal is to create a portfolio view that effectively displays the required information in a way that you think is best!

## 📚 Next Steps

1. Explore the API endpoints to understand the data structure
2. **Update routing**: In `App.tsx`, remove the automatic redirect from `/` to `/welcome` and connect the root path to the `Index` component (a starter component is provided for you)
3. Design your portfolio view layout in the `Index` component
4. Implement calculations for cost basis and unrealized P/L
5. Add your bonus feature
6. **Document your process and prompts**

### 🔗 Routing Requirements

When building your portfolio view:

- **Remove the automatic redirect**: In `App.tsx`, remove the line that redirects `/` to `/welcome` and uncomment the line that renders the `Index` component on the root path
- **Use the Index component**: The `Index.tsx` component is provided as a starting point for your portfolio view implementation
- **Keep existing routes active**: Maintain the following routes so they remain accessible:
  - `/welcome` - Welcome page
  - `/readme` - README viewer
  - `/api/viewer` - API data viewer

## 💡 Tips

- Use the existing `ApiViewer.tsx` component as a reference for API integration
- The live prices endpoint provides randomized mocked data (+/- 20%)
- Use current live prices to calculate unrealized P/L
- This project is built with **TypeScript** - all code includes type definitions for better type safety and developer experience
- Type definitions for API responses are available in `backend/types.ts` and `frontend/src/types.ts`

---

**Good luck!** We're excited to see what you build. 🚀
