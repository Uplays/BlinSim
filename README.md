<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# BLIN OS - Modern Desktop Operating System Simulator

A beautiful, interactive desktop operating system simulator built with React, TypeScript, and Vite. Features a glassmorphic design, draggable windows, widgets, and multiple applications.

## ✨ Features

- 🎨 Modern glassmorphic UI design
- 🪟 Draggable application windows
- 📊 Real-time widgets (Weather, Tasks, Calendar, System Monitor)
- 🚀 Multiple built-in applications
- 📱 Responsive design
- 🔒 Lock screen with authentication

## 🚀 Run Locally

**Prerequisites:** Node.js (v18 or higher)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Create a `.env.local` file in the root directory
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

## 📦 Build for Production

Build the project for production deployment:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🌐 Deploy to GitHub Pages

### Automatic Deployment (Recommended)

This project is configured with GitHub Actions for automatic deployment:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub
   - Navigate to **Pages** section
   - Under **Source**, select **GitHub Actions**

3. **Wait for deployment:**
   - The GitHub Action will automatically build and deploy your site
   - Your site will be available at: `https://yourusername.github.io/web2/`

### Manual Deployment

Alternatively, deploy manually using gh-pages:

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

## 🛠️ Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (via inline classes)
- **Google Generative AI** - AI Assistant integration

## 📁 Project Structure

```
web2/
├── components/          # React components
│   ├── apps/           # Application components
│   └── widgets/        # Widget components
├── services/           # API services
├── .github/workflows/  # GitHub Actions
├── App.tsx             # Main app component
├── constants.ts        # App constants
├── types.ts            # TypeScript types
└── vite.config.ts      # Vite configuration
```

## 🎮 Usage

1. **Lock Screen:** Click "Unlock" to access the desktop
2. **Open Apps:** Click on icons in the dock at the bottom
3. **Move Windows:** Drag windows by their title bar
4. **Close Apps:** Click the red button on window title bar
5. **Widgets:** View real-time information on left and right sides
6. **Logout:** Click the logout button in the bottom-right corner

## 📝 License

This project is private and not licensed for public use.

## 🔗 Links

- View in AI Studio: https://ai.studio/apps/drive/1C2xEDtQfIn_DKZOtzs5jCxR8klMxI6n2

