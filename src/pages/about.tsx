import React from "react";
// комопоненты
import { Layout } from "@/components/Layout";
import { Title } from "@/components/ui/Title";

const About = () => {
	
	return (
		<Layout title="about" desc="We tell you about our product honestly ...">
			<Title Tag={"h1"}>
				{" "}
				Что ты знаешь о нас...{" "}
			</Title>
		</Layout>
	);
};

export default About;
