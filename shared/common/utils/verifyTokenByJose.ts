export async function verifyTokenByJose(token: string, secret: string) {
  try {
    const { jwtVerify } = await import("jose");
    const {
      payload
    }: { payload: { user: { uid: string }; lat: number; exp: number } } =
      await jwtVerify(token, new TextEncoder().encode(secret));
    return { isValid: true, data: payload };
  } catch (error) {
    if (error instanceof Error) {
      return { isValid: false, message: error.message };
    }
  }
}
