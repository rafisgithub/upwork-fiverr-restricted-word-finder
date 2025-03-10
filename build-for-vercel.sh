#!/bin/bash

# Build the client
echo "Building client..."
cd client
npm run build
cd ..

# Build the server
echo "Building server..."
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build complete. Ready for Vercel deployment."