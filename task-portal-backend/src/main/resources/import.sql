-- Account
INSERT INTO Account(id, username, password, csrf_token)
VALUES (1, 'admin', 'password', 'abcd');
INSERT INTO Account(id, username, password, csrf_token)
VALUES (2, 'test', 'password', 'abcd');
INSERT INTO Account(id, username, password, csrf_token)
VALUES (3, 'ediloaz', 'password', 'abcd');

-- Card
INSERT INTO Card(id, owner_id, status, title, description)
VALUES (nextval('Card_SEQ'), 2, 'todo', 'Test de To Do', 'Soy la descripción de una tarea en To Do');
INSERT INTO Card(id, owner_id, status, title, description)
VALUES (nextval('Card_SEQ'), 2, 'ip', 'Test de In Progress', 'Soy la descripción de una tarea en In Progress');
INSERT INTO Card(id, owner_id, status, title, description)
VALUES (nextval('Card_SEQ'), 2, 'done', 'Test de Done', 'Soy la descripción de una tarea en Done');
INSERT INTO Card(id, owner_id, status, title, description)
VALUES (nextval('Card_SEQ'), 3, 'todo', 'Bugs de SignIn', 'Corregir bugs de interfaz relacionado con los inputs');
INSERT INTO Card(id, owner_id, status, title, description)
VALUES (nextval('Card_SEQ'), 3, 'todo', 'Diseño del header', 'Seguir el FIGMA proporcionado por el equipo de Diseño');
INSERT INTO Card(id, owner_id, status, title, description)
VALUES (nextval('Card_SEQ'), 3, 'ip', 'SignUp form', 'Guardar los datos de usuarios nuevos');
INSERT INTO Card(id, owner_id, status, title, description)
VALUES (nextval('Card_SEQ'), 3, 'done', 'Mockups del UI', 'Diseñar sobre papel todo los mockups de las interfaces');
