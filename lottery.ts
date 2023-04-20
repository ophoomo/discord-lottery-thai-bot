import { axiod } from "./mod.ts";

export const GetLottery = async () => {
    const data = await apiLottery();
    const date = data.date;
}

const apiLottery = async () => await axiod.post("https://www.glo.or.th/api/lottery/getLatestLottery").then(res => res.data);

GetLottery()