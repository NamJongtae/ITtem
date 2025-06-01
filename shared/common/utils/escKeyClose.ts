export function escKeyClose({
  event,
  closeCb
}: {
  event: React.KeyboardEvent<HTMLElement>;
  closeCb: () => void;
}) {
  if (event.keyCode === 27) {
    closeCb();
  }
}
