import React from "react";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import { isMobile } from "react-device-detect";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const Header = ({ children, match, user, logoutUserPage }) => {
	const { useState } = React;
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const [atTop, setAtTop] = useState(true);

	function listenScrollEvent() {
		if (window.scrollY > 50) {
			setAtTop(false);
		} else {
			setAtTop(true);
		}
	}

	React.useEffect(() => {
		window.addEventListener("scroll", listenScrollEvent);
		return () => {
			window.removeEventListener("scroll", listenScrollEvent);
		};
	}, []);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar
			style={{ background: "rgb(0, 0, 0)" }}
			position={atTop ? "static" : "fixed"}
		>
			<Container
				style={
					!isMobile
						? { background: "rgb(0, 0, 0)", padding: "1rem" }
						: { background: "rgb(0, 0, 0)", marginLeft: "-5.5rem" }
				}
				maxWidth="xl"
			>
				{!isMobile ? (
					<>
						<Toolbar disableGutters>
							<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
								<Menu
									id="menu-appbar"
									anchorEl={anchorElNav}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "left",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									open={Boolean(anchorElNav)}
									onClose={handleCloseNavMenu}
									sx={{
										display: { xs: "block", md: "none" },
									}}
								>
										<MenuItem>

									<Link
										href="/"
										style={{
											width: "20rem",
											textDecoration: "none",
										}}
									>
											<img src='images/image001.png' alt="LOGO" />
									</Link>
									</MenuItem>

								</Menu>
							</Box>
							<Stack direction="row" spacing={2}>
								<MenuItem>
									<Link style={{ width: "20rem", textDecoration: 'none' }} href="/">
										<img src='images/image001.png' alt="LOGO" />

									</Link>
								</MenuItem>
							
							</Stack>
						</Toolbar>
					</>
				) : (
					<>
						<MenuItem style={{ marginLeft: '6rem', paddingTop: '2rem' }}>
							<Link href="/">
								<img style={{ width: '12rem' }} src='images/image001.png' alt="LOGO" />

							</Link>
						</MenuItem>
					
					</>
				)}
			</Container>
		</AppBar>
	);
};
