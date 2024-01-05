-- Account
INSERT INTO Account(id, username, password, csrf_token, age, gender, phone)
VALUES (nextval('Account_SEQ'), 'admin', '$2a$10$y6PszBtb1r28L/9ChPukEuCAffqIr0MhG7PW/LQWXVc4i4jI6ohe2', 'abcd', '17 - 30', 'Male', '8888-8888');
INSERT INTO Account(id, username, password, csrf_token, age, gender, phone)
VALUES (nextval('Account_SEQ'), 'test', '$2a$10$y6PszBtb1r28L/9ChPukEuCAffqIr0MhG7PW/LQWXVc4i4jI6ohe2', 'abcd', '50 - *', 'Female', '8888-8888');
INSERT INTO Account(id, username, password, csrf_token, age, gender, phone)
VALUES (nextval('Account_SEQ'), 'ediloaz', '$2a$10$y6PszBtb1r28L/9ChPukEuCAffqIr0MhG7PW/LQWXVc4i4jI6ohe2', 'abcd', '17 - 30', 'Male', '8652-3185');

-- Card
INSERT INTO Card(id, owner_id, position, status, title, description)
VALUES (nextval('Card_SEQ'), 51, 0, 'todo', 'Test de To Do', 'Soy la descripción de una tarea en To Do');
INSERT INTO Card(id, owner_id, position, status, title, description)
VALUES (nextval('Card_SEQ'), 51, 1, 'ip', 'Test de In Progress', 'Soy la descripción de una tarea en In Progress');
INSERT INTO Card(id, owner_id, position, status, title, description)
VALUES (nextval('Card_SEQ'), 51, 2, 'done', 'Test de Done', 'Soy la descripción de una tarea en Done');
INSERT INTO Card(id, owner_id, position, status, title, description)
VALUES (nextval('Card_SEQ'), 101, 0, 'todo', 'Bugs de SignIn', 'Corregir bugs de interfaz relacionado con los inputs');
INSERT INTO Card(id, owner_id, position, status, title, description)
VALUES (nextval('Card_SEQ'), 101, 1, 'todo', 'Diseño del header', 'Seguir el FIGMA proporcionado por el equipo de Diseño');
INSERT INTO Card(id, owner_id, position, status, title, description)
VALUES (nextval('Card_SEQ'), 101, 2, 'ip', 'SignUp form', 'Guardar los datos de usuarios nuevos');
INSERT INTO Card(id, owner_id, position, status, title, description)
VALUES (nextval('Card_SEQ'), 101, 3, 'done', 'Mockups del UI', 'Diseñar sobre papel todo los mockups de las interfaces');
