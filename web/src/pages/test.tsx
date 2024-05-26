// components/TestDXF.tsx
import React, { useState } from 'react';
import { useGeneratePDF } from '@/hooks/dxf/useGeneratePDF';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Heading,
	useToast,
	Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const MotionBox = motion(Box);

const TestDXF: React.FC = () => {
	const { token } = useAuth();
	const { error, loading, handleGeneratePDF } = useGeneratePDF(token || '');
	const toast = useToast();

	const [dxfFile, setDxfFile] = useState<File | null>(null);
	const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setDxfFile(e.target.files[0]);
		}
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (dxfFile) {
			const generatedPdfBlob = await handleGeneratePDF(dxfFile);
			if (generatedPdfBlob) {
				setPdfBlob(generatedPdfBlob);
			} else if (error) {
				toast({
					title: 'Error',
					description: error,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
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
					Test DXF
				</Heading>
				<form onSubmit={onSubmit}>
					<VStack spacing={4}>
						<FormControl id="dxf_file" isInvalid={!!error}>
							<FormLabel color="brand.black">
								DXF File
								<Tooltip
									label="Upload the DXF file. DXF File is required."
									fontSize="md"
								>
									<span
										style={{
											marginLeft: '8px',
											cursor: 'pointer',
											color: 'brand.blue',
										}}
									>
										<FontAwesomeIcon
											icon={faInfoCircle}
											color="#E01E5A"
											size="1x"
										/>
									</span>
								</Tooltip>
							</FormLabel>
							<Input
								type="file"
								name="dxf_file"
								accept=".dxf"
								onChange={handleFileChange}
								borderColor="brand.blue"
								focusBorderColor="brand.red"
							/>
							{error && (
								<Box color="red.500" padding={4}>
									{error}
								</Box>
							)}
						</FormControl>
						<Button
							type="submit"
							bg="brand.blue"
							color="brand.white"
							_hover={{ bg: 'brand.red' }}
							size="lg"
							width="full"
							isLoading={loading}
						>
							View Pdf
						</Button>
					</VStack>
				</form>
				{pdfBlob && (
					<Box mt={4}>
						<iframe
							src={URL.createObjectURL(pdfBlob)}
							width="100%"
							height="500px"
							title="Generated PDF"
						/>
					</Box>
				)}
			</MotionBox>
		</Box>
	);
};

export default TestDXF;
