import css from './Modal.module.css'
import React from 'react'

type Props = {
  isOpen: boolean
  children: any
}

const Modal = ({ isOpen, children }: Props) =>
  !isOpen ? null : (
    <div className={css.backdrop}>
      <div className={css.container}>
        <div className={css.component}>{children}</div>
      </div>
    </div>
  )

export default Modal
