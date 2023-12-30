-- Card
INSERT INTO Card(id, status, title, description)
VALUES (nextval('Card_SEQ'), 'todo', 'Bugs de SignIn', 'Corregir bugs de interfaz relacionado con los inputs');
INSERT INTO Card(id, status, title, description)
VALUES (nextval('Card_SEQ'), 'todo', 'Diseño del header', 'Seguir el FIGMA proporcionado por el equipo de Diseño');
INSERT INTO Card(id, status, title, description)
VALUES (nextval('Card_SEQ'), 'ip', 'SignUp form', 'Guardar los datos de usuarios nuevos');

-- Account
INSERT INTO Account(id, username, password)
VALUES (nextval('Account_SEQ'), 'ediloaz', 'password');
INSERT INTO Account(id, username, password)
VALUES (nextval('Account_SEQ'), 'test', 'password');