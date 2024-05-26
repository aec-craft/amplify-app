import React, { useEffect } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Heading,
	useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useLogin } from '../hooks/auth/useLogin';
import { motion } from 'framer-motion';
import { MoonLoader } from 'react-spinners';
import { useAuth } from '@/contexts/AuthContext';

const MotionBox = motion(Box);

const LoginPage: React.FC = () => {
	const router = useRouter();
	const { token } = useAuth();
	const { setEmail, setPassword, error, handleSubmit, loading } = useLogin();
	const toast = useToast();

	useEffect(() => {
		if (token) {
			router.push('/test');
		}
	}, [token, router]);

	const onLogin = async () => {
		const success = await handleSubmit();
		if (success) {
			toast({
				title: 'Success',
				description: 'Logged in successfully.',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			router.push('/upload');
		}
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
					Login
				</Heading>
				<VStack spacing={4}>
					<FormControl id="email">
						<FormLabel color="brand.black">Email address</FormLabel>
						<Input
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							borderColor="brand.blue"
							focusBorderColor="brand.red"
						/>
					</FormControl>
					<FormControl id="password">
						<FormLabel color="brand.black">Password</FormLabel>
						<Input
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							borderColor="brand.blue"
							focusBorderColor="brand.red"
						/>
					</FormControl>
					{error && <Box color="red.500">{error}</Box>}
					{loading ? (
						<MoonLoader color="#36C5F0" size={30} />
					) : (
						<Button
							onClick={onLogin}
							bg="brand.blue"
							color="brand.white"
							_hover={{ bg: 'brand.red' }}
							size="lg"
							width="full"
						>
							Login
						</Button>
					)}
				</VStack>
			</MotionBox>
		</Box>
	);
};

export default LoginPage;
