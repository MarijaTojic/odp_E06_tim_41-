import type { Content } from "./Content";

export interface AddModalProps {
  modalContent?: Content | null; 
  onClose: () => void;
  onSave: (content: Content) => void;
}
