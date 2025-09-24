import { checkValidData } from "../utils/validate";

test("returns error for invalid email", () => {
  const result = checkValidData("WrongEmail", "password123");
  expect(result).toBe("Invalid email address");
});

test("returns error for short password", () => {
  const result = checkValidData("test@example.com", "12");
  expect(result).toBe("Password must be at least 6 characters");
});

test("returns null for valid email & password", () => {
  const result = checkValidData("test@example.com", "password123");
  expect(result).toBe(null);
});
