import BigNumber from "bignumber.js";
/**
 * steamId64 must be a decimal string. Example: "76561197960287930"
 * @returns STEAM_X:Y:Z
 */
export default function steam64toLegacy(steamId64) {
    /**
     * X represents the "Universe" the steam account belongs to. If 'X' is 0, then this is Universe 1 (Public).
     * Y is the lowest bit of the Account ID. Thus, Y is either 0 or 1.
     * Z is the highest 31 bits of the Account ID.
     */
    const base = new BigNumber("76561197960265728");
    const input = new BigNumber(steamId64);
    let y = 0;
    if (input.mod(2).toPrecision(1) === "1") {
        y = 1;
    }
    let accountId = input.minus(y).minus(base).div(2).toPrecision(17);
    accountId = parseInt(accountId, 10).toString();
    return `STEAM_0:${y}:${accountId}`;
}
