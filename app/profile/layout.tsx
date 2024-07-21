interface IProps {
  children: React.ReactNode;
  edit: React.ReactNode;
}

export default function Layout({ children, edit }: IProps) {
  return (
    <>
      {edit}
      {children}
    </>
  );
}
