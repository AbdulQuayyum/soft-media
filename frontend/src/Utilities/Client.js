import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const Client = createClient({
  apiVersion: '2023-03-25',
  dataset: 'production',
  ignoreBrowserTokenWarning: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  useCdn: true,
})

const Builder = imageUrlBuilder(Client);

export const UrlFor = (source) => Builder.image(source);