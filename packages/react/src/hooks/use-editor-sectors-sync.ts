import { useEffect } from "react";
import { useEditorStore } from "./use-editor-store";
import { useEditor } from "./use-editor";



export function useEditorSectorsSync() {

	const { editor } = useEditor();
	const setSectors = useEditorStore(s => s.setSectors);

	const handle = debounce(() => {
		console.log('useEditorSectorsSync handle');
		editor.run('sectors:list', {}).then(sectors => {
			setSectors(sectors);
		});
	}, 100);

	useEffect(() => {

		handle();
		editor.on('sectors:ready', handle);
		editor.on('sectors:updated', handle);
		editor.on('components:selected', handle);

		return () => {
			editor.off('sectors:ready', handle);
			editor.off('sectors:updated', handle);
			editor.off('components:selected', handle);
		}
	}, [editor]);
}


export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        resolve(callback(...args));
      }, delay);
    });
  };
}