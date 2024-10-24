import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const DetailsPage = React.lazy(() => import('./pages/DetailsPage'));
const HomePage = React.lazy(() => import('./pages/HomePage'));

const App: React.FC = () => {
	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<div data-testid='title'>Crypto Tracker</div>
			</header>

			<main className={styles.main}>
				<ThemeProvider theme={darkTheme}>
					<Router>
						<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/details/:id" element={<DetailsPage />} />
						</Routes>
					</Router>
				</ThemeProvider>
			</main>
		</div>
	);
};

export default App;
