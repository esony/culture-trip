import css from './Modal.module.css'
import React from 'react'

type Props = {
  isOpen: boolean
  children: any
}

const Modal = ({ isOpen, children }: Props) =>
  !isOpen ? null : (
    <div className={css.backdrop}>
      <section className={css.container}>{children}</section>
    </div>
  )

export default Modal
