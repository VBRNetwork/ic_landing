import React from "react";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios";
import { Paper, Container, Typography, Box, Stack } from "@mui/material";
import Link from "next/link";

export async function getServerSideProps() {
    const result = await axios.get("http://127.0.0.1:8000/api/legal/terms-and-conditions/")
    const data = result.data
    return {
        props:{
            data,
        }
    }
}

export default function TermsAndConditions({ data }) {
	return (
		<Container style={{ background: "rgb(2, 5, 23)", maxWidth: 'none' }}>
            <Container style={{ paddingTop: '5rem' }}>
            <Box
                style={{
                    padding: "5rem",
                    background: "rgb(2, 5, 23)",
                    boxShadow: "rgba(2, 189, 110, 0.52) 0px 5px 30px 0px",
                }}
            >
              {data.map((item) => (
                <>
                <Box key={item.id}>
                    <Image src={item.image} alt={item.title} width={1920} height={1080} />
                    <Box style={{ textAlign: 'center' }}>
                        <Typography style={{ color: '#FFF' }} variant="h2">{item.title}</Typography>
                    </Box>
                    <Box style={{ textAlign: 'center' }}>
                        <div style={{ color: '#FFF' }} dangerouslySetInnerHTML={{ __html: item.content }} />
                    </Box>
                </Box>
                </>
              ))}
            </Box>
            </Container>
        </Container>
	);
};
