import Portal from "./portal/Portal";

export default function Loading() {
  return (
    <Portal>
      <div className="absolute z-50 inset-0 bg-white bg-opacity-50">
        <div className="absolute center flex gap-2">
          <span className="sr-only">Loading...</span>
          <div className="h-3 w-3 rounded-full animate-bounceOpacity [animation-delay:-0.3s]"></div>
          <div className="h-3 w-3 rounded-full animate-bounceOpacity [animation-delay:-0.15s]"></div>
          <div className="h-3 w-3 rounded-full animate-bounceOpacity"></div>
        </div>
      </div>
    </Portal>
  );
}
