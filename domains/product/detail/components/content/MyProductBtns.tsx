import EditBtn from "./EditBtn";
import DeleteBtn from "./Delete-btn";
import { ProductStatus } from "../../../shared/types/productTypes";

interface IProps {
  productStatus: ProductStatus | undefined;
}

export default function MyProductBtns({ productStatus }: IProps) {
  return (
    <>
      <EditBtn productStatus={productStatus} />
      <DeleteBtn productStatus={productStatus} />
    </>
  );
}
