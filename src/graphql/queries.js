/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      subtitle
      type
      category
      content
      images
      video
      tags
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        subtitle
        type
        category
        content
        images
        video
        tags
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCMImage = /* GraphQL */ `
  query GetCMImage($id: ID!) {
    getCMImage(id: $id) {
      id
      image
      title
      subtitle
      credit
      date
      createdAt
      updatedAt
    }
  }
`;
export const listCMImages = /* GraphQL */ `
  query ListCMImages(
    $filter: ModelCMImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCMImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        image
        title
        subtitle
        credit
        date
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGallery = /* GraphQL */ `
  query GetGallery($id: ID!) {
    getGallery(id: $id) {
      id
      images
      createdAt
      updatedAt
    }
  }
`;
export const listGalleries = /* GraphQL */ `
  query ListGalleries(
    $filter: ModelGalleryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGalleries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        images
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByDate = /* GraphQL */ `
  query PostsByDate(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        subtitle
        type
        category
        content
        images
        video
        tags
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const categoryByDate = /* GraphQL */ `
  query CategoryByDate(
    $category: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    categoryByDate(
      category: $category
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        subtitle
        type
        category
        content
        images
        video
        tags
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
