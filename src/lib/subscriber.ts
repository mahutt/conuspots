import type AppState from './app-state'

export default interface Subscriber {
  update: (state: AppState) => void
}
