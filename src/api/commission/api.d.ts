export interface ProportionListData {
   commission: string
   mobile: string
   user_id: number
   user_name: string
}
export interface WithdrawalListData {
   id: string
   mobile: string
   money: string
   status: number
   user_id: number
   user_name: string
}
export interface HandleWithdrawal {
   id: string
   status: number
}