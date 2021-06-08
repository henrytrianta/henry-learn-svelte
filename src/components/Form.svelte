<script lang="ts" context="module">
	// Declare variable to be use in global as hCaptcha initiated, to avoid ts error.
	declare var hcaptcha: any;

</script>

<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { toast } from '@zerodevx/svelte-toast';

	import { onMount } from 'svelte';

	// Element captcha;
	let captcha;

	// Yup schema
	const contactSchema = yup.object({
		email: yup.string().email().required(),
		name: yup.string().required(),
		message: yup.string().required(),
		'h-captcha-response': yup.string().required()
	});

	const { form, setField, errors } = createForm({
		extend: [validator],
		validateSchema: contactSchema,
		onSubmit: async (data) => {
			/* call to an api */
			// console.log(data);

			await fetch('/api/form', {
				method: 'post',
				body: JSON.stringify(data)
			})
				.then((data) => data.json())
				.then((data) => {
					console.log(data);

					if (data.status === 200) {
						console.log('Masuk');

						toast.push('Success. We will get back to you :)', {
							theme: {
								'--toastBackground': '#48BB78',
								'--toastProgressBackground': '#2F855A'
							}
						});
					}

					if (data.status === 500) {
						toast.push('Error, something error on our end. Please refresh.', {
							theme: {
								'--toastBackground': '#F56565',
								'--toastProgressBackground': '#C53030'
							}
						});
					}

					hcaptcha.reset();
				});
		}
	});

	onMount(() => {
		// Append hCaptcha Script
		const loadhCaptcha = (callback) => {
			const existingScript = document.getElementById('hCaptcha');

			if (!existingScript) {
				const script = document.createElement('script');
				script.src = 'https://hcaptcha.com/1/api.js?recaptchacompat=off&render=explicit';
				script.id = 'hCaptcha';
				document.body.appendChild(script);

				script.onload = () => {
					if (callback) callback();
				};
			}

			if (existingScript && callback) callback();
		};

		// Render hCaptcha
		const injecthCaptcha = () => {
			hcaptcha.render(captcha, {
				theme: 'light',
				sitekey: import.meta.env.VITE_HCAPTCHA_SITEKEY,
				recaptchacompat: false,
				callback: (token) => {
					setField('h-captcha-response', token);
				},
				'expired-callback': (token) => {
					setField('h-captcha-response', token);
				},
				'error-callback': (token) => {
					setField('h-captcha-response', token);
				}
			});
		};

		// Run load and provide callback
		loadhCaptcha(() => {
			injecthCaptcha();
		});
	});

</script>

<form use:form class="pt-16">
	<div class="flex flex-col sm:flex-row">
		<div class="w-full sm:w-1/2 sm:mr-3">
			<label for="name" class="block font-body font-medium text-primary dark:text-white pb-3"
				>Your Name
				<span class="text-xs text-red-500 dark:text-secondary">
					{$errors.name ? `*${$errors.name}` : ''}
				</span>
			</label>
			<input
				type="text"
				id="name"
				name="name"
				placeholder="What should I call you?"
				class="w-full bg-grey-lightest px-5 py-4 font-body font-light text-primary dark:text-white placeholder-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary border border-primary transition-colors dark:text-primary"
			/>
		</div>
		<div class="w-full sm:w-1/2 sm:ml-3 pt-6 sm:pt-0">
			<label for="email" class="block font-body font-medium text-primary dark:text-white pb-3"
				>Email Address
				<span class="text-xs text-red-500 dark:text-secondary">
					{$errors.email ? `*${$errors.email}` : ''}
				</span>
			</label>
			<input
				type="email"
				id="email"
				name="email"
				placeholder="Drop that email here…"
				class="w-full bg-grey-lightest px-5 py-4 font-body font-light text-primary dark:text-white placeholder-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary border border-primary transition-colors dark:text-primary"
			/>
		</div>
	</div>
	<div class="w-full pt-6 sm:pt-10">
		<label for="message" class="block font-body font-medium text-primary dark:text-white pb-3"
			>Message
			<span class="text-xs text-red-500 dark:text-secondary">
				{$errors.message ? `*${$errors.message}` : ''}
			</span>
		</label>
		<textarea
			id="message"
			name="message"
			cols="30"
			rows="9"
			placeholder="Tell me all the things that you think I need to hear…"
			class="w-full bg-grey-lightest px-5 py-4 font-body font-light text-primary dark:text-white placeholder-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary border border-primary transition-colors dark:text-primary"
		/>
	</div>
	<div class="w-full pt-6 sm:pt-10">
		<div bind:this={captcha} />
		<span class="text-xs dark:text-white">
			{$errors['h-captcha-response'] ? `*Please proof that you are not a bot.` : ''}
		</span>
	</div>
	<button
		class="mt-10 mb-12 block sm:inline-block px-10 py-4 bg-secondary transition-colors hover:bg-green font-body font-semibold text-white text-xl sm:text-2xl text-center sm:text-left"
		>Send Message</button
	>
</form>
