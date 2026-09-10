export interface RuntimeEnvironment {
  host: string;
  port: number;
}

const MIN_PORT = 1;
const MAX_PORT = 65535;

function readHost(env: NodeJS.ProcessEnv): string {
  const raw = env.HOST;

  if (raw === undefined) {
    throw new Error("HOST is missing: set HOST to a non-empty hostname or IP address.");
  }

  const host = raw.trim();

  if (host.length === 0) {
    throw new Error("HOST is empty: set HOST to a non-empty hostname or IP address.");
  }

  return host;
}

function readPort(env: NodeJS.ProcessEnv): number {
  const raw = env.PORT;

  if (raw === undefined) {
    throw new Error("PORT is missing: set PORT to an integer between 1 and 65535.");
  }

  const trimmed = raw.trim();

  if (trimmed.length === 0) {
    throw new Error("PORT is empty: set PORT to an integer between 1 and 65535.");
  }

  if (!/^\d+$/.test(trimmed)) {
    throw new Error(`PORT is not an integer: "${raw}" is not a valid port number.`);
  }

  const port = Number.parseInt(trimmed, 10);

  if (!Number.isInteger(port) || port < MIN_PORT || port > MAX_PORT) {
    throw new Error(
      `PORT is out of range: "${raw}" must be an integer between ${MIN_PORT} and ${MAX_PORT}.`,
    );
  }

  return port;
}

export function readRuntimeEnvironment(env: NodeJS.ProcessEnv): RuntimeEnvironment {
  return {
    host: readHost(env),
    port: readPort(env),
  };
}
