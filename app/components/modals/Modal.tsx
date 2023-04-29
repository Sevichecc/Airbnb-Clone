'use client'

import { useCallback, useEffect, useState } from 'react'

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: string
  footer?: string
  actionLabel: string
  disabled?: boolean
  secondaryAction?: () => void
  secondaryLabel?: string
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => setShowModal(isOpen), [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) return

    setShowModal(false)
    setTimeout(() => onClose(), 300)
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) return

    onSubmit()
  }, [disabled, onSubmit])

  const handleSeconderyAciton = useCallback(() => {
    if (disabled || !secondaryAction) return

    secondaryAction()
  }, [disabled, secondaryAction])
  return (
    <>
      <div
        className='
          justify-center 
          items-center 
          flex
          overflow-x-auto
          overflow-y-auto
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          bg-neutral-800/70
          '
      >
        <div
          className='
            relative
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            lg:h-auto
            md:h-auto
            '
        >
          {/* CONTENT */}
          <div
            className={`
              translate
              duration-300
              h-full
              ${
                showModal
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-full opacity-0'
              }
            `}
          >
            <div
              className='
                translate
                h-full
                lg:h-auto
                md:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
            '
            >
              {/* HEADER */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
