import Portal from "@/components/commons/portal/Portal";

interface IProps {
  closeModal: () => void;
  children: React.ReactNode;
}
export default function ProductManageModal({ closeModal, children }: IProps) {
  return (
    <Portal>
      <div
        onClick={closeModal}
        className="fixed bg-black bg-opacity-50 inset-0 z-30"
        role="modal-backdrop"
      />
      {children}
    </Portal>
  );
}
