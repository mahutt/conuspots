import { beforeEach, describe, expect, it, vi } from 'vitest'

import type Subscriber from '../../src/lib/subscriber'
import type { Location } from '../../src/lib/types'
import { LocationType } from '../../src/lib/types'

describe('state manager', () => {
  let stateManager: (typeof import('../../src/lib/state-manager'))['default']

  beforeEach(async () => {
    vi.resetModules()
    ;({ default: stateManager } = await import('../../src/lib/state-manager'))
  })

  it('notifies subscribed subscribers when selected location changes', () => {
    const update = vi.fn()
    const subscriber: Subscriber = { update }
    const location: Location = {
      type: LocationType.Campus,
      name: 'Moffett Campus',
      ref: 'moffett-campus',
    }

    stateManager.subscribe(subscriber)
    stateManager.selectedLocation = location

    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith({ selectedLocation: location })
  })

  it('notifies all subscribed subscribers', () => {
    const firstUpdate = vi.fn()
    const secondUpdate = vi.fn()
    const firstSubscriber: Subscriber = { update: firstUpdate }
    const secondSubscriber: Subscriber = { update: secondUpdate }

    stateManager.subscribe(firstSubscriber)
    stateManager.subscribe(secondSubscriber)
    stateManager.selectedLocation = null

    expect(firstUpdate).toHaveBeenCalledTimes(1)
    expect(secondUpdate).toHaveBeenCalledTimes(1)
    expect(firstUpdate).toHaveBeenCalledWith({ selectedLocation: null })
    expect(secondUpdate).toHaveBeenCalledWith({ selectedLocation: null })
  })

  it('does not notify unsubscribed subscribers', () => {
    const update = vi.fn()
    const subscriber: Subscriber = { update }

    stateManager.subscribe(subscriber)
    stateManager.unsubscribe(subscriber)
    stateManager.selectedLocation = null

    expect(update).not.toHaveBeenCalled()
  })
})
