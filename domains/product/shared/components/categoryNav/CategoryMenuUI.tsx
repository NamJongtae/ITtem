import CategoryList from "./CategoryList";
import CategoryMobileMenu from "./CategoryMobileMenu";

type Props = {
  currentCategoryId: number;
  makeHref: (id: number) => string;
};

export default function CategoryMenuUI({ currentCategoryId, makeHref }: Props) {
  return (
    <div className="container mx-auto max-w-7xl">
      <CategoryList currentCategoryId={currentCategoryId} makeHref={makeHref} />
      <CategoryMobileMenu
        currentCategoryId={currentCategoryId}
        makeHref={makeHref}
      />
    </div>
  );
}
