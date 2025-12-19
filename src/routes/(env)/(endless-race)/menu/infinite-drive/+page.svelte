<script lang="ts">
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import UiWrapper from '$components/UI/UiWrapper.svelte'
	import TopBarLayout from '$components/UI/layouts/TopBarLayout.svelte'
	import ModernTopMenu from '$components/UI/layouts/ModernTopMenu.svelte'
	import ModernCard from '$components/UI/components/ModernCard.svelte'
	import ModernButton from '$components/UI/components/ModernButton.svelte'

	const makeSeed = () => {
		const num = crypto.getRandomValues(new Uint32Array(1))[0]!
		return num.toString(36).toUpperCase()
	}

	let seed = ''

	onMount(() => {
		seed = makeSeed()
	})
</script>

<UiWrapper>
	<TopBarLayout>
		<ModernTopMenu slot="topbar-center" />

		<div class="flex flex-col gap-6 max-w-3xl mx-auto w-full">
			<ModernCard variant="gradient" glow>
				<div class="flex flex-col gap-4">
					<div>
						<h2 class="font-headline text-2xl text-text-primary">Infinite Drive</h2>
						<p class="text-text-secondary text-sm mt-1">
							No finish line. Drive forever on an endlessly generated track.
						</p>
					</div>

					<div class="flex flex-col sm:flex-row gap-3 items-stretch">
						<input
							bind:value={seed}
							class="w-full rounded-2xl bg-surface/60 border-2 border-white/10 px-4 py-3 text-text-primary font-mono tracking-wider outline-none focus:border-primary/60"
							placeholder="SEED (optional)"
						/>
						<ModernButton variant="secondary" on:click={() => (seed = makeSeed())}>
							New seed
						</ModernButton>
					</div>

					<ModernButton
						variant="primary"
						on:click={() => {
							goto(`/infinite-drive?seed=${encodeURIComponent(seed.trim())}`)
						}}
					>
						Start Infinite Drive
					</ModernButton>
				</div>
			</ModernCard>

			<ModernCard variant="glass" padding="md">
				<div class="text-text-secondary text-sm leading-relaxed">
					The seed controls where boosts appear. Share it if you want the same endless road.
				</div>
			</ModernCard>
		</div>
	</TopBarLayout>
</UiWrapper>
