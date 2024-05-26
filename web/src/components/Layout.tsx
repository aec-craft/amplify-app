// src/components/Layout.tsx
import React from 'react';
import Header from './Header';
import Head from 'next/head';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	return (
		<>
			<Head>
				<title>Floorplan data annotation</title>
			</Head>
			<Header />
			<main>{children}</main>
		</>
	);
};

export default Layout;
