## Data structure - store

Goals:
* Easy to add/remove/edit items in store
* Limit looping logic required to interact with datasets
* Shallow stores - avoid nesting comments in posts in categories

Bad example:
```
{
    categories: [
        {
            id: 1,
            title: 'general ideas'
            posts: [
                {
                    id: 4326,
                    content: '....',
                    title: 'some title',
                    comments: [
                        {
                            id: 8792634,
                            content: 'so nested...'
                        }
                    ]
                }
            ]
        }
    ]
}
```

Good example:
```
{
    posts: {
        1: {
            title: 'some title',
            content: '...'
        }
    },
    comments: {
        342: {
            content: 'Objects make for easier interaction and remove the need for looping'
        }
    },
    categories: {
        854: {
            title: 'general ideas'
        }
    }
}
```