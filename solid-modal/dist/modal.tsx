import { Component, createEffect, createSignal, JSXElement, onMount, Show } from "solid-js"
import { createModalProps, ModalComponentProps, ModalProviderProps } from "../types"
import styles from "./modal.module.css"

const [modalProviderInstances, setModalProviderInstances] = createSignal(0);
const [activeModal, setActiveModal] = createSignal<JSXElement>(null);

// Remove current modal
const removeModalFromActive = () => {
  setActiveModal(modal => null)
}

// Set a modal as active, removing the current one
const setModalToActive = (modal: JSXElement) => {
  setActiveModal(current => modal)
}

/**
 * Creates a modal that can be shown and hidden with functions returned
 * @returns {Array} Array consisting of the functions show and close
 */
export const createModal = (props: createModalProps) => {
  // Generate modal with props
  const modal = <Modal {...props} />

  // Run onOpen function and open modal
  const open = () => {
    props.onOpen && props.onOpen()
    setModalToActive(modal)
  }

  // Run onClose function and close modal
  const close = () => {
    props.onClose && props.onClose()
    removeModalFromActive()
  }

  if (props.openOnCreate === true) {
    onMount(() => {
      open()
    })
  }

  return [open, close]
}

const Modal: Component<ModalComponentProps> = (props) => {
  return (
    <div class={styles.modal} classList={{ [styles[props.sizing]]: true }}>
      <div
        classList={{ [styles.centerTitle]: props.centerTitle === true }}
        id={styles.modalHeader}>
        <h2>{props.title || 'Title'}</h2>
        <Show when={props.hideCloseButton !== true}>
          <button id={styles.closeModal} onClick={removeModalFromActive}>
            &#10006;
          </button>
        </Show>
      </div>
      <div
        id={styles.modalElements}
        classList={{ [props.class || ""]: typeof props.class === 'string' }}>
        <Show when={props.element}>{props.element}</Show>
      </div>
    </div>
  )
}

/**
 * A provider placing a container which will contain the active Modal components
 */
export const ModalProvider: Component<ModalProviderProps> = (props) => {
  if (modalProviderInstances() > 0) {
    console.warn("Skipped generating a ModalProvider: Only on instance allowed.")
    return null
  }

  // Set number of instances to 1
  setModalProviderInstances(e => e += 1)

  const handleClick = (e: MouseEvent) => {
    const target = e.currentTarget as Element
    if (target === this) {
      console.log("Should close")
    }
  }
  
  return (
    <>
      <Show when={activeModal() !== null}>
        <div id={styles["modal-container"]}>{activeModal()}</div>
      </Show>
      {props.children}
    </>
  )
}