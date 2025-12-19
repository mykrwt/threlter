<script lang="ts">
	import UiWrapper from '$components/UI/UiWrapper.svelte'
	import Checkbox from '$components/UI/components/Checkbox.svelte'
	import TextInput from '$components/UI/components/TextInput.svelte'
	import TopBarLayout from '$components/UI/layouts/TopBarLayout.svelte'
	import { appState } from '$stores/app'
	import ModernButton from '../../../../../components/UI/components/ModernButton.svelte'
	import ModernCard from '../../../../../components/UI/components/ModernCard.svelte'
	import ModernTopMenu from '../../../../../components/UI/layouts/ModernTopMenu.svelte'

	const { audio, video, player, debug } = appState.options

	const { name } = player
	const { music, sfx } = audio
	const { postprocessing, shadows } = video

	let oldPlayerName = appState.options.player.name.current
</script>

<UiWrapper>
	<TopBarLayout>
		<ModernTopMenu slot="topbar-center" />

		<ModernCard variant="glass" glow class="h-full mx-2 md:mx-0">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
				<ModernCard variant="solid" padding="md" class="flex flex-col items-start justify-start">
					<div class="mb-3 md:mb-4 font-headline text-primary-light text-base md:text-lg">
						Audio
					</div>

					<Checkbox forceFocusOnMount class="pl-0" bind:checked={$music}>Music</Checkbox>

					<Checkbox class="pl-0" bind:checked={$sfx}>SFX</Checkbox>
				</ModernCard>

				<ModernCard variant="solid" padding="md" class="flex flex-col items-start justify-start">
					<div class="mb-3 md:mb-4 font-headline text-primary-light text-base md:text-lg">
						Video
					</div>

					<Checkbox class="pl-0" bind:checked={$shadows}>SHADOWS</Checkbox>
					<Checkbox class="pl-0" bind:checked={$postprocessing}>POST PROCESSING</Checkbox>
				</ModernCard>

				<ModernCard variant="solid" padding="md" class="flex flex-col items-start justify-start">
					<div class="mb-3 md:mb-4 font-headline text-primary-light text-base md:text-lg">
						Player
					</div>

					<div
						class="flex flex-col sm:flex-row items-stretch sm:items-end text-xs md:text-sm w-full gap-2"
					>
						<TextInput
							label="Name"
							id="name"
							inputClass="sm:!rounded-r-none sm:!border-r-0 h-[40px] md:h-[46px]"
							preventFocusOnFocusLost
							bind:value={oldPlayerName}
						/>

						<ModernButton
							variant="primary"
							size="md"
							disabled={!oldPlayerName.length}
							class="h-[40px] md:h-[46px] sm:!rounded-l-none"
							on:click={() => {
								name.set(oldPlayerName)
							}}
						>
							Save
						</ModernButton>
					</div>
				</ModernCard>

				<ModernCard variant="solid" padding="md" class="flex flex-col items-start justify-start">
					<div class="mb-3 md:mb-4 font-headline text-primary-light text-base md:text-lg">Misc</div>

					<Checkbox class="pl-0" bind:checked={$debug}>DEBUG</Checkbox>
				</ModernCard>
			</div>
		</ModernCard>
	</TopBarLayout>
</UiWrapper>
