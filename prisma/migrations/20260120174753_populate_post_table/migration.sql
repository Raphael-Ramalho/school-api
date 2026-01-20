-- Populate table
INSERT INTO
  "Post" (id, title, content, author)
values
  (
    1,
    'this is a title',
    'this is a content',
    'Matheus'
  ),
  (2, 'title', 'content', 'Jonas');

-- Fix table id sequence
SELECT
  setval(
    pg_get_serial_sequence('"Post"', 'id'),
    (
      SELECT
        MAX(id)
      FROM
        "Post"
    )
  );