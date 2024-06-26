export default function useScrollToTop() {
  const handleClickTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return { handleClickTop };
}
