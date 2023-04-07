import { JSXElement } from "solid-js";

export interface ModalProviderProps {
  children?: JSXElement
}

type ModalSizing = "default" | "maximize" | "fullscreen"

export interface ModalComponentProps {
  title?: string
  element?: JSXElement
  hideCloseButton?: boolean
  centerTitle?: boolean
  class?: string
  onClose?: Function
  onOpen?: Function
  openOnCreate?: boolean
  sizing: "default" | ModalSizing
}

export interface createModalProps extends ModalComponentProps {
  // Additional properties?
}