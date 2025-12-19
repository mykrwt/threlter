<script lang="ts">
	import { c } from '$lib/utils/classes'

	export let variant: 'glass' | 'solid' | 'gradient' = 'glass'
	export let glow = false
	export let padding: 'none' | 'sm' | 'md' | 'lg' = 'md'

	const variantStyles: Record<typeof variant, string> = {
		glass: 'bg-surface/60 backdrop-blur-xl border-white/10',
		solid: 'bg-slate-800/90 border-white/5',
		gradient:
			'bg-gradient-to-br from-surface/80 via-surface/60 to-surface/40 backdrop-blur-xl border-white/10'
	}

	const paddingStyles: Record<typeof padding, string> = {
		none: 'p-0',
		sm: 'p-3 md:p-4',
		md: 'p-4 md:p-6',
		lg: 'p-6 md:p-8'
	}

	let _class = ''
	export { _class as class }
</script>

<div
	class={c(
		'relative rounded-3xl border-2 transition-all duration-300',
		variantStyles[variant],
		paddingStyles[padding],
		glow && 'shadow-2xl shadow-primary/20',
		_class
	)}
>
	{#if glow}
		<div
			class="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"
		/>
	{/if}
	<div class="relative z-10">
		<slot />
	</div>
</div>
