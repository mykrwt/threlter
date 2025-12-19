<script lang="ts">
	import { useAudioProvider } from '$components/Utilities/AudioProvider.svelte'
	import { c } from '$lib/utils/classes'
	import { appState } from '$stores/app'
	import { useKeyboardNavigation } from '../KeyboardNavigation.svelte'

	export let href: string | undefined = undefined
	export let disabled = false
	export let audioCues = true
	export let preventFocusOnFocusLost = false
	export let forceFocusOnMount = false
	export let variant: 'primary' | 'secondary' | 'accent' | 'outline' = 'primary'
	export let size: 'sm' | 'md' | 'lg' = 'md'

	const variantStyles: Record<typeof variant, string> = {
		primary:
			'bg-gradient-to-br from-primary via-primary-dark to-primary-dark text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 border-primary-light/20',
		secondary:
			'bg-surface/80 backdrop-blur-md text-text-primary border-white/10 hover:bg-surface hover:border-white/20',
		accent:
			'bg-gradient-to-br from-accent via-accent-dark to-accent-dark text-slate-900 shadow-lg shadow-accent/30 hover:shadow-accent/50 border-accent-light/20',
		outline:
			'bg-transparent text-text-primary border-primary hover:bg-primary/10 hover:border-primary-light'
	}

	const sizeStyles: Record<typeof size, string> = {
		sm: 'text-[0.7em] px-[0.8em] py-[0.4em]',
		md: 'px-[1.2em] py-[0.5em]',
		lg: 'text-[1.2em] px-[1.5em] py-[0.6em]'
	}

	const { sfx } = appState.options.audio

	let _class = ''
	export { _class as class }

	const { playAudio } = useAudioProvider()

	const onPointerEnter = async () => {
		if (disabled) return
		if (!$sfx) return
		if (!audioCues) return
		playAudio('buttonHover', {
			detune: -300,
			volume: 0.23
		})
	}

	const onClick = async () => {
		if (disabled) return
		if (!$sfx) return
		if (!audioCues) return
		playAudio('buttonHover', {
			detune: 300,
			volume: 0.8
		})
	}

	const { keyboardNavigationAction } = useKeyboardNavigation()
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<svelte:element
	this={href ? 'a' : 'button'}
	role="button"
	{href}
	use:keyboardNavigationAction={{
		forceFocus: forceFocusOnMount,
		preventFocusOnFocusLost: preventFocusOnFocusLost
	}}
	on:pointerenter={onPointerEnter}
	on:focus={onPointerEnter}
	on:click={onClick}
	on:click
	{disabled}
	class={c(
		'group relative text-center uppercase font-headline rounded-2xl leading-none border-2 pointer-events-auto outline-none transition-all duration-200',
		'[&_svg]:fill-current [&_svg]:w-[1em] [&_svg]:h-[1em] flex flex-row gap-[10px] justify-center items-center',
		'hover:scale-[1.02] active:scale-[0.98] focus:scale-[1.02]',
		'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
		variantStyles[variant],
		sizeStyles[size],
		_class
	)}
>
	<div
		class="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/0 to-white/10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity"
	/>
	<span class="relative z-10">
		<slot />
	</span>
</svelte:element>
