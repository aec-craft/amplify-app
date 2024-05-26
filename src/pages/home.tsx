import React, { useEffect } from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const HomePage: React.FC = () => {
	const router = useRouter();
	const { token } = useAuth();

	useEffect(() => {
		if (token) {
			router.push('/upload');
		}
	}, [token, router]);

	const goToLogin = () => {
		router.push('/login');
	};

	const goToUpload = () => {
		router.push('/upload');
	};

	return (
		<Box
			minH="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			bgGradient="linear(to-r, brand.purple, brand.black)"
		>
			<MotionBox
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				bg="brand.white"
				p={8}
				rounded="md"
				shadow="lg"
				maxW="lg"
				w="full"
			>
				<Heading
					as="h1"
					size="xl"
					mb={6}
					textAlign="center"
					color="brand.black"
				>
					Floorplan Annotation Upload
				</Heading>
				<Text mb={6} textAlign="center" color="brand.black">
					Manage your floorplans with ease. Upload your DXF files and
					view them as PDFs.
				</Text>
				<VStack spacing={4}>
					<Button
						onClick={goToLogin}
						bg="brand.blue"
						color="brand.white"
						_hover={{ bg: 'brand.red' }}
						size="lg"
						width="full"
					>
						Login
					</Button>
					<Button
						onClick={goToUpload}
						bg="brand.blue"
						color="brand.white"
						_hover={{ bg: 'brand.red' }}
						size="lg"
						width="full"
					>
						Upload DXF File
					</Button>
				</VStack>
			</MotionBox>
		</Box>
	);
};

export default HomePage;
