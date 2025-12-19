<script lang="ts">
	import { page } from '$app/stores'
	import ModernButton from '../components/ModernButton.svelte'
	import ModernCard from '../components/ModernCard.svelte'

	$: isFriendsRace = $page.route.id?.includes('friends-race') ?? false
	$: isInfiniteDrive = $page.route.id?.includes('infinite-drive') ?? false
	$: isOptions = $page.route.id?.includes('options') ?? false
</script>

<div class="flex flex-col gap-6 mb-8">
	<!-- Logo/Title -->
	<div class="relative">
		<div
			class="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary blur-3xl opacity-30 animate-pulse"
		/>
		<div class="relative text-center">
			<h1 class="font-headline text-[2.8em] tracking-wider mb-2">
				<span
					class="bg-gradient-to-r from-primary-light via-accent-light to-primary-light bg-clip-text text-transparent"
				>
					THRELTEMANIA
				</span>
			</h1>
			<p class="text-text-secondary text-[0.5em] font-sans tracking-widest uppercase">
				Racing Game • Powered by Threlte
			</p>
		</div>
	</div>

	<!-- Navigation Menu -->
	<ModernCard variant="glass" padding="sm" glow>
		<div class="grid grid-cols-3 gap-3">
			<ModernButton
				href={isFriendsRace ? '/menu/main' : '/menu/friends-race'}
				variant={isFriendsRace ? 'primary' : 'secondary'}
				size="md"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zm-8 0c1.657 0 3-1.567 3-3.5S9.657 4 8 4 5 5.567 5 7.5 6.343 11 8 11zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
					/>
				</svg>
				<span class="hidden lg:inline">Friends Race</span>
			</ModernButton>

			<ModernButton
				href={isInfiniteDrive ? '/menu/main' : '/menu/infinite-drive'}
				variant={isInfiniteDrive ? 'primary' : 'secondary'}
				size="md"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						d="M4 16.5c0 .83.67 1.5 1.5 1.5H7v-2H5.5a.5.5 0 01-.5-.5V7.5c0-.28.22-.5.5-.5H7V5H5.5C4.67 5 4 5.67 4 6.5v10zM17 18h1.5c.83 0 1.5-.67 1.5-1.5v-10C20 5.67 19.33 5 18.5 5H17v2h1.5c.28 0 .5.22.5.5v8c0 .28-.22.5-.5.5H17v2zM8 17h8v-2H8v2zm0-4h8v-2H8v2zm0-4h8V7H8v2z"
					/>
				</svg>
				<span class="hidden lg:inline">Infinite Drive</span>
			</ModernButton>

			<ModernButton
				href={isOptions ? '/menu/main' : '/menu/options'}
				variant={isOptions ? 'primary' : 'secondary'}
				size="md"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						fill-rule="evenodd"
						d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
						clip-rule="evenodd"
					/>
				</svg>
				<span class="hidden lg:inline">Options</span>
			</ModernButton>
		</div>
	</ModernCard>
</div>
