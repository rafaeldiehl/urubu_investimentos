interface TransactionDTO {
  id: number;
  userId: number;
  amount: number;
  transactionType: 'deposit' | 'withdrawal' | 'investment';
  transactionDate: Date;
}

export default TransactionDTO;
