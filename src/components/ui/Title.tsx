import { HTMLAttributes, ReactNode } from "react";

interface ITitleProps extends HTMLAttributes<HTMLHeadingElement> {
	Tag: any;
	children: ReactNode;
	color: string;
	filter?: boolean;
}

export const Title = ({ children, Tag, color, filter, ...props }: ITitleProps) => {
	return <Tag style={{color, padding: filter ? "0.5rem" : "1rem"}} {...props}>{children}</Tag>;
};
