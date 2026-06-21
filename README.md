# EASA Dashboard Deck

Welcome to the Enterprise AI Solution Architect (EASA) web-based communication deck. This dashboard serves as an interactive presentation to introduce the unit, explain capabilities, showcase project history, and provide engagement steps for stakeholders across power plants.

## Purpose

The EASA dashboard deck is designed to be a premium, professional, and futuristic stakeholder communication tool. It works like a traditional slide deck but provides the rich interactivity and seamless experience of a modern web application.

### Current Scope (Version 1)
- **Introduction:** High-level overview and executive metrics.
- **Background:** Context and rationale for AI in power plants.
- **What We Do:** Core capabilities and delivery flow.
- **Org Structure:** Roles, responsibilities, and focus areas.
- **Project History:** Track record of AI implementations.
- **Engage With Us:** How to partner with EASA.

---

## Local Development

To run this project locally, ensure you have Node.js installed, then follow these steps:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

4. **Preview the Production Build locally:**
   ```bash
   npm run preview
   ```

---

## Content Management

Most of the textual content and metrics are isolated in a single file to make updates easy without touching the React components.

To edit the content:
1. Open `src/data/content.ts`
2. Update the corresponding objects (e.g., `introData`, `projectHistoryData`).
3. Save the file. The changes will automatically reflect in the app.

### Adding New Projects
To add a new project to the history section, simply add a new object to the `projectHistoryData.projects` array in `src/data/content.ts`:

```typescript
{ 
  title: "New Project Title", 
  problem: "Description of the problem.", 
  approach: "How AI was used.", 
  stakeholders: "Who was involved.", 
  value: "The business value delivered.", 
  status: "Discovery" // Options: Discovery, Prototype, Pilot, Deployed, Scale-up
}
```

### Updating the Org Chart
To modify roles or personnel, edit the `orgStructureData` array in `src/data/content.ts`.

---

## Theming & Styling

The application uses Tailwind CSS for styling. To adjust the theme colors (e.g., the primary navy blue, electric cyan, or accent green), edit the `tailwind.config.js` file:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      navy: { /* ... */ },
      electric: { /* ... */ },
      accent: { /* ... */ }
    }
  }
}
```

---

## Deployment (GitHub Pages)

This project is configured to be deployed to GitHub Pages.

### Preparation
Make sure the `base` property in `vite.config.ts` matches your repository name. Currently, it is set to `/easa-dashboard-deck/`.

### Option 1: Deploy using gh-pages package
1. Install `gh-pages` as a dev dependency:
   ```bash
   npm install -D gh-pages
   ```
2. Add these scripts to `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run the deployment:
   ```bash
   npm run deploy
   ```

### Option 2: Deploy using GitHub Actions (Recommended)
You can set up a GitHub Action to automatically build and deploy your site when you push to the `main` branch. See the Vite documentation for [Deploying a Static Site](https://vitejs.dev/guide/static-deploy.html#github-pages).

---

> **IMPORTANT DISCLAIMER**
> 
> This is a stakeholder communication tool. **Do NOT include confidential company data.** Replace all sample/placeholder content with approved information before publishing or presenting to external parties.
