import { EditorEventBus } from "../../kernel/events"
import { EditorContext } from "../../kernel/types"
import { Sector } from "./type"



export type SectorEvents = {
	"sectors:ready": void,
	"sectors:updated": Sector[]
}



export function registerSectorEvents(bus: EditorEventBus, context: EditorContext) {
	const editor = context.gjseditor;

	editor.on('style:sector:add', () => {
		context.run('sectors:list', {}).then(sectors => {
			bus.emit('sectors:updated', sectors);
		});
	});

	editor.on('style:sector:remove', () => {
		context.run('sectors:list', {}).then(sectors => {
			bus.emit('sectors:updated', sectors);
		});
	});

	editor.on('style:sector:update', () => {
		context.run('sectors:list', {}).then(sectors => {
			bus.emit('sectors:updated', sectors);
		});
	});

	editor.on('component:selected', () => {
		context.run('sectors:list', {}).then(sectors => {
			bus.emit('sectors:updated', sectors);
		});
	});

	editor.on('style:target', () => {
		context.run('sectors:list', {}).then(sectors => {
			bus.emit('sectors:updated', sectors);
		});
	});

	editor.on('style:property:update', () => {
		context.run('sectors:list', {}).then(sectors => {
			bus.emit('sectors:updated', sectors);
		});
	});
}