-- WHERE CLAUSE 
-- USED TO FILTER THE DATA IN THE OUTPUT 

-- FILTERING FOR NULL VALUES : IS NULL / IS NOT NULL 

-- AND condition processed first before OR condition when used together 

-- BETWEEN 1.99 AND 4.99 | NOT BETWEEN 1.99 AND 4.99

SELECT COUNT(*)
FROM payment
WHERE (amount BETWEEN 1.99 AND 3.99) 
AND (payment_date BETWEEN '2020-01-26' AND '2020-01-27 23:59');


SELECT COUNT(customer_id)
FROM payment
WHERE customer_id IN (12,25,67,93,124,234)
AND amount IN (4.99, 7.99, 9.99)
AND payment_date BETWEEN '2020-01-01' AND '2020-01-31 23:59'


-- LIKE (CASE SENSITIVE) | NOT LIKE 
-- ILIKE (CASE INSENSITIVE) | NOT ILIKE 

SELECT COUNT(*)
FROM FILM
WHERE description LIKE '%Documentary%';

SELECT COUNT(*)
FROM customer
WHERE first_name LIKE '___'
AND (last_name LIKE '%X' OR last_name LIKE '%Y');


