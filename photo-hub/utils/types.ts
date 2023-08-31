export interface PostsType {
    message: string;
    posts:    Post[];
}

export interface SearchType {
    message: string;
    posts: Post[];
    users: User[];
    text: string;
}

export interface PostType {
    message: string;
    post:    Post;
    comments: Comment[];
}

export interface Post {
    id?:                number;
    uuid?:              string;
    user_id?:           number;
    body?:              string;
    image?:             Image | null;
    view_count?:        number;
    view_count_unique?: number;
    created_at?:        Date;
    updated_at?:        Date;
    user?:              User;
    comments?:          Comment[];
    user_posts_likes?:  User[];
    post_user_views?:    User[];
}

export interface Comment {
    id?:         number;
    uuid?:       string;
    post_id?:    number;
    user_id?:    number;
    content?:    string;
    created_at?: Date;
    updated_at?: Date;
    user?:       User;
}

export interface Image {
    url:      string;
    name:     string;
    extname:  string;
    size:     number;
    mimeType: string;
    variants: Variants;
}

export interface Variants {
    medium:    Large;
    thumbnail: Large;
    large:     Large;
}

export interface Large {
    name:          string;
    format:        string;
    size:          number;
    width:         number;
    height:        number;
    isProgressive: boolean;
    hasAlpha:      boolean;
    orientation:   number;
    extname:       string;
    mimeType:      string;
    url:           string;
}

export interface User {
    id?:                number;
    uuid?:              string;
    email?:             string;
    username?:          string;
    name?:              string;
    bio?:               string;
    avatar?:            Image | null;
    location?:          string;
    website?:           string;
    followings?:        User[];
    twitter_url?:       string;
    facebook_url?:      string;
    linkedin_url?:      string;
    role_id?:           number;
    remember_me_token?: null;
    password?: string;
    created_at?:        Date;
    updated_at?:        Date;
}

export interface Profile {
    message: string;
    user:User,
    posts:Post[]
}
