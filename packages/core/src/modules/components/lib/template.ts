



export function renderTemplate(template: string, attributes: Record<string, string> = {}) {
	return template.replace(/{{(.*?)}}/g, (match, p1) => {
		return attributes[p1] || match;
	});
}



export function stringifyAttrs(attrs: Record<string, string>) {
	return Object.entries(attrs)
		.map(([key, value]) => `${key}="${value}"`)
		.join(' ');
}