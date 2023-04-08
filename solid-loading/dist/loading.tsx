import { Component } from "solid-js"
import styles from "./loading.module.css"

export const LoadingCircle: Component<{ text?: string }> = (props) => {
  return (
    <div class={styles.loading_container}>
      <div class={styles.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>{props.text}</p>
    </div>
  )
}