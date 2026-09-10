import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";

import { buildApiApp } from "./app.js";
import { readRuntimeEnvironment } from "@rupture/config";

// Load this app's environment so behavior does not depend on the process cwd.
// `pnpm --filter` runs from the workspace root; without an explicit path dotenv
// would search there and never find this app's local values.
// A local .env takes precedence; when absent (fresh checkout) we fall back to
// .env.example so the app boots without manual copy. Real process env vars
// (e.g. HOST/PORT set by Compose) always win over file values.
const envDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(envDir, ".env");
const examplePath = path.join(envDir, ".env.example");
dotenv.config({ path: fs.existsSync(envPath) ? envPath : examplePath });

const environment = readRuntimeEnvironment(process.env);
const app = await buildApiApp();

await app.listen({ host: environment.host, port: environment.port });
