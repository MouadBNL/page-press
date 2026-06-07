import { useCallback, useEffect, useState } from "react";


export function useDarkMode() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const isDarkMode = localStorage.getItem('darkMode') === 'true';
		setIsDarkMode(isDarkMode);
	}, []);

	const toggleDarkMode = useCallback(() => {
		setIsDarkMode((prev) => !prev);
		localStorage.setItem('darkMode', isDarkMode.toString());
	}, [isDarkMode]);

	return { isDarkMode, toggleDarkMode };
}