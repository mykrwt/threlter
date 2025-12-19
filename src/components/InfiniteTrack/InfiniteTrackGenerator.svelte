<script lang="ts">
	import { TrackData, type TrackElementType } from '$lib/TrackData/TrackData'
	import { useFrame } from '@threlte/core'
	import { onMount } from 'svelte'
	import type { CarState } from '../Car/RaycastVehicleController/types'
	import { shouldPlaceBoost, TILE_SIZE } from '$lib/InfiniteTrack/infiniteTrack'

	export let trackData: TrackData
	export let carState: CarState | undefined
	export let seed: string

	export let aheadTiles = 90
	export let behindTiles = 30

	type TileChunk = {
		index: number
		ids: string[]
	}

	let chunks: TileChunk[] = []
	let generatedMaxIndex = -1

	const addElementAtIndex = (type: TrackElementType, index: number) => {
		const el = trackData.addTrackElement(type, false)
		if (!el) return undefined
		el.setPosition([-index * TILE_SIZE, 0, 0])
		el.setRotation([0, 0, 0, 'XYZ'])
		return el
	}

	const addChunk = (index: number) => {
		const ids: string[] = []
		const floor = addElementAtIndex('HalfUnitBox', index)
		if (floor) ids.push(floor.id)

		if (index > 3 && shouldPlaceBoost(seed, index)) {
			const boost = addElementAtIndex('Boost', index)
			if (boost) ids.push(boost.id)
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
