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

Very hard to scale horizontally with relational databases
Usually scaled vertically (which hits a limit) when the computational resources hits a limit

# NOSQL (Not Only SQL) (non-relational databases)

Major benefit of NOSQL (horizontally scaling is much easier with non-relational databases)

They are much more flexible and scalable than SQL databases and were designed to overcome the limitations of SQL databases, which have certain constraints in terms of scalability and performance.

NoSQL databases are specifically engineered to handle large-scale data and high-speed workloads. They can be scaled horizontally, which is a significant advantage when managing large applications.

1. Key-Value Databases

A key-value database uses a simple key-value method to store data. Just like a hashmap, the database stores a collection of key-value pairs and the key serves as a unique identifier. Both the key and the value can range from simple objects to complex objects.

Unlike relational databases, Key-Value databases are schemaless (meaning it manages information without the need for a blueprint) and different keys and values can have completely different structures. One key might be a string and map to a JSON object, and another be an integer and map to a list.

A good example of a key-value store is redis. Redis is an in-memory, key/value store and stores data in-memory. This makes Redis exceptionally fast for data retrieval since RAM is significantly faster compared to disk-based storage. Not all of the NoSQL databases store data in RAM, however.

2. Document Databases

Document Databases store data as "documents". These "documents" are JSON-like. This makes it easier for developers to store and query data because the format that the database stores data in is the same document-model format developers use in their application code. It provides flexibility because individual fields in a document can be added or removed independently.

An example of a document database is MongoDB. MongoDB will store data in JSON-like structures observed above.

3. Wide-Column Database

A wide-column database stores data in columns rather than rows, allowing for efficient storage and retrieval of large datasets. Instead of storing data in rows as in traditional relational databases, a wide column database stores data in columns. Each column corresponds to a specific attribute or field of the data. This structure not only enables high write throughput but also optimizes reads and aggregations over a particular subset of data, an operation that traditional row-based storage isn't designed for.

The real power of wide-column databases comes into play in scenarios requiring very large scale, such as internet search and web messaging systems. If an application needs to manage a lot of timestamp data, wide-column databases will excel in handling that. While we won't dive too deep—as these databases can get complex—it's crucial to note that they are specialized for certain use cases and may not be the best fit for every application.

Another example of this is Cassandra and Google's BigTable. Bigtable is a fully managed wide-column and key-value NoSQL database service for large analytical and operational workloads as part of the Google Cloud portfolio. Cassandra, similar to BigTable, is designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure.

4. Graph databases
   A graph database uses a graph like structure where each node refers to an entity. Much like the graphs we learned in algorithms, nodes in a graph database are connected to each other through edges or relationships. They can be used to represent various types of relationships, friendships and associations between entities.

By representing these entities as nodes, graph databases provide a flexible and intuitive way to model complex data structures and query the connections between entities efficiently.

Graph databases are very much useful when the data has complex relationship and interconnectedness. Facebook is a prime example of a use case where a graph database could be a good fit. Facebook's platform involves relationships between users. Friends, friends of friends, interests, hobbies. Graph databases would be more adept at modeling and querying various types of social interactions, comments, likes, shares and reactions.

## A deeper dive into why we need NoSQL databases

As we discussed before, the biggest issue with SQL databases is scale and the restrictions. Because there are no foreign key or join constraints, the data can be split and stored on different servers. This means half the data can be stored on one database, in one part of the world and the other half can be stored on another database, in a totally different part of the world. NoSQL databases are designed with distributed architecture in mind. They are often built to handle large amounts of data across multiple nodes from the ground up.

Dropping the foreign key contraint allows this because we don't have to cross reference data between tables, which can be inefficient.
