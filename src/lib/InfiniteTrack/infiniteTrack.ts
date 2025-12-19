import { TrackData, type TrackElementType } from '$lib/TrackData/TrackData'
import { cyrb53 } from '$lib/utils/hash'

export const TILE_SIZE = 10

export type ProceduralTrackMode = 'infinite' | 'friends'

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

const randomUnitFromSeed = (seed: string, index: number, salt = '') => {
	const hash = cyrb53(`${seed}:${salt}:${index}`)
	return (hash % 10_000) / 10_000
}

export const shouldPlaceBoost = (seed: string, index: number) => {
	return randomUnitFromSeed(seed, index, 'boost') < 0.12
}

export const curveZFromSeed = (seed: string, index: number, mode: ProceduralTrackMode) => {
	const base = cyrb53(`${seed}:${mode}:curve`) % 10_000
	const t = (index + base) * (mode === 'friends' ? 0.08 : 0.06)
	const t2 = (index + base * 0.7) * (mode === 'friends' ? 0.03 : 0.02)

	const a1 = mode === 'friends' ? 18 : 14
	const a2 = mode === 'friends' ? 9 : 7

	const z = Math.sin(t) * a1 + Math.sin(t2) * a2
	return clamp(z, -28, 28)
}

const floorTileTypes: TrackElementType[] = [
	'HalfUnitBox',
	'Box',
	'HalfBox',
	'Slope',
	'Ramp',
	'RampInverse',
	'TiltTransitionLeft',
	'TiltTransitionRight',
	'TiltTransitionLeftLong',
	'TiltTransitionRightLong',
	'TransitionFullMediumBend',
	'TiltFullMediumBend',
	'TiltFullTightBend'
]

const pickWeighted = <T>(
	seed: string,
	index: number,
	salt: string,
	items: readonly T[],
	weights: number[]
) => {
	const r = randomUnitFromSeed(seed, index, salt)
	let acc = 0
	for (let i = 0; i < items.length; i++) {
		acc += weights[i] ?? 0
		if (r <= acc) return items[i]!
	}
	return items[items.length - 1]!
}

export const pickFloorType = (
	seed: string,
	index: number,
	mode: ProceduralTrackMode
): TrackElementType => {
	if (index < 6) return 'HalfUnitBox'

	const showcaseEvery = mode === 'friends' ? 12 : 60
	if (index % showcaseEvery === Math.floor(showcaseEvery / 2)) {
		return floorTileTypes[Math.floor(index / showcaseEvery) % floorTileTypes.length]!
	}

	return pickWeighted(
		seed,
		index,
		`${mode}:floor`,
		floorTileTypes,
		[0.685, 0.08, 0.06, 0.06, 0.05, 0.05, 0.01, 0.01, 0.005, 0.005, 0.02, 0.01, 0.01]
	)
}

const shouldPlaceBarrier = (seed: string, index: number, mode: ProceduralTrackMode) => {
	if (index < 8) return false
	return randomUnitFromSeed(seed, index, `${mode}:barrier`) < (mode === 'friends' ? 0.16 : 0.12)
}

const pickBarrierType = (seed: string, index: number): TrackElementType => {
	return pickWeighted(
		seed,
		index,
		'barrier-type',
		['Barrier', 'DoubleBarrier', 'BarrierEnd'],
		[0.55, 0.3, 0.15]
	)
}

const pickRotationY = (seed: string, index: number, salt: string) => {
	const r = randomUnitFromSeed(seed, index, salt)
	if (r < 0.25) return 0
	if (r < 0.5) return Math.PI / 2
	if (r < 0.75) return Math.PI
	return (3 * Math.PI) / 2
}

export const createFriendsRaceTrackData = (params: {
	seed: string
	authorName: string
	lengthTiles?: number
}) => {
	const { seed, authorName, lengthTiles = 160 } = params

	const trackData = TrackData.createEmpty()
	trackData.trackId = `FriendsRace-${seed}`
	trackData.trackName.set(`Friends Race · ${seed}`)
	trackData.authorName.set(authorName)

	const add = (type: TrackElementType, x: number, y: number, z: number, ry = 0) => {
		const el = trackData.addTrackElement(type, false)
		if (!el) return
		el.setPosition([x, y, z])
		el.setRotation([0, ry, 0, 'XYZ'])
	}

	for (let i = 0; i < lengthTiles; i++) {
		const x = -i * TILE_SIZE
		const z = curveZFromSeed(seed, i, 'friends')

		const isCheckpointZone =
			i === Math.floor(lengthTiles / 3) ||
			i === Math.floor((2 * lengthTiles) / 3) ||
			i >= lengthTiles - 3
		add(isCheckpointZone ? 'HalfUnitBox' : pickFloorType(seed, i, 'friends'), x, 0, z)

		if (i > 4 && i < lengthTiles - 10 && shouldPlaceBoost(seed, i)) {
			add('Boost', x, 0, z)
		}

		if (shouldPlaceBarrier(seed, i, 'friends')) {
			add(pickBarrierType(seed, i), x, 0, z, pickRotationY(seed, i, 'barrier-rot'))
		}
	}

	const barrierTurnIndex = Math.floor(lengthTiles / 2)
	add(
		'BarrierTurnLeft',
		-barrierTurnIndex * TILE_SIZE,
		0,
		curveZFromSeed(seed, barrierTurnIndex, 'friends'),
		randomUnitFromSeed(seed, barrierTurnIndex, 'barrier-turn') < 0.5 ? 0 : Math.PI
	)

	const checkpoint1 = Math.floor(lengthTiles / 3)
	const checkpoint2 = Math.floor((2 * lengthTiles) / 3)
	add('Checkpoint', -checkpoint1 * TILE_SIZE, 0, curveZFromSeed(seed, checkpoint1, 'friends'))
	add('CheckpointRing', -checkpoint2 * TILE_SIZE, 0, curveZFromSeed(seed, checkpoint2, 'friends'))
	add('Finish', -(lengthTiles - 1) * TILE_SIZE, 0, curveZFromSeed(seed, lengthTiles - 1, 'friends'))

	trackData.validate(600_000, false)

	return trackData
}
