# SQL (Structured Query Language)

## Trade-offs of Relational Database Management Systems

Relational Databases follow what's called ACID. ACID is a property that stands for Atomicity, Consistency, Isolation, and Durability respectively. This acronym refers to four key properties of a transaction. A transaction, in the context of a database, refers to a sequence of one or more SQL operations that are treated as a unit.

## Atomicity (transactions are treated as one unit)(BEGIN , COMMIT)

All changes to data are performed as if they are a single operation.
That is, all the changes are performed, or none of them are. When we have the Begin and Commit. If one of the steps fail in the transaction, it means that the entire transaction is not committed. The transaction will only commit if all of the operations were successful. We can explain this using an example. Given Alice and Bob who have
1000 and 500 in their bank accounts respectively, Alice chooses to send Bob $500. If the database crashes while the transfer is taking place, atomicity will ensure that money is not taken out of Alice's account. Again, either all of the steps get done, or none of the steps get done. Otherwise, the money would be destroyed and disappear.

## Consistency

Consistency in the ACID model ensures data integrity. Simply put, **consistency in databases refers to the adherence to predefined rules and constraints** that maintain the validity of the data throughout the execution of multiple transactions. Therefore, it ensures that any transaction the database performs brings it from one valid state to another.

In databases, we have the ability to define what consistency constraints should be followed. In our example, the rule that an account balance can't be negative is a consistency constraint defined by the database.

## Isolation

Isolation refers to an intermediate state of a transaction, such that a transaction is invisible to other transactions. As a result, transactions that run concurrently appear to be **serialized**. The isolation property **ensures that the concurrent transactions do not interfere with each other** and the effects of one transaction are isolated from other transactions until it is committed.

Suppose Alice has 1000, and Bob has 500. The first transaction has two operations:

1. Deduct 500 from Alice's account.

2. Add the withdrawn 500 from Alice's account to Bob's account.

3. Commit.

However, before this happens, there is a second transaction which adds $200 to Alice's account and commits. This now violates the isolation property but also results in a condition called **dirty read**. A dirty read occurs when one transaction reads data from another transaction before it has committed. This now means that transaction 2 reads a value from a transaction that was not yet committed. To maintain isolation, the second transaction should have waited until the first transaction committed before reading and committing any changes made by it.

In this context, **serialized means that they are executed one after another in a sequential manner, as if they are running in isolation**. Serialization ensures that the order of transactions is maintained and effects of one transaction are visible to subsequent transactions only after it has been committed. This prevents dirty reads.

## Durability

After a transaction successfully completes, changes to data persist and are not undone, even in the event of a system failure. For example, in an application that transfers funds from one account to another, all transactions will be remembered. So if the power goes out after a transaction occurs, the transaction will still be recorded in the database.
