import { TrackData, type TrackElementType } from '$lib/TrackData/TrackData'
import { cyrb53 } from '$lib/utils/hash'

export const TILE_SIZE = 10

const randomUnitFromSeed = (seed: string, index: number) => {
	const hash = cyrb53(`${seed}:${index}`)
	return (hash % 10_000) / 10_000
}

export const shouldPlaceBoost = (seed: string, index: number) => {
	return randomUnitFromSeed(seed, index) < 0.12
}

export const createFriendsRaceTrackData = (params: {
	seed: string
	authorName: string
	lengthTiles?: number
}) => {
	const { seed, authorName, lengthTiles = 140 } = params

	const trackData = TrackData.createEmpty()
	trackData.trackId = `FriendsRace-${seed}`
	trackData.trackName.set(`Friends Race · ${seed}`)
	trackData.authorName.set(authorName)

	const add = (type: TrackElementType, x: number, y: number, z: number) => {
		const el = trackData.addTrackElement(type, false)
		if (!el) return
		el.setPosition([x, y, z])
		el.setRotation([0, 0, 0, 'XYZ'])
	}

	for (let i = 0; i < lengthTiles; i++) {
		const x = -i * TILE_SIZE
		add('HalfUnitBox', x, 0, 0)
		if (i > 4 && i < lengthTiles - 10 && shouldPlaceBoost(seed, i)) {
			add('Boost', x, 0, 0)
		}
	}

	add('Checkpoint', -Math.floor(lengthTiles / 3) * TILE_SIZE, 0, 0)
	add('Checkpoint', -Math.floor((2 * lengthTiles) / 3) * TILE_SIZE, 0, 0)
	add('Finish', -(lengthTiles - 1) * TILE_SIZE, 0, 0)

	trackData.validate(600_000, false)

	return trackData
}
