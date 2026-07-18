import { EditorEventBus } from "../../kernel/events"
import { EditorContext } from "../../kernel/types"
import { EditorStyleSector } from "./type"



export type StyleEvents = {
	"style:sectors:ready": void,
	"style:sectors:updated": EditorStyleSector[]
}



export function registerStyleEvents(bus: EditorEventBus, context: EditorContext) {
	const editor = context.gjseditor;

	editor.on('style:sector:add', () => {
		const sectors = context.run('style:sectors');
		bus.emit('style:sectors:updated', sectors);
	});

	editor.on('style:sector:remove', () => {
		const sectors = context.run('style:sectors');
		bus.emit('style:sectors:updated', sectors);
	});

	editor.on('style:sector:update', () => {
		const sectors = context.run('style:sectors');
		bus.emit('style:sectors:updated', sectors);
	});

	editor.on('component:selected', () => {
		const sectors = context.run('style:sectors');
		bus.emit('style:sectors:updated', sectors);
	});

	editor.on('style:target', () => {
		const sectors = context.run('style:sectors');
		bus.emit('style:sectors:updated', sectors);
	});

	editor.on('style:property:update', () => {
		const sectors = context.run('style:sectors');
		bus.emit('style:sectors:updated', sectors);
	});
}