--! Aggregate Functions

--* Aggregate values in multiple rows to one value

--? Most common are SUM(), AVG(), MIN(), MAX(), COUNT(), ROUND(), DATE()

SELECT COUNT(*) AS TotalOrders, AVG(Amount) AS AverageOrderAmount
FROM Orders
WHERE orderDate BETWEEN '2023-08-01' AND '2023-08-31 23:59';


SELECT MIN(replacement_cost), MAX(replacement_cost), ROUND(AVG(replacement_cost),2) AS avg, SUM(replacement_cost)
FROM film;


--todo GROUP BY

-- Used to GROUP aggregations BY specific columns

SELECT customer_id, SUM(amount)
FROM payment
WHERE customer_id > 3
GROUP BY customer_id
ORDER BY customer_id;


SELECT SUM(quantity) AS total_quantity , SUM(sale_amount) AS total_sales_amount, category
FROM sales_data
GROUP BY category
ORDER BY total_sales_amount DESC;


SELECT staff_id, SUM(amount), COUNT(amount)
FROM payment
WHERE amount != 0
GROUP BY staff_id;


--! GROUP BY multiple columns

SELECT SUM(amount) AS total_sales_amount, COUNT(amount) AS total_items_sold, category, sale_date
FROM sales
GROUP BY category, sale_date
ORDER BY category, sale_date;


SELECT  staff_id, DATE(payment_date) , SUM(amount), COUNT(*)
FROM payment
WHERE amount != 0
GROUP BY  staff_id, DATE(payment_date)
ORDER BY COUNT(*) DESC;



--! HAVING CLAUSE (FILTERING BASED ON AN AGGREGATE FUNCTIONS)

--? Used to filter GROUPINGS BY aggregations 

SELECT City, AVG(Amount) AS AverageAmount
FROM Sales
GROUP BY City
HAVING COUNT(Amount) > 2 AND AVG(Amount) > 150
ORDER BY AverageAmount DESC;

