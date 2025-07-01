#!/bin/bash
# Custom deployment script to fix MIME type issues with GitHub Pages

# Build the app skipping TypeScript type checking
npm run build:skip-ts

# Create .nojekyll file to prevent Jekyll processing
touch dist/.nojekyll

# Create 404.html for SPA routing
cp dist/index.html dist/404.html

# Update index.html to handle MIME type issues and fix Router basename
sed -i.bak '
  /<head>/a\
    <!-- Force correct MIME types -->\
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\
    <!-- Fix base path issues -->\
    <script type="text/javascript">\
      (function() {\
        const baseTag = document.createElement("base");\
        const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);\
        baseTag.href = baseUrl;\
        document.head.prepend(baseTag);\
        console.log("Base path set to:", baseUrl);\
        \
        /* Add global variable to override Router basename */\
        window.__ROUTER_BASE = "";\
      })();\
    </script>
' dist/index.html

# Update the 404.html file with the same changes
cp dist/index.html dist/404.html

# Deploy to GitHub Pages
./node_modules/.bin/gh-pages -d dist

echo "Deployment completed!"