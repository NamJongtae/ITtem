export default async function comparePassword (
  password: string,
  hashedPassword: string
) {
  try {
    const { compare } = await import("bcryptjs");

    const isVerification = await compare(password, hashedPassword);
    return isVerification;
  } catch (error) {
    throw error;
  }
}
