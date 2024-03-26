import { Dialog } from "@headlessui/react";

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  closeBtnLabel?: string;
  submitBtn?: React.ReactNode;
  modalTitle: string | React.ReactNode;
  modalDescription?: React.ReactNode;
  modalBody: React.ReactNode;
};

const BaseModal = ({
  isOpen,
  onClose,
  closeBtnLabel,
  submitBtn,
  modalTitle,
  modalDescription,
  modalBody,
}: BaseModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-black/25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {modalTitle}
            </Dialog.Title>
            {modalDescription && (
              <Dialog.Description>
                This will permanently deactivate your account
              </Dialog.Description>
            )}

            <div className="mt-4">{modalBody}</div>

            <div className="mt-4 flex items-center gap-2">
              {submitBtn}
              <button className="btn" onClick={onClose}>
                {closeBtnLabel ?? "Cancel"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default BaseModal;
