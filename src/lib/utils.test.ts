import { describe, it, expect } from "vitest";
import { formatMoney, shortAddr } from "@/lib/utils";

describe("utils", () => {
  it("formats money", () => {
    expect(formatMoney(1234.5, "USD")).toBe("$1,234.50");
  });
  it("shortens address", () => {
    expect(shortAddr("0xabcdef1234567890")).toBe("0xabcd...7890");
  });
});