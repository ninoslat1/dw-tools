import type { Dispatch, SetStateAction } from "react"

export const animateTo = (setProgress: Dispatch<SetStateAction<number>> ,target: number, speed = 10) => {
  setProgress((current: number) => {
    if (current >= target) return current

    const diff = target - current
    const step = Math.max(1, Math.floor(diff / speed))

    return Math.min(current + step, target)
  })
}
