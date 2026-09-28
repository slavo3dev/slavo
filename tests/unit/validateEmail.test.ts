import { describe, expect, it } from "vitest";
import { validateEmail } from "../../lib/helpers/validateEmail";

describe("newsletter email validation", () => {
  it("accepts an email address", () => {
    expect(validateEmail("learner@example.com")).toBeTruthy();
  });

  it("rejects an invalid address", () => {
    expect(validateEmail("not-an-email")).toBeFalsy();
  });
});