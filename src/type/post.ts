export type PostDto = {
    id : number; 
    title : string;
    content : string;
    createDate : string;
    modifyDate : string;
};

export type PostCommentDto = {
    id : number; 
    comment : string;
    createDate : string;
    modifyDate : string;
};