<script lang="ts">
	import type { TrackData } from '$lib/TrackData/TrackData'
	import CommonGamePlay from '$components/CommonGamePlay/CommonGamePlay.svelte'
	import InfiniteDriveIntro from './UI/InfiniteDriveIntro.svelte'
	import InfiniteDrivePaused from './UI/InfiniteDrivePaused.svelte'
	import InfiniteTrackGenerator from '$components/InfiniteTrack/InfiniteTrackGenerator.svelte'

	export let trackData: TrackData
	export let seed: string
</script>

<CommonGamePlay {trackData} let:carState>
	<InfiniteTrackGenerator {trackData} {carState} {seed} />

	<InfiniteDrivePaused
		slot="ui-paused"
		let:time
		let:proceed
		let:restart
		{time}
		{trackData}
		{proceed}
		{restart}
	/>

	<InfiniteDriveIntro slot="ui-intro" let:proceed {proceed} {trackData} {seed} />
</CommonGamePlay>
