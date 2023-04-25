import { ReactNode, ReactElement } from "react";
import { constants } from "@/constants/constants";
//
const colorList = Object.values(constants.COLORS);

export function LoginView({login}: {[key: string]: string}) {

	return (
		<span
			className="loginIcon"
			style={{ backgroundColor: colorList[Math.floor(Math.random() * colorList.length)] }}
		>
			{" "}
			{login[0]}{" "}
		</span>
	);
}
