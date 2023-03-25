export default {
    name: 'Pin',
    title: 'Pin',
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
            name: 'Destination',
            title: 'Destination',
            type: 'url',
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
            title: 'UserId',
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
