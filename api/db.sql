CREATE DATABASE urubu_do_pix;
USE urubu_do_pix;

-- Tabela de usuários
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  investment_balance DECIMAL(10, 2) DEFAULT 0
);

-- Tabela de cartões de crédito
CREATE TABLE credit_cards (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  card_number VARCHAR(16) NOT NULL,
  expiration_date VARCHAR(7) NOT NULL,
  cvv VARCHAR(3) NOT NULL,
  card_balance DECIMAL(10, 2) DEFAULT 0,
  pin INT(4) NOT NULL,
  ninja_name VARCHAR(255) NOT NULL,
  ninja_clan VARCHAR(255) NOT NULL,
  ninja_rank VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela de transações de investimento
CREATE TABLE investment_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  card_credit_id INT,
  amount DECIMAL(10, 2) NOT NULL,
  transaction_type ENUM('deposit', 'withdrawal', 'investment', 'gain') NOT NULL,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (card_credit_id) REFERENCES credit_cards(id)
);

-- Populações como exemplo
INSERT INTO users (name, email, password, investment_balance)
VALUES ('João Silva', 'joao.silva@example.com', 'senha123', 1000.00),
       ('Maria Santos', 'maria.santos@example.com', 'senha456', 2000.00),
       ('Pedro Almeida', 'pedro.almeida@example.com', 'senha789', 1500.00),
       ('Ana Pereira', 'ana.pereira@example.com', 'senhaabc', 3000.00),
       ('Luiza Oliveira', 'luiza.oliveira@example.com', 'senhaxyz', 2500.00);

INSERT INTO credit_cards (user_id, card_number, expiration_date, cvv, card_balance, pin, ninja_name, ninja_clan, ninja_rank)
VALUES (1, '4532894176918710', '07/2025', '123', 12626.00, 1234, 'Naruto', 'Uzumaki', 'Jonin'),
       (1, '4532894176918711', '07/2025', '123', 5335.00, 1234, 'Naruto', 'Uzumaki', 'Jonin'),
       (2, '5370418429237755', '12/2023', '456', 35253.00, 5678, 'Naruto', 'Uzumaki', 'Chunin'),
       (3, '4024007165639577', '09/2024', '789', 323.00, 4321, 'Naruto', 'Uzumaki', 'Genin'),
       (4, '6011206803210787', '03/2027', '234', 2323.00, 8765, 'Naruto', 'Uzumaki', 'Anbu'),
       (5, '4916740459811404', '06/2026', '567', 153.00, 1357, 'Naruto', 'Uzumaki', 'Sannin');