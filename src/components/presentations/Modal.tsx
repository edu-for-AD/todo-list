import { FC } from 'react'

interface ModalProps {
  isOpen: boolean
  title: string
  body: string
  confirmCallback: () => any
  cancelCallback: () => any
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  title,
  body,
  confirmCallback,
  cancelCallback
}) => {
  const handleConfirm = () => {
    confirmCallback()
  }
  const handleCancel = () => {
    cancelCallback()
  }
  return isOpen ? (
    <div>
      <div className="modal-header">
        <h1 className="modal-title">{title}</h1>
      </div>
      <div className="modal-body">{body}</div>
      <div className="moda-footer">
        <button onClick={handleConfirm}>CONFIRM</button>
        <button onClick={handleCancel}>CANCEL</button>
      </div>
    </div>
  ) : null
}
