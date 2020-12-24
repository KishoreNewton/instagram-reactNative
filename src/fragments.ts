export const USER_FRAGMENT = `
    fragment UserParts on User {
        id
        username
        avatar
    }
`;

export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment {
        id
        text
        user {
            ${USER_FRAGMENT}
        }
    }
`;

export const FILE_FRAGMENT = `
    fragment FileParts on File {
        id
        url
    }
`;

export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post {
        id
        location
        caption
        likes {
            id
        }
        files {
            id
            url
        }
        comments {
            id
            text
            user {
                id
                username
            }
        }
        user {
            id
            username
            avatar
        }
    }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants {
            id
            username
            avatar
        }
        messages {
            id
            text
            to {
                id
                username
                avatar
            }
            from {
                id
                username
                avatar
            }
        }
    }
`;
