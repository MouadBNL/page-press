import { createEditorEventBus, EditorEvents, registerEditorEvents, type EditorEventBus } from "./events";
import { createGrapesjsEditor } from "../lib/grapesjs";
import { EditorContext, EditorOptions } from "./types";
import { createEditorCommandBus, EditorCommandBus, EditorCommandMap, registerEditorCommandHandlers } from "./commands";
import { EventHandler } from "../lib/event-bus";
import { PayloadOf, ResultOf } from "../lib/command-bus";
import { BlockManager } from "../modules/blocks";
import { ComponentManager } from "../modules/components";

export class Editor {
	private _evtbus: EditorEventBus;
	private _cmdbus: EditorCommandBus;
	private _context: EditorContext;

	private _blockManager: BlockManager;
	private _componentManager: ComponentManager;

	constructor(options: EditorOptions) {
		this._evtbus = createEditorEventBus();
		this._cmdbus = createEditorCommandBus();
		const editor = createGrapesjsEditor(options.container);

		this._context = Object.freeze({
			gjseditor: editor,
			editor: this,
			emit: (...args) => this._evtbus.emit(...args),
			run: (...args) => this._cmdbus.dispatch(...args),
			blockManager: () => this._blockManager,
			componentManager: () => this._componentManager,
		});

		this._blockManager = new BlockManager(options.blocks);
		this._componentManager = new ComponentManager(this._context, options.components);
		
		registerEditorEvents(this._evtbus, this._context);
		registerEditorCommandHandlers(this._cmdbus, this._context);
	}

	dispose() {
		this._evtbus.clear();
		this._context.gjseditor.destroy();
	}


	// ----- Public event bus: on, once, off -----
	on<K extends keyof EditorEvents>(event: K, handler: EventHandler<EditorEvents[K]>) {
    return this._evtbus.on(event, handler);
  }
  once<K extends keyof EditorEvents>(event: K, handler: EventHandler<EditorEvents[K]>) {
    return this._evtbus.once(event, handler);
  }
  off<K extends keyof EditorEvents>(event: K, handler: EventHandler<EditorEvents[K]>) {
    this._evtbus.off(event, handler);
  }

	// ----- Public command bus: dispatch -----
  run<K extends keyof EditorCommandMap>(
    key: K,
    ...rest: PayloadOf<EditorCommandMap[K]> extends void
      ? []
      : [payload: PayloadOf<EditorCommandMap[K]>]
  ): Promise<ResultOf<EditorCommandMap[K]>> {
    return (this._cmdbus.dispatch as any)(key, ...rest);
  }

}