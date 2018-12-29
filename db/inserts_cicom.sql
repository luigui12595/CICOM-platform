INSERT INTO candidate(candidate_id, name) VALUES(0, 'Otto Guevara');
INSERT INTO candidate(candidate_id, name) VALUES(0, 'Carlos Alvarado');
INSERT INTO candidate(candidate_id, name) VALUES(0, 'Juan Diego Castro');
INSERT INTO candidate(candidate_id, name) VALUES(0, 'Rodolfo Piza');
INSERT INTO candidate(candidate_id, name) VALUES(0, 'Edgardo Araya');
INSERT INTO candidate(candidate_id, name) VALUES(0, 'Antonio Alvarez');
INSERT INTO candidate(candidate_id, name) VALUES(0, 'Rodolfo Hernandez');
INSERT INTO candidate(candidate_id, name) VALUES(0, 'Carlos Alvarado');

INSERT INTO media(media_id, name, facebook_name, facebook_id) VALUES(1, 'La Nacion', 'lanacioncr', '115872105050');
INSERT INTO media(media_id, name, facebook_name, facebook_id) VALUES(2, 'CR HOY', 'crhoy.comnoticias','265769886798719');
INSERT INTO media(media_id, name, facebook_name, facebook_id) VALUES(3, 'Amelia Rueda', 'AmeliaRueda','142921462922');
INSERT INTO media(media_id, name, facebook_name, facebook_id) VALUES(4, 'La Extra', 'DiarioExtra','109396282421232');
INSERT INTO media(media_id, name, facebook_name, facebook_id) VALUES(5, 'El Financiero','elfinancierocr','47921680333');
INSERT INTO media(media_id, name, facebook_name, facebook_id) VALUES(6, 'Prensa Libre', 'LaPrensaLibre', '228302277255192');
INSERT INTO media(media_id, name, facebook_name, facebook_id) VALUES(7, 'Noticias Monumental', 'NoticiasMonumental', '111416968911423');
INSERT INTO media(media_id, name, facebook_name, facebook_id) VALUES(8, 'Semanario Universidad', 'sem.universidad', '119189668150973');
INSERT INTO media(media_id, name, facebook_name, facebook_id) VALUES(9, 'Repretel', 'noticiasrepretelcostarica', '100237323349361');
INSERT INTO media(media_id, name, facebook_name, facebook_id) VALUES(10, 'Telenoticias', 'Telenoticias7', '116842558326954');
INSERT INTO media(media_id, name, facebook_name, facebook_id) VALUES(100, 'Todos', 'Todos', '0');


INSERT INTO section(section_id, media_id, name) VALUES(0, 1, 'Puro Deporte');
INSERT INTO section(section_id, media_id, name) VALUES(0, 1, 'Sucesos');
INSERT INTO section(section_id, media_id, name) VALUES(0, 1, 'Economía');
INSERT INTO section(section_id, media_id, name) VALUES(0, 1, 'Opinion');
INSERT INTO section(section_id, media_id, name) VALUES(0, 1, 'Viva');
INSERT INTO section(section_id, media_id, name) VALUES(0, 1, 'El Mundo');
INSERT INTO section(section_id, media_id, name) VALUES(0, 2, 'Nacionales');
INSERT INTO section(section_id, media_id, name) VALUES(0, 2, 'Deportes');
INSERT INTO section(section_id, media_id, name) VALUES(0, 2, 'Entretenimiento');
INSERT INTO section(section_id, media_id, name) VALUES(0, 2, 'Economía');
INSERT INTO section(section_id, media_id, name) VALUES(0, 2, 'Tecnología');
INSERT INTO section(section_id, media_id, name) VALUES(0, 2, 'Opinión');
INSERT INTO section(section_id, media_id, name) VALUES(0, 2, 'Mundo');
INSERT INTO section(section_id, media_id, name) VALUES(0, 2, 'Humor');

INSERT INTO action(action_id, action) VALUES(1, 'Create');
INSERT INTO action(action_id, action) VALUES(2, 'Delete');
INSERT INTO action(action_id, action) VALUES(3, 'Update');

INSERT INTO category(category_id, category_name) VALUES(1, 'Sucesos');
INSERT INTO category(category_id, category_name) VALUES(2, 'Infraestructura y Transportes');
INSERT INTO category(category_id, category_name) VALUES(3, 'Entretenimiento');
INSERT INTO category(category_id, category_name) VALUES(4, 'Política');
INSERT INTO category(category_id, category_name) VALUES(5, 'Deportes');
INSERT INTO category(category_id, category_name) VALUES(6, 'Ciencia y Ambiente');
INSERT INTO category(category_id, category_name) VALUES(7, 'Asuntos Internacionales');
INSERT INTO category(category_id, category_name) VALUES(8, 'Economía');
INSERT INTO category(category_id, category_name) VALUES(9, 'Asuntos Sociales');
INSERT INTO category(category_id, category_name) VALUES(10, 'Otros');

INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Accidente');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Asalto');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Asesinato');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Crímenes');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Delitos Sexuales');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Desapariciones');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Eventos Naturales');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Femicidio');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Incendio');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Juicios');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Narcotrafico y Crimen Organizado');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Peleas');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Suicidios');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Estafa y/o Fraude');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Intervención Policial');
INSERT INTO sub_category(category_id, sub_category_id, sub_category_name) VALUES(1,0,'Amenazas');