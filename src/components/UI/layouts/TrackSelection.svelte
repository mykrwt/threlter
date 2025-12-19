<script lang="ts">
	import TrackTimes from '$components/UI/components/TrackTimes.svelte'
	import type { TrackData } from '$lib/TrackData/TrackData'
	import { TrackRecord } from '$lib/TrackRecord/TrackRecord'
	import { c } from '$lib/utils/classes'
	import { createEventDispatcher } from 'svelte'
	import BlurryCard from '../components/BlurryCard.svelte'
	import ButtonGroup from '../components/ButtonGroup/ButtonGroup.svelte'
	import Card from '../components/Card.svelte'
	import PlainButton from '../components/PlainButton.svelte'
	import SpecialButton from '../components/SpecialButton.svelte'

	export let trackDatas: TrackData[]

	export let tracksCanBeEdited = false
	export let tracksCanBeDuplicated = false
	export let tracksCanBeDeleted = false
	export let tracksCanBeValidated = false
	export let tracksCanBeExported = false
	export let showAuthor = false
	export let headline: string | undefined = undefined

	let selectedTrackId: string | undefined = undefined

	export let trackSelected = false
	$: trackSelected = !!selectedTrackId

	const selectTrack = (trackId: string) => {
		selectedTrackId = trackId
	}

	const dispatch = createEventDispatcher<{
		playtrack: { trackId: string }
		edittrack: { trackId: string }
		deletetrack: { trackId: string }
		duplicatetrack: { trackId: string }
		exporttrack: { trackId: string }
		validatetrack: { trackId: string }
	}>()
</script>

{#if headline}
	<div class="font-headline text-orange mb-[15px]">{headline}</div>
{/if}

<BlurryCard class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 h-full min-h-0 p-3 md:p-4">
	<slot />

	{#if trackDatas.length}
		<Card class="h-min !p-0 overflow-hidden border-2 border-blue-950 md:col-span-1">
			<div class="flex flex-col h-min overflow-auto text-xs md:text-sm max-h-60 md:max-h-full">
				{#each trackDatas as trackData, index}
					{#if trackData}
						<PlainButton
							on:click={() => selectTrack(trackData.trackId)}
							class={c(
								'text-orange text-left px-3 py-2 hover:bg-blue-darker focus:bg-blue-darker outline-none',
								selectedTrackId === trackData.trackId && '!bg-orange !text-blue-darkest',
								index === 0 && 'pt-3',
								index === trackDatas.length - 1 && 'pb-3'
							)}
						>
							{trackData.trackName.current}
						</PlainButton>
					{/if}
				{/each}
			</div>
		</Card>
	{/if}

	{#if selectedTrackId}
		{@const trackData = trackDatas.find((trackData) => trackData.trackId === selectedTrackId)}
		{#if trackData}
			{@const trackRecord = TrackRecord.fromLocalStorage(trackData)}
			<div class="col-span-1 md:col-span-2">
				<Card
					class={c(
						'flex flex-col gap-2 md:gap-3',
						(tracksCanBeDeleted ||
							tracksCanBeDuplicated ||
							tracksCanBeEdited ||
							tracksCanBeValidated) &&
							'!rounded-br-none'
					)}
				>
					<div class="flex flex-col sm:flex-row justify-between items-start gap-3 mb-2 md:mb-4">
						<div class="flex-1 min-w-0">
							<span class="font-headline text-base md:text-lg break-words">
								{trackData.trackName.current}
							</span>

							{#if trackData.authorName.current.length && showAuthor}
								<div class="text-xs md:text-sm text-text-secondary mt-1">
									{trackData.authorName.current}
								</div>
							{/if}
						</div>

						{#if trackData.validated.current}
							<SpecialButton
								style="green-inverted"
								on:click={() => {
									dispatch('playtrack', { trackId: trackData.trackId })
								}}
							>
								Play
							</SpecialButton>
						{/if}
					</div>

					{#if tracksCanBeValidated && !trackData.validated.current}
						<div class="text-xs md:text-sm text-text-secondary">
							Track is not validated yet.
							<br />
							To play it, you need to validate it first.
						</div>
					{/if}

					{#if trackData.validated.current}
						<TrackTimes class="w-full md:w-[27ch] text-xs md:text-sm" {trackData} {trackRecord} />
					{/if}
				</Card>

				{#if tracksCanBeDeleted || tracksCanBeDuplicated || tracksCanBeEdited || tracksCanBeValidated}
					<div class="flex flex-row justify-end items-stretch mb-0.5">
						<ButtonGroup
							let:divider={Divider}
							class="text-xs md:text-sm !rounded-t-none !border-t-0 flex-wrap"
						>
							{#if !trackData.validated.current && tracksCanBeValidated}
								<PlainButton
									on:click={() => {
										dispatch('validatetrack', { trackId: trackData.trackId })
									}}
									class="font-mono uppercase tracking-wide px-2 md:px-3 py-1 md:py-1.5 text-blue-darkest bg-green-500/80 hover:bg-green-500 focus:bg-green-500"
								>
									Validate
								</PlainButton>
								<Divider />
							{/if}
							{#if tracksCanBeEdited}
								<PlainButton
									on:click={() => {
										dispatch('edittrack', { trackId: trackData.trackId })
									}}
									class="font-mono uppercase tracking-wide px-2 md:px-3 py-1 md:py-1.5 text-orange bg-blue-950/60 hover:bg-blue-950/80 focus:bg-blue-950/80"
								>
									Edit
								</PlainButton>
								<Divider />
							{/if}
							{#if tracksCanBeDuplicated}
								<PlainButton
									class="font-mono uppercase tracking-wide px-2 md:px-3 py-1 md:py-1.5 text-orange bg-blue-950/60 hover:bg-blue-950/80 focus:bg-blue-950/80"
									on:click={() => {
										dispatch('duplicatetrack', { trackId: trackData.trackId })
									}}
								>
									Duplicate
								</PlainButton>
								<Divider />
							{/if}
							{#if tracksCanBeExported}
								<PlainButton
									class="font-mono uppercase tracking-wide px-2 md:px-3 py-1 md:py-1.5 text-orange bg-blue-950/60 hover:bg-blue-950/80 focus:bg-blue-950/80"
									on:click={() => {
										dispatch('exporttrack', { trackId: trackData.trackId })
									}}
								>
									Export
								</PlainButton>
								<Divider />
							{/if}
							{#if tracksCanBeDeleted}
								<PlainButton
									class="font-mono uppercase tracking-wide px-2 md:px-3 py-1 md:py-1.5 text-blue-darkest bg-red-500/80 hover:bg-red-500 focus:bg-red-500"
									on:click={() => {
										dispatch('deletetrack', { trackId: trackData.trackId })
									}}
								>
									Delete
								</PlainButton>
							{/if}
						</ButtonGroup>
					</div>
				{/if}
			</div>
		{/if}
	{/if}
</BlurryCard>
