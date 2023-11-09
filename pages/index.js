import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Link } from "next/link";
import PropTypes from "prop-types";
import { useMutation } from "react-query";
import { isMobile } from "react-device-detect";
import {
	Container,
	Typography,
	Box,
	Button,
	Stack,
	Backdrop,
	CircularProgress,
	Card,
	CardContent,
	CardMedia,
	FormControl,
	TextField,
	TextareaAutosize,
} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import axios from "axios";

const servicesOptions = [
	{
		key: "1",
		title: "Domestic factoring without recourse",
		description: (`
			Using domestic factoring or intern factoring our clients benefits of complete financing solutions, 
			administration services and insurance because the risk of debtor not being able to pay is passed to the factor.
		`),
		image: "images/Invoice-Factoring-Partner-1030x618.jpeg",
	},
	{
		key: "2",
		title: "Indirect factoring",
		description: (`
			Indirect factoring is considered a
			„3 x WIN” on a large scale, extremely
			useful and advantageous for seller as well as for providers,
			offering huge benefits for all participants.
		`),
		image: "images/what-is-reverse-factoring.png",
	},
	{
		key: "3",
		title: "Maturity factoring",
		description: (`
			Are you a debtor and you wish a
			payment delay for the invoices your received?
			Choose Maturity Factoring and pay at a
			different due date enduring the financial cost of this service.
		`),
		image: "images/1641281057.jpg",
	},
]

const servicesOptions1 = [
	{
		key: "4",
		title: "Import factoring",
		description: (`
			Through import factoring, Invoice Cash offers to sellers - 
			foreign companies - local collection of receivables and passing default risk of romanian importers, 
			on the other hand the debtors - 
			local romanian importers benefits of an importer credit and 
			reduces the costs of bank transfers, external transfers turning into a local transfers.
		`),
		image: "images/import_factoring.png",
	},
	{
		key: "5",
		title: "E-Commerce microfinancing",
		description: (`
			Choose the digital IMM microfinance solution for 
			companies that trades through online marketing platforms 
			such as: Emag, EvoMag, PC-Garage, Elefant, etc.
		`),
		image: "images/ecommerce.jpg",
	},
	
	{
		key: "6",
		title: "Credit scoring",
		description: (`
			The Invoice Cash clients can choose also the products 
			offered by our credit scoring platform. 
			Access Creditsky for more about credit scoring.`
		),
		image: "images/creditscore.jpeg",
		link: "https://creditsky.com/"
	},
]

const howItWorks = [
	{
		key: "1",
		title: "Create your free account",
		description: (`
			You can rest assured that your personal 
			details are safe with us and there are 
			no obligations or hidden fees! 
			It's just like creating a social media account
		`),
		icon: (<PersonAddIcon style={{ fontSize: 100, color: '#00ffcf' }} />)
	},
	{
		key: "2",
		title: "Upload your invoices",
		description: (`
			Scan your outstanding customer invoices for the goods and services 
			you provide and upload them as a PDF/image file in your account. 
			It's just like uploading your favourite pictures on social media.
		`),
		icon:  (<ReceiptIcon style={{ fontSize: 100, color: '#00ffcf' }} />)
	},
	{
		key: "3",
		title: "Get a quote from us",
		description: (`
			We value your time!
			That's why we process your application 
			within 24 hours and if we shake hands 
			we will require additional documents for your outstanding invoices.
		`),
		icon:  (<LocalOfferIcon style={{ fontSize: 100, color: '#00ffcf' }} />)
	},
	{
		key: "4",
		title: "Keep growing your business",
		description: (`
			We pick up the slack for you 
			so that you can get paid straight away (up to 80%). 
			We will transfer the remaining agreed amount 
			when we receive the funds from your customers. 
			You only need to focus on what you do best!
		`),
		icon:  (<TrendingUpIcon style={{ fontSize: 100, color: '#00ffcf' }} />)
	},
]
const addContactMessage = async (data) => {
	const res = await fetch("/api/contact/contact-form/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		if (res.status === 429) {
			toast.error("Rate limit exceeded", {
				icon: "⏃",
			});
			throw new Error("Rate limit exceeded");
		}

		const error = await res.json();
		if (error.details) {
			toast.error(error.details, {
				icon: "⏃",
			});
			throw new Error(error.details);
		}

		if (error.non_field_errors) {
			toast.error(error.non_field_errors[0], {
				icon: "⏃",
			});
			throw new Error(error.non_field_errors[0]);
		}
		toast.error("Something went wrong", {
			icon: "⏃",
		});
		throw new Error("Something went wrong");
	}

	return await res.json();
};

