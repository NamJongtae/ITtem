import BuyIcon from "@/public/icons/money_icon.svg";
export default function ProductDetailBuyBtn() {
  return (
    <button
      type="button"
      className="px-4 py-2 flex items-center gap-2 bg-red-600 text-white text-sm font-medium rounded hover:betterhover:bg-red-500 focus:outline-none focus:bg-red-500 md:px-6"
    >
      <BuyIcon className={"fill-white w-4 h-4"} /> 바로구매
    </button>
  );
}
