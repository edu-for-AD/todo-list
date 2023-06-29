import { FC } from 'react'
import './Modal.css'

interface ModalProps {
  isOpen: boolean
  title?: string
  body?: string
  confirmModalCallback?: () => void
  cancelModalCallback?: () => void
  editing: boolean
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  title,
  body,
  confirmModalCallback,
  cancelModalCallback,
  editing
}) => {
  const closeModal = () => {
    if (typeof cancelModalCallback === 'function') {
      cancelModalCallback()
    }
  }
  return isOpen ? (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">{title ?? ''}</h1>
        </div>
        <div className="modal-body">
          {body ?? ''}
          {editing && (
            <>
              <input type="text" value={'title'} />
              <input type="text" value={'Description'} />
            </>
          )}
        </div>
        <div className="moda-footer">
          <button
            onClick={() => {
              if (typeof confirmModalCallback === 'function') {
                confirmModalCallback()
              }
            }}
          >
            CONFIRM
          </button>
          <button
            onClick={() => {
              if (typeof cancelModalCallback === 'function') {
                cancelModalCallback()
              }
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  ) : null
}
