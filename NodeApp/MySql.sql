show databases;

create database cookie_recipe;

use cookie_recipe;

show tables;

CREATE TABLE users (user_id BIGINT(8) NOT NULL AUTO_INCREMENT, 
                    first_name VARCHAR(20) NOT NULL, middle_name VARCHAR(20), last_name VARCHAR(20),suffix VARCHAR(5),dob DATE,
                    user_name VARCHAR(20) NOT NULL,password VARCHAR(255) NOT NULL,email VARCHAR(35) NOT NULL,address1 VARCHAR(50),address2 VARCHAR(50),address3 VARCHAR(50),phone VARCHAR(25),
                    PRIMARY KEY ( user_id ));

CREATE TABLE loginInfo (loginfo_id BIGINT(8) NOT NULL AUTO_INCREMENT,
                         user_id BIGINT(8), timestmp timestamp
						 FOREIGN KEY (user_id) REFERENCES users(user_id));
                    
--drop table users;
                    
describe users;

select * from users;

INSERT INTO users (first_name, middle_name, last_name,suffix,dob,user_name,password,email,address1,address2,address3,phone ) VALUES('abc','def','ghi','San', STR_TO_DATE('1-01-2020', '%d-%m-%Y'),
                    'xyz',password('pass'),'abc@xyz','add1','add2','addd3','123456789');
INSERT INTO users (first_name, middle_name, last_name,suffix,dob,user_name,password,email,address1,address2,address3,phone ) VALUES('abc','def','ghi','San', STR_TO_DATE('1-01-2020', '%d-%m-%Y'),
                    'xyz',MD5('pass'),'abc@xyz','add1','add2','addd3','123456789');

-- delete from users; -- where user_id = ;

select * from users;


                    
-- need tables
    -- recipes -> recipe_id(pk),user_id(fk),post_date, recipe_name, recipe_desc, 
    -- comments -> comment_id(pk),user_id(fk), recipe_id(fk),comment
    -- ratings  ->rating_id(pk), user_id(fk), recipe_id(fk), rating_value
    -- logInfo -> loginfo_id(pk), user_id(fk), timestamp
    
    