CREATE TABLE nft (
    id serial primary key,
    name text not null,
    date timestamp not null,
    mint_cost numeric not null,
    num_squares integer not null
);

CREATE TABLE nft_color (
    id serial primary key,
    nft_id integer not null,
    color_id integer not null,
    unique (nft_id, color_id)
);

CREATE TABLE nft_tag (
    id serial primary key,
    nft_id integer not null,
    tag_id integer not null,
    unique (nft_id, tag_id)
);

CREATE TABLE color (
    id serial primary key,
    name text not null
);

CREATE TABLE tag (
    id serial primary key,
    name text not null
);
