import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(initialValue);

	useEffect(() => {
		const loadValue = async () => {
			try {
				const item = await AsyncStorage.getItem(key);
				setStoredValue(item ? JSON.parse(item) : initialValue);
			} catch (error) {
				console.error("Error loading from AsyncStorage:", error);
				setStoredValue(initialValue);
			}
		};
		loadValue();
	}, [key, initialValue]);

	const setValue = async (value: T) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error("Error saving to AsyncStorage:", error);
		}
	};

	return [storedValue, setValue] as const;
}
