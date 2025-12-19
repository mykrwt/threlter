<script lang="ts">
	import UiWrapper from '$components/UI/UiWrapper.svelte'
	import BottomBar from '$components/UI/components/BottomBar.svelte'
	import TopBarLayout from '$components/UI/layouts/TopBarLayout.svelte'
	import ModernButton from '$components/UI/components/ModernButton.svelte'
	import ModernCard from '$components/UI/components/ModernCard.svelte'
	import ModernTopMenu from '$components/UI/layouts/ModernTopMenu.svelte'
</script>

<UiWrapper>
	<TopBarLayout>
		<ModernTopMenu slot="topbar-center" />

		<div class="flex flex-col gap-4 md:gap-6 max-w-3xl mx-auto w-full px-2 md:px-0">
			<ModernCard variant="glass" glow>
				<div
					class="flex flex-col sm:flex-row gap-3 md:gap-4 items-start sm:items-center justify-between"
				>
					<div class="flex-1 min-w-0">
						<h2 class="font-headline text-lg md:text-2xl text-text-primary">Friends Race</h2>
						<p class="text-text-secondary text-xs md:text-sm mt-1">
							Generate a code, share it, and race on the same track.
						</p>
					</div>
					<ModernButton variant="primary" href="/menu/friends-race">Play</ModernButton>
				</div>
			</ModernCard>

			<ModernCard variant="glass" glow>
				<div
					class="flex flex-col sm:flex-row gap-3 md:gap-4 items-start sm:items-center justify-between"
				>
					<div class="flex-1 min-w-0">
						<h2 class="font-headline text-lg md:text-2xl text-text-primary">Infinite Drive</h2>
						<p class="text-text-secondary text-xs md:text-sm mt-1">Endless road. No finish line.</p>
					</div>
					<ModernButton variant="accent" href="/menu/infinite-drive">Drive</ModernButton>
				</div>
			</ModernCard>

			<div class="h-4" />

			<BottomBar>
				<ModernButton variant="outline" size="sm" href="https://legrisch.com" slot="right">
					Made by Grischa Erbe
				</ModernButton>
			</BottomBar>
		</div>
	</TopBarLayout>
</UiWrapper>
