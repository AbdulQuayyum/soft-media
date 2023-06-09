export const Categories = [
  {
    name: 'cats',
    image: 'https://i.pinimg.com/564x/25/99/64/259964cfd5b38f67cfb41ddcaf0f2b04.jpg',
  },
  {
    name: 'anime',
    image: 'https://i.pinimg.com/564x/c0/a0/41/c0a04189340525f801144de0212f3257.jpg',
  },
  {
    name: 'music',
    image: 'https://i.pinimg.com/474x/63/7c/34/637c34b161f21a494aabbd127feacfce.jpg',
  },
  {
    name: 'food',
    image: 'https://i.pinimg.com/564x/96/5f/8b/965f8b701b711caba397e6a0bc559254.jpg',
  },
  {
    name: 'cars',
    image: 'https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg',
  },
  {
    name: 'cinematography',
    image: 'https://i.pinimg.com/474x/ee/0e/5e/ee0e5e4ca46078a6fe8a12efbaaee3b1.jpg',
  },
  {
    name: 'video games',
    image: 'https://i.pinimg.com/474x/de/24/57/de24578fe63da09a52e6878d594c35e7.jpg',
  },
  {
    name: 'animals',
    image: 'https://i.pinimg.com/564x/6d/73/5b/6d735bba86e0ec777fad9e3008ac718d.jpg',
  },
  {
    name: 'photography',
    image: 'https://i.pinimg.com/736x/fe/ec/fc/feecfc51da2ac1f18b5b44d87ffb9a02.jpg',
  },
  {
    name: 'nature',
    image: 'https://i.pinimg.com/564x/3e/7a/51/3e7a5130909c2097ed3f84be8826eecc.jpg',
  },
  {
    name: 'art',
    image: 'https://i.pinimg.com/564x/dc/c6/7e/dcc67ed0107da71b834615d48421efa4.jpg',
  },
  {
    name: 'space',
    image: 'https://i.pinimg.com/564x/b1/23/5d/b1235dc3c1f4cbfb92decd809ce1d356.jpg',
  },
  {
    name: 'islam',
    image: 'https://i.pinimg.com/474x/2f/04/ea/2f04ea87f085d3e449c896f059e11dad.jpg',
  },
  {
    name: 'christainity',
    image: 'https://i.pinimg.com/474x/af/0f/88/af0f88c60ce0a0e5494cce01829d0a05.jpg',
  },
  {
    name: 'travel',
    image: 'https://i.pinimg.com/474x/dc/97/4e/dc974e453e02886762d75825dca5c7f3.jpg',
  },
  {
    name: 'celebrity',
    image: 'https://i.pinimg.com/564x/30/18/e5/3018e56dd3a232f5bac6bdb15c28609f.jpg',
  },
  {
    name: 'technology',
    image: 'https://i.pinimg.com/564x/03/2b/b4/032bb4387d0796e02d7e23ac92adea99.jpg',
  },
  {
    name: 'quotes',
    image: 'https://i.pinimg.com/474x/c6/90/ae/c690ae0f830823b6eff219ccb267bfab.jpg',
  },
  {
    name: 'memes',
    image: 'https://i.pinimg.com/474x/10/65/2c/10652caeb7a867f5e38d71ab6fb3c15a.jpg',
  },
  {
    name: 'other',
    image: 'https://i.pinimg.com/474x/68/4c/c7/684cc735e8b69126fb22f7c5044493ff.jpg',
  }
];

export const FeedQuery = `*[_type == "Post"] | order(_createdAt desc) {
    Image{
      asset->{
        url
      }
    },
        _id,
        PostedBy->{
          _id,
          UserName,
          Image
        },
        Save[]{
          _key,
          PostedBy->{
            _id,
            UserName,
            Image
          },
        },
      } `;

export const PostDetailQuery = (PostID) => {
  const query = `*[_type == "Post" && _id == '${PostID}']{
      Image{
        asset->{
          url
        }
      },
      _id,
      Title, 
      About,
      Category,
      PostedBy->{
        _id,
        UserName,
        Image
      },
     Save[]{
        PostedBy->{
          _id,
          UserName,
          Image
        },
      },
      Comments[]{
        Comment,
        _key,
        PostedBy->{
          _id,
          UserName,
          Image
        },
      }
    }`;
  return query;
};

export const PostDetailMorePostQuery = (Post) => {
  const query = `*[_type == "Post" && Category == '${Post.Category}' && _id != '${Post._id}' ]{
      Image{
        asset->{
          url
        }
      },
      _id,
      PostedBy->{
        _id,
        UserName,
        Image
      },
      Save[]{
        _key,
        PostedBy->{
          _id,
          UserName,
          Image
        },
      },
    }`;
  return query;
};

export const SearchQuery = (searchTerm) => {
  const query = `*[_type == "Post" && Title match '${searchTerm}*' || Category match '${searchTerm}*' || about match '${searchTerm}*']{
          Image{
            asset->{
              url
            }
          },
              _id,
              PostedBy->{
                _id,
                UserName,
                Image
              },
              Save[]{
                _key,
                PostedBy->{
                  _id,
                  UserName,
                  Image
                },
              },
            }`;
  return query;
};

export const UserQuery = (UserID) => {
  const query = `*[_type == "User" && _id == '${UserID}']`;
  return query;
};

export const UserCreatedPostsQuery = (UserID) => {
  const query = `*[ _type == 'Post' && UserID == '${UserID}'] | order(_createdAt desc){
      Image{
        asset->{
          url
        }
      },
      _id,
      PostedBy->{
        _id,
        UserName,
        Image
      },
      Save[]{
        PostedBy->{
          _id,
          UserName,
          Image
        },
      },
    }`;
  return query;
};

export const UserSavedPostsQuery = (UserID) => {
  const query = `*[_type == 'Post' && '${UserID}' in Save[].UserID ] | order(_createdAt desc) {
      Image{
        asset->{
          url
        }
      },
      _id,
      PostedBy->{
        _id,
        UserName,
        Image
      },
      Save[]{
        PostedBy->{
          _id,
          UserName,
          Image
        },
      },
    }`;
  return query;
};