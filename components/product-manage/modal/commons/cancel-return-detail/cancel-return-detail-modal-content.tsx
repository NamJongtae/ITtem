interface IProps {
  name: string;
  value: string | number;
}
export default function CancleReturnDetailModalContent({
  name,
  value,
}: IProps) {
  return (
    <div className="border-b border-gray-300 pb-2">
      <span className="font-medium w-20 inline-block">{name}</span>
      <span>{value}</span>
    </div>
  );
}
