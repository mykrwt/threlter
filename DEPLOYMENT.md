# Deployment Guide for Threltemania

This game is now ready to be deployed to Vercel!

## 🎯 What's Changed

### Backend/Database Removal

- ✅ No backend server required
- ✅ No database dependencies
- ✅ All data stored in browser localStorage
- ✅ Campaign tracks loaded from JSON files
- ✅ Client-side only rendering (SSR disabled)

### Vercel Configuration

- ✅ Switched from `@sveltejs/adapter-node` to `@sveltejs/adapter-static`
- ✅ Static site generation for optimal performance
- ✅ SPA fallback to index.html for client-side routing
- ✅ vercel.json configuration file added
- ✅ .gitignore updated with Vercel-specific entries

### New Modern UI

- ✅ Redesigned with glassmorphism and modern aesthetics
- ✅ Gradient-based color scheme (Indigo primary, Amber accent)
- ✅ New button components with hover effects and animations
- ✅ Modern card components with backdrop blur
- ✅ Updated navigation menu with icons
- ✅ Responsive and accessible design

## 🚀 Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will auto-detect SvelteKit
6. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from project root
cd /path/to/threltemania
vercel

# For production deployment
vercel --prod
```

## 📦 Build Settings

The following settings are configured in vercel.json:

- **Framework Preset**: None (Static Site)
- **Build Command**: `pnpm run build`
- **Output Directory**: `build`
- **Install Command**: `pnpm install`
- **Node Version**: 18.x or higher

### Manual Vercel Configuration (if needed)

If deploying through the Vercel dashboard, use these settings:

1. **Build Command**: `pnpm run build`
2. **Output Directory**: `build`
3. **Install Command**: `pnpm install`
4. **Framework Preset**: Other (or leave blank)

## 🎨 New UI Components

### ModernButton

- Variants: `primary`, `secondary`, `accent`, `outline`
- Sizes: `sm`, `md`, `lg`
- Includes hover effects, animations, and glassmorphism

### ModernCard

- Variants: `glass`, `solid`, `gradient`
- Optional glow effect
- Backdrop blur support

### ModernTopMenu

- Redesigned navigation with icons
- Gradient text effects
- Animated background glow

## 🧪 Testing Locally

Before deploying, test the production build locally:

```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build

# Preview the production build
pnpm run preview
```

## 🔧 Environment Variables

This project doesn't require any environment variables. All configuration is done through the code.

## 📝 Notes

- The game runs entirely in the browser
- No server-side logic required
- Uses localStorage for user-created tracks
- Campaign tracks are bundled with the app
- Physics simulation runs client-side using Rapier
- Three.js rendering via Threlte

## 🎮 Features

- **Campaign Mode**: Pre-made tracks with medals and time trials
- **Track Editor**: Create custom tracks in the browser
- **Import/Export**: Share tracks with others
- **Time Attack**: Race against your best times
- **Ghost Replay**: Race against your previous runs

## 🐛 Troubleshooting

### Build fails on Vercel

- Check that all dependencies are in package.json
- Ensure pnpm-lock.yaml is committed
- Verify Node version is 18.x or higher

### UI looks broken

- Clear browser cache
- Check that Tailwind CSS is building correctly
- Verify all component imports are correct

### Game doesn't load

- Check browser console for errors
- Ensure WebGL is supported
- Try disabling browser extensions

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

WebGL 2.0 support required for 3D rendering.

## 🎯 Performance Tips

1. Enable shadows only on capable devices
2. Disable post-processing on slower devices
3. Use the Options menu to adjust settings
4. Close other browser tabs during gameplay

## 📄 License

See the main README.md for license information.