export default function Home({ companyBankData, kybInvoiceVerification, company }) {

	const contactMessageRef = React.useRef(null);
	const { isSuccess, isLoading, mutate } = useMutation(addContactMessage, {
		onSuccess: () => {
			toast.success("Message Sent Successfully !", {
				icon: "⏃",
			});
			console.log("success");
		},
		onError: () => {
			console.log("error");
		},
		onSettled: () => {
			console.log("settled");
		},
	});

	const [supportMessage, setSupportMessage] = React.useState({
		name: "",
		email: "",
		company_name: "",
		company_cui: "",
		company_activity: "",
		// support_message: "",
	});

	const handleSupportMessageChange = (e) => {
		setSupportMessage({ ...supportMessage, [e.target.name]: e.target.value });
	};

	const submitMessage = async () => {
		mutate(supportMessage);
		setSupportMessage({
			name: "",
			email: "",
			company_name: "",
			company_cui: "",
			company_activity: "",
			// support_message: "",
		});
	};

	if (isLoading) {
		return (
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={true}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	}

	return (
		<>
			<Head>
				<title>InvoiceCash</title>
				<meta name="description" content={"InvoiceCash"} />
				{/* <meta
					name="keywords"
					content={""}
				/> */}
				{/* <meta property="og:image" content="https://i.imgur.com/Gi6hQFM.png" /> */}
				{/* <meta property="og:image" content={data.seo.image} /> */}
				{/* <meta property="og:title" content={data.seo.title} /> */}
				<meta property="og:description" content={"InvoiceCash"} />
				{/* <meta property="og:url" content={data.seo.url} /> */}
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content={"InvoiceCash"} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container
				style={{
					background: "rgb(2, 5, 23)",
					width: "100%",
					maxWidth: "none",
					overflow: "hidden",
					paddingTop: "1rem",
					paddingBottom: "15rem",
					minHeight: "71vh",
				}}
			>
				<Box>
				<video playsInline autoPlay loop muted 
					style=
						{{
						position:"absolute",
						top:"0", 
						left: "0", 
						minWidth:"100vh", 
						minHeight:"81vh",
						maxHeight:"81vh",
						width: "100%",
						marginTop: "5rem",
						objectFit:"contain",
						display:"block",
						backgroundColor:"black"
						}}>
              		<source src='images/landing.mov' type='video/mp4' />
				</video>
				</Box>
			</Container>
			<Container 
				style={{
					background: "rgb(0, 0, 0)",
					width: "100%",
					maxWidth: "none",
					overflow: "hidden",
					paddingTop: "1rem",
					position: "relative",
					padding: '3rem',
				}}
			>
				<Typography
					style={{
						color: 'white',
						textAlign: 'center',
						fontSize: '3rem',
						fontWeight: 'bold',
						marginBottom: '10rem',
					}}
					variant="h5"
					component="div"
				>
					What can we do for you ?
					<Typography
						style={{
							color: 'rgb(0, 135, 203)',
							textAlign: 'center',
							fontSize: '1.5rem',
							fontWeight: 'bold',
						}}
						variant="h5"
						component="div"
					>
						Advantages and services
					</Typography>
				</Typography>
				<Stack style={{ marginTop: '2rem', marginLeft: '15rem' }} direction="row" spacing={20}>
					{servicesOptions.map((option) => (
						<>
							<Card 
								sx={{ maxWidth: 345 }}
								style={{ background: '#ffffff12' }}
					
							>
								<CardMedia
									style={{ height: '15rem' }}
									image={option.image}
									title={option.title}
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{option.title}
									</Typography>
									<Typography style={{ color: 'rgb(0, 135, 203)', fontSize: '1rem' }} variant="body2">
										{option.description}
									</Typography>
								</CardContent>
							</Card>
						</>
					))}
				</Stack>
				<Stack style={{ marginTop: '2rem', marginLeft: '15rem' }} direction="row" spacing={20}>
					{servicesOptions1.map((option) => (
						<>
							<Card 
								sx={{ maxWidth: 345 }}
								style={{ background: '#ffffff12' }}
					
							>
								<CardMedia
									style={{ height: '15rem' }}
									image={option.image}
									title={option.title}
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{option.title}
									</Typography>
									<Typography
										style={{ color: 'rgb(0, 135, 203)', fontSize: '1rem' }}
										variant="body2"
										color="text.secondary"
									>
										<a target="_blank" href={option.link}>{option.description}</a>
									</Typography>
								</CardContent>
							</Card>
						</>
					))}
				</Stack>
				<Box style={{ marginTop: '10rem' }}>
					<Typography
						style={{
							color: 'white',
							textAlign: 'center',
							fontSize: '3rem',
							fontWeight: 'bold',
							marginBottom: '10rem',
						}}
						variant="h5"
						component="div"
					>
						How it works ?
						<Typography
							style={{
								color: 'rgb(0, 135, 203)',
								textAlign: 'center',
								fontSize: '1.5rem',
								fontWeight: 'bold',
							}}
							variant="h5"
							component="div"
						>
							Find how you can access liquidity in just 4 easy steps
						</Typography>
					</Typography>
					<Stack style={{ marginTop: '2rem'}} direction="row" spacing={20}>
						{howItWorks.map((option) => (
							<>
								<Card 
									sx={{ maxWidth: 345 }}
									style={{
										background: '#fff0',
										border: 'solid 1px #2669b0',
										borderRadius: '20px',
									}}
						
								>
									<CardMedia
										style={{
											height: '15rem',
											textAlign: 'center',
											paddingTop: '4rem',
										}}
									>
										{option.icon}
									</CardMedia>
									<CardContent>
										<Typography style={{ color: '#2669b0', fontWeight: '700' }} gutterBottom variant="h5" component="div">
											{option.title}
										</Typography>
										<Typography style={{ color: '#FFF', fontSize: '1rem' }} variant="body2">
											{option.description}
										</Typography>
									</CardContent>
								</Card>
							</>
						))}
					</Stack>
				</Box>
				<Container id="contact" style={!isMobile ? { padding: "5rem" } : {}}>
					<Box
						style={
							!isMobile
								? {
										textAlign: "center",
										padding: "7rem",
										border: "solid #2669b0",
										borderRadius: "20px",
								  }
								: {
										textAlign: "center",
										border: "solid #2669b0",
										borderRadius: "20px",
										padding: "1rem",
										width: "100%",
										marginLeft: "-1rem",
								  }
						}
					>
						<Typography style={{ color: "#FFF", marginBottom: '3rem' }} variant="h3" component="h2">
							Contact Us
						</Typography>
						<Stack component="form">
							<FormControl sx={{ width: "100%" }} variant="standard">
								<TextField
									id="name"
									variant="standard"
									name="name"
									type="name"
									value={supportMessage.name}
									color="primary"
									label={<Typography style={{ color: '#FFF' }} variant="h5">Name</Typography>}
									onChange={handleSupportMessageChange}
									focused
								/>
							</FormControl>
							<FormControl
								sx={{ margin: "1rem 0", width: "100%" }}
								variant="standard"
							>
								<TextField
									id="email"
									variant="standard"
									label={<Typography style={{ color: '#FFF' }} variant="h5">Email</Typography>}
									// color="primary"
									style={{ borderColor: "rgb(2, 189, 110)" }}
									onChange={handleSupportMessageChange}
									value={supportMessage.email}
									name="email"
									focused
									// InputProps={{
									//   startAdornment: (
									//     <InputAdornment position="start">
									//       <MailIcon color="primary" />
									//     </InputAdornment>
									//   ),
									// }}
								/>
							</FormControl>
							<FormControl
								sx={{ margin: "1rem 0", width: "100%" }}
								variant="standard"
							>
								<TextField
									id="company_name"
									variant="standard"
									label={<Typography style={{ color: '#FFF' }} variant="h5">Company Name</Typography>}
									// color="primary"
									style={{ borderColor: "rgb(2, 189, 110)" }}
									onChange={handleSupportMessageChange}
									value={supportMessage.company_name}
									name="company_name"
									focused
									// InputProps={{
									//   startAdornment: (
									//     <InputAdornment position="start">
									//       <MailIcon color="primary" />
									//     </InputAdornment>
									//   ),
									// }}
								/>
							</FormControl>
							<FormControl
								sx={{ margin: "1rem 0rem", width: "100%" }}
								variant="standard"
							>
								<TextField
									id="company_cui"
									variant="standard"
									name="company_cui"
									type="company_cui"
									value={supportMessage.company_cui}
									color="primary"
									label={<Typography style={{ color: '#FFF' }} variant="h5">Company Registration Number</Typography>}
									onChange={handleSupportMessageChange}
									focused
								/>
							</FormControl>
							<FormControl
								sx={{ margin: "1rem 0rem", width: "100%" }}
								variant="standard"
							>
								<TextField
									id="company_activity"
									variant="standard"
									name="company_activity"
									type="company_activity"
									value={supportMessage.company_activity}
									color="primary"
									label={
										<Typography style={{ color: '#FFF' }} variant="h5">Company Activity</Typography>
									}
									onChange={handleSupportMessageChange}
									focused
								/>
							</FormControl>
						</Stack>
						{/* <Stack direction="row" spacing={2}>
							<FormControl
								sx={{ margin: "1rem 0", width: "100%" }}
								variant="standard"
							>
								<TextareaAutosize
									aria-label="minimum height"
									minRows={3}
									placeholder="Your Message"
									value={supportMessage.message}
									// ref={contactMessageRef}
									onChange={(e) => {
										console.log(e);
										handleSupportMessageChange(e);
									}}
									// id="message"
									name="message_description"
									id="message_description"
									style={
										!isMobile
											? {
													height: "10rem",
													background: "#131312",
													borderColor: "#2669b0",
													borderRadius: "10px",
													color: "#FFF",
													padding: "1rem",
											  }
											: {
													height: "10rem",
													background: "#131312",
													borderColor: "#2669b0",
													borderRadius: "10px",
													color: "#FFF",
											  }
									}
								/>
							</FormControl>
						</Stack> */}
						<Box style={{ marginTop: "2rem" }}>
							<Button
								variant="contained"
								style={{
									background: "rgb(2, 5, 23)",
									color: "#00ffcf",
									border: "solid #00ffcf",
									borderRadius: "20px",
									fontSize: "16px",
									fontWeight: "700",
									width: "200px",
									height: "60px",
								}}
								onClick={submitMessage}
							>
								Submit Request
							</Button>
						</Box>
					</Box>
				</Container>
			</Container>
		</>
	);
}
