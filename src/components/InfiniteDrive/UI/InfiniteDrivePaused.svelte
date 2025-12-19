<script lang="ts">
	import { useGamepad } from '@threlte/extras'
	import { useKeyDown } from '$hooks/useKeyDown'
	import type { TrackData } from '$lib/TrackData/TrackData'
	import BottomScreenTrackName from '$components/UI/components/BottomScreenTrackName.svelte'
	import CurrentTime from '$components/UI/components/CurrentTime.svelte'
	import SpecialButton from '$components/UI/components/SpecialButton.svelte'
	import TopBarLayout from '$components/UI/layouts/TopBarLayout.svelte'

	export let proceed: () => void
	export let restart: () => void
	export let trackData: TrackData
	export let time: number

	const gamepad = useGamepad()

	gamepad.start.on('press', proceed)
	useKeyDown('Escape', proceed)
	useKeyDown('p', proceed)
</script>

<BottomScreenTrackName title={trackData.trackName.current} />

<CurrentTime {time} />

<TopBarLayout>
	<SpecialButton slot="topbar-left" href="/menu/main">Menu</SpecialButton>
	<SpecialButton slot="topbar-center" forceFocusOnMount on:click={proceed}>Resume</SpecialButton>
	<SpecialButton slot="topbar-right" on:click={restart}>Restart</SpecialButton>
</TopBarLayout>
