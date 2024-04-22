import SigninForm from "./signin-form";

export default function SigninPage() {
  return (
      <div className="absolute inset-0 border p-5  pt-[112px]  bg-gray-100">
        <h2 className="sr-only">로그인</h2>
        <SigninForm />
      </div>
  );
}
