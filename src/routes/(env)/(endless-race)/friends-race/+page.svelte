<script lang="ts">
	import { page } from '$app/stores'
	import TimeAttack from '$components/TimeAttack/TimeAttack.svelte'
	import { appState } from '$stores/app'
	import { createFriendsRaceTrackData } from '$lib/InfiniteTrack/infiniteTrack'
	import type { TrackData } from '$lib/TrackData/TrackData'

	let seed = 'DEFAULT'
	let trackData: TrackData

	$: seed = $page.url.searchParams.get('seed')?.trim() || 'DEFAULT'

	$: trackData = createFriendsRaceTrackData({
		seed,
		authorName: appState.options.player.name.current
	})
</script>

<TimeAttack {trackData} />
