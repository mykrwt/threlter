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

	const start = () => {
		if (!seed.trim()) return
		goto(`/friends-race?seed=${encodeURIComponent(seed.trim())}`)
	}

	const copyLink = async () => {
		await navigator.clipboard
			.writeText(`${window.location.origin}/friends-race?seed=${encodeURIComponent(seed.trim())}`)
			.catch(() => undefined)
	}
</script>

<UiWrapper>
	<TopBarLayout>
		<ModernTopMenu slot="topbar-center" />

		<div class="flex flex-col gap-4 md:gap-6 max-w-3xl mx-auto w-full px-2 md:px-0">
			<ModernCard variant="gradient" glow>
				<div class="flex flex-col gap-3 md:gap-4">
					<div>
						<h2 class="font-headline text-lg md:text-2xl text-text-primary">Race with friends</h2>
						<p class="text-text-secondary text-xs md:text-sm mt-1">
							Generate a track code and share it. Anyone who starts with the same code races on the
							exact same track.
						</p>
					</div>

					<div class="flex flex-col sm:flex-row gap-3 items-stretch">
						<input
							bind:value={seed}
							class="w-full rounded-2xl bg-surface/60 border-2 border-white/10 px-3 md:px-4 py-2 md:py-3 text-text-primary font-mono tracking-wider outline-none focus:border-primary/60 text-sm md:text-base"
							placeholder="TRACK CODE"
							on:keydown={(e) => {
								if (e.key === 'Enter') start()
							}}
						/>
						<ModernButton variant="secondary" on:click={() => (seed = makeSeed())}>
							New code
						</ModernButton>
					</div>

					<div class="flex flex-col sm:flex-row gap-3">
						<ModernButton variant="primary" on:click={start} class="flex-1">
							Start race
						</ModernButton>
						<ModernButton variant="outline" on:click={copyLink} class="flex-1">
							Copy link
						</ModernButton>
					</div>
				</div>
			</ModernCard>

			<ModernCard variant="glass" padding="md">
				<div class="text-text-secondary text-xs md:text-sm leading-relaxed">
					This mode is a time-attack race. The finish line is at the end of the generated track.
					Beat your friends by sharing your best time.
				</div>
			</ModernCard>
		</div>
	</TopBarLayout>
</UiWrapper>
