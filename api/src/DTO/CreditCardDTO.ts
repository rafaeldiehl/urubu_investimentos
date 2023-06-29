interface CreditCardDTO {
  id: number,
  userId: number,
  cardNumber: string,
  expirationDate: string,
  cvv: string,
  cardBalance: number,
  ninjaName: string,
  ninjaClan: string,
  ninjaRank: string
}

export default CreditCardDTO;