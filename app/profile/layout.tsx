interface IProps {
  children: React.ReactNode;
  edit: React.ReactNode;
  passwordChange: React.ReactNode;
}

export default function Layout({ children, edit, passwordChange }: IProps) {
  return (
    <>
      {edit}
      {passwordChange}
      {children}
    </>
  );
}
