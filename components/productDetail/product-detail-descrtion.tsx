interface IProps {
  description: string | undefined;
}

export default function ProductDetailDescrtion({ description }: IProps) {
  return (
    <section className="basis-2/3">
      <h3 className="text-gray-600 text-xl font-medium">상품정보</h3>
      <hr className="h-px border-0 bg-gray-500 my-3" />
      <p className="whitespace-pre-wrap text-md">{description}</p>
    </section>
  );
}
