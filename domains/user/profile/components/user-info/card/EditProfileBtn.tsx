import Link from "next/link";

export default function EditProfileBtn() {
  return (
    <>
      <Link
        href={"/profile/edit"}
        className="border py-2 px-4 w-full betterhover:hover:bg-gray-100 text-center"
        prefetch={false}
        scroll={false}
      >
        프로필 수정
      </Link>
    </>
  );
}
