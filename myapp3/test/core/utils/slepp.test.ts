import { describe, it, expect, vi } from "vitest";
import { sleep } from "../../../src/core/utils/sleep";

describe("sleep function", () => {
  it("debe resolverse después del tiempo indicado", async () => {
    const result = await sleep(5);
    expect(result).toBe(true);
  });

  it("debe esperar el tiempo especificado", () => {
    vi.useFakeTimers();
    const sleepPromise = sleep(1000);
    vi.advanceTimersByTime(1000);
    return expect(sleepPromise).resolves.toBe(true);
  });
});