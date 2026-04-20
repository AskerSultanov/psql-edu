export default `CREATE TABLE reports (
    user_id text PRIMARY KEY,
    report_id integer NOT NULL,
    skus jsonb NOT NULL
    );`;
