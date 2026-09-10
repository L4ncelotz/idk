import { describe, expect, it } from "vitest";

import { readRuntimeEnvironment } from "./env.js";

describe("readRuntimeEnvironment", () => {
  it("parses a valid HOST and PORT", () => {
    expect(readRuntimeEnvironment({ HOST: "127.0.0.1", PORT: "4000" })).toEqual({
      host: "127.0.0.1",
      port: 4000,
    });
  });

  it("trims whitespace from HOST", () => {
    expect(readRuntimeEnvironment({ HOST: "  127.0.0.1  ", PORT: "4000" })).toEqual({
      host: "127.0.0.1",
      port: 4000,
    });
  });

  it("throws when HOST is missing", () => {
    expect(() => readRuntimeEnvironment({ PORT: "4000" })).toThrow(/HOST/);
  });

  it("throws when HOST is empty", () => {
    expect(() => readRuntimeEnvironment({ HOST: "   ", PORT: "4000" })).toThrow(/HOST/);
  });

  it("throws when PORT is missing", () => {
    expect(() => readRuntimeEnvironment({ HOST: "127.0.0.1" })).toThrow(/PORT/);
  });

  it("throws when PORT is not an integer", () => {
    expect(() => readRuntimeEnvironment({ HOST: "127.0.0.1", PORT: "abc" })).toThrow(/PORT/);
  });

  it("throws when PORT is 0", () => {
    expect(() => readRuntimeEnvironment({ HOST: "127.0.0.1", PORT: "0" })).toThrow(/PORT/);
  });

  it("throws when PORT is 65536", () => {
    expect(() => readRuntimeEnvironment({ HOST: "127.0.0.1", PORT: "65536" })).toThrow(/PORT/);
  });
});
