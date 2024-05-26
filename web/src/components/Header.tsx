// src/components/Header.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	Box,
	Flex,
	Button,
	Heading,
	useColorModeValue,
} from '@chakra-ui/react';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
	const { token, setToken, setProfile } = useAuth();
	const router = useRouter();
	const [scrollDown, setScrollDown] = useState(false);
	const height = 100;

	useEffect(() => {
		const handleScroll = () => {
			setScrollDown(window.scrollY >= height);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const logout = () => {
		setToken(null);
		setProfile(null);
		router.push('/login');
	};
	const history = () => {
		router.push('/history');
	};
	const test = () => {
		router.push('/test');
	};
	const upload = () => {
		router.push('/upload');
	};

	return (
		<Box
			as="nav"
			w="100%"
			bg={useColorModeValue('brand.black', 'brand.black')}
			color="white"
			p={4}
			position="sticky"
			top="0"
			zIndex="1000"
			shadow={scrollDown ? 'md' : 'none'}
			transition="box-shadow 0.3s"
		>
			<Flex
				maxW="1200px"
				mx="auto"
				align="center"
				justify="space-between"
			>
				<Heading as="h1" size="md" letterSpacing={'tighter'}>
					<Link href="/">Floorplan Data Annotation</Link>
				</Heading>
				<Flex align="center">
					<Link href="/home" passHref>
						<Button variant="link" mr={4} colorScheme="whiteAlpha">
							Home
						</Button>
					</Link>
					{token && (
						<Button
							onClick={test}
							variant="link"
							mr={4}
							colorScheme="whiteAlpha"
						>
							Test
						</Button>
					)}
					{token && (
						<Button
							onClick={upload}
							variant="link"
							mr={4}
							colorScheme="whiteAlpha"
						>
							Upload
						</Button>
					)}
					{token && (
						<Button
							onClick={history}
							variant="link"
							mr={4}
							colorScheme="whiteAlpha"
						>
							History
						</Button>
					)}
					{token ? (
						<Button onClick={logout} colorScheme="red">
							Logout
						</Button>
					) : (
						<Link href="/login" passHref>
							<Button as="a" colorScheme="blue">
								Login
							</Button>
						</Link>
					)}
				</Flex>
			</Flex>
		</Box>
	);
};

export default Header;
