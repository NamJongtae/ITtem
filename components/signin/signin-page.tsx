import SigninForm from "./signin-form";

export default function SigninPage() {
  return (
    <div className="w-full h-[calc(100vh-113px)] bg-gray-100 overflow-hidden fixed">
      <h2 className="sr-only">로그인</h2>
      <SigninForm />
    </div>
  );
}
