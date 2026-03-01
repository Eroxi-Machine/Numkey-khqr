<script setup>
defineProps({
	visible: {
		type: Boolean,
		default: false,
	},
	text: {
		type: String,
		default: 'Generating QRCode...',
	},
});
</script>

<template>
	<div
		v-if="visible"
		class="fixed inset-0 z-999 grid place-items-center bg-black/45"
		role="status"
		aria-live="polite"
	>
		<div class="grid min-w-60 justify-items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-5">
			<div class="h-7 w-7 animate-spin rounded-full border-4 border-slate-600 border-t-slate-200" aria-hidden="true"></div>
			<p class="font-semibold text-slate-100">{{ text }}</p>
		</div>
	</div>
</template>
