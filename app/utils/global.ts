export function normalize(value: string) {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
}

export function getSocialIcon(
	platform: string,
	fallback: string | null,
) {
	const normalized = normalize(platform)

	const icons: Record<string, string> = {
		linkedin: 'mdi-linkedin',
		github: 'mdi-github',
		whatsapp: 'mdi-whatsapp',
		instagram: 'mdi-instagram',
		facebook: 'mdi-facebook',
		twitter: 'mdi-twitter',
		x: 'mdi-twitter',
		email: 'mdi-email-outline',
		youtube: 'mdi-youtube',
		telegram: 'mdi-telegram',
		website: 'mdi-web',
	}

	return icons[normalized] ?? fallback ?? 'mdi-link-variant'
}

export function getSocialLabel(
	platform: string,
	label: string,
) {
	return label || platform
}

export function getMailtoUrl(email: string) {
	return email ? `mailto:${email}` : '#'
}

export function getWhatsAppNumber(url: string) {
	try {
		const parsedUrl = new URL(url)
		const phone = parsedUrl.searchParams.get('phone')

		if (!phone) {
			return url
		}

		const digits = phone.replace(/\D/g, '')

		if (digits.startsWith('55') && digits.length >= 12) {
			const country = digits.slice(0, 2)
			const area = digits.slice(2, 4)
			const number = digits.slice(4)

			if (number.length === 9) {
				return `+${country} ${area} ${number.slice(
					0,
					5,
				)}-${number.slice(5)}`
			}

			return `+${country} ${area} ${number.slice(
				0,
				4,
			)}-${number.slice(4)}`
		}

		return `+${digits}`
	} catch {
		return url
	}
}

export function getLinkedInPath(url: string) {
	try {
		const parsedUrl = new URL(url)
		const path = parsedUrl.pathname.replace(/\/$/, '')

		return path || url
	} catch {
		return url
	}
}

export function getSocialDisplayValue(
	platform: string,
	url: string,
) {
	const normalized = normalize(platform)

	if (normalized === 'email') {
		if (url.startsWith('mailto:')) {
			return url.replace(/^mailto:/i, '')
		}

		return url
	}

	if (normalized === 'whatsapp') {
		return getWhatsAppNumber(url)
	}

	if (normalized === 'linkedin') {
		return getLinkedInPath(url)
	}

	try {
		const parsedUrl = new URL(url)

		return `${parsedUrl.hostname.replace(/^www\./, '')}${
			parsedUrl.pathname !== '/'
				? parsedUrl.pathname.replace(/\/$/, '')
				: ''
		}`
	} catch {
		return url
	}
}
