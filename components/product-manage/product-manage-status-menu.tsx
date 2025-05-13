import { productStatusParser } from "@/lib/productManageStatusMapper";
import { ProductManageStatusType } from "@/types/product-types";

interface IPros {
  productManageStatus: ProductManageStatusType;
  handleChangeManageStatus: (
    productManageStatus: ProductManageStatusType
  ) => void;
}

const STATUS_LIST = Object.values(productStatusParser);

export default function ProductManageStatusMenu({
  productManageStatus,
  handleChangeManageStatus
}: IPros) {
  return (
    <ul className="flex gap-3 text-sm mt-3 flex-wrap">
      {STATUS_LIST.map((menu: ProductManageStatusType) => (
        <li key={menu}>
          <button
            onClick={() => handleChangeManageStatus(menu)}
            className={`${productManageStatus === menu && "text-white bg-gray-700"} ${
              productManageStatus !== menu && "betterhover:hover:bg-gray-100"
            } border border-gray-400 rounded-md py-2 px-4`}
          >
            {menu}
          </button>
        </li>
      ))}
    </ul>
  );
}
