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
		context.run('style:sectors', {}).then(sectors => {
			bus.emit('style:sectors:updated', sectors);
		});
	});

	editor.on('style:sector:remove', () => {
		context.run('style:sectors', {}).then(sectors => {
			bus.emit('style:sectors:updated', sectors);
		});
	});

	editor.on('style:sector:update', () => {
		context.run('style:sectors', {}).then(sectors => {
			bus.emit('style:sectors:updated', sectors);
		});
	});

	editor.on('component:selected', () => {
		context.run('style:sectors', {}).then(sectors => {
			bus.emit('style:sectors:updated', sectors);
		});
	});

	editor.on('style:target', () => {
		context.run('style:sectors', {}).then(sectors => {
			bus.emit('style:sectors:updated', sectors);
		});
	});

	editor.on('style:property:update', () => {
		context.run('style:sectors', {}).then(sectors => {
			bus.emit('style:sectors:updated', sectors);
		});
	});
}