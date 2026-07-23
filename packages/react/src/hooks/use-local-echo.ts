import { useEffect, useRef, useState } from "react";
import { debounce } from "../lib/debounce";




/**
 * Bridges a fully-controlled input to an async command bus without keystroke lag.
 *
 * Local state is the source of truth ONLY while the field is focused, so fast
 * typing is never clobbered by a stale `externalValue` arriving late from the
 * store round-trip. While unfocused, `externalValue` always wins. The outgoing
 * command is debounced, but blur flushes immediately so no edit is ever lost.
 */
export function useLocalEcho<T>(
	externalValue: T,
	onChange: (value: T) => void,
	delay = 100,
) {
	const [value, setValue] = useState(externalValue);
	const focusedRef = useRef(false);

	// Keep the latest onChange so the debounced fn never calls a stale closure.
	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;

	// Stable debounced command, created once per field instance.
	const debouncedRef = useRef<((value: T) => void) | null>(null);
	if (!debouncedRef.current) {
		debouncedRef.current = debounce((v: T) => onChangeRef.current(v), delay);
	}

	// Adopt external changes only when the user isn't actively typing.
	useEffect(() => {
		if (!focusedRef.current) setValue(externalValue);
	}, [externalValue]);

	return {
		value,
		onChange: (v: T) => {
			setValue(v);
			debouncedRef.current!(v);
		},
		onFocus: () => {
			focusedRef.current = true;
		},
		onBlur: () => {
			focusedRef.current = false;
			// Flush the in-flight edit immediately so the final keystroke commits.
			onChangeRef.current(value);
		},
	};
}