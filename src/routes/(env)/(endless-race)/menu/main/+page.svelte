<script lang="ts">
	import UiWrapper from '$components/UI/UiWrapper.svelte'
	import BottomBar from '$components/UI/components/BottomBar.svelte'
	import TopBarLayout from '$components/UI/layouts/TopBarLayout.svelte'
	import ModernButton from '../../../../../components/UI/components/ModernButton.svelte'
	import ModernTopMenu from '../../../../../components/UI/layouts/ModernTopMenu.svelte'
</script>

<UiWrapper>
	<TopBarLayout>
		<ModernTopMenu slot="topbar-center" />

		<div>
			<BottomBar>
				<ModernButton variant="outline" size="sm" href="https://legrisch.com" slot="right">
					Made by Grischa Erbe
				</ModernButton>
			</BottomBar>
		</div>
	</TopBarLayout>
</UiWrapper>
