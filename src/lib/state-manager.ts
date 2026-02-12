import type AppState from './app-state'
import type Subscriber from './subscriber'
import type { Location } from './types'

class StateManager {
  private state: AppState
  private subscribers: Subscriber[]

  constructor() {
    this.state = {
      selectedLocation: null,
    }
    this.subscribers = []
  }

  public subscribe(s: Subscriber) {
    this.subscribers.push(s)
  }

  public unsubscribe(s: Subscriber) {
    this.subscribers.filter((subscriber) => subscriber !== s)
  }

  public notifySubscribers() {
    this.subscribers.map((s) => s.update(this.state))
  }

  public set selectedLocation(location: Location | null) {
    this.state.selectedLocation = location
    this.notifySubscribers()
  }
}

// Pseudo-singleton
const stateManager = new StateManager()
export default stateManager
