import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { generateComponentProperty } from "../lib/generate-property";
import { EditorComponentDefinition, EditorComponentPropType } from "../types";


export type ComponentPropertyAddCommandPayload = {
	componentId: string;
	type: EditorComponentPropType;
	name: string;
}
export class ComponentPropertyAddCommand extends CommandHandler<ComponentPropertyAddCommandPayload, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle({ type, componentId, name }: ComponentPropertyAddCommandPayload): void {
		const component = this._context.componentManager().get(componentId);
		if (!component) {
			console.warn('[ComponentPropertyAddCommand] component not found', componentId);
			return;
		}
		console.log('[ComponentPropertyAddCommand] handle', { type, component, name });

		const {key, def} = generateComponentProperty(name, type);
		const newComponent = {
			...component,
			properties: {
				...component.properties,
				[key]: def,
			},
		} satisfies EditorComponentDefinition;

		console.log('[ComponentPropertyAddCommand] newComponent', newComponent);

		this._context.componentManager().update(componentId, newComponent);

	}
}