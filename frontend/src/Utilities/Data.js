export const categories = [
  {
    name: 'cats',
    image: 'https://i.pinimg.com/564x/25/99/64/259964cfd5b38f67cfb41ddcaf0f2b04.jpg',
  },
  {
    name: 'anime',
    image: 'https://i.pinimg.com/564x/c0/a0/41/c0a04189340525f801144de0212f3257.jpg',
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
    name: 'ducks',
    image: 'https://i.pinimg.com/564x/6d/73/5b/6d735bba86e0ec777fad9e3008ac718d.jpg',
  },
  {
    name: 'photography',
    image: 'https://i.pinimg.com/736x/fe/ec/fc/feecfc51da2ac1f18b5b44d87ffb9a02.jpg',
  },
  {
    name: 'oceans',
    image: 'https://i.pinimg.com/564x/3e/7a/51/3e7a5130909c2097ed3f84be8826eecc.jpg',
  },
  {
    name: 'forests',
    image: 'https://i.pinimg.com/564x/11/0e/bd/110ebd9866ad99dd12e4ffdbf9c19864.jpg',
  },
  {
    name: 'wild life',
    image: 'https://i.pinimg.com/564x/0d/d8/cc/0dd8cc308b18416555a020c2dbcdc638.jpg',
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
    name: 'quotes',
    image: 'https://i.pinimg.com/474x/c6/90/ae/c690ae0f830823b6eff219ccb267bfab.jpg',
  },
  {
    name: 'dogs',
    image: 'https://i.pinimg.com/474x/24/bc/1b/24bc1b4f7fe377849b845c3182f47b4c.jpg',
  },
  {
    name: 'memes',
    image: 'https://i.pinimg.com/474x/10/65/2c/10652caeb7a867f5e38d71ab6fb3c15a.jpg',
  },
  {
    name: 'others',
    image: 'https://i.pinimg.com/474x/68/4c/c7/684cc735e8b69126fb22f7c5044493ff.jpg',
  },
];

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedBy->{
                _id,
                userName,
                image
              },
              save[]{
                _key,
                postedBy->{
                  _id,
                  userName,
                  image
                },
              },
            }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};