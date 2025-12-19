import type { CurrentWritable } from '@threlte/core'
import type { Updater } from 'svelte/store'

export const persist = <T>(store: CurrentWritable<T>, key: string) => {
	const canUseLocalStorage = typeof localStorage !== 'undefined'

	const save = () => {
		if (!canUseLocalStorage) return
		try {
			localStorage.setItem(key, JSON.stringify({ value: store.current }))
		} catch (error) {
			void error
		}
	}

	const s: CurrentWritable<T> = {
		subscribe: store.subscribe,
		current: store.current,
		set: (v: T) => {
			store.set(v)
			s.current = store.current
			save()
		},
		update: (fn: Updater<T>) => {
			store.update(fn)
			s.current = store.current
			save()
		}
	}

	if (canUseLocalStorage) {
		try {
			const localStorageValue = localStorage.getItem(key)
			if (localStorageValue) {
				const parsed: unknown = JSON.parse(localStorageValue)
				if (typeof parsed === 'object' && parsed !== null && 'value' in parsed) {
					s.set((parsed as { value: T }).value)
				}
			}
		} catch (error) {
			void error
		}
	}

	return s
}
