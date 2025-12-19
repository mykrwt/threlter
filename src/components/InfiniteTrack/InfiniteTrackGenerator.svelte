<script lang="ts">
	import type { TrackElementType, TrackData } from '$lib/TrackData/TrackData'
	import { useFrame } from '@threlte/core'
	import { onMount } from 'svelte'
	import type { CarState } from '../Car/RaycastVehicleController/types'
	import {
		curveZFromSeed,
		pickFloorType,
		shouldPlaceBoost,
		TILE_SIZE
	} from '$lib/InfiniteTrack/infiniteTrack'
	import { cyrb53 } from '$lib/utils/hash'
	import { useEvent } from '$hooks/useEvents'

	export let trackData: TrackData
	export let carState: CarState | undefined
	export let seed: string

	export let aheadTiles = 90
	export let behindTiles = 30

	type TileChunk = {
		index: number
		ids: string[]
	}

	const barrierTypes: TrackElementType[] = ['Barrier', 'DoubleBarrier', 'BarrierEnd']

	const randomUnit = (seed: string, index: number, salt = '') => {
		const hash = cyrb53(`${seed}:${salt}:${index}`)
		return (hash % 10_000) / 10_000
	}

	let chunks: TileChunk[] = []
	let generatedMaxIndex = -1

	const addElement = (type: TrackElementType, position: [number, number, number], ry = 0) => {
		const el = trackData.addTrackElement(type, false)
		if (!el) return undefined
		el.setPosition(position)
		el.setRotation([0, ry, 0, 'XYZ'])
		return el
	}

	const addChunk = (index: number) => {
		const ids: string[] = []

		const x = -index * TILE_SIZE
		const z = curveZFromSeed(seed, index, 'infinite')

		const floorType = pickFloorType(seed, index, 'infinite')
		const floor = addElement(floorType, [x, 0, z])
		if (floor) ids.push(floor.id)

		if (index > 3 && shouldPlaceBoost(seed, index)) {
			const boost = addElement('Boost', [x, 0, z])
			if (boost) ids.push(boost.id)
		}

		if (index > 10 && randomUnit(seed, index, 'barrier') < 0.12) {
			const type =
				barrierTypes[Math.floor(randomUnit(seed, index, 'barrier-type') * barrierTypes.length)]!
			const rotChoices = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]
			const ry = rotChoices[Math.floor(randomUnit(seed, index, 'barrier-rot') * rotChoices.length)]!
			const barrier = addElement(type, [x, 0, z], ry)
			if (barrier) ids.push(barrier.id)
		}

		if (index > 20 && index % 120 === 60) {
			const ry = randomUnit(seed, index, 'barrier-turn') < 0.5 ? 0 : Math.PI
			const barrierTurn = addElement('BarrierTurnLeft', [x, 0, z], ry)
			if (barrierTurn) ids.push(barrierTurn.id)
		}

		chunks.push({ index, ids })
	}

	const removeChunk = (chunk: TileChunk) => {
		for (const id of chunk.ids) {
			trackData.removeTrackElement(id, false)
		}
	}

	const ensureRange = (currentIndex: number) => {
		const desiredMax = currentIndex + aheadTiles
		while (generatedMaxIndex < desiredMax) {
			generatedMaxIndex += 1
			addChunk(generatedMaxIndex)
		}

		const desiredMin = Math.max(0, currentIndex - behindTiles)
		while (chunks.length > 0 && chunks[0]!.index < desiredMin) {
			const chunk = chunks.shift()!
			removeChunk(chunk)
		}
	}

	const reset = () => {
		const ids = trackData.trackElements.current.map((el) => el.id)
		for (const id of ids) {
			trackData.removeTrackElement(id, false)
		}
		chunks = []
		generatedMaxIndex = -1
		ensureRange(0)
	}

	let lastTrackId = ''
	$: if (trackData && trackData.trackId !== lastTrackId) {
		lastTrackId = trackData.trackId
		reset()
	}

	useEvent('reset-track-viewer', () => {
		reset()
	})

	onMount(() => {
		ensureRange(0)
	})

	useFrame(() => {
		if (!carState) return
		const x = carState.worldPosition.current[0]
		const currentIndex = Math.max(0, Math.floor(-x / TILE_SIZE))
		ensureRange(currentIndex)
	})
</script>
