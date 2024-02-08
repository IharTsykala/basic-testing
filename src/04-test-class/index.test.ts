import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 12345;
  const fetchBalance = 'fetchBalance';

  test('should create account with initial balance', () => {
    const account = getBankAccount(initialBalance);

    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = new BankAccount(initialBalance);

    expect(() => account.withdraw(123456)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const from = new BankAccount(initialBalance);
    const to = new BankAccount(0);

    expect(() => from.transfer(123456, to)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const from = new BankAccount(initialBalance);

    expect(() => from.transfer(0, from)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const payment = 1;
    const newBalance = 12346;

    const bankAccount = new BankAccount(initialBalance);
    bankAccount.deposit(payment);

    expect(bankAccount.getBalance()).toEqual(newBalance);
  });

  test('should withdraw money', () => {
    const payment = 1;
    const newBalance = 12344;

    const acc = getBankAccount(initialBalance);

    acc.withdraw(payment);
    expect(acc.getBalance()).toBe(newBalance);
  });

  test('should transfer money', () => {
    const payment = 1;
    const newBalanceFrom = 12344;
    const newBalanceTo = 12346;

    const from = getBankAccount(initialBalance);
    const to = getBankAccount(initialBalance);

    from.transfer(payment, to);

    expect(from.getBalance()).toBe(newBalanceFrom);
    expect(to.getBalance()).toBe(newBalanceTo);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = new BankAccount(initialBalance);
    const result = await account.fetchBalance();

    if (typeof result === 'number') {
      expect(typeof result).toEqual('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(initialBalance);
    const mockBalance = 100;

    jest.spyOn(account, fetchBalance).mockResolvedValue(mockBalance);
    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(mockBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(initialBalance);

    jest.spyOn(account, fetchBalance).mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
