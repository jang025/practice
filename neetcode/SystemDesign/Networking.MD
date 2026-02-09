# Networking Basics

We will discuss how two computers communicate with each other using the client-server architecture

## What is a network?

In networking, each device is assigned a unique IP address. This IP address acts as an identifier, allowing devices to send and receive data on the network (over the public internet).

## IP Address

An IP address serves as a distinct numeric identifier for every device connected to a computer network. IP addresses come in two main types: **IPv4, which is 32-bit**, and **IPv6, which is 128-bit**. The IPv4 system theoretically allows for about 4.3 billion unique IP addresses. However, due to design choices during its creation and the exponential growth of the internet, the actual number of usable addresses is considerably lower. This scarcity issue led to the development and adoption of IPv6, which provides a significantly larger address space to accommodate the ever-increasing number of devices on the internet.

IPv4 addresses are 32-bit and are expressed in the range 0.0.0.0 - 255.255.255.255, consisting of four octets. Each octet, composed of 8 bits or a byte, can hold a maximum decimal value of 255. In contrast, IPv6 addresses are 128-bit and consist of 8 groups of 16 bits. Each octet is represented by four hexadecimal digits and follows the format xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx. This expanded address space allows for a virtually infinite number of unique IP addresses, making address exhaustion highly improbable.

While the concept sounds promising, the practical aspect of sending the invitation from Alice to Bob needs to be addressed. **This involves following specific rules known as protocols, which govern the transmission of data over the internet.** One such protocol is the Internet Protocol (IP).

## Protocols of sending data over a network

### IP (Internet Protocol) and data packets

IP is the rules of sending data over the internet

