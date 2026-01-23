# RAM

Data structures are a way to store data in an efficient manner inside of a computer component called Random Access Memory (RAM). RAM is often just referred to as memory.

Computer only understand data in terms of bits (0 and 1)

1 byte = 8 bits

Integers commonly occupy 4 bytes (32 bits) in memory

An address and a value gets associated with an integer upon storing it in RAM. An address is just a distinct location that each one of the values is stored at.

Each value is stored contiguously in the RAM, just like an array.

Each integer occupies 4 bytes of space, hence the addresses are 4 bytes apart.

Each character occupies 1 byte of space, hence the addresses are 1 byte apart.

# Static Arrays

In statically typed languages like Java, C++ and C#, arrays have to have an allocated size and type when initialized. These are known as static arrays.

They are called static because the size of the array cannot change once declared. And once the array is full, it can not store additional elements. Some dynamically typed languages such as Python and JavaScript do not have static arrays to begin with.

# Dynamic Arrays

Dynamic Arrays are a much more common alternative to static arrays. They are useful because they can grow as elements are added. In JavaScript and Python, these are the default arrays.

Unlike static arrays, with dynamic arrays we don’t have to specify a size upon initialization.

In different languages, dynamic arrays may be assigned a default size - Java being 10 and C# being 4.
Regardless, these are automatically resized at runtime as the arrays grow.
