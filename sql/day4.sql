-- LOWER , UPPER , LENGTH FUNCTIONS 

SELECT UPPER(email) AS email_upper, LOWER(email) AS email_lower, email, LENGTH(email)
FROM customer
WHERE LENGTH(email) < 30;


SELECT review_id, review_text, LENGTH(review_text) AS review_length
FROM customer_reviews
WHERE product_id = 101 AND review_text LIKE '%great%'
ORDER BY review_length;