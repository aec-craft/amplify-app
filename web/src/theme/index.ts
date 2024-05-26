// src/theme/index.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	colors: {
		brand: {
			purple: '#4A154B',
			black: '#1D1C1D',
			blue: '#36C5F0',
			yellow: '#ECB22E',
			red: '#E01E5A',
			white: '#FFF8F0',
		},
	},
});

export default theme;
