import "server-only";
import pino from "pino";

const isDev = process.env.NODE_ENV === "development";

let logger: pino.Logger;

if (isDev) {
  const pretty = await import("pino-pretty");
  const stream = pretty.default({
    colorize: true,
    translateTime: "SYS:standard",
    ignore: "pid,hostname",
    singleLine: false,
  });

  logger = pino(
    {
      level: "debug",
      base: undefined,
    },
    stream,
  );
} else {
  logger = pino({
    level: "info",
    base: undefined,
  });
}

export { logger };
