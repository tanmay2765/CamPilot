// Post-build script: injects API proxy rewrite into Nitro's Vercel output config
// so /api/* requests are forwarded to the Render backend.
import { readFileSync, writeFileSync } from "fs";

const configPath = ".vercel/output/config.json";
const config = JSON.parse(readFileSync(configPath, "utf-8"));

// Add API rewrite before the catch-all /__server route
const apiRoute = {
  src: "/api/(.*)",
  dest: "https://campaign-copilot.onrender.com/$1",
};

// Insert before the last route (the catch-all)
const lastIndex = config.routes.length - 1;
config.routes.splice(lastIndex, 0, apiRoute);

writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log("✅ Injected /api rewrite into .vercel/output/config.json");
