//! Class fields (private and public)
//! Private Class fields provide a way to maintain encapsulation and not allow external access
//! Encapsulation means to prevent outside access from other developers or other parts of your own code base

class MyClass {
  //!  Public Field (on the instance of a class)
  publicField = "Public Field";
  name;

  //! Private Field
  #privateField = "Private Field";
  #secret;

  getPrivateField() {
    return this.#privateField;
  }

  //! Private Method
  #privateMethod() {
    console.log("Private Method Called");
  }

  //! Public Method
  publicMethod() {
    this.#privateMethod();
  }

  constructor(name, secret) {
    this.name = name;
    this.#secret = secret;
  }
}

const instance = new MyClass("Public", "secret");
instance.publicField = "Extremely Public Field";
instance.name = "Extremely Public";

// instance.#secret = "not a secret";  not possible because of the # private identifier (cannot use this private field outside of the class)
console.log(instance.getPrivateField()); // Private Field
console.log(instance);

instance.publicMethod();

//! ES2022 Static Initialization Blocks
class DatabaseConnection {
  static database;
  // runs exactly once when our class is loaded
  static {
    console.log(`database is initialized`);
  }
}

//! Example
class BankAccount {
  //! Public Fields
  accountHolder;
  //! Private Fields
  #balance;

  constructor(accountHolder, balance) {
    this.accountHolder = accountHolder;
    this.#balance = balance;
  }
  //! Private Method
  #validateAmount(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero.");
    }
  }
  //! Public Method
  deposit(amount) {
    this.#validateAmount(amount);
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
const account = new BankAccount("John", 100);
console.log(account);
console.log(account.getBalance());
account.deposit(100);
console.log(account.getBalance());
