import React from "react";
import Image from "next/image";
import { Paper, Container, Typography, Box, Stack } from "@mui/material";
import Link from "next/link";

export const Footer = () => {
	const [openTerms, setOpenTerms] = React.useState(false);
	const [openPrivacy, setOpenPrivacy] = React.useState(false);
	const [openContact, setOpenContact] = React.useState(false);
	return (
		<Box
			style={{
				padding: "5em 0em",
				background: "rgb(0, 0, 0)",
				marginTop: "auto",
				boxShadow: "rgb(0, 135, 203) 0px 5px 30px 0px",
			}}
		>
			<Container style={{ textAlign: "center" }}>
					<Image
						 src={"/images/image001.png"}
						 width={140}
						 height={50}
						 style={{ width: '20%', height: '100%' }}
					/>
			</Container>
		</Box>
	);
};
