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

		<ModernCard variant="glass" glow class="h-full">
			<div class="grid grid-cols-2 gap-6">
				<ModernCard variant="solid" padding="md" class="flex flex-col items-start justify-start">
					<div class="mb-4 font-headline text-primary-light text-lg">Audio</div>

					<Checkbox forceFocusOnMount class="pl-0" bind:checked={$music}>Music</Checkbox>

					<Checkbox class="pl-0" bind:checked={$sfx}>SFX</Checkbox>
				</ModernCard>

				<ModernCard variant="solid" padding="md" class="flex flex-col items-start justify-start">
					<div class="mb-4 font-headline text-primary-light text-lg">Video</div>

					<Checkbox class="pl-0" bind:checked={$shadows}>SHADOWS</Checkbox>
					<Checkbox class="pl-0" bind:checked={$postprocessing}>POST PROCESSING</Checkbox>
				</ModernCard>

				<ModernCard variant="solid" padding="md" class="flex flex-col items-start justify-start">
					<div class="mb-4 font-headline text-primary-light text-lg">Player</div>

					<div class="flex flex-row items-end text-[0.8em] w-full gap-2">
						<TextInput
							label="Name"
							id="name"
							inputClass="!rounded-r-none !border-r-0 h-[46px]"
							preventFocusOnFocusLost
							bind:value={oldPlayerName}
						/>

						<ModernButton
							variant="primary"
							size="md"
							disabled={!oldPlayerName.length}
							class="h-[46px] !rounded-l-none"
							on:click={() => {
								name.set(oldPlayerName)
							}}
						>
							Save
						</ModernButton>
					</div>
				</ModernCard>

				<ModernCard variant="solid" padding="md" class="flex flex-col items-start justify-start">
					<div class="mb-4 font-headline text-primary-light text-lg">Misc</div>

					<Checkbox class="pl-0" bind:checked={$debug}>DEBUG</Checkbox>
				</ModernCard>
			</div>
		</ModernCard>
	</TopBarLayout>
</UiWrapper>
