// import React, { createContext, useContext, useEffect, useState } from "react";

// const DarkModeContext = createContext();

// export const useDarkMode = () => useContext(DarkModeContext);

// export const DarkModeProvider = ({ children }) => {
// 	const [isDark, setIsDark] = useState(() => {
// 		const savedTheme = localStorage.getItem("theme");
// 		return savedTheme ? JSON.parse(savedTheme) : false;
// 	});

// 	useEffect(() => {
// 		localStorage.setItem("theme", JSON.stringify(isDark));
// 	}, [isDark]);

// 	return (
// 		<DarkModeContext.Provider value={{ isDark, setIsDark }}>
// 			{children}
// 		</DarkModeContext.Provider>
// 	);
// };

// export default DarkModeContext;