Metadata --> information about the packet (in computing , it's called the header)

Data is transferred over a network in the form of data packets. These packets consist of a header, data (payload), and a trailer. The header contains important information such as the source and destination IP addresses, which are crucial for our understanding as developers.

The header is specifically referred to as the **IP Header**. Usually, data is divided into multiple packets, and they may not arrive in the exact order they were sent. To handle this situation, another protocol called the Transmission Control Protocol (TCP) comes into action.

### TCP (Transmission Control Protocol)

TCP is the rule of transmit multiple packets of data , and requiring the packets tranmitted arrive at the correct order sequence

When a substantial volume of data needs to be transmitted, we often use multiple packets. TCP is responsible for the accurate transmission of these packets, ensuring they arrive in the right sequence. In a similar manner to TCP packets, consider Alice sending a multi-page letter to Bob. She assigns numbers to these pages to make sure Bob will read them in the right sequence. This means that irrespective of the order she puts the pages into the envelope, Bob can still assemble them correctly upon receiving. TCP employs the same strategy by incorporating a sequence number in each packet header(**TCP Header**), making sure the packets are accurately reassembled at their destination.

### Application Data

As developers, we're primarily interested in the application data portion of the packet. This data can come in different shapes, for example, an HTTP POST request, where the information we wish to transmit resides in the application segment of the packet. Conversely, it could be a GET request, whereby the data segment of the packet signifies the retrieved response.

It is worth noting that a TCP packet's payload (data) will contain both the HTTP header and HTTP payload.

### Network layers

Protocols within a computer network are systematically arranged into separate layers, creating a hierarchical organization. Every layer has specific duties and interacts with the layers next to it to enable communication.

For example, IP is located in the network layer, which sets the physical pathway for the transmission of data. TCP is in the transport layer, which takes care of the dependable transmission of data. HTTP operates in the application layer, making interaction between clients and servers possible.

## Public vs Private IP Address

Another important concept is the distinction between private and public IP addresses. A public IP address is a unique identifier given to a device connected to the internet, supplied by the Internet Service Provider (ISP), and is reachable from any device on the internet. This type of IP address is utilized when communication needs to occur between devices on separate networks.

Typically client devices connected to a router (the router will have a public ip address) , and a server (public ip address)

The router will give devices connected to its router , each an individual private IP address

On the other hand, a private IP address is employed within a confined network, like a home or office network. Because of this, these IP addresses aren't accessible to the broader internet. As you may have noted, the main difference is in the range of their accessibility. While public IP addresses can be accessed globally, private IP addresses are only reachable within a LAN (local area network).

## Static vs Dynamic IP Addresses

A dynamic IP address is allocated on a temporary basis and can change every time the device establishes a connection. This type of IP address is frequently employed in home networks. They're automatically assigned, reducing the need for manual configuration. However, a drawback of dynamic IP addresses is their changeability. Hence, they're typically allocated to clients, not servers.

Conversely, static IP addresses require manual configuration, specifying an unchanging IP address.

It's important to highlight that clients can also possess static IP addresses, but dynamic IP addresses are more commonly utilized for clients since they offer greater adaptability in managing the restricted pool of available IP addresses.

## Ports (channel of communication between machines open at a particular time)

Application ports, also known as network ports, are numeric identifiers utilized to distinguish between multiple applications or services running on a single device. If you've ever executed a full-stack project, you'll know that you cannot operate the frontend and backend on the same port. A port number is a 16-bit integer, ranging from 0 to 65,535. Instances of these ports include port 80, typically used for HTTP. The usage of different port numbers enables the establishment of simultaneous connections.

Localhost is the special name for the IP address 127.0.0.1

# TCP and UDP

## The use cases for TCP (RELIABLE BUT MORE OVERHEAD AND SLOWER)

TCP and UDP serve different functions. As we previously stated, when data is transmitted, it's divided into packets. Nonetheless, there's a chance of packet loss during this process. TCP ensures that these lost packets are reliably delivered. **It accomplishes this by setting up a two-way connection, commonly referred to as a 3-way handshake**, between the devices in communication. As illustrated in the hypothetical diagram below, TCP requires that both the client and server establish a reliable connection before any data exchange takes place.

After the connection is established, bidirectional communication can begin. If a data packet is sent and doesn't receive an acknowledgement, TCP assumes it wasn't received and triggers a retransmission. This feature of reliability is a distinguishing characteristic of TCP.

While TCP provides reliability, it does have its drawbacks. It brings about more overhead and tends to be slower due to its rigorous approach to ensuring delivery.

## The use cases for UDP (FASTER BUT NOT RELIABLE , CAN HAVE LOSS OF DATA PACKETS )

UDP and TCP have distinct qualities when it comes to reliability and speed. UDP, despite being less reliable than TCP, boasts faster data transmission. Unlike TCP, UDP does not attempt to resend lost packets or reorder them.

So why opt for UDP instead of TCP, given UDP's lower reliability? UDP finds its purpose in scenarios like online gaming and video streaming. In these cases, it is often preferable to skip a dropped frame rather than resend it. This approach ensures smoother gameplay and uninterrupted streaming.

Hence, UDP is selected over TCP in specific situations where speed and efficiency take precedence over reliability and error correction.

## DNS (Domain Name System)

The Domain Name System (DNS) can be likened to the internet's phone book. Just as we keep a contact list in our phones to avoid memorizing hundreds of phone numbers, DNS operates as a decentralized hierarchical naming system that converts easily readable website names into numerical IP addresses.

When we input a domain name such as google.com into our web browser, the Domain Name System (DNS) translates it into an IP address (like 142.251.211.238). This way, your computer understands where to route the request on the internet.

The overall coordination, security, and operation of domain names within DNS is managed by ICANN (Internet Corporation for Assigned Names and Numbers).

## ICANN and Domain Name Registrars

Visualize opening a store in a shopping center. ICANN could be likened to the shopping center's management company, while domain registrars resemble the individual store lease providers. Just as the shopping center's management ensures the smooth operation of the mall, ICANN ensures the efficient running of the internet's infrastructure.

When we aim to register a domain name, we engage with a domain registrar, much like how we would approach a leasing company to rent a store space in a mall. Domain registrars are certified by ICANN to offer domain name registration services. They assist us in searching for available domain names and oversee the registration procedure.

It's crucial to understand that ICANN doesn't own domain names directly. Instead, domain names are sold by approved domain registrars, such as GoDaddy, Google Domains, or HostGator, which are authorized by ICANN. These registrars maintain the registration records and ensure that the domain is registered in our name.

## DNS Records

Within the DNS, **DNS records serve to store information related to a domain or subdomain.** The A (Address) record, the most common type of DNS record, associates a domain name with an IPv4 address. For instance, if a request is made to neetcode.io, the DNS record would include the corresponding IP address (such as 192.158.1.39) to direct the request to the server hosting the website.

Let's consider a scenario where you send a request to neetcode.io, which is linked to the IP address 192.158.1.39. The DNS record for neetcode.io would house this IP address. Upon receiving your request, the DNS server would reference this record to route your request to the server hosting the neetcode.io website. This server then sends a response back to your computer.

To enhance future access speed, if a server has a static IP address (one that doesn't change frequently), your computer can store this IP address in its cache or memory. This enables your computer to quickly retrieve the IP address from its cache instead of making another query to the DNS server when you visit the same website again.

To summarize, a server refers to a computer equipped with a public IP address and a domain name. It is configured with firewalls to handle public requests. When a client sends a request to a server, the server receives the request and responds accordingly. DNS records and the DNS system play a crucial role in ensuring that your requests reach the correct server by mapping domain names to their corresponding IP addresses.

## Anatomy of a URL (Uniform Resource Locator)

1. Protocol (https, http , ftp , ssh)
2. Domain name
   - subdomain (www)
   - primary domain (google)
   - top level domain (com)
     <br>
3. - path (/images)

port (optional as standard protocols like http (80) and https(443) are by default assigned to certain port numbers)
