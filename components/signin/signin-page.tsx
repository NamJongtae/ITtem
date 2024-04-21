import SigninForm from "./signin-form";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function SigninPage() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="absolute inset-0 border p-5  pt-[112px]  bg-gray-100">
        <h2 className="sr-only">로그인</h2>
        <SigninForm />
      </div>
    </GoogleOAuthProvider>
  );
}
