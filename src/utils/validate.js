export const checkValidData = (email, password, name = null) => {
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^.{6,}$/; // Minimum 6 chars
  const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/; // Optional, tweak as needed

  if (!emailRegex.test(email)) return "Invalid email address";
  if (!passwordRegex.test(password))
    return "Password must be at least 6 characters";
  if (name !== null && name.trim() !== null && !nameRegex.test(name))
    return "Enter full name (first and last)";
  return null; // All good
};
