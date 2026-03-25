create table
    users (
        id UUID primary key default gen_random_uuid (),
        email varchar(255) unique not null,
        name varchar(30) not null,
        password varchar(255) not null,
        avatar varchar(255) default '',
        background varchar(255) default '',
        introduction text default '',
        create_at timestamp default current_timestamp,
        update_at timestamp default current_timestamp
    );

create table
    blogs (
        id UUID primary key default gen_random_uuid (),
        title varchar(255) not null,
        slug varchar(255) not null,
        content text not null,
        user_id UUID not null,
        view int default 0,
        create_at timestamp default current_timestamp,
        update_at timestamp default current_timestamp,
        constraint fk_blog_user foreign key (user_id) references users (id),
        constraint uq_user_slug unique (user_id, slug)
    );

create table
    likes (
        user_id UUID not null,
        post_id UUID not null,
        create_at timestamp default current_timestamp,
        constraint fk_like_user foreign key (user_id) references users (id),
        constraint fk_like_post foreign key (post_id) references blogs (id),
        constraint uq_like unique (user_id, post_id)
    );

create table
    comments (
        id UUID primary key default gen_random_uuid (),
        comment text not null,
        user_id UUID not null,
        post_id UUID not null,
        create_at timestamp default current_timestamp,
        constraint fk_comment_user foreign key (user_id) references users (id),
        constraint fk_comment_post foreign key (post_id) references blogs (id)
    );