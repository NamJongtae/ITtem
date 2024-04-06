import Link from "next/link";
import Image from "next/image";

export default function NavAvata() {
  return (
    <Link className="relative inline-block" href="/profile">
      <Image
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
        className="border-2 border-gray-300 inline-block h-9 w-9 cursor-pointer rounded-full object-cover object-center"
        width={36}
        height={36}
        alt="Jon"
      />
      <p className="relative hidden lg:inline">
        <span className="font-semibold ml-2">{"Jon"}</span> 님
      </p>
    </Link>
  );
}
