import { Component } from "@pagepress/core/src/kernel/types";
import { IconBoxModel2, IconComponents, IconH1, IconH2, IconH3, IconH4, IconH5, IconH6, IconHeading, IconLetterP, IconLetterT, IconLink, IconPhoto, IconSection, TablerIcon } from "@tabler/icons-react";



export function getComponentMetadata(component: Component): { icon: TablerIcon, label: string } {

	if (isHeading(component)) {
		switch (component.tagName?.toLowerCase()) {
			case 'h1':
				return {icon: IconH1, label: 'Heading'}
			case 'h2':
				return {icon: IconH2, label: 'Heading'}
			case 'h3':
				return {icon: IconH3, label: 'Heading'}
			case 'h4':
				return {icon: IconH4, label: 'Heading'}
			case 'h5':
				return {icon: IconH5, label: 'Heading'}
			case 'h6':
				return {icon: IconH6, label: 'Heading'}
			default:
				return {icon: IconHeading, label: 'Heading'}
		}
	}

	if (isSection(component)) return {icon: IconSection, label: 'Section'};

	if (isContainer(component)) return {icon: IconBoxModel2, label: component.getName()};


	if (isPatagraph(component)) return {icon: IconLetterP, label: 'Paragraph'};

	if (isText(component)) return {icon: IconLetterT, label: component.getName()};


	if (isImage(component)) return {icon: IconPhoto, label: 'Image'};

	if (isLink(component)) return {icon: IconLink, label: 'Link'};

	if (isButton(component)) return {icon: IconLink, label: 'Button'};

	return {icon: IconComponents, label: component.getName()};
}


export function isMatchingTags(component: Component, tags: string[]) {
	return tags.includes(component.tagName?.toLowerCase?.() ?? "");
}

export function isHeading(component: Component): boolean {
	return isMatchingTags(component, [
		"h1", "h2", "h3", "h4", "h5", "h6"
	])
}

export function isSection(component: Component): boolean {
	return isMatchingTags(component, ['section']);
}

export function isContainer(component: Component): boolean {
	return isMatchingTags(component, [
		"div", "section", "article", "nav", "aside", "main", "header", "footer",
	])
}

export function isPatagraph(component: Component): boolean {
	return isMatchingTags(component, [
		"h1", "h2", "h3", "h4", "h5", "h6",
		"p", "li", "td", "th", "caption", "label", "legend",
		"figcaption", "blockquote", "q", "cite", "time", "abbr",
		"address", "summary", "title", "option", "textarea"
	])
}

export function isText(component: Component): boolean {
	return isMatchingTags(component, [
		"h1", "h2", "h3", "h4", "h5", "h6",
		"p", "li", "td", "th", "caption", "label", "legend",
		"figcaption", "blockquote", "q", "cite", "time", "abbr",
		"address", "summary", "title", "option", "textarea"
	])
}


export function isImage(component: Component): boolean {
	return isMatchingTags(component, ['img']);
}


export function isLink(component: Component): boolean {
	return isMatchingTags(component, ['a']);
}


export function isButton(component: Component): boolean {
	return isMatchingTags(component, ['button']);
}

