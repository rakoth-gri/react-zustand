import { ChangeEventHandler } from "react";

export function deBounce(cb: (ev: any) => void, delay: number) {
	let timer: any = null;
    let count = 0
	return function (...ev: [any]) {        
		clearTimeout(timer);		
		timer = setTimeout(() => {           
			cb.call(null, ...ev);
		}, delay);
	};
}
