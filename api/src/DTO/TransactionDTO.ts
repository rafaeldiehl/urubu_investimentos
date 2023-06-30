interface TransactionDTO {
  id: number;
  userId: number;
  creditId: number;
  amount: number;
  transactionType: 'deposit' | 'withdrawal' | 'investment' | 'gain';
  transactionDate: Date;
}

export default TransactionDTO;
