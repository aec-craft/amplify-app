// src/pages/_app.tsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import Layout from '@/components/Layout';

const theme = extendTheme({
	styles: {
		global: {
			body: {
				bg: 'linear-gradient(to right, #fff8f0, #f0e4d7)',
				color: '#333',
			},
		},
	},
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

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<AuthProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AuthProvider>
		</ChakraProvider>
	);
}

export default MyApp;
