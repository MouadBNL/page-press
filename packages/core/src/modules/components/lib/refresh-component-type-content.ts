import { Editor as GjsEditor } from "grapesjs";

export function refreshComponentTypeContent(gjseditor: GjsEditor, id: string) {

	const wrapper = gjseditor.Components.getWrapper();
	if (!wrapper) {
		throw new Error(`Wrapper ${id} not found`);
	}
	const intances = wrapper.findType(id);
	let idx = 0;
	for (const instance of intances) {
		console.log(`Refreshing component type ${id} instance ${idx}/${intances.length}`);
		instance.view?.render();
	}

}