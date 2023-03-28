export default {
    name: 'Post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'Title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'About',
            title: 'About',
            type: 'string',
        },
        {
            name: 'Category',
            title: 'Category',
            type: 'string',
        },
        {
            name: 'Image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'UserID',
            title: 'UserID',
            type: 'string',
        },
        {
            name: 'PostedBy',
            title: 'PostedBy',
            type: 'PostedBy',
        },
        {
            name: 'Save',
            title: 'Save',
            type: 'array',
            of: [{ type: 'Save' }],
        },
        {
            name: 'Comments',
            title: 'Comments',
            type: 'array',
            of: [{ type: 'Comment' }],
        },
    ],
};
