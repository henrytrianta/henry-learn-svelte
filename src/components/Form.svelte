<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';

	import { onMount } from 'svelte';

	// Element captcha;
	let captcha;

	// Yup schema
	const contactSchema = yup.object({
		email: yup.string().email().required(),
		name: yup.string().required(),
		message: yup.string().required(),
		'g-recaptcha-response': yup.string().required()
	});

	const { form, setField, errors } = createForm({
		extend: [validator],
		validateSchema: contactSchema,
		onSubmit: async (data) => {
			/* call to an api */
			console.log(data);

			// return;

			await fetch('/api/form', {
				method: 'post',
				body: JSON.stringify(data)
			})
				.then((data) => data.json())
				.then((data) => console.log(JSON.parse(data.body)));
		}
	});

	onMount(() => {
		// 	grecaptcha.render(captcha, {
		// 		sitekey: import.meta.env.VITE_PRIVATE_GOOGLE_CAPTCHA_SITEKEY.toString(),
		// 		callback: (token) => {
		// 			// setField('captcha', token);
		// 			setField('g-recaptcha-response', token);
		// 		},
		// 		'expired-callback': (token) => setField('g-recaptcha-response', token),
		// 		'error-callback': (token) => setField('g-recaptcha-response', token)
		// 	});
	});

</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
</svelte:head>

<form use:form class="pt-16">
	<div class="flex flex-col sm:flex-row">
		<div class="w-full sm:w-1/2 sm:mr-3">
			<label for="name" class="block font-body font-medium text-primary dark:text-white pb-3"
				>Your Name
				<span class="text-xs text-red-500">
					{$errors.name ? `*${$errors.name}` : ''}
				</span>
			</label>
			<input
				type="text"
				id="name"
				name="name"
				placeholder="What should I call you?"
				class="w-full bg-grey-lightest px-5 py-4 font-body font-light text-primary dark:text-white placeholder-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary border border-primary transition-colors"
			/>
		</div>
		<div class="w-full sm:w-1/2 sm:ml-3 pt-6 sm:pt-0">
			<label for="email" class="block font-body font-medium text-primary dark:text-white pb-3"
				>Email Address
				<span class="text-xs text-red-500">
					{$errors.email ? `*${$errors.email}` : ''}
				</span>
			</label>
			<input
				type="email"
				id="email"
				name="email"
				placeholder="Drop that email here…"
				class="w-full bg-grey-lightest px-5 py-4 font-body font-light text-primary dark:text-white placeholder-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary border border-primary transition-colors"
			/>
		</div>
	</div>
	<div class="w-full pt-6 sm:pt-10">
		<label for="message" class="block font-body font-medium text-primary dark:text-white pb-3"
			>Message
			<span class="text-xs text-red-500">
				{$errors.message ? `*${$errors.message}` : ''}
			</span>
		</label>
		<textarea
			id="message"
			name="message"
			cols="30"
			rows="9"
			placeholder="Tell me all the things that you think I need to hear…"
			class="w-full bg-grey-lightest px-5 py-4 font-body font-light text-primary dark:text-white placeholder-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary border border-primary transition-colors"
		/>
	</div>
	<div class="w-full pt-6 sm:pt-10">
		<!-- <div bind:this={captcha} /> -->
		<div class="g-recaptcha" data-sitekey="6LdJAtEZAAAAAFsPdP-jWzyC-sNHt9hlEx4D7kjA" />
		<!-- <input type="hidden" name="captcha" value="" /> -->
		<!-- TODO: Add an error message -->
	</div>
	<button
		class="mt-10 mb-12 block sm:inline-block px-10 py-4 bg-secondary transition-colors hover:bg-green font-body font-semibold text-white text-xl sm:text-2xl text-center sm:text-left"
		>Send Message</button
	>
</form>
