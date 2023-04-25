import { constants } from "@/constants/constants"

export const dateFormatter = (num: number): string => {
    const date = new Date(num)
    return `${date.getDate()} ${constants.MONTHS[date.getMonth()]} ${date.getFullYear()}`
}