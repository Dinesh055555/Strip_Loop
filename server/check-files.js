// Runs before the build. If files are missing (usually because a folder was
// not uploaded to GitHub), it names them so they are easy to fix.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "vite.config.js", "tailwind.config.js", "client/index.html", "client/src/main.jsx", "client/src/App.jsx",
  "client/src/index.css", "client/src/lib/api.js", "client/src/lib/format.js", "client/src/lib/i18n.js",
  "client/src/lib/live.jsx", "client/src/lib/router.jsx", "client/src/components/ui.jsx", "client/src/components/custody.jsx",
  "client/src/views/Overview.jsx", "client/src/views/Collector.jsx", "client/src/views/Aggregation.jsx", "client/src/views/Hub.jsx",
  "client/src/views/Client.jsx", "client/src/views/Admin.jsx", "client/src/views/Credit.jsx", "client/src/views/Impact.jsx",
  "client/src/views/Verify.jsx", "client/src/views/Labels.jsx", "client/public/favicon.svg",
  "server/index.js", "server/api.js", "server/services.js", "server/store.js", "server/seed.js",
];
const missing = required.filter((f) => !fs.existsSync(path.join(root, f)));
if (missing.length) {
  console.error("\nThese files are missing from the repository:\n  " + missing.join("\n  "));
  console.error("\nUpload them to GitHub in the same folders, then deploy again.\n");
  process.exit(1);
}
console.log(`All ${required.length} required files found.`);
