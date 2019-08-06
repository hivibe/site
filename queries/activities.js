export const getAllActivities = `
*[_type == 'hobby']{
    _id,
    name,
    image {
        "url": asset->url
    },
}`;

export const getActivityByName = name => {
  return `
    *[_type == 'hobby' && name match "${name}"]{
        _id,
        name,
        description,
        image {
            "url": asset->url
        },
        tags[]-> {
            ...
        }, 
        resources[]-> {
            title,
            slug,
        },
        products[]-> {
            ...,
            image {
                "url": asset->url
            },
            tags[] -> {
                ...
            }
        }
    }[0]`;
};