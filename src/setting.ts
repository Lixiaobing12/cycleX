export interface ctype {
    chainId:number,
    Contract:{
        address:string,
        name:string,
        totalSupply:number,
        difficulty:number,
        minted?:number,
    }
}
export const ContractSettingByChainMap = new Map<ctype['chainId'],ctype['Contract']>();

ContractSettingByChainMap.set(97,{
    address:'0x60eED1CC6aBA31D5a8fB695f128De8753Cc45b38',
    name:'PoWPepe',
    totalSupply:69420,
    difficulty:10
})

ContractSettingByChainMap.set(56,{
    address:'0xF4816156055Ef0C7Ed80c38BD1d790AE036b9384',
    name:'PoWPepe',
    totalSupply:69420,
    difficulty:10
})