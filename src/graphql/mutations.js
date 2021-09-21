/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createCMImage = /* GraphQL */ `
  mutation CreateCMImage(
    $input: CreateCMImageInput!
    $condition: ModelCMImageConditionInput
  ) {
    createCMImage(input: $input, condition: $condition) {
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
export const updateCMImage = /* GraphQL */ `
  mutation UpdateCMImage(
    $input: UpdateCMImageInput!
    $condition: ModelCMImageConditionInput
  ) {
    updateCMImage(input: $input, condition: $condition) {
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
export const deleteCMImage = /* GraphQL */ `
  mutation DeleteCMImage(
    $input: DeleteCMImageInput!
    $condition: ModelCMImageConditionInput
  ) {
    deleteCMImage(input: $input, condition: $condition) {
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
export const createGallery = /* GraphQL */ `
  mutation CreateGallery(
    $input: CreateGalleryInput!
    $condition: ModelGalleryConditionInput
  ) {
    createGallery(input: $input, condition: $condition) {
      id
      images
      createdAt
      updatedAt
    }
  }
`;
export const updateGallery = /* GraphQL */ `
  mutation UpdateGallery(
    $input: UpdateGalleryInput!
    $condition: ModelGalleryConditionInput
  ) {
    updateGallery(input: $input, condition: $condition) {
      id
      images
      createdAt
      updatedAt
    }
  }
`;
export const deleteGallery = /* GraphQL */ `
  mutation DeleteGallery(
    $input: DeleteGalleryInput!
    $condition: ModelGalleryConditionInput
  ) {
    deleteGallery(input: $input, condition: $condition) {
      id
      images
      createdAt
      updatedAt
    }
  }
`;
