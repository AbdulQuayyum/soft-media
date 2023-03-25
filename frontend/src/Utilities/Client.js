import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const Client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'Production',
  useCdn: true,
  apiVersion: '2023-03-25',
  token: process.env.REACT_APP_SANITY_TOKEN
})

const Builder = imageUrlBuilder(Client);

export const UrlFor = (source) => Builder.image(source);