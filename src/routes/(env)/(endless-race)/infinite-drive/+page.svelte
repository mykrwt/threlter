<script lang="ts">
	import { page } from '$app/stores'
	import InfiniteDrive from '$components/InfiniteDrive/InfiniteDrive.svelte'
	import { TrackData } from '$lib/TrackData/TrackData'
	import { appState } from '$stores/app'

	const makeSeed = () => {
		const num = crypto.getRandomValues(new Uint32Array(1))[0]!
		return num.toString(36).toUpperCase()
	}

	let fallbackSeed = makeSeed()

	let seed = fallbackSeed
	let trackData: TrackData

	$: seed = $page.url.searchParams.get('seed')?.trim() || fallbackSeed

	$: trackData = (() => {
		const td = TrackData.createEmpty()
		td.trackId = `InfiniteDrive-${seed}`
		td.trackName.set('Infinite Drive')
		td.authorName.set(appState.options.player.name.current)
		return td
	})()
</script>

<InfiniteDrive {trackData} {seed} />
