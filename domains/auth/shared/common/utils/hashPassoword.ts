export default async function hashPassword(password: string) {
  try {
    const { hash } = await import("bcryptjs");

    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
