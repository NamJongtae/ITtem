export async function verifyToken(token: string, secret: string) {
  try {
    const jwt = await import("jsonwebtoken");
    const decode = jwt.verify(token, secret);
    return {
      isValid: true,
      message: "Valid Token.",
      data: decode as { user: { uid: string }; lat: number; exp: number }
    };
  } catch (error) {
    if (error instanceof Error) {
      return { isValid: false, message: error.message };
    }
  }
}
